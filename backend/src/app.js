const express = require('express');
const cors = require('cors');
require('dotenv').config();

const alunosRoutes = require('./routes/alunos.routes');
const professoresRoutes = require('./routes/professores.routes');
const materiasRoutes = require('./routes/materias.routes');
const searchRoutes = require('./routes/search.routes');

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173']
}));
app.use(express.json());

app.use('/api/alunos', alunosRoutes);
app.use('/api/professores', professoresRoutes);
app.use('/api/materias', materiasRoutes);
app.use('/api/search', searchRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno no servidor' });
});

module.exports = app;
