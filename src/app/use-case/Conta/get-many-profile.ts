import { ContaRepository } from "../../repository/conta-repository";

export class GetManyProfileUseCase {
  constructor(
    private contaRepository: ContaRepository
  ) { }

  async execute() {

    const contas = await this.contaRepository.findManyProfile()

    if (!contas) {
      throw new Error('Não existem contas cadastradas!')
    }

    return {
      contas
    }

  }
}