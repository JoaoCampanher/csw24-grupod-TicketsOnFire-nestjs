provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "rds_security_group" {
  name        = "rds-security-group"
  description = "Allow database access"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] 
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
  publicly_accessible     = true
  skip_final_snapshot     = true

  tags = {
    Name = "NestJS RDS Database"
  }
}

output "db_endpoint" {
  value = aws_db_instance.nestjs_rds.endpoint
}

output "db_username" {
  value = aws_db_instance.nestjs_rds.username
}

output "db_name" {
  value = aws_db_instance.nestjs_rds.db_name
}

output "db_password" {
  value     = aws_db_instance.nestjs_rds.password
  sensitive = true
}

output "database_url" {
  description = "PostgreSQL connection URL for Prisma"
  value       = "postgresql://${aws_db_instance.nestjs_rds.username}:${aws_db_instance.nestjs_rds.password}@${aws_db_instance.nestjs_rds.endpoint}/${aws_db_instance.nestjs_rds.db_name}"
  sensitive   = true
}
