## Why

O sistema de gestão escolar EducaCore necessita de uma API robusta, leve e modular no backend para alimentar as telas de gestão (Alunos, Professores e Matérias). Para viabilizar estudos práticos de DevOps e facilitar a containerização, o backend será implementado em Node.js com SQLite como banco de dados embutido, permitindo persistência relacional sem complexidade excessiva de infraestrutura prévia.

## What Changes

- Criação da estrutura de backend em Node.js com Express e SQLite (`better-sqlite3` ou `sqlite3`).
- Implementação de script de inicialização do banco (`init_db`) com criação automática do esquema relacional e carga de dados de exemplo (seed) compatível com o design system.
- Implementação de endpoints REST para CRUD completo e filtros de Alunos, Professores e Matérias.
- Implementação de endpoints dedicados para KPIs e resumos estatísticos para cada um dos 3 módulos (cards de métricas dos layouts).
- Suporte a busca global unificada (`/api/search?q=`).
- Configuração de CORS, tratamento centralizado de erros e logs de requisição.

## Capabilities

### New Capabilities
- `aluno-management`: Registro de alunos, geração automática de matrícula, busca, filtros e métricas acadêmicas.
- `professor-management`: Registro de docentes, vínculo de titulações, matérias lecionadas, turmas e métricas de corpo docente.
- `materia-management`: Registro de disciplinas da matriz curricular, ementas, cargas horárias, alocação de salas e docentes responsáveis.

### Modified Capabilities

## Impact

- Novos arquivos e diretórios dentro de `backend/`.
- Banco de dados SQLite persistido localmente em arquivo configurável (ex: `backend/data/educacore.sqlite` ou via variável de ambiente `DATABASE_PATH`).
- Contrato de API documentado para consumo direto pelo frontend em React.
