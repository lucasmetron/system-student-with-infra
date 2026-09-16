## Context

O projeto atualmente está vazio na pasta `backend/`. O sistema atende à interface definida na pasta `layout/` e deve funcionar de forma autônoma para permitir fácil empacotamento em Docker e implantação via Terraform.

## Goals / Non-Goals

**Goals:**
- Criar uma API RESTful em Node.js (Express) com código limpo e modular.
- Utilizar SQLite via `better-sqlite3` (síncrono, performático e sem necessidade de daemon externo).
- Implementar um schema relacional normalizado cobrindo: `alunos`, `professores`, `materias`, `professor_turmas` e `professor_materias`.
- Fornecer scripts de setup e seed inicial preenchendo os dados idênticos aos visualizados nos layouts (ex: Dra. Helena Vasconcelos, Prof. Ricardo Albuquerque, etc.).
- Prover endpoints de métricas computadas sob demanda (`/api/alunos/kpis`, `/api/professores/kpis`, `/api/materias/kpis`).

**Non-Goals:**
- Não incluir autenticação com OAuth complexo neste momento (pode ser mockada ou adicionada em mudanças futuras, priorizando o fluxo de DevOps inicial).
- Não utilizar ORMs pesados ou complexos para manter o build do Docker leve e rápido.

## Decisions

### Decisão 1: Express + better-sqlite3
- *Escolha*: Express com `better-sqlite3`.
- *Alternativas consideradas*: Fastify com Prisma ou Sequelize com PostgreSQL.
- *Justificativa*: `better-sqlite3` é extremamente rápido, trabalha com SQLite diretamente em um arquivo, sem conexões de rede pendentes, simplificando imensamente testes locais e volumes em contêineres Docker.

### Decisão 2: Estrutura Modular por Domínio / Recurso
- *Estrutura de diretórios*:
  ```
  backend/
  ├── package.json
  ├── src/
  │   ├── app.js
  │   ├── server.js
  │   ├── db/
  │   │   ├── connection.js
  │   │   ├── schema.sql
  │   │   └── seed.js
  │   ├── routes/
  │   │   ├── alunos.routes.js
  │   │   ├── professores.routes.js
  │   │   ├── materias.routes.js
  │   │   └── search.routes.js
  │   └── controllers/
  ```
- *Justificativa*: Facilita manutenção, testes e separação de responsabilidades.

## Risks / Trade-offs

- [Concorrência em SQLite no Docker] → SQLite suporta múltiplos leitores e trava apenas na escrita. Como a escala educacional deste laboratório é de baixa a média concorrência, o modo WAL (`journal_mode = WAL`) resolve a contenção com folga.
- [Persistência de dados em contêiner] → O arquivo `.sqlite` precisa residir em um diretório montado em volume (ex: `./data` mapeado no Docker).
