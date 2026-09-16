const db = require('../db/connection');

exports.listar = (req, res) => {
    try {
        const queryDepartamento = req.query.departamento;
        let sql = 'SELECT * FROM professores';
        let params = [];

        if (queryDepartamento) {
            sql += ' WHERE departamento = ?';
            params.push(queryDepartamento);
        }

        // Suporte simples a paginação (limit offset) seria adicionado aqui se especificado explicitamente nos requisitos de request
        // mas a spec menciona "suporte a filtro por departamento e paginação", adicionarei simples limit e offset
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        sql += ' LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const professores = db.prepare(sql).all(...params);

        // Count para paginação
        let countSql = 'SELECT COUNT(*) as count FROM professores';
        let countParams = [];
        if (queryDepartamento) {
            countSql += ' WHERE departamento = ?';
            countParams.push(queryDepartamento);
        }
        const total = db.prepare(countSql).get(...countParams).count;

        res.json({
            data: professores,
            page: page,
            limit: limit,
            total: total
        });
    } catch (error) {
        console.error('Erro ao listar professores:', error);
        res.status(500).json({ error: 'Erro ao listar professores' });
    }
};

exports.obter = (req, res) => {
    try {
        const { id } = req.params;
        const professor = db.prepare('SELECT * FROM professores WHERE id = ?').get(id);

        if (!professor) {
            return res.status(404).json({ error: 'Professor não encontrado' });
        }

        res.json(professor);
    } catch (error) {
        console.error('Erro ao obter professor:', error);
        res.status(500).json({ error: 'Erro ao obter professor' });
    }
};

exports.atualizar = (req, res) => {
    try {
        const { id } = req.params;
        const {
            nome, rf, cpf, email, telefone, grau_formacao, instituicao_formacao,
            especialidade_principal, regime_trabalho, data_admissao, departamento,
            observacoes, status, turmas, materias
        } = req.body;

        const professor = db.prepare('SELECT id FROM professores WHERE id = ?').get(id);
        if (!professor) {
            return res.status(404).json({ error: 'Professor não encontrado' });
        }

        const transaction = db.transaction(() => {
            const sql = `
                UPDATE professores SET
                    nome = COALESCE(?, nome),
                    rf = COALESCE(?, rf),
                    cpf = COALESCE(?, cpf),
                    email = COALESCE(?, email),
                    telefone = COALESCE(?, telefone),
                    grau_formacao = COALESCE(?, grau_formacao),
                    instituicao_formacao = COALESCE(?, instituicao_formacao),
                    especialidade_principal = COALESCE(?, especialidade_principal),
                    regime_trabalho = COALESCE(?, regime_trabalho),
                    data_admissao = COALESCE(?, data_admissao),
                    departamento = COALESCE(?, departamento),
                    observacoes = COALESCE(?, observacoes),
                    status = COALESCE(?, status)
                WHERE id = ?
            `;

            db.prepare(sql).run(
                nome, rf, cpf, email, telefone, grau_formacao, instituicao_formacao,
                especialidade_principal, regime_trabalho, data_admissao, departamento,
                observacoes, status, id
            );

            // Atualizar turmas se enviadas
            if (turmas && Array.isArray(turmas)) {
                db.prepare('DELETE FROM professor_turmas WHERE professor_id = ?').run(id);
                const insertTurma = db.prepare('INSERT INTO professor_turmas (professor_id, turma) VALUES (?, ?)');
                for (const t of turmas) {
                    insertTurma.run(id, t);
                }
            }

            // Atualizar matérias se enviadas
            if (materias && Array.isArray(materias)) {
                db.prepare('DELETE FROM professor_materias WHERE professor_id = ?').run(id);
                const insertMateria = db.prepare('INSERT INTO professor_materias (professor_id, materia) VALUES (?, ?)');
                for (const m of materias) {
                    insertMateria.run(id, m);
                }
            }
        });

        transaction();
        const professorAtualizado = db.prepare('SELECT * FROM professores WHERE id = ?').get(id);
        res.json(professorAtualizado);

    } catch (error) {
        console.error('Erro ao atualizar professor:', error);
        res.status(500).json({ error: 'Erro ao atualizar professor' });
    }
};

exports.deletar = (req, res) => {
    try {
        const { id } = req.params;
        const professor = db.prepare('SELECT id FROM professores WHERE id = ?').get(id);

        if (!professor) {
            return res.status(404).json({ error: 'Professor não encontrado' });
        }

        const transaction = db.transaction(() => {
            db.prepare('DELETE FROM professor_turmas WHERE professor_id = ?').run(id);
            db.prepare('DELETE FROM professor_materias WHERE professor_id = ?').run(id);
            // Matérias que usam esse professor_id vão violar foreign key, então idealmente fariam SET NULL,
            // mas o SQLite suporta ON DELETE CASCADE se configurado, ou podemos fazer set null manual:
            db.prepare('UPDATE materias SET professor_id = NULL WHERE professor_id = ?').run(id);
            db.prepare('DELETE FROM professores WHERE id = ?').run(id);
        });

        transaction();
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar professor:', error);
        res.status(500).json({ error: 'Erro ao deletar professor' });
    }
};

