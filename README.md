<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

### Passos para rodar o projeto

1. **Atualizar as Credenciais AWS**  
   Atualize as credenciais no arquivo localizado em `~/.aws/credentials` com as fornecidas no seu AWS Lab:

   ```ini
   [default]
   aws_access_key_id = SUA_AWS_ACCESS_KEY_ID
   aws_secret_access_key = SUA_AWS_SECRET_ACCESS_KEY
   aws_session_token = SEU_AWS_SESSION_TOKEN
   ```

2. **Inicializar e Aplicar o Terraform**  
   Navegue até a pasta `terraform` e execute os seguintes comandos:

   ```bash
   # Inicializar o Terraform
   terraform init

   # Aplicar o Terraform (pode levar alguns minutos para criar o banco de dados)
   terraform apply
   ```

3. **Obter a URL do Banco de Dados**  
   Após a criação dos recursos, use o seguinte comando para obter a URL do banco de dados:

   ```bash
   terraform output database_url
   ```

4. **Atualizar o `.env`**  
   No diretório do projeto, atualize o arquivo `.env` com a `DATABASE_URL` obtida no passo anterior. Certifique-se de que ele fique parecido com:

   ```env
   DATABASE_URL=postgresql://usuario:senha@endereco-do-banco:5432/nome-do-banco
   ```

5. **Aplicar as Migrações Prisma**  
   Execute o seguinte comando para aplicar as migrações ao banco de dados:

   ```bash
   npx prisma migrate deploy
   ```

### Configurar o CI/CD

Para que a pipeline de CI/CD seja executada corretamente, é necessário adicionar os seguintes *secrets* no repositório do GitHub:

- **`AWS_ACCESS_KEY_ID`**: Chave de acesso AWS.
- **`AWS_SECRET_ACCESS_KEY`**: Chave secreta de acesso AWS.
- **`AWS_SESSION_TOKEN`**: Token de sessão AWS.
- **`AWS_ROLE`**: Função IAM utilizada pelo pipeline.
- **`DATABASE_URL`**: URL do banco de dados, obtida no passo 3.

Após adicionar esses *secrets*, o repositório estará configurado para utilizar a pipeline de CI/CD e funcionar automaticamente. 🚀