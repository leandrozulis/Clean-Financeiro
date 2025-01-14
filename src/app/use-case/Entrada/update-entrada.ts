import { EntradaSaldo } from "../../entities/Entrada-saldo";
import { ContaRepository } from "../../repository/conta-repository";
import { EntradaRepository } from "../../repository/entrada-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";
import { ValorParaDeposito } from "./Erros/valor_para_deposito";

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
      throw new RegistroNaoEncontrado()
    }

    const findEntrada = await this.entradaRepository.getById(entradaId)

    if (!findEntrada) {
      throw new RegistroNaoEncontrado()
    }

    if (valor === undefined || valor <= 0) {
      throw new ValorParaDeposito()
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