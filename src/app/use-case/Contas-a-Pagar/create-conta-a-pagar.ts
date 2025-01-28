import { ContasAPagar } from "../../entities/Contas_a_Pagar";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContasAPagarRepository } from "../../repository/conta-a-pagar-repository";
import { ContaRepository } from "../../repository/conta-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";
import { ErrorDiminuirLimite } from "./Erros/diminuir-limite-erro";

interface CreateContaAPagarUseCaseRequest {
  valor: number
  descricao: string
  parcelas: string
  pago?: Date
  token: string
  cartaoId: string
}

interface CreateContaAPagarUseCaseResponse {
  contaAPagar: ContasAPagar
}

export class CreateContaAPagarUseCase {

  constructor(
    private contasAPagarRepository: ContasAPagarRepository,
    private cartaoRepository: CartoesRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ valor, descricao, parcelas, pago, token, cartaoId }: CreateContaAPagarUseCaseRequest): Promise<CreateContaAPagarUseCaseResponse> {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    const cartao = await this.cartaoRepository.getById(cartaoId)

    if (!cartao) {
      throw new RegistroNaoEncontrado()
    }

    const contaAPagar = new ContasAPagar({
      userId: conta.id,
      valor,
      descricao,
      parcelas,
      pago: pago ?? null,
      token,
      cartaoId
    })

    try {
      await this.contasAPagarRepository.register(contaAPagar)
      cartao.saida(valor)
      await this.cartaoRepository.updateSaldo(cartao.id, cartao.limite)

      return {
        contaAPagar
      }
    } catch (error) {
      throw new ErrorDiminuirLimite()
    }

  }

}