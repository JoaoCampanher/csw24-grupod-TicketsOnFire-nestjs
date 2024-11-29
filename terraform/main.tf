provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "main_vpc" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "Main VPC"
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id     = aws_vpc.main_vpc.id
  cidr_block = "10.0.1.0/24"
  map_public_ip_on_launch = true

  tags = {
    Name = "Public Subnet"
  }
}

resource "aws_subnet" "private_subnet" {
  vpc_id     = aws_vpc.main_vpc.id
  cidr_block = "10.0.2.0/24"

  tags = {
    Name = "Private Subnet"
  }
}

resource "aws_security_group" "ecs_security_group" {
  vpc_id      = aws_vpc.main_vpc.id
  name        = "ecs-security-group"
  description = "Allow access to ECS containers"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # ALB
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "rds_security_group" {
  vpc_id      = aws_vpc.main_vpc.id
  name        = "rds-security-group"
  description = "Allow database access"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    security_groups = [aws_security_group.ecs_security_group.id] # Only ECS can access
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_db_instance" "nestjs_rds" {
  identifier              = "nestjs-db-instance"
  allocated_storage       = 20
  engine                  = "postgres"
  instance_class          = "db.t3.micro"
  db_name                 = "nestjsdb"
  username                = "postgres"
  password                = "securepassword"
  vpc_security_group_ids  = [aws_security_group.rds_security_group.id]
  publicly_accessible     = false
  skip_final_snapshot     = true
  subnet_group_name       = aws_db_subnet_group.db_subnet_group.name

  tags = {
    Name = "NestJS RDS Database"
  }
}

resource "aws_db_subnet_group" "db_subnet_group" {
  name       = "db-subnet-group"
  subnet_ids = [aws_subnet.private_subnet.id]

  tags = {
    Name = "RDS Subnet Group"
  }
}

resource "aws_ecs_cluster" "ecs_cluster" {
  name = "nestjs-ecs-cluster"
}

resource "aws_ecs_task_definition" "task_definition" {
  family                   = "nestjs-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name = "nestjs-container"
      image = "123456789012.dkr.ecr.us-east-1.amazonaws.com/nestjs-image:latest"
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
      environment = [
        {
          name  = "DATABASE_URL"
          value = "postgresql://${aws_db_instance.nestjs_rds.username}:${aws_db_instance.nestjs_rds.password}@${aws_db_instance.nestjs_rds.endpoint}/${aws_db_instance.nestjs_rds.db_name}"
        }
      ]
    }
  ])
}

resource "aws_lb" "ecs_alb" {
  name               = "ecs-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.ecs_security_group.id]
  subnets            = [aws_subnet.public_subnet.id]

  enable_deletion_protection = false
}

resource "aws_lb_listener" "alb_listener" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.ecs_target_group.arn
  }
}

resource "aws_lb_target_group" "ecs_target_group" {
  name        = "ecs-target-group"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main_vpc.id
  target_type = "ip"
}

resource "aws_ecs_service" "ecs_service" {
  name            = "nestjs-service"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.task_definition.arn
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_subnet.public_subnet.id]
    security_groups = [aws_security_group.ecs_security_group.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.ecs_target_group.arn
    container_name   = "nestjs-container"
    container_port   = 80
  }

  desired_count = 1
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.ecs_cluster.name
}

output "rds_endpoint" {
  value = aws_db_instance.nestjs_rds.endpoint
}

output "alb_dns" {
  value = aws_lb.ecs_alb.dns_name
}
