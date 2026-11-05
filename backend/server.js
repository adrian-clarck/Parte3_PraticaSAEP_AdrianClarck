require('dotenv').config();

const app = require('./src/app');

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
    console.log(`Servidor iniciado na porta ${porta}`);
});
