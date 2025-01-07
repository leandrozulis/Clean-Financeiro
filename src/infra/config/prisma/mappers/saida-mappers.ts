import { Saida } from "@prisma/client";
import { SaidaSaldo } from "../../../../app/entities/Saida-saldo";

export class SaidaMappers {
  static toPrisma({ id, valor, descricao, meioPagamento, userId, dtcadastro }: SaidaSaldo) {
    return {
      id,
      valor,
      descricao,
      meioPagamento,
      userId,
      dtcadastro
    }
  }

  static toDomain({ id, valor, descricao, meioPagamento, userId, dtcadastro }: Saida) {
    return new SaidaSaldo({
      valor,
      descricao,
      meioPagamento,
      userId,
      dtcadastro
    }, id)
  }

  static toDomains(raws: { id, valor, descricao, meioPagamento, userId, dtcadastro }[]): SaidaSaldo[] {
    return raws.map(this.toDomain)
  }
}