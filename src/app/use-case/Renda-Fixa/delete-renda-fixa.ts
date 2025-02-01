import { RendaFixa } from "../../entities/Renda_Fixa"
import { ContaRepository } from "../../repository/conta-repository"
import { RendaFixaRepository } from "../../repository/renda-fixa-repository"
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado"

interface DeleteRendaFixaUseCaseRequest {
  rendaFixaId: string
  token: string
}

interface DeleteRendaFixaUseCaseResponse {
  rendaFixa: RendaFixa
}

export class DeleteRendaFixaUseCase {

  constructor(
    private rendaFixaRepository: RendaFixaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ rendaFixaId, token }: DeleteRendaFixaUseCaseRequest): Promise<DeleteRendaFixaUseCaseResponse> {
    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    const rendaFixa = await this.rendaFixaRepository.remove(rendaFixaId)

    if (!rendaFixa) {
      throw new Error('Não existem RendaFixas cadastradas!')
    }

    try {
      conta.entrada(rendaFixa.valor)
      await this.contaRepository.updateSaldo(conta.id, conta.saldo)
      return {
        rendaFixa
      }
    } catch (error) {
      throw new Error('Erro interno no servidor!!')
    }
  }
}

