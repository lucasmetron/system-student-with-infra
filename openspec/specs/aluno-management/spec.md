# aluno-management Specification

## Purpose
Permite cadastrar, listar, filtrar e obter indicadores estatísticos consolidados sobre os estudantes matriculados na instituição de ensino.
## Requirements
### Requirement: Cadastro de Aluno com Geração de Matrícula
O sistema DEVE permitir o cadastro de um novo aluno com dados pessoais, de matrícula, do responsável legal e endereço residencial, gerando automaticamente um código de matrícula caso não seja fornecido.

#### Scenario: Cadastro bem-sucedido de aluno
- **WHEN** o cliente envia uma requisição POST para `/api/alunos` com campos obrigatórios preenchidos (nome, cpf, data_nascimento, serie_turma, responsavel_nome, responsavel_telefone, responsavel_email)
- **THEN** o sistema SHALL salvar o aluno no banco SQLite e retornar status 201 com o objeto do aluno cadastrado incluindo o identificador e número de matrícula gerado.

#### Scenario: Validação de duplicidade de CPF
- **WHEN** o cliente envia uma requisição POST para `/api/alunos` com um CPF já existente no banco de dados
- **THEN** o sistema SHALL recusar a operação e retornar status 409 com mensagem de erro explicativa.

### Requirement: Listagem e Filtro de Alunos
O sistema DEVE permitir a consulta de alunos cadastrados com suporte a busca textual por nome/matrícula e filtro por série/turma.

#### Scenario: Consulta filtrada por termo de busca
- **WHEN** o cliente envia uma requisição GET para `/api/alunos?q=Beatriz`
- **THEN** o sistema SHALL retornar status 200 com a lista de alunos cujo nome ou matrícula contenham o termo pesquisado.

### Requirement: Indicadores e Métricas de Alunos (KPIs)
O sistema DEVE fornecer um endpoint com o resumo estatístico para alimentação dos cards do dashboard.

#### Scenario: Obtenção de métricas de alunos
- **WHEN** o cliente envia uma requisição GET para `/api/alunos/kpis`
- **THEN** o sistema SHALL retornar status 200 contendo contagem total de matriculados, novos matriculados no mês corrente, quantidade com documentação pendente e total de turmas ativas.

