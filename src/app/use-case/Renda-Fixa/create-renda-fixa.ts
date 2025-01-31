import { RendaFixa } from "../../entities/Renda_Fixa";
import { ContaRepository } from "../../repository/conta-repository";
import { RendaFixaRepository } from "../../repository/renda-fixa-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";

interface CreateRendaFixaRequest {
  valor: number
  token: string
}

interface CreateRendaFixaResponse {
  rendaFixa: RendaFixa
}

export class CreateRendaFixaUseCase {
  constructor(
    private rendaFixaRepository: RendaFixaRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({ valor, token }: CreateRendaFixaRequest): Promise<CreateRendaFixaResponse> {

    const conta = await this.contaRepository.findByToken(token)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    const rendaFixa = new RendaFixa({
      userId: conta.id,
      valor,
      token
    })

    try {
      await this.rendaFixaRepository.register(rendaFixa)
      conta.saida(rendaFixa.valor)
      await this.contaRepository.updateSaldo(conta.id, conta.saldo)
      return {
        rendaFixa
      }
    } catch (err) {
      console.log(err);

      return err
    }

  }
}