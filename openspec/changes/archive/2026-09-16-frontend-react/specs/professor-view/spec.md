## Purpose

Fornece a interface visual de gestão docente, permitindo alocar disciplinas e turmas, visualizar a composição acadêmica e gerenciar o corpo docente em tabela interativa.

## ADDED Requirements

### Requirement: Formulário Docente com Seleção de Chips e Turmas
O sistema DEVE permitir preencher os dados cadastrais do docente, selecionar chips de matérias lecionadas e marcar caixas de turmas vinculadas.

#### Scenario: Seleção de disciplinas
- **WHEN** o usuário clica em um chip de disciplina disponível
- **THEN** o chip SHALL alternar seu estado visual para selecionado e incluir a disciplina na lista de envio.

### Requirement: Tabela Paginada de Professores
O sistema DEVE exibir a lista de professores com foto/avatar, RF, disciplinas atribuídas, carga semanal e status, permitindo paginação e filtro por departamento.

#### Scenario: Filtro por departamento docente
- **WHEN** o usuário seleciona "Ciências Exatas" no seletor de departamento
- **THEN** o sistema SHALL recarregar a tabela exibindo somente professores desse departamento.
