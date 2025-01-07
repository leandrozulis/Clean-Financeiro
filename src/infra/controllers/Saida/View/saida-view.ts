import { SaidaSaldo } from "../../../../app/entities/Saida-saldo"

export class SaidaView {
  static createSaida({ id, descricao, meioPagamento, userId, valor, dtcadastro }: SaidaSaldo) {
    return {
      id,
      userId,
      descricao,
      meioPagamento,
      valor,
      dtcadastro
    }
  }

  static deleteSaida({ id, descricao, meioPagamento, userId, valor, dtcadastro }: SaidaSaldo) {
    return {
      id,
      descricao,
      meioPagamento,
      userId,
      valor,
      dtcadastro
    }
  }

  static getBySaida({ descricao, meioPagamento, valor, dtcadastro }: SaidaSaldo) {
    return {
      descricao,
      meioPagamento,
      valor,
      dtcadastro
    }
  }

  static retSaida({ id, descricao, meioPagamento, userId, valor, dtcadastro }: SaidaSaldo) {
    return {
      id,
      descricao,
      meioPagamento,
      userId,
      valor,
      dtcadastro
    }
  }

  static getManySaidas(saidas: SaidaSaldo[]) {
    return saidas.map((saida) => ({
      id: saida.id,
      descricao: saida.descricao,
      meioPagamento: saida.meioPagamento,
      userId: saida.userId,
      valor: saida.valor,
      dtcadastro: saida.dtcadastro
    }))
  }
}