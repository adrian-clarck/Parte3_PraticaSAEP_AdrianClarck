const AgendamentoService = require('../services/AgendamentoService');

class AgendamentoController {
    async listar(req, res) {
        const resultado = await AgendamentoService.listarAgendamentos();
        return res.json(resultado.dados);
    }

    async buscarPorId(req, res) {
        const resultado = await AgendamentoService.buscarAgendamentoPorId(req.params.id);
        return res.status(resultado.sucesso ? 200 : 404).json(
            resultado.sucesso ? resultado.dados : { mensagem: resultado.mensagem }
        );
    }

    async criar(req, res) {
        const resultado = await AgendamentoService.criarAgendamento(req.body);

        if (!resultado.sucesso) {
            return res.status(resultado.status || 404).json({ mensagem: resultado.mensagem });
        }

        return res.status(201).json(resultado.dados);
    }

    async atualizar(req, res) {
        const resultado = await AgendamentoService.atualizarAgendamento(req.params.id, req.body);

        if (!resultado.sucesso) {
            return res.status(resultado.status || 404).json({ mensagem: resultado.mensagem });
        }

        return res.json(resultado.dados);
    }

    async excluir(req, res) {
        const resultado = await AgendamentoService.excluirAgendamento(req.params.id);
        return res.status(resultado.sucesso ? 200 : 404).json({ mensagem: resultado.mensagem });
    }
}

module.exports = new AgendamentoController();
