const ClienteRepository = require('../repositories/ClienteRepository');
const cpfCrypto = require('../config/cpfCrypto');

class ClienteService {
    async listarClientes(busca) {
        const clientes = await ClienteRepository.listarTodos(busca);
        return {
            sucesso: true,
            dados: clientes.map((cliente) => ({
                ...cliente,
                cpf: cpfCrypto.descriptografar(cliente.cpf)
            }))
        };
    }

    async buscarClientePorId(id) {
        const cliente = await ClienteRepository.buscarPorId(id);

        if (!cliente) {
            return { sucesso: false, mensagem: 'Cliente não encontrado' };
        }

        cliente.cpf = cpfCrypto.descriptografar(cliente.cpf);
        return { sucesso: true, dados: cliente };
    }

    async criarCliente(cliente) {
        const novoCliente = await ClienteRepository.criar({
            ...cliente,
            cpf: cpfCrypto.criptografar(cliente.cpf)
        });
        novoCliente.cpf = cpfCrypto.descriptografar(novoCliente.cpf);

        return { sucesso: true, dados: novoCliente };
    }

    async atualizarCliente(id, cliente) {
        const atualizado = await ClienteRepository.atualizar(id, {
            ...cliente,
            cpf: cpfCrypto.criptografar(cliente.cpf)
        });

        if (!atualizado) {
            return { sucesso: false, mensagem: 'Cliente não encontrado' };
        }

        return this.buscarClientePorId(id);
    }

    async excluirCliente(id) {
        const excluido = await ClienteRepository.excluir(id);

        if (!excluido) {
            return { sucesso: false, mensagem: 'Cliente não encontrado' };
        }

        return { sucesso: true, mensagem: 'Cliente excluído com sucesso' };
    }
}

module.exports = new ClienteService();
