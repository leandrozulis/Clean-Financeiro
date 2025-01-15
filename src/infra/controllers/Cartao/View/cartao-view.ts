import { Cartao } from "../../../../app/entities/Cartao";

export class CartaoView {
  static createCartao({ id, descricao, nomeBanco, userId, limite, dtfechamento, dtvencimento }: Cartao) {
    return {
      id,
      descricao,
      nomeBanco,
      userId,
      limite,
      dtfechamento,
      dtvencimento
    }
  }
}