## Purpose

Permite cadastrar docentes, gerenciar suas titulações, departamentos, cargas horárias e atribuir disciplinas e turmas vinculadas.

## ADDED Requirements

### Requirement: Cadastro de Professor com Vínculos
O sistema DEVE permitir cadastrar um professor com seus dados de identificação, formação acadêmica, regime de trabalho, departamento, turmas vinculadas e matérias lecionadas.

#### Scenario: Cadastro bem-sucedido de professor
- **WHEN** o cliente envia uma requisição POST para `/api/professores` com nome, RF, CPF, e-mail institucional, grau de formação, departamento e turmas
- **THEN** o sistema SHALL registrar o docente no banco de dados e retornar status 201 com os dados persistidos.

#### Scenario: Validação de duplicidade de Registro Funcional (RF)
- **WHEN** o cliente envia uma requisição POST para `/api/professores` com um RF já existente
- **THEN** o sistema SHALL recusar a requisição e retornar status 409 indicando conflito.

### Requirement: Listagem Paginada e Filtrada de Professores
O sistema DEVE listar os professores com suporte a filtro por departamento e paginação.

#### Scenario: Listagem por departamento
- **WHEN** o cliente envia uma requisição GET para `/api/professores?departamento=exatas`
- **THEN** o sistema SHALL retornar status 200 com a lista de docentes pertencentes ao departamento informado.

### Requirement: Indicadores e Métricas de Professores (KPIs)
O sistema DEVE fornecer um endpoint com os indicadores consolidados do corpo docente.

#### Scenario: Obtenção de métricas docentes
- **WHEN** o cliente envia uma requisição GET para `/api/professores/kpis`
- **THEN** o sistema SHALL retornar status 200 contendo total de docentes ativos, média de carga horária semanal, total de departamentos distintos, total em afastamento/licença e distribuição percentual por titulação acadêmica.
