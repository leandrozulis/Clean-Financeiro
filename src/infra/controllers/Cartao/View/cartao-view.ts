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

  static getByCartao({ descricao, limite, dtcadastro, nomeBanco, dtfechamento, dtvencimento }: Cartao) {
    return {
      descricao,
      limite,
      dtcadastro,
      nomeBanco,
      dtfechamento,
      dtvencimento
    }
  }

  static getAllCartao(cartoes: Cartao[]): any[] {
    return cartoes.map((cartao) => ({
      id: cartao.id,
      descricao: cartao.descricao,
      nomeBanco: cartao.nomeBanco,
      dtfechamento: cartao.dtfechamento,
      dtvencimento: cartao.dtvencimento,
      dtcadastro: cartao.dtcadastro,
      token: cartao.token
    }))
  }

  static updateCartao({ id, descricao, nomeBanco, userId, limite, dtfechamento, dtvencimento }: Cartao) {
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