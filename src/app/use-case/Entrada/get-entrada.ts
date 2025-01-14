import { EntradaSaldo } from "../../entities/Entrada-saldo";
import { ContaRepository } from "../../repository/conta-repository";
import { EntradaRepository } from "../../repository/entrada-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";

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
      throw new RegistroNaoEncontrado()
    }

    const entrada = await this.entradaRepository.getById(entradaId)

    if (!entrada) {
      throw new RegistroNaoEncontrado()
    }

    return {
      entrada
    }
  }
}