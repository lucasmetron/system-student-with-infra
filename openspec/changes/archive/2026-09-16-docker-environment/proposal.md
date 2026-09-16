## Why

Para consolidar as práticas de DevOps e permitir que a aplicação execute de forma idêntica em qualquer ambiente (desenvolvimento local, pipeline de CI/CD ou servidor provisionado via Terraform), é necessário containerizar tanto o frontend quanto o backend e orquestrá-los com o Docker Compose.

## What Changes

- Criação de `backend/Dockerfile` utilizando imagem leve do Node (`node:20-alpine` ou `slim`) com suporte a compilação de módulos nativos do SQLite e volume para persistência do banco.
- Criação de `frontend/Dockerfile` com build multi-stage (estágio de build com Node e estágio de execução com Nginx Alpine servindo os arquivos estáticos e realizando proxy reverso para `/api`).
- Criação de `frontend/nginx.conf` com suporte a roteamento SPA (`try_files $uri $uri/ /index.html`) e encaminhamento para o serviço de backend.
- Criação do `docker-compose.yml` na raiz do projeto integrando os serviços `frontend` e `backend`, mapeamento de portas (`80:80` ou `3000:80` e `3001:3001`), volume para `./backend/data` e healthchecks.
- Criação de `.dockerignore` em ambas as pastas para otimizar tempo de build e tamanho das imagens.

## Capabilities

### New Capabilities
- `containerization`: Criação dos Dockerfiles para backend e frontend com configurações de build enxutas e seguras.
- `orchestration`: Composição dos contêineres, redes e volumes através do Docker Compose para inicialização em comando único.

### Modified Capabilities

## Impact

- Arquivos `Dockerfile` em `backend/` e `frontend/`.
- Arquivo `docker-compose.yml` na raiz do repositório.
- A aplicação poderá ser iniciada com `docker compose up --build`, pronta para ser empacotada em pipelines CI/CD e implantada via Terraform.
