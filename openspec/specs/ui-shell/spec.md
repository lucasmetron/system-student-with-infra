# ui-shell Specification

## Purpose
Fornece o shell unificado da aplicação escolar EducaCore, incluindo navegação lateral persistente, cabeçalho de busca e perfil, além da integração do sistema de temas e fontes.
## Requirements
### Requirement: Navegação e Layout Estrutural
O sistema DEVE exibir uma barra lateral fixa com o logotipo SVG EducaCore, links de navegação para os 3 módulos principais e rodapé com versão e suporte, mantendo o estado ativo correspondente à rota atual.

#### Scenario: Transição entre módulos
- **WHEN** o usuário clica em "Cadastro de Professores" na barra lateral
- **THEN** o sistema SHALL navegar para a rota correspondente, atualizar o destaque visual do item no menu e renderizar o conteúdo específico.

### Requirement: Cabeçalho com Busca Global
O sistema DEVE apresentar um cabeçalho superior com barra de busca, sinalizador de período letivo ativo e avatar do usuário logado.

#### Scenario: Digitação na busca global
- **WHEN** o usuário digita um termo na barra de busca do cabeçalho
- **THEN** o sistema SHALL disparar a busca unificada e apresentar opções ou filtrar a visualização atual.

