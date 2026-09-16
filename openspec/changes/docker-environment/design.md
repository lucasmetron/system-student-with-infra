## Context

Com o backend (Node + SQLite) e o frontend (React) estruturados, a etapa de DevOps requer padronização da execução dos serviços em contêineres Docker, fornecendo a base para o provisionamento no Terraform e para a automação no CI/CD.

## Goals / Non-Goals

**Goals:**
- Configurar build multi-stage no frontend para garantir imagens leves (menores que 30MB com Nginx Alpine).
- Configurar imagem Node slim/alpine no backend com volume dedicado para o arquivo do banco de dados SQLite.
- Configurar proxy reverso no Nginx do frontend para evitar problemas de CORS em produção e permitir acesso em porta única.
- Orquestrar com `docker-compose.yml`.

**Non-Goals:**
- Não configurar Kubernetes neste momento (Docker Compose atende plenamente ao escopo de containerização local antes da nuvem/Terraform).

## Decisions

### Decisão 1: Multi-Stage Build para o Frontend
- *Escolha*: Estágio 1 `node:20-alpine` compilando com `npm run build`, Estágio 2 copiando `dist/` para `nginx:alpine`.
- *Justificativa*: Remove todo o Node.js e `node_modules` da imagem de produção, reduzindo consumo de memória e superfícies de vulnerabilidade.

### Decisão 2: Volume Local para Banco SQLite
- *Escolha*: Mapear `./backend/data:/app/data` no serviço do backend.
- *Justificativa*: Garante que os registros cadastrados persistam entre `docker compose down` e `docker compose up`.

## Risks / Trade-offs

- [Permissões de escrita do SQLite no volume do contêiner] → O diretório `data/` deve possuir permissão adequada de leitura/escrita para o usuário da imagem Docker.
