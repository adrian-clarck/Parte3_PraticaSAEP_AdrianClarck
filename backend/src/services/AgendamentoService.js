const AgendamentoRepository = require('../repositories/AgendamentoRepository');
const VeiculoRepository = require('../repositories/VeiculoRepository');

class AgendamentoService {
    async listarAgendamentos() {
        return {
            sucesso: true,
            dados: await AgendamentoRepository.listarTodos()
        };
    }

    async buscarAgendamentoPorId(id) {
        const agendamento = await AgendamentoRepository.buscarPorId(id);

        if (!agendamento) {
            return { sucesso: false, mensagem: 'Agendamento não encontrado' };
        }

        return { sucesso: true, dados: agendamento };
    }

    async criarAgendamento(agendamento) {
        if (!agendamento.id_veiculo) {
            return { sucesso: false, status: 400, mensagem: 'id_veiculo é obrigatório' };
        }

        if (!(await VeiculoRepository.buscarPorId(agendamento.id_veiculo))) {
            return { sucesso: false, status: 400, mensagem: 'Veículo não encontrado' };
        }

        return {
            sucesso: true,
            dados: await AgendamentoRepository.criar(agendamento)
        };
    }

    async atualizarAgendamento(id, agendamento) {
        if (!agendamento.id_veiculo) {
            return { sucesso: false, status: 400, mensagem: 'id_veiculo é obrigatório' };
        }

        if (!(await VeiculoRepository.buscarPorId(agendamento.id_veiculo))) {
            return { sucesso: false, status: 400, mensagem: 'Veículo não encontrado' };
        }

        const atualizado = await AgendamentoRepository.atualizar(id, agendamento);

        if (!atualizado) {
            return { sucesso: false, mensagem: 'Agendamento não encontrado' };
        }

        return this.buscarAgendamentoPorId(id);
    }

    async excluirAgendamento(id) {
        const excluido = await AgendamentoRepository.excluir(id);

        if (!excluido) {
            return { sucesso: false, mensagem: 'Agendamento não encontrado' };
        }

        return { sucesso: true, mensagem: 'Agendamento excluído com sucesso' };
    }
}

module.exports = new AgendamentoService();
