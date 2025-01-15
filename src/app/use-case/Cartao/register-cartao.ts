import { Cartao } from "../../entities/Cartao";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContaRepository } from "../../repository/conta-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";
import { ErroAoCriarCartao } from "./Erros/erroAoCriarCartao";

interface registerCartoesUseCaseRequest {
  limite: number
  descricao: string
  nomeBanco: string
  dtfechamento: string
  dtvencimento: string
  token: string
}

interface registerCartoesUseCaseResponse {
  newCartao: Cartao
}

export class RegisterCartaoUseCase {
  constructor(
    private cartoesRepository: CartoesRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ limite, descricao, nomeBanco, dtfechamento, dtvencimento, token }: registerCartoesUseCaseRequest): Promise<registerCartoesUseCaseResponse> {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    const newCartao = new Cartao({
      userId: conta.id,
      limite,
      descricao,
      nomeBanco,
      dtfechamento,
      dtvencimento
    })

    try {
      await this.cartoesRepository.register(newCartao)
      return {
        newCartao
      }
    } catch (error) {
      throw new ErroAoCriarCartao()
    }

  }
}