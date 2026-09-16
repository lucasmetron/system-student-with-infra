## Purpose

Define a composição, rede, persistência de dados e ordem de inicialização dos contêineres do sistema EducaCore através do Docker Compose.

## ADDED Requirements

### Requirement: Orquestração Unificada com Docker Compose
O sistema DEVE prover um arquivo `docker-compose.yml` que sobe conjuntamente o backend e o frontend, criando uma rede interna compartilhada e garantindo persistência do banco de dados SQLite através de volume.

#### Scenario: Execução completa com docker compose up
- **WHEN** o usuário executa `docker compose up -d` na raiz do projeto
- **THEN** ambos os serviços SHALL iniciar em estado saudável, o frontend acessível na porta configurada (ex: `80` ou `3000`), a API respondendo e os dados do SQLite persistidos mesmo após reinício do contêiner.
