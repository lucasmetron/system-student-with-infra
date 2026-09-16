-- Tabela de alunos
CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matricula TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    data_nascimento TEXT NOT NULL,
    genero TEXT,
    email TEXT,
    serie_turma TEXT NOT NULL,
    turno TEXT,
    data_matricula TEXT,
    responsavel_nome TEXT NOT NULL,
    responsavel_parentesco TEXT NOT NULL,
    responsavel_telefone TEXT NOT NULL,
    responsavel_email TEXT NOT NULL,
    cep TEXT,
    logradouro TEXT,
    numero TEXT,
    bairro TEXT,
    cidade TEXT,
    uf TEXT,
    status TEXT DEFAULT 'ativo',
    documentacao_pendente BOOLEAN DEFAULT 0
);

-- Tabela de professores
CREATE TABLE IF NOT EXISTS professores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    rf TEXT UNIQUE NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT,
    grau_formacao TEXT NOT NULL,
    instituicao_formacao TEXT NOT NULL,
    especialidade_principal TEXT NOT NULL,
    regime_trabalho TEXT NOT NULL,
    data_admissao TEXT NOT NULL,
    departamento TEXT NOT NULL,
    observacoes TEXT,
    status TEXT DEFAULT 'ativo'
);

-- Tabela de matérias
CREATE TABLE IF NOT EXISTS materias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    codigo TEXT UNIQUE NOT NULL,
    categoria TEXT NOT NULL,
    carga_semanal INTEGER,
    carga_total INTEGER,
    serie_ano TEXT,
    peso_creditos INTEGER,
    professor_id INTEGER,
    sala_padrao TEXT,
    ementa TEXT,
    status TEXT DEFAULT 'ativa',
    FOREIGN KEY(professor_id) REFERENCES professores(id)
);

-- Tabelas de relacionamento
CREATE TABLE IF NOT EXISTS professor_turmas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    professor_id INTEGER NOT NULL,
    turma TEXT NOT NULL,
    FOREIGN KEY(professor_id) REFERENCES professores(id)
);

CREATE TABLE IF NOT EXISTS professor_materias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    professor_id INTEGER NOT NULL,
    materia TEXT NOT NULL,
    FOREIGN KEY(professor_id) REFERENCES professores(id)
);
