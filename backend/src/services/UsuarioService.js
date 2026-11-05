const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioRepository = require('../repositories/UsuarioRepository');

class UsuarioService {
    async login(email, senha) {
        const usuario = await UsuarioRepository.buscarPorEmail(email);

        if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
            return { sucesso: false, mensagem: 'Email ou senha incorretos' };
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('Configure JWT_SECRET no arquivo .env');
        }

        const token = jwt.sign(
            { id_usuario: usuario.id_usuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { sucesso: true, dados: { token, nome: usuario.nome } };
    }
}

module.exports = new UsuarioService();
