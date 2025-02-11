import { ContasAPagar } from "../../entities/Contas_a_Pagar";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContasAPagarRepository } from "../../repository/conta-a-pagar-repository";
import { ContaRepository } from "../../repository/conta-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";

interface QuitarParcelaUseCaseRequest {
  contaapagarId: string;
  valorPago: number;
  token: string;
  cartaoId: string;
  valor?: number;
  descricao?: string;
  parcelas?: string;
  pago?: Date;
  parcelaPaga?: string;
  userId?: string;
}

interface QuitarParcelaUseCaseResponse {
  newContaAPagar: ContasAPagar;
}

export class QuitarParcelaUseCase {
  constructor(
    private contaapagarRepository: ContasAPagarRepository,
    private cartaoRepository: CartoesRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({
    contaapagarId,
    valorPago,
    token,
    cartaoId,
    valor,
    descricao,
    parcelas,
    pago
  }: QuitarParcelaUseCaseRequest): Promise<QuitarParcelaUseCaseResponse> {
    const conta = await this.contaRepository.findByToken(token);
    const cartao = await this.cartaoRepository.getById(cartaoId);
    const contaapagar = await this.contaapagarRepository.getById(contaapagarId);

    if (!conta) {
      throw new RegistroNaoEncontrado();
    }

    if (!cartao) {
      throw new RegistroNaoEncontrado();
    }

    if (!contaapagar) {
      throw new RegistroNaoEncontrado();
    }

    const parcelasPagas = parseInt(contaapagar.parcelaPaga) + 1;
    const novoValorPago = Number(contaapagar.valorPago + valorPago);

    const newContaAPagar = new ContasAPagar(
      {
        valor: valor ?? contaapagar.valor,
        descricao: descricao ?? contaapagar.descricao,
        parcelas: parcelas ?? contaapagar.parcelas,
        valorPago: novoValorPago,
        pago: pago ?? contaapagar.contaPaga(),
        parcelaPaga: parcelasPagas.toString(),
        userId: conta.id,
        cartaoId: cartao.id,
        dtcadastro: contaapagar.dtcadastro,
      },
      contaapagar.id
    );

    if (
      parcelasPagas > Number(newContaAPagar.parcelas) ||
      Number(novoValorPago) > Number(contaapagar.valor)
    ) {
      throw new Error("Número de parcelas pagas ou valor pago excede o total permitido.")
    }

    try {

      if (
        parcelasPagas === Number(newContaAPagar.parcelas) &&
        Number(novoValorPago) === Number(contaapagar.valor)
      ) {
        newContaAPagar.contaPaga();
      }

      await this.contaapagarRepository.quitarParcela(contaapagarId, newContaAPagar);
      cartao.entrada(Number(valorPago));
      await this.cartaoRepository.updateSaldo(cartao.id, cartao.limite);

      return {
        newContaAPagar,
      };
    } catch (error) {
      console.error("Erro ao quitar parcela:", error);
      throw new Error("Número de parcelas pagas ou valor pago excede o total permitido.");
    }
  }
}