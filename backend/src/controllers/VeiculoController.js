const VeiculoService = require('../services/VeiculoService');

class VeiculoController {
    async listar(req, res) {
        const resultado = await VeiculoService.listarVeiculos();
        return res.json(resultado.dados);
    }

    async buscarPorId(req, res) {
        const resultado = await VeiculoService.buscarVeiculoPorId(req.params.id);
        return res.status(resultado.sucesso ? 200 : 404).json(
            resultado.sucesso ? resultado.dados : { mensagem: resultado.mensagem }
        );
    }

    async criar(req, res) {
        const resultado = await VeiculoService.criarVeiculo(req.body);

        if (!resultado.sucesso) {
            return res.status(resultado.status || 404).json({ mensagem: resultado.mensagem });
        }

        return res.status(201).json(resultado.dados);
    }

    async atualizar(req, res) {
        const resultado = await VeiculoService.atualizarVeiculo(req.params.id, req.body);

        if (!resultado.sucesso) {
            return res.status(resultado.status || 404).json({ mensagem: resultado.mensagem });
        }

        return res.json(resultado.dados);
    }

    async excluir(req, res) {
        const resultado = await VeiculoService.excluirVeiculo(req.params.id);
        return res.status(resultado.sucesso ? 200 : 404).json({ mensagem: resultado.mensagem });
    }
}

module.exports = new VeiculoController();
