const db = require('../db/connection');

exports.searchAll = (req, res) => {
    try {
        const q = req.query.q;
        if (!q) {
            return res.status(400).json({ error: 'Termo de busca ausente' });
        }

        const searchTerm = `%${q}%`;

        const alunos = db.prepare("SELECT id, nome, matricula, 'aluno' as tipo FROM alunos WHERE nome LIKE ? OR matricula LIKE ?").all(searchTerm, searchTerm);
        const professores = db.prepare("SELECT id, nome, rf, 'professor' as tipo FROM professores WHERE nome LIKE ? OR rf LIKE ?").all(searchTerm, searchTerm);
        const materias = db.prepare("SELECT id, nome, codigo, 'materia' as tipo FROM materias WHERE nome LIKE ? OR codigo LIKE ?").all(searchTerm, searchTerm);

        const results = [...alunos, ...professores, ...materias];

        res.json(results);
    } catch (error) {
        console.error('Erro na busca global:', error);
        res.status(500).json({ error: 'Erro ao processar busca' });
    }
};
