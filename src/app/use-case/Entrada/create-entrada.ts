import { EntradaSaldo } from "../../entities/Entrada-saldo"
import { ContaRepository } from "../../repository/conta-repository"
import { EntradaRepository } from "../../repository/entrada-repository"
import { ErroAoRegistrarEntrada } from "./Erros/erro_ao_registrar_entrada"
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado"
import { ValorParaDeposito } from "./Erros/valor_para_deposito"

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
      throw new RegistroNaoEncontrado()
    }

    if (valor <= 0) {
      throw new ValorParaDeposito()
    }

    const newEntrada = new EntradaSaldo({
      userId: conta.id,
      token,
      valor,
      descricao,
      meioPagamento
    })

    try {
      await this.entradaRepository.register(newEntrada)
      conta.entrada(valor)
      await this.contaRepository.updateSaldo(conta.id, conta.saldo)

      return {
        newEntrada
      }
    } catch (error) {
      throw new ErroAoRegistrarEntrada()
    }

  }
}