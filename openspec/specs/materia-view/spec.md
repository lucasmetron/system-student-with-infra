# materia-view Specification

## Purpose
Fornece a interface visual de estruturação da matriz curricular, ementas, cargas horárias e visualização em grade de cartões por área do conhecimento.
## Requirements
### Requirement: Formulário de Matéria com Seleção de Professor
O sistema DEVE permitir registrar novas disciplinas vinculando-as dinamicamente a um professor responsável cadastrado no sistema.

#### Scenario: Submissão de nova matéria
- **WHEN** o usuário informa o nome, código, ementa, seleciona o professor coordenador e clica em "Salvar Matéria"
- **THEN** o sistema SHALL enviar os dados para a API e atualizar imediatamente os cards da grade curricular.

### Requirement: Catálogo em Cards por Área
O sistema DEVE agrupar e exibir as disciplinas em cartões modernos com badges de categoria, carga semanal, carga anual e atalhos de filtro por área (Todas, Exatas, Humanas, Linguagens, Biológicas).

#### Scenario: Filtro por área de conhecimento
- **WHEN** o usuário clica no botão "Humanas" nos filtros rápidos
- **THEN** o sistema SHALL exibir apenas as disciplinas pertencentes à área de Humanas.

