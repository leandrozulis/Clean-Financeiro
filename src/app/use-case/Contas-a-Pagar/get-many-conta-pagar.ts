import { Cartao } from "../../entities/Cartao";
import { ContasAPagar } from "../../entities/Contas_a_Pagar";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContasAPagarRepository } from "../../repository/conta-a-pagar-repository";
import { ContaRepository } from "../../repository/conta-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";

interface GetManyContaAPagarUseCaseRequest {
  token: string
  cartaoId: string
}

interface GetManyContaAPagarUseCaseResponse {
  contaApagar: ContasAPagar[]
}

export class GetManyContaApagarUseCase {
  constructor(
    private contaApagarRepository: ContasAPagarRepository,
    private cartaoRepository: CartoesRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ token, cartaoId }: GetManyContaAPagarUseCaseRequest): Promise<GetManyContaAPagarUseCaseResponse> {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    const cartao = await this.cartaoRepository.getById(cartaoId)

    if (!cartao) {
      throw new RegistroNaoEncontrado()
    }

    const contaApagar = await this.contaApagarRepository.findManyContasAPagar(cartaoId)

    if (!contaApagar) {
      throw new RegistroNaoEncontrado()
    }

    return {
      contaApagar
    }

  }
}