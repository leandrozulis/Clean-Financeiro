import { EntradaSaldo } from "../../entities/Entrada-saldo";
import { ContaRepository } from "../../repository/conta-repository";
import { EntradaRepository } from "../../repository/entrada-repository";

interface GetByEntradaUseCaseRequest {
  entradaId: string
  token: string
}

interface GetByEntradaUseCaseResponse {
  entrada: EntradaSaldo
}


export class GetByEntradaUseCase {
  constructor(
    private entradaRepository: EntradaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ entradaId, token }: GetByEntradaUseCaseRequest): Promise<GetByEntradaUseCaseResponse> {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new Error('Conta não localizada!')
    }

    const entrada = await this.entradaRepository.getById(entradaId)

    if (!entrada) {
      throw new Error('Entrada não localizada!')
    }

    return {
      entrada
    }
  }
}