import { Conta } from "../../entities/Conta";
import { ContaRepository } from "../../repository/conta-repository";

interface GetProfileUseCaseRequest {
  token: string
}

interface GetProfileUseCaseResponse {
  perfil: Conta
}

export class GetProfileUseCase {
  constructor(
    private contaRepository: ContaRepository
  ) { }

  async execute({ token }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {

    const perfil = await this.contaRepository.findByProfile(token)

    if (!perfil) {
      throw new Error('Não existem conta cadastradas!')
    }

    return {
      perfil
    }

  }
}