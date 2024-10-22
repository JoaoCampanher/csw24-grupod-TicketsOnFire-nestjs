<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

### Passos para rodar o projeto

Primeiramente, inicialize o AWS Lab e altere o arquivo `main.tf` substituindo as credenciais pelas fornecidas no seu lab.

```hcl
provider "aws" {
  region = "us-east-1"

  # Alterar access_key para sua aws_access_key_id
  access_key = "SUA_AWS_ACCESS_KEY_ID"

  # Alterar secret_key para sua aws_secret_access_key
  secret_key = "SUA_AWS_SECRET_ACCESS_KEY"

  # Alterar token para seu aws_session_token
  token      = "SEU_AWS_SESSION_TOKEN"
}
```

Após isso, basta rodar o `terraform apply`

```bash
# Inicializar o terraform
terraform init

# Aplicar o terraform
terraform apply
```

Agora, já dentro do EC2 criado pelo terraform, rode os seguintes comandos:

```bash
# Inicializar o docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clonar o repositório dentro da EC2
git clone https://github.com/JoaoCampanher/csw24-grupod-TicketsOnFire-nestjs.git /home/ubuntu/nest-api
cd /home/ubuntu/nest-api

# Inicializar a API com o compose
docker compose up -d
```

Por fim, basta pegar o ip público da sua EC2 e acessar a API na url `ipPublico:3000/api`
