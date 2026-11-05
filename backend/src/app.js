const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleware');
const loginRoutes = require('./routes/loginRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', loginRoutes);

app.use(authMiddleware);
app.use('/clientes', clienteRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/agendamentos', agendamentoRoutes);

app.use((erro, req, res, next) => {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
});

module.exports = app;
