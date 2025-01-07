import { EntradaSaldo } from "../../entities/Entrada-saldo"
import { ContaRepository } from "../../repository/conta-repository"
import { EntradaRepository } from "../../repository/entrada-repository"

interface EntradaSaldoUseCaseRequest {
  token: string
  valor: number
  descricao: string
  meioPagamento: string
}

interface EntradaSaldoUseCaseResponse {
  newEntrada: EntradaSaldo
}

export class EntradaSaldoUseCase {
  constructor(
    private entradaRepository: EntradaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ token, valor, descricao, meioPagamento }: EntradaSaldoUseCaseRequest): Promise<EntradaSaldoUseCaseResponse> {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new Error('Conta não localizada!')
    }

    if (valor <= 0) {
      throw new Error('O valor para depositório precisa ser maior que Zero!')
    }

    const newEntrada = new EntradaSaldo({
      userId: conta.id,
      token,
      valor,
      descricao,
      meioPagamento
    })

    await this.entradaRepository.register(newEntrada)

    conta.entrada(valor)

    await this.contaRepository.updateSaldo(conta.id, conta.saldo)

    return {
      newEntrada
    }

  }
}