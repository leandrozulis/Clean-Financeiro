import { compare } from "bcrypt"
import { Conta } from "../../entities/Conta"
import { ContaRepository } from "../../repository/conta-repository"

interface AuthenticateUseCaseRequest {
  email: string
  senha: string
}

interface AuthenticateUseCaseResponse {
  account: Conta
}

export class AuthenticateUseCase {

  constructor(
    private contaRepository: ContaRepository
  ) { }

  async execute({ email, senha }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

    const account = await this.contaRepository.findByEmail(email)

    if (!account) {
      throw new Error('E-mail ou senha incorretos!')
    }

    const doesPasswordMatched = await compare(senha, account.senha)

    if (!doesPasswordMatched) {
      throw new Error('E-mail ou senha incorretos!')
    }

    return {
      account
    }

  }

}