import { ContasAPagar } from "../../entities/Contas_a_Pagar";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContasAPagarRepository } from "../../repository/conta-a-pagar-repository";
import { ContaRepository } from "../../repository/conta-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";

interface GetByContaAPagarUseCaseRequest {
  token: string
  cartaoId: string
  contaapagarId: string
}

interface GetByContaAPagarUseCaseResponse {
  contaPagar: ContasAPagar
}

export class GetByContaAPagarUseCase {
  constructor(
    private contaApagarRepository: ContasAPagarRepository,
    private cartaoRepository: CartoesRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ token, cartaoId, contaapagarId }: GetByContaAPagarUseCaseRequest): Promise<GetByContaAPagarUseCaseResponse> {

    const conta = await this.contaRepository.findByToken(token)
    const cartao = await this.cartaoRepository.getById(cartaoId)
    const contaPagar = await this.contaApagarRepository.getById(contaapagarId)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    if (!cartao) {
      throw new RegistroNaoEncontrado()
    }

    if (!contaPagar) {
      throw new RegistroNaoEncontrado()
    }

    return {
      contaPagar
    }

  }
}