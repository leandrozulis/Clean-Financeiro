import { ContasAPagar } from "../../../../app/entities/Contas_a_Pagar";

export class ContaAPagarView {
  static createContaAPagar({ id, valor, descricao, parcelas, pago, valorPago, parcelaPaga, cartaoId, userId, dtcadastro }: ContasAPagar) {
    return { id, valor, descricao, parcelas, pago, valorPago, parcelaPaga, cartaoId, userId, dtcadastro }
  }

  static getByContaAPagar({ id, valor, descricao, parcelas, pago, valorPago, parcelaPaga, dtcadastro }: ContasAPagar) {
    return { id, valor, descricao, parcelas, pago, valorPago, parcelaPaga, dtcadastro }
  }

  static getAllContasAPagar(contasAPagar: ContasAPagar[]): any[] {
    return contasAPagar.map((contaAPagar) => ({
      id: contaAPagar.id,
      valor: contaAPagar.valor,
      descricao: contaAPagar.descricao,
      parcelas: contaAPagar.parcelas,
      valorPago: contaAPagar.valorPago,
      parcelaPaga: contaAPagar.parcelaPaga,
      pago: contaAPagar.pago,
      cartaoId: contaAPagar.cartaoId,
      userId: contaAPagar.userId,
      dtcadastro: contaAPagar.dtcadastro
    }))
  }

  static deleteContaAPagar({ valor, descricao, parcelas, pago, valorPago, parcelaPaga, dtcadastro }: ContasAPagar) {
    return { valor, descricao, parcelas, pago, valorPago, parcelaPaga, dtcadastro }
  }

  static updateContaAPagar({ id, valor, descricao, parcelas, pago, valorPago, parcelaPaga }: ContasAPagar) {
    return { id, valor, descricao, parcelas, pago, valorPago, parcelaPaga }
  }
}