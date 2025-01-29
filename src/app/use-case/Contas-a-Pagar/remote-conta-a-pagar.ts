import { ContasAPagar } from "../../entities/Contas_a_Pagar";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContasAPagarRepository } from "../../repository/conta-a-pagar-repository";
import { ContaRepository } from "../../repository/conta-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";
import { ErrorAumentarLimite } from "./Erros/aumentar-limite-erro";

interface DeleteContaAPagarUseCaseRequest {
  contaapagarId: string
  cartaoId: string
  token: string
}

interface DeleteContaAPagarUseCaseResponse {
  contaapagar: ContasAPagar
}

export class DeleteContaAPagarUseCase {

  constructor(
    private contaapagarRepository: ContasAPagarRepository,
    private cartaoRepository: CartoesRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ contaapagarId, cartaoId, token }: DeleteContaAPagarUseCaseRequest): Promise<DeleteContaAPagarUseCaseResponse> {

    const contaapagar = await this.contaapagarRepository.delete(contaapagarId)
    const conta = await this.contaRepository.findByToken(token)
    const cartao = await this.cartaoRepository.getById(cartaoId)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    if (!cartao) {
      throw new RegistroNaoEncontrado()
    }

    if (!contaapagar) {
      throw new RegistroNaoEncontrado()
    }

    try {
      cartao.entrada(contaapagar.valor)
      await this.cartaoRepository.updateSaldo(cartao.id, cartao.limite)
      return {
        contaapagar
      }
    } catch (error) {
      throw new ErrorAumentarLimite()
    }

  }

}