const UsuarioService = require('../services/UsuarioService');

class UsuarioController {
    async login(req, res) {
        const resultado = await UsuarioService.login(req.body.email, req.body.senha);

        if (!resultado.sucesso) {
            return res.status(401).json({ mensagem: resultado.mensagem });
        }

        return res.json(resultado.dados);
    }
}

module.exports = new UsuarioController();
