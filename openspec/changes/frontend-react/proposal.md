## Why

Para disponibilizar aos usuários a experiência projetada na pasta `layout`, é necessário construir uma Single Page Application (SPA) em React moderna, performática e modular, consumindo os endpoints fornecidos pelo backend em Node.js e seguindo fielmente as diretrizes do design system `Academic Clarity`.

## What Changes

- Criação da aplicação React (com Vite e TailwindCSS configurado com as cores e tokens do `DESIGN.md`).
- Implementação dos componentes base do Design System (Botões, Inputs, Selects, KPI Cards, Status Pills, Modais e Tabelas).
- Construção do Layout Shell compartilhado (Sidebar fixa com navegação e logo EducaCore SVG, Header com busca global e perfil).
- Implementação da página de Cadastro de Alunos (`/alunos`).
- Implementação da página de Cadastro de Professores (`/professores`).
- Implementação da página de Cadastro de Matérias (`/materias`).
- Configuração de cliente HTTP (fetch ou axios) com serviço centralizado apontando para a API configurável via `VITE_API_URL`.

## Capabilities

### New Capabilities
- `ui-shell`: Estrutura de navegação fixa, cabeçalho responsivo, tema corporativo e roteamento.
- `aluno-view`: Interface de gestão e matrícula de estudantes com KPIs e formulário multi-seção.
- `professor-view`: Interface de gestão do corpo docente com distribuição de titulações e listagem paginada.
- `materia-view`: Interface da matriz curricular com distribuição por áreas e cards de disciplinas.

### Modified Capabilities

## Impact

- Todo o código do frontend ficará isolado em `frontend/`.
- Permite execução independente em desenvolvimento (`npm run dev`) ou em contêiner Nginx para produção.
