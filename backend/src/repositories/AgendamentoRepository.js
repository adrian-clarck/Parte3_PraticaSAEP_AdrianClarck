const conexao = require('../config/database');

class AgendamentoRepository {
    async listarTodos() {
        const [agendamentos] = await conexao.execute(
            `SELECT ag.id_agendamento, ag.data_hora, ag.status, ag.descricao,
                    ag.id_veiculo, ve.placa, ve.marca, ve.modelo, ve.ano, ve.cor,
                    cl.id_cliente, cl.nome AS nome_cliente
             FROM agendamentos ag
             INNER JOIN veiculos ve ON ag.id_veiculo = ve.id_veiculo
             INNER JOIN clientes cl ON ve.id_cliente = cl.id_cliente
             ORDER BY ag.data_hora`
        );

        return agendamentos;
    }

    async buscarPorId(id) {
        const [agendamentos] = await conexao.execute(
            'SELECT id_agendamento, data_hora, status, descricao, id_veiculo FROM agendamentos WHERE id_agendamento = ?',
            [id]
        );

        return agendamentos[0] || null;
    }

    async criar(agendamento) {
        const [resultado] = await conexao.execute(
            'INSERT INTO agendamentos (data_hora, status, descricao, id_veiculo) VALUES (?, ?, ?, ?)',
            [
                agendamento.data_hora,
                agendamento.status,
                agendamento.descricao,
                agendamento.id_veiculo
            ]
        );

        return this.buscarPorId(resultado.insertId);
    }

    async atualizar(id, agendamento) {
        const [resultado] = await conexao.execute(
            `UPDATE agendamentos
             SET data_hora = ?, status = ?, descricao = ?, id_veiculo = ?
             WHERE id_agendamento = ?`,
            [
                agendamento.data_hora,
                agendamento.status,
                agendamento.descricao,
                agendamento.id_veiculo,
                id
            ]
        );

        return resultado.affectedRows > 0;
    }

    async excluir(id) {
        const [resultado] = await conexao.execute(
            'DELETE FROM agendamentos WHERE id_agendamento = ?',
            [id]
        );

        return resultado.affectedRows > 0;
    }
}

module.exports = new AgendamentoRepository();
