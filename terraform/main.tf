provider "aws" {
  region = "us-east-1"
  access_key = "ASIA23OPNELMSCOSBUAZ"
  secret_key = "APEhI1rTen8DrBW6UPT7gdGf+ulDaPNa7OZo+8h5"
  token      = "IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJGMEQCIA2OIQqcYSubiSS4EGR0YkgwLCuHIn8BK6O+K9td2cHJAiBEkcC6f5uyMUhnwVy/cYyKT+hEEJabu1bhFp49t6ZlbirBAgia//////////8BEAAaDDc0NjE0ODY2ODEyMSIMyW03zjCOm+utXOpXKpUCZNbaX1xjz+lfnOsS/J+hULGRFCpvIHWnjia0UhYX8hNfU6+oZMrB5R7/drsvhH9pnKUSTwZq33sMsCErVUfazOmpnf2it/sDn5oTdfxmhggvi1tCLsCagPqR2tTRyzY6KsJSdx/6ES4D4+Jdp332j8Rp3N6lH39HbKui18l4C1AJ4os98eCJKGihzq1/K3Tn7zbCibLkzzf8tEpZi7vTb3szzw3/7RfGPP7MbREpO6cOPOmW84bKRRR+5cUBzXvUzMlndlDJKuIOgLw4RsnQ2XPZ0hSrwrYYC13zYno1/7YaJfhwKPBW9kY6vvixZYRYFyd68NKLfRZEdUEaNCAlVb9ni32Xt49RNAI9HLvgsr6sh6RbZDDJ+9u4BjqeAVK2LOvIse+r5HyIQ2LK5o3v+m3Hd9vgHdPUu7rgAMEIGz+WyMzxFZkXcEPqrOAg5vGbXJTY+THNRpMhLN+aG6G+J4DajaR2utpiRf5QNMq/qhnRXvSS2uiIu0a+Z7A7k/6RXE6navW+MLvUJWnnzUeFZPJKgZUPXuYwb2rlO4LQSWWBZfj/v252zHNWOk9Xjeze8m27EuGlOF1QImtP"
}

resource "aws_instance" "nest_ec2" {
  ami           = "ami-0866a3c8686eaeeba" # Pode ser ajustado dependendo da região
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

    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose

    git clone https://github.com/JoaoCampanher/csw24-grupod-TicketsOnFire-nestjs.git /home/ubuntu/nest-api
    cd /home/ubuntu/nest-api
    docker-compose up -d
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
