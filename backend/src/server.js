const app = require('./app');
const seed = require('./db/seed');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

try {
    seed();
} catch (err) {
    console.error('Erro ao inicializar banco de dados:', err);
}

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
