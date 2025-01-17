import { Cartao } from "../../entities/Cartao";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContaRepository } from "../../repository/conta-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";
import { ErroAoCriarCartao } from "./Erros/erroAoCriarCartao";
import { ValorLimiteMinimo } from "./Erros/valor_limite";

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

    if (limite < 50) {
      throw new ValorLimiteMinimo()
    }

    const newCartao = new Cartao({
      userId: conta.id,
      token,
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