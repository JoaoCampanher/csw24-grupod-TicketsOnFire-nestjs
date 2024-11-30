# Projeto NestJS com Deploy AWS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Instruções para Configuração e Deploy

Este projeto utiliza **Terraform** para provisionar os recursos na AWS e uma pipeline de **CI/CD** para construir e publicar a imagem Docker no **Amazon ECR**.

---

### Passos para Configuração

1. **Adicionar Secrets ao Repositório do GitHub**  
   Antes de executar a pipeline, adicione os seguintes _secrets_ no repositório do GitHub para configurar o CI/CD:

   - **`AWS_ACCESS_KEY_ID`**: Sua chave de acesso AWS.
   - **`AWS_ACCOUNT_ID`**: O ID da sua conta AWS.
   - **`AWS_SECRET_ACCESS_KEY`**: A chave secreta de acesso AWS.
   - **`AWS_SESSION_TOKEN`**: O token de sessão AWS.

2. **Atualizar dados no Terraform**  
   No arquivo **Terraform**, localize a definição de `container_definitions` no recurso `aws_ecs_task_definition`. Atualize o campo `image` com a URL correta do repositório ECR no seguinte formato:

   ```json
   "image": "<AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/nestjs-api"
   ```

   Em seguida, atualize o valor de `execution_role_arn` no mesmo recurso, para uma role válida para o usuário, por exemplo:

   ```json
   "execution_role_ar": "arn:aws:iam::<AWS_ACCOUNT_ID>:role/LabRole"
   ```

3. **Executar a Pipeline do GitHub Actions**  
   Após configurar os _secrets_ e atualizar o Terraform, faça um _push_ para a branch `main` do repositório. Isso acionará automaticamente a pipeline de **CI/CD**, que:

   - Constrói a imagem Docker.
   - Publica a imagem no **Amazon ECR**.

   **Nota**: Certifique-se de que o processo foi concluído antes de seguir para o próximo passo.

4. **Configurar e Executar o Terraform**  
   Navegue até a pasta `terraform` do projeto e execute os seguintes comandos:

   ```bash
   # Inicializar o Terraform
   terraform init

   # Aplicar o Terraform
   terraform apply
   ```

   **Observação**: Esse processo pode levar até **10 minutos** para criar todos os recursos na AWS, incluindo o banco de dados, ALB, ECS, e mais.

5. **Aguardar a Configuração Completa na AWS**  
   Após o Terraform finalizar, a **AWS pode levar mais alguns minutos** para provisionar completamente as tasks no ECS. Durante esse tempo, o serviço pode não estar acessível. Aguarde até que as tasks sejam criadas corretamente.

6. **Obter a URL do Load Balancer**  
   Após o término do processo de criação das tasks, execute o comando abaixo para obter a URL do ALB (Application Load Balancer):

   ```bash
   terraform output alb_dns
   ```

7. **Acessar o Swagger**  
   Acesse a URL exibida com a porta **3000** e o caminho `/api` para visualizar e interagir com a API Swagger:

   ```
   http://<ALB_URL>:3000/api
   ```

   Este será o endpoint da sua aplicação rodando diretamente no ECS com um banco de dados novo.

---

## Sobre a Pipeline de CI/CD

A pipeline de CI/CD no GitHub Actions realiza os seguintes passos:

- Constrói a imagem Docker.
- Publica a imagem no **Amazon ECR**.
- Atualiza o serviço ECS para usar a nova imagem.

Certifique-se de que os _secrets_ foram configurados antes de realizar um _push_ para a branch `main`, e que o campo `image` no Terraform contém a URL correta do ECR.

---

### Tudo pronto! 🚀

Agora você pode usar a aplicação com um banco de dados novo provisionado pela AWS, tudo gerenciado de forma automática. Apenas lembre-se de aguardar o tempo necessário para que todos os recursos na AWS sejam completamente criados.
