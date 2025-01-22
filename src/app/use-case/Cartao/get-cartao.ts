import { Cartao } from "../../entities/Cartao";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContaRepository } from "../../repository/conta-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";

interface GetByCartaoUseCaseRequest {
  cartaoId: string
  token: string
}

interface GetByCartaoUseCaseResponse {
  cartao: Cartao
}


export class GetByCartaoUseCase {
  constructor(
    private cartoesRepository: CartoesRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ cartaoId, token }: GetByCartaoUseCaseRequest): Promise<GetByCartaoUseCaseResponse> {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    const cartao = await this.cartoesRepository.getById(cartaoId)

    if (!cartao) {
      throw new RegistroNaoEncontrado()
    }

    return {
      cartao
    }
  }
}