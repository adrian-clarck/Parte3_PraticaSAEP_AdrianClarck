const conexao = require('../config/database');

class ClienteRepository {
    async listarTodos(busca = '') {
        const [clientes] = await conexao.execute(
            `SELECT id_cliente, nome, cpf, telefone, email
             FROM clientes
             WHERE nome LIKE ?
             ORDER BY nome`,
            [`%${busca}%`]
        );

        return clientes;
    }

    async buscarPorId(id) {
        const [clientes] = await conexao.execute(
            'SELECT id_cliente, nome, cpf, telefone, email FROM clientes WHERE id_cliente = ?',
            [id]
        );

        return clientes[0] || null;
    }

    async criar(cliente) {
        const [resultado] = await conexao.execute(
            'INSERT INTO clientes (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)',
            [cliente.nome, cliente.cpf, cliente.telefone, cliente.email]
        );

        return this.buscarPorId(resultado.insertId);
    }

    async atualizar(id, cliente) {
        const [resultado] = await conexao.execute(
            'UPDATE clientes SET nome = ?, cpf = ?, telefone = ?, email = ? WHERE id_cliente = ?',
            [cliente.nome, cliente.cpf, cliente.telefone, cliente.email, id]
        );

        return resultado.affectedRows > 0;
    }

    async excluir(id) {
        const [resultado] = await conexao.execute(
            'DELETE FROM clientes WHERE id_cliente = ?',
            [id]
        );

        return resultado.affectedRows > 0;
    }
}

module.exports = new ClienteRepository();
