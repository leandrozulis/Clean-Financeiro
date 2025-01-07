import { SaidaSaldo } from "../../entities/Saida-saldo"
import { ContaRepository } from "../../repository/conta-repository"
import { SaidaRepository } from "../../repository/saida-repository"

interface SaidaSaldoUseCaseRequest {
  token: string
  valor: number
  descricao: string
  meioPagamento: string
}

interface SaidaSaldoUseCaseResponse {
  newSaida: SaidaSaldo
}

export class SaidaSaldoUseCase {
  constructor(
    private SaidaRepository: SaidaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ token, valor, descricao, meioPagamento }: SaidaSaldoUseCaseRequest): Promise<SaidaSaldoUseCaseResponse> {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new Error('Conta não localizada!')
    }

    if (conta.saldo < valor) {
      throw new Error('A conta não contem valor para Saque!')
    }

    const newSaida = new SaidaSaldo({
      userId: conta.id,
      token,
      valor,
      descricao,
      meioPagamento
    })

    await this.SaidaRepository.register(newSaida)

    conta.saida(valor)

    await this.contaRepository.updateSaldo(conta.id, conta.saldo)

    return {
      newSaida
    }

  }
}