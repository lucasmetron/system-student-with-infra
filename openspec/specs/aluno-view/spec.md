# aluno-view Specification

## Purpose
Fornece a interface visual completa para matrícula de estudantes, monitoramento de metas e consulta rápida de ingressantes recentes.
## Requirements
### Requirement: Exibição de KPIs e Formulário de Alunos
O sistema DEVE renderizar os 4 cards de KPIs com dados dinâmicos da API e o formulário em quatro seções: Dados Pessoais, Informações de Matrícula, Responsável Legal e Endereço Residencial.

#### Scenario: Envio do formulário de matrícula
- **WHEN** o usuário preenche os campos obrigatórios e clica em "Concluir Matrícula"
- **THEN** o sistema SHALL enviar os dados à API, exibir feedback de sucesso, limpar o formulário e atualizar a lista de últimos cadastrados.

### Requirement: Painel Lateral de Últimos Cadastrados
O sistema DEVE apresentar a lista dos estudantes recém-matriculados com suporte a filtro rápido por série e campo de busca local.

#### Scenario: Filtragem na lista lateral
- **WHEN** o usuário seleciona a série "1º Ano EM" no filtro lateral
- **THEN** o sistema SHALL filtrar a lista exibida instantaneamente.