exports.criar = (req, res) => {
    try {
        const {
            nome, rf, cpf, email, telefone, grau_formacao, instituicao_formacao,
            especialidade_principal, regime_trabalho, data_admissao, departamento,
            observacoes, turmas, materias
        } = req.body;

        // Validação obrigatória
        if (!nome || !rf || !cpf || !email || !grau_formacao || !departamento) {
            return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
        }

        // Validação de duplicidade de RF e CPF
        const profExistente = db.prepare('SELECT id FROM professores WHERE rf = ? OR cpf = ?').get(rf, cpf);
        if (profExistente) {
            return res.status(409).json({ error: 'Já existe um professor cadastrado com este RF ou CPF.' });
        }

        const status = 'ativo';

        // Usar transação para garantir que professor e vinculações são salvos juntos
        const transaction = db.transaction(() => {
            const sql = `
                INSERT INTO professores (
                    nome, rf, cpf, email, telefone, grau_formacao, instituicao_formacao,
                    especialidade_principal, regime_trabalho, data_admissao, departamento,
                    observacoes, status
                ) VALUES (
                    ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?,
                    ?, ?
                )
            `;

            const stmt = db.prepare(sql);
            const info = stmt.run(
                nome, rf, cpf, email, telefone, grau_formacao, instituicao_formacao,
                especialidade_principal, regime_trabalho, data_admissao || new Date().toISOString().split('T')[0], departamento,
                observacoes, status
            );

            const professorId = info.lastInsertRowid;

            // Inserir turmas vinculadas se enviadas (array)
            if (turmas && Array.isArray(turmas)) {
                const insertTurma = db.prepare('INSERT INTO professor_turmas (professor_id, turma) VALUES (?, ?)');
                for (const t of turmas) {
                    insertTurma.run(professorId, t);
                }
            }

            // Inserir matérias vinculadas se enviadas (array)
            if (materias && Array.isArray(materias)) {
                const insertMateria = db.prepare('INSERT INTO professor_materias (professor_id, materia) VALUES (?, ?)');
                for (const m of materias) {
                    insertMateria.run(professorId, m);
                }
            }

            return professorId;
        });

        const newProfId = transaction();
        const novoProfessor = db.prepare('SELECT * FROM professores WHERE id = ?').get(newProfId);

        res.status(201).json(novoProfessor);

    } catch (error) {
        console.error('Erro ao criar professor:', error);
        res.status(500).json({ error: 'Erro ao criar professor' });
    }
};

exports.kpis = (req, res) => {
    try {
        const total = db.prepare("SELECT COUNT(*) as count FROM professores WHERE status = 'ativo'").get().count;

        // Média de carga horária (simulada pegando base no regime_trabalho que pode ser ex: 40h)
        const professoresList = db.prepare("SELECT regime_trabalho FROM professores WHERE status = 'ativo'").all();
        let totalHoras = 0;
        professoresList.forEach(p => {
            if (p.regime_trabalho.includes('40')) totalHoras += 40;
            else if (p.regime_trabalho.includes('32')) totalHoras += 32;
            else if (p.regime_trabalho.includes('20')) totalHoras += 20;
            else totalHoras += 40; // fallback pra de/integral
        });
        const mediaCargaHoraria = professoresList.length > 0 ? (totalHoras / professoresList.length).toFixed(1) : 0;

        const departamentos = db.prepare('SELECT COUNT(DISTINCT departamento) as count FROM professores').get().count;

        const afastados = db.prepare("SELECT COUNT(*) as count FROM professores WHERE status != 'ativo'").get().count;

        // Distribuição percentual por titulação
        const titulacoesRaw = db.prepare('SELECT grau_formacao, COUNT(*) as count FROM professores GROUP BY grau_formacao').all();
        const distTitulacao = {};
        const totalGeral = total + afastados;
        titulacoesRaw.forEach(t => {
            distTitulacao[t.grau_formacao] = totalGeral > 0 ? ((t.count / totalGeral) * 100).toFixed(1) + '%' : '0%';
        });

        res.json({
            docentes_ativos: total,
            media_carga_horaria_semanal: mediaCargaHoraria,
            total_departamentos: departamentos,
            em_afastamento: afastados,
            distribuicao_titulacao: distTitulacao
        });
    } catch (error) {
        console.error('Erro ao buscar KPIs de professores:', error);
        res.status(500).json({ error: 'Erro ao buscar KPIs' });
    }
};
