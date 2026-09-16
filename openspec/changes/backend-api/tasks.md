## 1. Inicialização e Estrutura

- [ ] 1.1 Criar o `package.json` em `backend/` com scripts (`start`, `dev`, `seed`, `test`) e dependências (`express`, `better-sqlite3`, `cors`, `dotenv`).
- [ ] 1.2 Configurar o módulo de conexão com SQLite com ativação do modo WAL e diretório de banco flexível (`backend/src/db/connection.js`).
- [ ] 1.3 Criar o arquivo `schema.sql` definindo as tabelas `alunos`, `professores`, `materias`, `professor_turmas` e `professor_materias`.
- [ ] 1.4 Criar o script `seed.js` para popular o banco de dados com os dados de exemplo exibidos nos layouts.

## 2. Implementação das Rotas e Controladores

- [ ] 2.1 Implementar endpoints de Alunos (`GET /api/alunos`, `POST /api/alunos`, `GET /api/alunos/kpis`, `GET /api/alunos/:id`).
- [ ] 2.2 Implementar endpoints de Professores (`GET /api/professores`, `POST /api/professores`, `GET /api/professores/kpis`, `GET /api/professores/:id`).
- [ ] 2.3 Implementar endpoints de Matérias (`GET /api/materias`, `POST /api/materias`, `GET /api/materias/kpis`, `GET /api/materias/:id`).
- [ ] 2.4 Implementar endpoint de busca global (`GET /api/search?q=`).

## 3. Servidor e Validação

- [ ] 3.1 Montar aplicação Express (`app.js`) com middlewares de CORS, JSON parser e manipulador de erros global.
- [ ] 3.2 Criar ponto de entrada `server.js` na porta 3001 (ou configurada via `PORT`).
- [ ] 3.3 Testar execução e requisições HTTP locais para garantir que todos os endpoints e KPIs retornam dados válidos.
