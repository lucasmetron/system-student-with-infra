const db = require('../db/connection');

// Auxiliar para gerar matrícula automática
function gerarMatricula() {
    const ano = new Date().getFullYear();
    const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
    return `${ano}-MAT-${numeroAleatorio}`;
}

exports.listar = (req, res) => {
    try {
        const querySearch = req.query.q;
        let sql = 'SELECT * FROM alunos';
        let params = [];

        if (querySearch) {
            sql += ' WHERE nome LIKE ? OR matricula LIKE ?';
            params.push(`%${querySearch}%`, `%${querySearch}%`);
        }

        const alunos = db.prepare(sql).all(...params);
        res.json(alunos);
    } catch (error) {
        console.error('Erro ao listar alunos:', error);
        res.status(500).json({ error: 'Erro ao listar alunos' });
    }
};

exports.obter = (req, res) => {
    try {
        const { id } = req.params;
        const aluno = db.prepare('SELECT * FROM alunos WHERE id = ?').get(id);

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }

        res.json(aluno);
    } catch (error) {
        console.error('Erro ao obter aluno:', error);
        res.status(500).json({ error: 'Erro ao obter aluno' });
    }
};

exports.atualizar = (req, res) => {
    try {
        const { id } = req.params;
        const {
            nome, cpf, data_nascimento, genero, email, serie_turma, turno,
            responsavel_nome, responsavel_parentesco, responsavel_telefone,
            responsavel_email, cep, logradouro, numero, bairro, cidade, uf,
            status, documentacao_pendente
        } = req.body;

        const aluno = db.prepare('SELECT id FROM alunos WHERE id = ?').get(id);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }

        const sql = `
            UPDATE alunos SET
                nome = COALESCE(?, nome),
                cpf = COALESCE(?, cpf),
                data_nascimento = COALESCE(?, data_nascimento),
                genero = COALESCE(?, genero),
                email = COALESCE(?, email),
                serie_turma = COALESCE(?, serie_turma),
                turno = COALESCE(?, turno),
                responsavel_nome = COALESCE(?, responsavel_nome),
                responsavel_parentesco = COALESCE(?, responsavel_parentesco),
                responsavel_telefone = COALESCE(?, responsavel_telefone),
                responsavel_email = COALESCE(?, responsavel_email),
                cep = COALESCE(?, cep),
                logradouro = COALESCE(?, logradouro),
                numero = COALESCE(?, numero),
                bairro = COALESCE(?, bairro),
                cidade = COALESCE(?, cidade),
                uf = COALESCE(?, uf),
                status = COALESCE(?, status),
                documentacao_pendente = COALESCE(?, documentacao_pendente)
            WHERE id = ?
        `;

        db.prepare(sql).run(
            nome, cpf, data_nascimento, genero, email, serie_turma, turno,
            responsavel_nome, responsavel_parentesco, responsavel_telefone,
            responsavel_email, cep, logradouro, numero, bairro, cidade, uf,
            status, documentacao_pendente, id
        );

        const alunoAtualizado = db.prepare('SELECT * FROM alunos WHERE id = ?').get(id);
        res.json(alunoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
};

exports.deletar = (req, res) => {
    try {
        const { id } = req.params;
        const aluno = db.prepare('SELECT id FROM alunos WHERE id = ?').get(id);

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }

        db.prepare('DELETE FROM alunos WHERE id = ?').run(id);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar aluno:', error);
        res.status(500).json({ error: 'Erro ao deletar aluno' });
    }
};

exports.criar = (req, res) => {
    try {
        const {
            nome, cpf, data_nascimento, genero, email, serie_turma, turno,
            data_matricula, responsavel_nome, responsavel_parentesco,
            responsavel_telefone, responsavel_email, cep, logradouro, numero,
            bairro, cidade, uf
        } = req.body;

        // Campos obrigatórios conforme specification
        if (!nome || !cpf || !data_nascimento || !serie_turma || !responsavel_nome || !responsavel_telefone || !responsavel_email) {
            return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
        }

        // Validação CPF
        const alunoExistente = db.prepare('SELECT id FROM alunos WHERE cpf = ?').get(cpf);
        if (alunoExistente) {
            return res.status(409).json({ error: 'Já existe um aluno cadastrado com este CPF.' });
        }

        const matricula = req.body.matricula || gerarMatricula();
        const data_matricula_final = data_matricula || new Date().toISOString().split('T')[0];
        const documentacao_pendente = 0; // Padrão
        const status = 'ativo'; // Padrão

        const sql = `
            INSERT INTO alunos (
                matricula, nome, cpf, data_nascimento, genero, email, serie_turma, turno,
                data_matricula, responsavel_nome, responsavel_parentesco, responsavel_telefone,
                responsavel_email, cep, logradouro, numero, bairro, cidade, uf, status,
                documentacao_pendente
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?, ?, ?, ?, ?, ?,
                ?
            )
        `;

        const stmt = db.prepare(sql);
        const info = stmt.run(
            matricula, nome, cpf, data_nascimento, genero, email, serie_turma, turno,
            data_matricula_final, responsavel_nome, responsavel_parentesco, responsavel_telefone,
            responsavel_email, cep, logradouro, numero, bairro, cidade, uf, status,
            documentacao_pendente
        );

        const novoAluno = db.prepare('SELECT * FROM alunos WHERE id = ?').get(info.lastInsertRowid);
        res.status(201).json(novoAluno);

    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        res.status(500).json({ error: 'Erro ao criar aluno' });
    }
};

exports.kpis = (req, res) => {
    try {
        const total = db.prepare('SELECT COUNT(*) as count FROM alunos').get().count;

        // Novos matriculados no mês corrente
        const hoje = new Date();
        const mesCorrente = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;

        const novosMes = db.prepare("SELECT COUNT(*) as count FROM alunos WHERE data_matricula LIKE ?").get(`${mesCorrente}%`).count;

        const pendentes = db.prepare('SELECT COUNT(*) as count FROM alunos WHERE documentacao_pendente = 1').get().count;

        // Total de turmas ativas
        const turmas = db.prepare("SELECT COUNT(DISTINCT serie_turma) as count FROM alunos WHERE status = 'ativo'").get().count;

        res.json({
            total_matriculados: total,
            novas_matriculas_mes: novosMes,
            documentacao_pendente: pendentes,
            turmas_ativas: turmas
        });
    } catch (error) {
        console.error('Erro ao buscar KPIs de alunos:', error);
        res.status(500).json({ error: 'Erro ao buscar KPIs' });
    }
};
