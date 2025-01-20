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

  static deleteCartaoUseCase({ id, descricao, userId, dtcadastro, nomeBanco, dtfechamento, dtvencimento }: Cartao) {
    return {
      id,
      descricao,
      userId,
      dtcadastro,
      nomeBanco,
      dtfechamento,
      dtvencimento
    }
  }
}