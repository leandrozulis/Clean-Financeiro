import { ContaRepository } from "../../repository/conta-repository";
import { EntradaRepository } from "../../repository/entrada-repository";

interface GetManyEntradasUseCaseRequest {
  token: string
}

export class GetManyEntradasUseCase {
  constructor(
    private entradaRepository: EntradaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ token }: GetManyEntradasUseCaseRequest) {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new Error('Conta não cadastrada!')
    }

    const entradas = await this.entradaRepository.findManyEntrada(conta.id)

    if (!entradas) {
      throw new Error('Não existem entradas cadastradas!')
    }

    return {
      entradas
    }

  }
}