import { SaidaSaldo } from "../../entities/Saida-saldo";
import { ContaRepository } from "../../repository/conta-repository";
import { SaidaRepository } from "../../repository/saida-repository";

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
      throw new Error('Conta não localizada!')
    }

    const findSaida = await this.saidaRepository.getById(saidaId)

    if (!findSaida) {
      throw new Error('Saida não localizada!')
    }

    const updatedValor = valor ?? findSaida.valor;

    if (updatedValor < findSaida.valor) {
      let newValue = findSaida.valor - updatedValor
      conta.entrada(newValue)
    }

    if (updatedValor > findSaida.valor) {
      let newValue = updatedValor - findSaida.valor

      if ((conta.saldo - newValue) < 0) {
        throw new Error('A atualização do registro ultrapassa o valor disponível para Saque')
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