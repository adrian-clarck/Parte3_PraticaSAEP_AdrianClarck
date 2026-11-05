const VeiculoRepository = require('../repositories/VeiculoRepository');
const ClienteRepository = require('../repositories/ClienteRepository');

class VeiculoService {
    async listarVeiculos() {
        return { sucesso: true, dados: await VeiculoRepository.listarTodos() };
    }

    async buscarVeiculoPorId(id) {
        const veiculo = await VeiculoRepository.buscarPorId(id);

        if (!veiculo) {
            return { sucesso: false, mensagem: 'Veículo não encontrado' };
        }

        return { sucesso: true, dados: veiculo };
    }

    async criarVeiculo(veiculo) {
        if (!veiculo.cliente_id) {
            return { sucesso: false, status: 400, mensagem: 'cliente_id é obrigatório' };
        }

        if (!(await ClienteRepository.buscarPorId(veiculo.cliente_id))) {
            return { sucesso: false, status: 400, mensagem: 'Cliente não encontrado' };
        }

        return {
            sucesso: true,
            dados: await VeiculoRepository.criar(veiculo)
        };
    }

    async atualizarVeiculo(id, veiculo) {
        if (!veiculo.cliente_id) {
            return { sucesso: false, status: 400, mensagem: 'cliente_id é obrigatório' };
        }

        if (!(await ClienteRepository.buscarPorId(veiculo.cliente_id))) {
            return { sucesso: false, status: 400, mensagem: 'Cliente não encontrado' };
        }

        const atualizado = await VeiculoRepository.atualizar(id, veiculo);

        if (!atualizado) {
            return { sucesso: false, mensagem: 'Veículo não encontrado' };
        }

        return this.buscarVeiculoPorId(id);
    }

    async excluirVeiculo(id) {
        const excluido = await VeiculoRepository.excluir(id);

        if (!excluido) {
            return { sucesso: false, mensagem: 'Veículo não encontrado' };
        }

        return { sucesso: true, mensagem: 'Veículo excluído com sucesso' };
    }
}

module.exports = new VeiculoService();
