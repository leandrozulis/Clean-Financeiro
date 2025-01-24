import { ContasAPagar } from "../../../../app/entities/Contas_a_Pagar";

export class ContaAPagarView {
  static createContaAPagar({ id, valor, descricao, parcelas, pago, cartaoId, userId, dtcadastro }: ContasAPagar) {
    return { id, valor, descricao, parcelas, pago, cartaoId, userId, dtcadastro }
  }
}