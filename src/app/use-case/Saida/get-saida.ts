import { SaidaSaldo } from "../../entities/Saida-saldo";
import { ContaRepository } from "../../repository/conta-repository";
import { SaidaRepository } from "../../repository/saida-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";

interface GetBySaidaUseCaseRequest {
  saidaId: string
  token: string
}

interface GetBySaidaUseCaseResponse {
  saida: SaidaSaldo
}

export class GetBySaidaUseCase {
  constructor(
    private saidaRepository: SaidaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ saidaId, token }: GetBySaidaUseCaseRequest): Promise<GetBySaidaUseCaseResponse> {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    const saida = await this.saidaRepository.getById(saidaId)

    if (!saida) {
      throw new RegistroNaoEncontrado()
    }

    return {
      saida
    }
  }
}