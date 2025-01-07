import { ContaRepository } from "../../repository/conta-repository";
import { SaidaRepository } from "../../repository/saida-repository";

interface GetManySaidasUseCaseRequest {
  token: string
}

export class GetManySaidasUseCase {
  constructor(
    private saidaRepository: SaidaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ token }: GetManySaidasUseCaseRequest) {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new Error('Conta não cadastrada!')
    }

    const saidas = await this.saidaRepository.findManySaida(conta.id)

    if (!saidas) {
      throw new Error('Não existem saidas cadastradas!')
    }

    return {
      saidas
    }

  }
}