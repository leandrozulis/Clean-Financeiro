import { Cartao } from "../../entities/Cartao";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContaRepository } from "../../repository/conta-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";
import { ErroAoCriarCartao } from "./Erros/erroAoCriarCartao";
import { ValorLimiteMinimo } from "./Erros/valor_limite";

interface updateCartoesUseCaseRequest {
  limite?: number
  descricao?: string
  nomeBanco?: string
  dtfechamento?: string
  dtvencimento?: string
  token: string
  cartaoId: string
}

interface updateCartoesUseCaseResponse {
  newCartao: Cartao
}

export class UpdateCartaoUseCase {
  constructor(
    private cartoesRepository: CartoesRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ limite, descricao, nomeBanco, dtfechamento, dtvencimento, token, cartaoId }: updateCartoesUseCaseRequest): Promise<updateCartoesUseCaseResponse> {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    const findCartao = await this.cartoesRepository.getById(cartaoId)

    if (!findCartao) {
      throw new RegistroNaoEncontrado()
    }

    if (limite === undefined || limite < 50) {
      throw new ValorLimiteMinimo()
    }

    const updatedValor = limite ?? findCartao.limite

    const newCartao = new Cartao({
      userId: conta.id,
      limite: updatedValor,
      descricao: descricao ?? findCartao.descricao,
      nomeBanco: nomeBanco ?? findCartao.nomeBanco,
      dtfechamento: dtfechamento ?? findCartao.dtfechamento,
      dtvencimento: dtvencimento ?? findCartao.dtvencimento
    }, findCartao.id)

    try {
      await this.cartoesRepository.update(findCartao.id, newCartao)
      return {
        newCartao
      }
    } catch (error) {
      throw new ErroAoCriarCartao()
    }

  }
}