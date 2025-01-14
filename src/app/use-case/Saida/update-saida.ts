import { SaidaSaldo } from "../../entities/Saida-saldo";
import { ContaRepository } from "../../repository/conta-repository";
import { SaidaRepository } from "../../repository/saida-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";
import { ValorMaiorQueOSaldo } from "./Erros/valor_maior_que_o_saldo";
import { ValorParaSaque } from "./Erros/valor_para_saque";

interface UpdateSaidaRequest {
  saidaId: string
  valor?: number
  descricao?: string
  meioPagamento?: string
  token: string
}

interface UpdateSaidaResponse {
  saida: SaidaSaldo
}


export class UpdateSaidaUseCase {
  constructor(
    private saidaRepository: SaidaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ saidaId, valor, descricao, meioPagamento, token }: UpdateSaidaRequest): Promise<UpdateSaidaResponse> {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    const findSaida = await this.saidaRepository.getById(saidaId)

    if (!findSaida) {
      throw new RegistroNaoEncontrado()
    }

    if (valor === undefined || valor <= 0) {
      throw new ValorParaSaque()
    }

    const updatedValor = valor ?? findSaida.valor;

    if (updatedValor < findSaida.valor) {
      let newValue = findSaida.valor - updatedValor
      conta.entrada(newValue)
    }

    if (updatedValor > findSaida.valor) {
      let newValue = updatedValor - findSaida.valor

      if ((conta.saldo - newValue) < 0) {
        throw new ValorMaiorQueOSaldo()
      }

      conta.saida(newValue)
    }

    const saida = new SaidaSaldo({
      valor: updatedValor,
      descricao: descricao ?? findSaida.descricao,
      meioPagamento: meioPagamento ?? findSaida.meioPagamento,
      userId: conta.id,
      dtcadastro: findSaida.dtcadastro
    }, findSaida.id)

    await this.saidaRepository.update(findSaida.id, saida)
    await this.contaRepository.updateSaldo(conta.id, conta.saldo)

    return {
      saida
    }
  }
}