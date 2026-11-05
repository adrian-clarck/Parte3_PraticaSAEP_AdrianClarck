const conexao = require('../config/database');

class UsuarioRepository {
    async buscarPorEmail(email) {
        const [usuarios] = await conexao.execute(
            'SELECT id_usuario, nome, email, senha_hash FROM usuarios WHERE email = ?',
            [email]
        );

        return usuarios[0] || null;
    }
}

module.exports = new UsuarioRepository();
