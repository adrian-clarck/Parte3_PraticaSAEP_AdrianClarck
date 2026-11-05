const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const autorizacao = req.headers.authorization;
    const partes = autorizacao ? autorizacao.split(' ') : [];

    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({ mensagem: 'Token não informado' });
    }

    if (!process.env.JWT_SECRET) {
        return next(new Error('Configure JWT_SECRET no arquivo .env'));
    }

    try {
        req.usuario = jwt.verify(partes[1], process.env.JWT_SECRET);
        return next();
    } catch (erro) {
        return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    }
}

module.exports = authMiddleware;
