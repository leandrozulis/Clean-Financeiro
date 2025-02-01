import { ContaRepository } from "../../repository/conta-repository";
import { RendaFixaRepository } from "../../repository/renda-fixa-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";

interface GetManyRendaFixasUseCaseRequest {
  token: string
}

export class GetManyRendaFixasUseCase {
  constructor(
    private rendaFixaRepository: RendaFixaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ token }: GetManyRendaFixasUseCaseRequest) {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    const rendaFixas = await this.rendaFixaRepository.findManyRendaFixa(conta.id)

    if (!rendaFixas) {
      throw new Error('Não existem RendaFixas cadastradas!')
    }

    return {
      rendaFixas
    }

  }
}