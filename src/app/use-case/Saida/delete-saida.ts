import { SaidaSaldo } from "../../entities/Saida-saldo";
import { ContaRepository } from "../../repository/conta-repository";
import { SaidaRepository } from "../../repository/saida-repository";

interface DeleteSaidaUseCaseRequest {
  saidaId: string
  token: string
}

interface DeleteSaidaUseCaseResponse {
  saida: SaidaSaldo
}

export class DeleteSaidaUseCase {

  constructor(
    private saidaRepository: SaidaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ saidaId, token }: DeleteSaidaUseCaseRequest): Promise<DeleteSaidaUseCaseResponse> {

    const saida = await this.saidaRepository.delete(saidaId)
    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new Error('Conta não localizada')
    }

    if (!saida) {
      throw new Error('Saida não encontrada')
    }

    conta.entrada(saida.valor)

    await this.contaRepository.updateSaldo(conta.id, conta.saldo)

    return {
      saida
    }

  }

}