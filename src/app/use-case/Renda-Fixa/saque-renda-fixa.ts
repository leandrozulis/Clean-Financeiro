import { RendaFixa } from "../../entities/Renda_Fixa"
import { ContaRepository } from "../../repository/conta-repository"
import { RendaFixaRepository } from "../../repository/renda-fixa-repository"
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado"
import { SaqueIndevido } from "./Error/saque-indevido-error"

interface SaqueRendaFixaUseCaseRequest {
  rendaFixaId: string
  token: string
  valor: number
}

interface SaqueRendaFixaUseCaseResponse {
  saqueRenda: RendaFixa
}

export class SaqueRendaFixaUseCase {

  constructor(
    private rendaFixaRepository: RendaFixaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ rendaFixaId, token, valor }: SaqueRendaFixaUseCaseRequest): Promise<SaqueRendaFixaUseCaseResponse> {
    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    const rendaFixa = await this.rendaFixaRepository.getById(rendaFixaId)

    if (!rendaFixa) {
      throw new Error('Não existem RendaFixas cadastradas!')
    }

    let newValue = rendaFixa.valor - valor

    const saqueRenda = new RendaFixa({
      valor: newValue,
      token,
      userId: conta.id
    }, rendaFixa.id)

     if (valor > rendaFixa.valor) {
        throw new SaqueIndevido()
      } else {
        rendaFixa.saida(newValue)
      }

    try {

      await this.rendaFixaRepository.updateSaldo(saqueRenda.id, saqueRenda.valor)
      conta.entrada(valor)
      await this.contaRepository.updateSaldo(conta.id, conta.saldo)
      
      return {
        saqueRenda
      }
    } catch (error) {
      throw new Error('Erro interno no servidor!!')
    }
  }
}

