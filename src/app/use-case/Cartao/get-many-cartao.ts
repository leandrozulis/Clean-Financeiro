import { Cartao } from "../../entities/Cartao";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContaRepository } from "../../repository/conta-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";

interface GetManyCartoesUseCaseRequest {
  token: string
}

interface GetManyCartoesUseCaseResponse {
  cartoes: Cartao[]
}

export class GetManyCartaoUseCase {
  constructor(
    private cartoesRepository: CartoesRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ token }: GetManyCartoesUseCaseRequest): Promise<GetManyCartoesUseCaseResponse> {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    const cartoes = await this.cartoesRepository.findManyCartao(conta.id)

    if (!cartoes) {
      throw new RegistroNaoEncontrado()
    }

    return {
      cartoes
    }

  }
}