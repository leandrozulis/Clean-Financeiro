import { EntradaSaldo } from "../../../../app/entities/Entrada-saldo";

export class EntradaView {
  static createEntrada({ id, descricao, meioPagamento, userId, valor, dtcadastro }: EntradaSaldo) {
    return {
      id,
      userId,
      descricao,
      meioPagamento,
      valor,
      dtcadastro
    }
  }

  static deleteEntrada({ id, descricao, meioPagamento, userId, valor, dtcadastro }: EntradaSaldo) {
    return {
      id,
      descricao,
      meioPagamento,
      userId,
      valor,
      dtcadastro
    }
  }

  static getByEntrada({ descricao, meioPagamento, valor, dtcadastro }: EntradaSaldo) {
    return {
      descricao,
      meioPagamento,
      valor,
      dtcadastro
    }
  }

  static retEntrada({ id, descricao, meioPagamento, userId, valor, dtcadastro }: EntradaSaldo) {
    return {
      id,
      descricao,
      meioPagamento,
      userId,
      valor,
      dtcadastro
    }
  }

  static getAllEntradas(entradas: EntradaSaldo[]): any[] {
    return entradas.map((entrada) => ({
      id: entrada.id,
      descricao: entrada.descricao,
      meioPagamento: entrada.meioPagamento,
      userId: entrada.userId,
      valor: entrada.valor,
      dtcadastro: entrada.dtcadastro
    }))
  }
}