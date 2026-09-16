const db = require('../db/connection');

exports.listar = (req, res) => {
    try {
        const queryArea = req.query.area;
        const queryCategoria = req.query.categoria;
        let sql = `
            SELECT m.*, p.nome as professor_nome
            FROM materias m
            LEFT JOIN professores p ON m.professor_id = p.id
        `;
        let params = [];
        let conditions = [];

        if (queryArea) {
            // "Area" pode se referir ao departamento do professor ou filtro simples
            // Como especificação pede listagem com filtro por categoria/área
            // vamos associar área ao departamento do professor vinculado ou uma flag
            conditions.push('p.departamento = ?');
            params.push(queryArea);
        }

        if (queryCategoria) {
            conditions.push('m.categoria = ?');
            params.push(queryCategoria);
        }

        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        const materias = db.prepare(sql).all(...params);
        res.json(materias);
    } catch (error) {
        console.error('Erro ao listar matérias:', error);
        res.status(500).json({ error: 'Erro ao listar matérias' });
    }
};

exports.obter = (req, res) => {
    try {
        const { id } = req.params;
        const materia = db.prepare(`
            SELECT m.*, p.nome as professor_nome
            FROM materias m
            LEFT JOIN professores p ON m.professor_id = p.id
            WHERE m.id = ?
        `).get(id);

        if (!materia) {
            return res.status(404).json({ error: 'Matéria não encontrada' });
        }

        res.json(materia);
    } catch (error) {
        console.error('Erro ao obter matéria:', error);
        res.status(500).json({ error: 'Erro ao obter matéria' });
    }
};

exports.atualizar = (req, res) => {
    try {
        const { id } = req.params;
        const {
            nome, codigo, categoria, carga_semanal, carga_total,
            serie_ano, peso_creditos, professor_id, sala_padrao, ementa, status
        } = req.body;

        const materia = db.prepare('SELECT id FROM materias WHERE id = ?').get(id);
        if (!materia) {
            return res.status(404).json({ error: 'Matéria não encontrada' });
        }

        const sql = `
            UPDATE materias SET
                nome = COALESCE(?, nome),
                codigo = COALESCE(?, codigo),
                categoria = COALESCE(?, categoria),
                carga_semanal = COALESCE(?, carga_semanal),
                carga_total = COALESCE(?, carga_total),
                serie_ano = COALESCE(?, serie_ano),
                peso_creditos = COALESCE(?, peso_creditos),
                professor_id = COALESCE(?, professor_id),
                sala_padrao = COALESCE(?, sala_padrao),
                ementa = COALESCE(?, ementa),
                status = COALESCE(?, status)
            WHERE id = ?
        `;

        db.prepare(sql).run(
            nome, codigo, categoria, carga_semanal, carga_total,
            serie_ano, peso_creditos, professor_id, sala_padrao, ementa, status, id
        );

        const materiaAtualizada = db.prepare('SELECT * FROM materias WHERE id = ?').get(id);
        res.json(materiaAtualizada);
    } catch (error) {
        console.error('Erro ao atualizar matéria:', error);
        res.status(500).json({ error: 'Erro ao atualizar matéria' });
    }
};

exports.deletar = (req, res) => {
    try {
        const { id } = req.params;
        const materia = db.prepare('SELECT id FROM materias WHERE id = ?').get(id);

        if (!materia) {
            return res.status(404).json({ error: 'Matéria não encontrada' });
        }

        db.prepare('DELETE FROM materias WHERE id = ?').run(id);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar matéria:', error);
        res.status(500).json({ error: 'Erro ao deletar matéria' });
    }
};

exports.criar = (req, res) => {
    try {
        const {
            nome, codigo, categoria, carga_semanal, carga_total,
            serie_ano, peso_creditos, professor_id, sala_padrao, ementa
        } = req.body;

        if (!nome || !codigo || !categoria || !professor_id) {
            return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
        }

        const materiaExistente = db.prepare('SELECT id FROM materias WHERE codigo = ?').get(codigo);
        if (materiaExistente) {
            return res.status(409).json({ error: 'Já existe uma matéria cadastrada com este código.' });
        }

        const status = 'ativa';

        const sql = `
            INSERT INTO materias (
                nome, codigo, categoria, carga_semanal, carga_total,
                serie_ano, peso_creditos, professor_id, sala_padrao, ementa, status
            ) VALUES (
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?, ?
            )
        `;

        const stmt = db.prepare(sql);
        const info = stmt.run(
            nome, codigo, categoria, carga_semanal, carga_total,
            serie_ano, peso_creditos, professor_id, sala_padrao, ementa, status
        );

        const novaMateria = db.prepare('SELECT * FROM materias WHERE id = ?').get(info.lastInsertRowid);
        res.status(201).json(novaMateria);

    } catch (error) {
        console.error('Erro ao criar matéria:', error);
        res.status(500).json({ error: 'Erro ao criar matéria' });
    }
};

exports.kpis = (req, res) => {
    try {
        const ativas = db.prepare("SELECT COUNT(*) as count FROM materias WHERE status = 'ativa'").get().count;
        const total = db.prepare('SELECT COUNT(*) as count FROM materias').get().count;

        const cargaAnualTotal = db.prepare("SELECT SUM(carga_total) as sum FROM materias WHERE status = 'ativa'").get().sum || 0;

        const bncc = db.prepare("SELECT COUNT(*) as count FROM materias WHERE categoria = 'bncc' AND status = 'ativa'").get().count;

        const eletivasOuOficinas = db.prepare("SELECT COUNT(*) as count FROM materias WHERE categoria IN ('eletiva', 'oficina') AND status = 'ativa'").get().count;

        // Distribuição por área usando o departamento do professor vinculado como 'área'
        const areaDistRaw = db.prepare(`
            SELECT p.departamento as area, COUNT(*) as count
            FROM materias m
            JOIN professores p ON m.professor_id = p.id
            WHERE m.status = 'ativa'
            GROUP BY p.departamento
        `).all();

        const distribuicaoArea = {};
        areaDistRaw.forEach(item => {
            distribuicaoArea[item.area] = ativas > 0 ? ((item.count / ativas) * 100).toFixed(1) + '%' : '0%';
        });

        res.json({
            disciplinas_ativas: ativas,
            carga_horaria_anual_total: cargaAnualTotal,
            materias_obrigatorias_bncc: bncc,
            eletivas_oficinas: eletivasOuOficinas,
            distribuicao_por_area: distribuicaoArea
        });
    } catch (error) {
        console.error('Erro ao buscar KPIs de matérias:', error);
        res.status(500).json({ error: 'Erro ao buscar KPIs' });
    }
};
