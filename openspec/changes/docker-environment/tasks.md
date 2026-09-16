## 1. Dockerfile do Backend

- [ ] 1.1 Criar `.dockerignore` em `backend/` ignorando `node_modules`, `.env`, logs e arquivos temporários.
- [ ] 1.2 Criar `backend/Dockerfile` configurando ambiente Node, instalação de dependências, geração de seed automático e inicialização do serviço.

## 2. Dockerfile e Configuração do Frontend

- [ ] 2.1 Criar `.dockerignore` em `frontend/` ignorando `node_modules` e `dist`.
- [ ] 2.2 Criar `frontend/nginx.conf` configurando servidor HTTP, fallback para SPA e proxy reverso para `/api` direcionado ao backend.
- [ ] 2.3 Criar `frontend/Dockerfile` com build multi-stage (builder Node.js e runtime Nginx Alpine).

## 3. Orquestração com Docker Compose

- [ ] 3.1 Criar `docker-compose.yml` na raiz declarando serviços `backend` e `frontend`, rede interna e mapeamento de portas e volumes.
- [ ] 3.2 Testar build e execução com `docker compose up --build` validando a integração entre os contêineres e a persistência do SQLite.
