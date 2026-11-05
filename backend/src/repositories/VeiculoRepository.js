const conexao = require('../config/database');

class VeiculoRepository {
    async listarTodos() {
        const [veiculos] = await conexao.execute(
            `SELECT id_veiculo, placa, marca, modelo, ano, cor, id_cliente AS cliente_id
             FROM veiculos
             ORDER BY modelo`
        );

        return veiculos;
    }

    async buscarPorId(id) {
        const [veiculos] = await conexao.execute(
            `SELECT id_veiculo, placa, marca, modelo, ano, cor, id_cliente AS cliente_id
             FROM veiculos WHERE id_veiculo = ?`,
            [id]
        );

        return veiculos[0] || null;
    }

    async criar(veiculo) {
        const [resultado] = await conexao.execute(
            `INSERT INTO veiculos (placa, marca, modelo, ano, cor, id_cliente)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                veiculo.placa,
                veiculo.marca,
                veiculo.modelo,
                veiculo.ano,
                veiculo.cor,
                veiculo.cliente_id
            ]
        );

        return this.buscarPorId(resultado.insertId);
    }

    async atualizar(id, veiculo) {
        const [resultado] = await conexao.execute(
            `UPDATE veiculos
             SET placa = ?, marca = ?, modelo = ?, ano = ?, cor = ?, id_cliente = ?
             WHERE id_veiculo = ?`,
            [
                veiculo.placa,
                veiculo.marca,
                veiculo.modelo,
                veiculo.ano,
                veiculo.cor,
                veiculo.cliente_id,
                id
            ]
        );

        return resultado.affectedRows > 0;
    }

    async excluir(id) {
        const [resultado] = await conexao.execute(
            'DELETE FROM veiculos WHERE id_veiculo = ?',
            [id]
        );

        return resultado.affectedRows > 0;
    }
}

module.exports = new VeiculoRepository();
