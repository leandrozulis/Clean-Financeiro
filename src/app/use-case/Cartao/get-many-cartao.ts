import { Cartao } from "../../entities/Cartao";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContaRepository } from "../../repository/conta-repository";

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
      throw new Error('Conta não localizada cadastrada!')
    }

    const cartoes = await this.cartoesRepository.findManyCartao()

    if (!cartoes) {
      throw new Error('Não existem cartões cadastradas!')
    }

    return {
      cartoes
    }

  }
}