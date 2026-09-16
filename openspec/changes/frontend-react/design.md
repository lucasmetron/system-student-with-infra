## Context

O frontend será desenvolvido na pasta `frontend/`, implementando as três páginas contidas na pasta `layout/`:
1. `cadastro_de_alunos`
2. `cadastro_de_professores`
3. `cadastro_de_mat_rias`

## Goals / Non-Goals

**Goals:**
- Utilizar Vite com React e TailwindCSS.
- Importar as fontes `Plus Jakarta Sans` e `Inter` do Google Fonts, além de ícones do Google `Material Symbols Outlined`.
- Configurar a paleta de cores exata de `academic_clarity/DESIGN.md` nas variáveis do Tailwind.
- Componentizar partes reutilizáveis: `Sidebar`, `Header`, `KpiCard`, `Badge`, `Button`, `Input`.
- Prover um cliente de API (`src/services/api.js`) com fallback gracioso para mock caso o backend esteja iniciando.

**Non-Goals:**
- Não adicionar bibliotecas de componentes externas pesadas (como MUI ou AntD) para manter fidelidade aos estilos personalizados do `code.html` e manter o bundle enxuto.

## Decisions

### Decisão 1: React Router DOM
- *Escolha*: `react-router-dom` para navegação entre `/alunos`, `/professores` e `/materias`.
- *Justificativa*: Padrão de mercado para SPAs React, com fácil configuração de rotas e transições.

### Decisão 2: Tailwind com Tokens Personalizados
- *Escolha*: Extensão do `tailwind.config.js` com o mapa de cores exato do `DESIGN.md` (`primary: #004ac6`, `primary-container: #2563eb`, `surface: #f8f9ff`, etc.).
- *Justificativa*: Garante fidelidade pixel-perfect com o código HTML dos protótipos da pasta `layout`.

## Risks / Trade-offs

- [Variabilidade de URL da API em produção] → Utilização de `import.meta.env.VITE_API_URL || '/api'`, permitindo tanto desenvolvimento local direto quanto proxy reverso no Nginx (Docker).
