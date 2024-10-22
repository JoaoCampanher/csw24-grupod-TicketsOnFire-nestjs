provider "aws" {
  region = "us-east-1"
  access_key = ""
  secret_key = ""
  token      = ""
}

resource "aws_instance" "nest_ec2" {
  ami           = "ami-0866a3c8686eaeeba" 
  instance_type = "t2.micro"
  key_name      = aws_key_pair.nest_key.key_name

  vpc_security_group_ids = [aws_security_group.nest_security_group.id]

  tags = {
    Name = "NestJS-API"
  }

  user_data = <<-EOF
    #!/bin/bash
    sudo apt-get update -y
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common git
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo apt-get update -y
    sudo apt-get install -y docker-ce
    sudo usermod -aG docker ubuntu
    sudo systemctl enable docker
    sudo systemctl start docker
  EOF
}

resource "aws_security_group" "nest_security_group" {
  name        = "nest-security-group"
  description = "Permitir acessos para a API NestJS"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "pg port"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Prisma Studio"
    from_port   = 5555
    to_port     = 5555
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

resource "tls_private_key" "nest_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "nest_key" {
  key_name   = "nest-ec2-key"
  public_key = tls_private_key.nest_key.public_key_openssh
}

output "private_key_pem" {
  value     = tls_private_key.nest_key.private_key_pem
  sensitive = true
}
