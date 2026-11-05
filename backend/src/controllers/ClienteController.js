const ClienteService = require('../services/ClienteService');

class ClienteController {
    async listar(req, res) {
        const resultado = await ClienteService.listarClientes(req.query.busca || '');
        return res.json(resultado.dados);
    }

    async buscarPorId(req, res) {
        const resultado = await ClienteService.buscarClientePorId(req.params.id);
        return res.status(resultado.sucesso ? 200 : 404).json(
            resultado.sucesso ? resultado.dados : { mensagem: resultado.mensagem }
        );
    }

    async criar(req, res) {
        const resultado = await ClienteService.criarCliente(req.body);
        return res.status(201).json(resultado.dados);
    }

    async atualizar(req, res) {
        const resultado = await ClienteService.atualizarCliente(req.params.id, req.body);
        return res.status(resultado.sucesso ? 200 : 404).json(
            resultado.sucesso ? resultado.dados : { mensagem: resultado.mensagem }
        );
    }

    async excluir(req, res) {
        const resultado = await ClienteService.excluirCliente(req.params.id);
        return res.status(resultado.sucesso ? 200 : 404).json({ mensagem: resultado.mensagem });
    }
}

module.exports = new ClienteController();
