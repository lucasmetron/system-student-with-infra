const db = require('./connection');
const fs = require('fs');
const path = require('path');

function seed() {
    console.log('Criando tabelas...');
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    db.exec(schema);

    console.log('Populando dados de Alunos...');
    const insertAluno = db.prepare(`
        INSERT INTO alunos (matricula, nome, cpf, data_nascimento, genero, email, serie_turma, turno, data_matricula, responsavel_nome, responsavel_parentesco, responsavel_telefone, responsavel_email, cep, logradouro, numero, bairro, cidade, uf, status, documentacao_pendente)
        VALUES (@matricula, @nome, @cpf, @data_nascimento, @genero, @email, @serie_turma, @turno, @data_matricula, @responsavel_nome, @responsavel_parentesco, @responsavel_telefone, @responsavel_email, @cep, @logradouro, @numero, @bairro, @cidade, @uf, @status, @documentacao_pendente)
        ON CONFLICT(cpf) DO NOTHING
    `);

    const alunos = [
        {
            matricula: '2025-MAT-0490',
            nome: 'Beatriz Silveira Cunha',
            cpf: '111.111.111-11',
            data_nascimento: '2010-01-01',
            genero: 'feminino',
            email: 'beatriz@aluno.educacore.com',
            serie_turma: '1a-em',
            turno: 'matutino',
            data_matricula: '2025-02-17',
            responsavel_nome: 'João da Silva Cunha',
            responsavel_parentesco: 'pai',
            responsavel_telefone: '(11) 91111-1111',
            responsavel_email: 'joao.cunha@email.com',
            cep: '01000-000',
            logradouro: 'Rua A',
            numero: '10',
            bairro: 'Centro',
            cidade: 'São Paulo',
            uf: 'SP',
            status: 'ativo',
            documentacao_pendente: 0
        },
        {
            matricula: '2025-MAT-0489',
            nome: 'Gabriel Mendes de Castro',
            cpf: '222.222.222-22',
            data_nascimento: '2009-02-02',
            genero: 'masculino',
            email: 'gabriel@aluno.educacore.com',
            serie_turma: '2a-em',
            turno: 'vespertino',
            data_matricula: '2025-02-16',
            responsavel_nome: 'Maria Mendes de Castro',
            responsavel_parentesco: 'mae',
            responsavel_telefone: '(11) 92222-2222',
            responsavel_email: 'maria.castro@email.com',
            cep: '02000-000',
            logradouro: 'Rua B',
            numero: '20',
            bairro: 'Jardins',
            cidade: 'São Paulo',
            uf: 'SP',
            status: 'pendente',
            documentacao_pendente: 1
        },
        {
            matricula: '2025-MAT-0488',
            nome: 'Camila Lima Fontes',
            cpf: '333.333.333-33',
            data_nascimento: '2011-03-03',
            genero: 'feminino',
            email: 'camila@aluno.educacore.com',
            serie_turma: '9a-ef',
            turno: 'matutino',
            data_matricula: '2025-02-15',
            responsavel_nome: 'José Fontes',
            responsavel_parentesco: 'pai',
            responsavel_telefone: '(11) 93333-3333',
            responsavel_email: 'jose.fontes@email.com',
            cep: '03000-000',
            logradouro: 'Rua C',
            numero: '30',
            bairro: 'Pinheiros',
            cidade: 'São Paulo',
            uf: 'SP',
            status: 'ativo',
            documentacao_pendente: 0
        },
        {
            matricula: '2025-MAT-0487',
            nome: 'Rodrigo Vieira Barbosa',
            cpf: '444.444.444-44',
            data_nascimento: '2010-04-04',
            genero: 'masculino',
            email: 'rodrigo@aluno.educacore.com',
            serie_turma: '1a-em',
            turno: 'matutino',
            data_matricula: '2025-02-14',
            responsavel_nome: 'Ana Barbosa',
            responsavel_parentesco: 'mae',
            responsavel_telefone: '(11) 94444-4444',
            responsavel_email: 'ana.barbosa@email.com',
            cep: '04000-000',
            logradouro: 'Rua D',
            numero: '40',
            bairro: 'Lapa',
            cidade: 'São Paulo',
            uf: 'SP',
            status: 'ativo',
            documentacao_pendente: 0
        }
    ];

    for (const aluno of alunos) {
        insertAluno.run(aluno);
    }

    console.log('Populando dados de Professores...');
    const insertProfessor = db.prepare(`
        INSERT INTO professores (nome, rf, cpf, email, telefone, grau_formacao, instituicao_formacao, especialidade_principal, regime_trabalho, data_admissao, departamento, observacoes, status)
        VALUES (@nome, @rf, @cpf, @email, @telefone, @grau_formacao, @instituicao_formacao, @especialidade_principal, @regime_trabalho, @data_admissao, @departamento, @observacoes, @status)
        ON CONFLICT(rf) DO NOTHING
    `);

    const professores = [
        {
            nome: 'Dra. Helena Vasconcelos',
            rf: 'RF-2025-089',
            cpf: '555.555.555-55',
            email: 'helena.vasconcelos@educacore.br',
            telefone: '(11) 95555-5555',
            grau_formacao: 'doutorado',
            instituicao_formacao: 'USP',
            especialidade_principal: 'Matemática',
            regime_trabalho: '40h',
            data_admissao: '2025-01-10',
            departamento: 'exatas',
            observacoes: '',
            status: 'ativo'
        },
        {
            nome: 'Prof. Carlos Eduardo Mendes',
            rf: 'RF-2024-112',
            cpf: '666.666.666-66',
            email: 'carlos.mendes@educacore.br',
            telefone: '(11) 96666-6666',
            grau_formacao: 'mestrado',
            instituicao_formacao: 'Unicamp',
            especialidade_principal: 'Literatura',
            regime_trabalho: '32h',
            data_admissao: '2024-02-01',
            departamento: 'linguagens',
            observacoes: '',
            status: 'ativo'
        },
        {
            nome: 'Dra. Marina Silveira Prado',
            rf: 'RF-2023-044',
            cpf: '777.777.777-77',
            email: 'marina.prado@educacore.br',
            telefone: '(11) 97777-7777',
            grau_formacao: 'doutorado',
            instituicao_formacao: 'Unesp',
            especialidade_principal: 'História',
            regime_trabalho: '20h',
            data_admissao: '2023-03-15',
            departamento: 'humanas',
            observacoes: '',
            status: 'ativo'
        },
        {
            nome: 'Profa. Camila Torres',
            rf: 'RF-2022-011',
            cpf: '888.888.888-88',
            email: 'camila.torres@educacore.br',
            telefone: '(11) 98888-8888',
            grau_formacao: 'pos',
            instituicao_formacao: 'USP',
            especialidade_principal: 'Biologia',
            regime_trabalho: '40h',
            data_admissao: '2022-01-20',
            departamento: 'biologicas',
            observacoes: '',
            status: 'ativo'
        }
    ];

    for (const prof of professores) {
        insertProfessor.run(prof);
    }

    console.log('Populando dados de Matérias...');
    const insertMateria = db.prepare(`
        INSERT INTO materias (nome, codigo, categoria, carga_semanal, carga_total, serie_ano, peso_creditos, professor_id, sala_padrao, ementa, status)
        VALUES (@nome, @codigo, @categoria, @carga_semanal, @carga_total, @serie_ano, @peso_creditos, @professor_id, @sala_padrao, @ementa, @status)
        ON CONFLICT(codigo) DO NOTHING
    `);

    // Pegar ids dos professores inseridos para vincular
    const rowHelena = db.prepare("SELECT id FROM professores WHERE rf = 'RF-2025-089'").get();
    const rowSergio = db.prepare("SELECT id FROM professores WHERE rf = 'RF-2023-044'").get();
    const rowJuliana = db.prepare("SELECT id FROM professores WHERE rf = 'RF-2024-112'").get();
    const rowCamila = db.prepare("SELECT id FROM professores WHERE rf = 'RF-2022-011'").get();


    const materias = [
        {
            nome: 'Matemática Fundamental',
            codigo: 'MAT-101',
            categoria: 'bncc',
            carga_semanal: 5,
            carga_total: 200,
            serie_ano: 'Todos os anos EM',
            peso_creditos: 5,
            professor_id: rowHelena ? rowHelena.id : null,
            sala_padrao: 'Sala 14 • Bloco A',
            ementa: 'Conceitos matemáticos fundamentais.',
            status: 'ativa'
        },
        {
            nome: 'História Contemporânea',
            codigo: 'HIS-201',
            categoria: 'bncc',
            carga_semanal: 3,
            carga_total: 120,
            serie_ano: 'Todos os anos EM',
            peso_creditos: 3,
            professor_id: rowSergio ? rowSergio.id : null,
            sala_padrao: 'Auditório 01',
            ementa: 'História do mundo contemporâneo.',
            status: 'ativa'
        },
        {
            nome: 'Literatura & Redação',
            codigo: 'LET-104',
            categoria: 'bncc',
            carga_semanal: 4,
            carga_total: 160,
            serie_ano: 'Todos os anos EM',
            peso_creditos: 4,
            professor_id: rowJuliana ? rowJuliana.id : null,
            sala_padrao: 'Sala 08 • Bloco C',
            ementa: 'Literatura brasileira e redação.',
            status: 'ativa'
        },
        {
            nome: 'Biologia Molecular & Genética',
            codigo: 'BIO-202',
            categoria: 'bncc',
            carga_semanal: 3,
            carga_total: 120,
            serie_ano: 'Todos os anos EM',
            peso_creditos: 3,
            professor_id: rowCamila ? rowCamila.id : null,
            sala_padrao: 'Lab Biologia 01',
            ementa: 'Biologia avançada e genética.',
            status: 'ativa'
        }
    ];

    for (const materia of materias) {
        insertMateria.run(materia);
    }

    console.log('Seed completo.');
}

seed();
