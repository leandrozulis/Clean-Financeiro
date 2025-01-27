import { ContasAPagar } from "../../../../app/entities/Contas_a_Pagar";

export class ContaAPagarView {
  static createContaAPagar({ id, valor, descricao, parcelas, pago, cartaoId, userId, dtcadastro }: ContasAPagar) {
    return { id, valor, descricao, parcelas, pago, cartaoId, userId, dtcadastro }
  }

  static getByContaAPagar({ valor, descricao, parcelas, pago, dtcadastro }: ContasAPagar) {
    return { valor, descricao, parcelas, pago, dtcadastro }
  }

  static getAllContasAPagar(contasAPagar: ContasAPagar[]): any[] {
    return contasAPagar.map((contaAPagar) => ({
      id: contaAPagar.id,
      valor: contaAPagar.valor,
      descricao: contaAPagar.descricao,
      parcelas: contaAPagar.parcelas,
      pago: contaAPagar.pago,
      cartaoId: contaAPagar.cartaoId,
      userId: contaAPagar.userId,
      dtcadastro: contaAPagar.dtcadastro
    }))
  }
}