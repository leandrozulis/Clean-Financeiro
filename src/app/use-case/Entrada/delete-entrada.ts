import { EntradaSaldo } from "../../entities/Entrada-saldo";
import { ContaRepository } from "../../repository/conta-repository";
import { EntradaRepository } from "../../repository/entrada-repository";

interface DeleteEntradaUseCaseRequest {
  entradaId: string
  token: string
}

interface DeleteEntradaUseCaseResponse {
  entrada: EntradaSaldo
}

export class DeleteEntradaUseCase {

  constructor(
    private entradaRepository: EntradaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ entradaId, token }: DeleteEntradaUseCaseRequest): Promise<DeleteEntradaUseCaseResponse> {

    const entrada = await this.entradaRepository.delete(entradaId)
    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new Error('Conta não localizada')
    }

    if (!entrada) {
      throw new Error('Entrada não encontrada')
    }

    conta.saida(entrada.valor)

    await this.contaRepository.updateSaldo(conta.id, conta.saldo)

    return {
      entrada
    }

  }

}