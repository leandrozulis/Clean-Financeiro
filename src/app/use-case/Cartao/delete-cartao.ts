import { Cartao } from "../../entities/Cartao";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContaRepository } from "../../repository/conta-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";
import { ErroAoDeletarCartao } from "./Erros/erroAoDeletarCartao";

interface DeleteCartaoUseCaseRequest {
  cartaoId: string
  token: string
}

interface DeleteCartaoUseCaseResponse {
  cartao: Cartao
}

export class DeleteCartaoUseCase {

  constructor(
    private cartoesRepository: CartoesRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ cartaoId, token }: DeleteCartaoUseCaseRequest): Promise<DeleteCartaoUseCaseResponse> {

    try {
    const cartao = await this.cartoesRepository.delete(cartaoId)
    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    if (!cartao) {
      throw new RegistroNaoEncontrado()
    }

    return {
      cartao
    }
      
    } catch (error) {
      throw new ErroAoDeletarCartao()
    }

  }

}