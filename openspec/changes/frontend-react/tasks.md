## 1. Inicialização e Configuração

- [ ] 1.1 Inicializar projeto React com Vite em `frontend/` e instalar dependências (`react-router-dom`, `tailwindcss`, `postcss`, `autoprefixer`).
- [ ] 1.2 Configurar `tailwind.config.js` com as fontes (Plus Jakarta Sans, Inter) e a paleta de cores completa de `layout/academic_clarity/DESIGN.md`.
- [ ] 1.3 Configurar `index.html` com os links de Google Fonts e Google Material Symbols Outlined.

## 2. Componentes Base e Layout Shell

- [ ] 2.1 Criar cliente de API em `src/services/api.js` para integração com o backend.
- [ ] 2.2 Implementar o componente `Sidebar` com logotipo EducaCore SVG e links de navegação ativos.
- [ ] 2.3 Implementar o componente `Header` com campo de busca global, sinalizador de ano letivo e dados de perfil do usuário.
- [ ] 2.4 Criar componentes genéricos (`KpiCard`, `Button`, `Input`, `Select`, `StatusPill`).

## 3. Páginas da Aplicação

- [ ] 3.1 Implementar a página de Alunos (`src/pages/AlunosPage.jsx`) com formulário em 4 seções, KPIs e lista lateral de últimos cadastrados.
- [ ] 3.2 Implementar a página de Professores (`src/pages/ProfessoresPage.jsx`) com formulário, seleção de chips/turmas, gráfico de titulação e tabela com paginação.
- [ ] 3.3 Implementar a página de Matérias (`src/pages/MateriasPage.jsx`) com formulário, ementa, gráfico de distribuição e grade de cards filtrável por área.
- [ ] 3.4 Configurar as rotas no `App.jsx` e testar integração completa com a API.
