import { ContasAPagar } from "../../entities/Contas_a_Pagar";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContasAPagarRepository } from "../../repository/conta-a-pagar-repository";
import { ContaRepository } from "../../repository/conta-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";

interface QuitarParcelaUseCaseRequest { 
  contaapagarId: string
  valorPago: string
  token: string
  cartaoId: string
}

interface QuitarParcelaUseCaseResponse { 
  contaapagar: ContasAPagar
}

export class QuitarParcelaUseCase {
  constructor(
    private contaapagarRepository: ContasAPagarRepository,
    private cartaoRepository: CartoesRepository,
    private contaRepository: ContaRepository
    
  ) { }
  
  async execute({ contaapagarId, valorPago, token, cartaoId }: QuitarParcelaUseCaseRequest): Promise<QuitarParcelaUseCaseResponse> {
    const conta = await this.contaRepository.findByToken(token)
    const cartao = await this.cartaoRepository.getById(cartaoId)
    const contaapagar = await this.contaapagarRepository.getById(contaapagarId)

    if (!conta) {
      throw new RegistroNaoEncontrado()
    }

    if (!cartao) {
      throw new RegistroNaoEncontrado()
    }

    if (!contaapagar) {
      throw new RegistroNaoEncontrado()
    }

    const parcelasPagas = parseInt(contaapagar.parcelaPaga) + 1;
    const novoValorPago = contaapagar.valorPago + valorPago;

    const updateDate = {
      valorPago: novoValorPago,
      parcelaPaga: parcelasPagas.toString()
    }

    if (parcelasPagas === parseInt(contaapagar.parcelas) && parseFloat(novoValorPago) === Number(contaapagar.valor)) {
      contaapagar.contaPaga()
    }

    try {
      this.contaapagarRepository.quitarParcela(contaapagarId, updateDate)
      cartao.entrada(Number(valorPago))
      await this.cartaoRepository.updateSaldo(cartao.id, cartao.limite)
      return {
        contaapagar
      }
    } catch (error) {
      throw new Error("Ops, deu erro!!")
    }
  }
}