import { hash } from "bcrypt"
import { Conta } from "../../entities/Conta"
import { ContaRepository } from "../../repository/conta-repository"

interface CreateContaUseCaseRequest {
  email: string
  senha: string
  nome: string
  saldo?: number
}

interface CreateContaUseCaseResponse {
  conta: Conta
}

export class CreateContaUseCase {
  constructor(
    private contaRepository: ContaRepository
  ) { }

  async execute({ email, senha, nome, saldo }: CreateContaUseCaseRequest): Promise<CreateContaUseCaseResponse> {

    const findEmail = await this.contaRepository.findByEmail(email)

    if (findEmail) {
      throw new Error('Já existe uma conta com esse e-mail!')
    }

    const conta = new Conta({
      email,
      senha: await hash(senha, 6),
      nome,
      saldo: saldo ?? 0
    })

    await this.contaRepository.create(conta)

    return {
      conta
    }

  }
}