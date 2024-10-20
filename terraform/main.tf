provider "aws" {
  region = "us-east-1"
  access_key = "ASIA23OPNELMS2EAYV6T"
  secret_key = "mwSMg7WrGmoVyhYarTRPEZLIiTggZM+sV7eW0WvP"
  token      = "IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJHMEUCIQCeII5ed9ALsJ5zyS6bDFHrKQrXO0igmsKNC0b6HsdNogIgZcfKmqSnpnWBCHegoT2MZu0KLHm6eiO2Ob9laulihA0quAIIfBAAGgw3NDYxNDg2NjgxMjEiDERhEtqCrC80IdaXvyqVAt7/IEW7QR1ecDlulVVdS6jOFY9nmxT+HYY1GvwWHLliy0az97mpcpGijV8HiIpReIXhxiuR1dwGcu8xfNqgzixHMbxwb3Vk8BRiDg5RqoPebRjT9ideCd1+vDK6r0UDuMNYXwQtzIpolvOIfTWNo4serKQclCgRY/VdnqQbyMKZsQWGWSj7RqZGbV+tb4rHiRhiGxgZVi0p7h4Q4KaqlLC8vi6UeBgrkW5L08ODFY0P/c/HyIB1UNunXqgykHlAze4LzA+h99Ry713edEwlhhrf/Aiu8aQYT9B/b5U8S/EL8P4CxNtrhTAENBp4iMsPAi5MTjVV+LBo25MP/vIe1Bn7A32iTbhS8XzBTLiKcOoJFx0eO+swuZ/VuAY6nQEKo05tk3NLG0FE8LsjOl3DDxzGEZGNNK6W+G51WKnnVm887Jr8tDJOK1setFtVzr9fQreQC7WwC0Zp787gjcAtRivrrpHZXuZsXtybDzm7A+NrS6TdtozzZhNtc0p2hhEQ4LAAIEsdrpZA3vrTb3RZyQCi9Kn/Z6L6Qn7uh2zjkFxng7FY6DtW0jVSTicLKBiTa5h4hZ+FBqXe0yBM"
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

    sudo curl -L "https://henriqDLs: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@github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose

    git clone https://henriqDLs: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@github.com/JoaoCampanher/csw24-grupod-TicketsOnFire-nestjs.git /home/ubuntu/nest-api
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
