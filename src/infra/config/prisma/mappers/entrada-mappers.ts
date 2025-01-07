import { Entrada } from "@prisma/client";
import { EntradaSaldo } from "../../../../app/entities/Entrada-saldo";

export class EntradaMappers {

  static toPrisma({ id, valor, descricao, meioPagamento, userId, dtcadastro }: EntradaSaldo) {
    return {
      id,
      valor,
      descricao,
      meioPagamento,
      userId,
      dtcadastro
    }
  }

  static toDomain({ id, valor, descricao, meioPagamento, userId, dtcadastro }: Entrada) {
    return new EntradaSaldo({
      valor,
      descricao,
      meioPagamento,
      userId,
      dtcadastro
    }, id)
  }

  static toDomains(raws: { id, valor, descricao, meioPagamento, userId, dtcadastro }[]): EntradaSaldo[] {
    return raws.map(this.toDomain)
  }
}