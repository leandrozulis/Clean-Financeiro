import { EntradaSaldo } from "../../entities/Entrada-saldo";
import { ContaRepository } from "../../repository/conta-repository";
import { EntradaRepository } from "../../repository/entrada-repository";

interface UpdateEntradaRequest {
  entradaId: string
  valor?: number
  descricao?: string
  meioPagamento?: string
  token: string
}

interface UpdateEntradaResponse {
  entrada: EntradaSaldo
}


export class UpdateEntradaUseCase {
  constructor(
    private entradaRepository: EntradaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ entradaId, valor, descricao, meioPagamento, token }: UpdateEntradaRequest): Promise<UpdateEntradaResponse> {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new Error('Conta não localizada!')
    }

    const findEntrada = await this.entradaRepository.getById(entradaId)

    if (!findEntrada) {
      throw new Error('Entrada não localizada!')
    }

    const updatedValor = valor ?? findEntrada.valor;

    const entrada = new EntradaSaldo({
      valor: updatedValor,
      descricao: descricao ?? findEntrada.descricao,
      meioPagamento: meioPagamento ?? findEntrada.meioPagamento,
      userId: conta.id,
      dtcadastro: findEntrada.dtcadastro
    }, findEntrada.id)

    await this.entradaRepository.update(findEntrada.id, entrada)

    if (updatedValor < findEntrada.valor) {
      let newValue = findEntrada.valor - updatedValor
      conta.saida(newValue)
    } else if (updatedValor > findEntrada.valor) {
      let newValue = updatedValor - findEntrada.valor
      conta.entrada(newValue)
    } else {
      conta.saldo
    }

    await this.contaRepository.updateSaldo(conta.id, conta.saldo)

    return {
      entrada
    }
  }
}