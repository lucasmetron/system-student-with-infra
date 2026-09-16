# materia-management Specification

## Purpose
Permite cadastrar disciplinas curriculares, ementas, cargas horárias, categorias formativas (BNCC vs Eletivas) e alocar professores responsáveis e salas de aula.
## Requirements
### Requirement: Cadastro de Disciplina
O sistema DEVE permitir o registro de uma disciplina contendo nome, código único, categoria, carga horária semanal e anual, série/ano, ementa, sala padrão e identificador do professor responsável.

#### Scenario: Cadastro bem-sucedido de matéria
- **WHEN** o cliente envia uma requisição POST para `/api/materias` com dados válidos e código único (ex: `MAT-101`)
- **THEN** o sistema SHALL salvar a disciplina no banco e retornar status 201 com o recurso criado.

#### Scenario: Código de matéria já existente
- **WHEN** o cliente envia uma requisição POST para `/api/materias` com um código de matéria já cadastrado
- **THEN** o sistema SHALL retornar status 409 com mensagem de conflito.

### Requirement: Consulta de Matérias por Área do Conhecimento
O sistema DEVE permitir a listagem das matérias com filtro por categoria/área (todas, exatas, humanas, linguagens, biológicas).

#### Scenario: Filtro por área do conhecimento
- **WHEN** o cliente envia uma requisição GET para `/api/materias?area=exatas`
- **THEN** o sistema SHALL retornar status 200 contendo apenas as disciplinas da área especificada, incluindo os dados resumidos do professor responsável.

### Requirement: Indicadores Curriculares (KPIs)
O sistema DEVE calcular e expor os dados consolidados da matriz curricular.

#### Scenario: Obtenção de métricas de matérias
- **WHEN** o cliente envia uma requisição GET para `/api/materias/kpis`
- **THEN** o sistema SHALL retornar status 200 com total de disciplinas ativas, soma de carga horária anual, contagem de matérias obrigatórias (BNCC), eletivas/oficinas e distribuição percentual por área.

