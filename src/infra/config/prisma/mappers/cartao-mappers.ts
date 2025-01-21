import { Cartao } from "../../../../app/entities/Cartao";
import { Cartao as RawCartao } from "@prisma/client"

export class CartaoMappers {

  static toPrisma({ id, limite, descricao, nomeBanco, dtfechamento, dtvencimento, dtcadastro, userId }: Cartao) {
    return {
      id,
      limite,
      descricao,
      nomeBanco,
      dtfechamento,
      dtvencimento,
      dtcadastro,
      userId
    }
  }

  static toDomain({ id, limite, descricao, nomeBanco, dtfechamento, dtvencimento, dtcadastro, userId }: RawCartao) {
    return new Cartao({
      limite,
      descricao,
      nomeBanco,
      dtfechamento,
      dtvencimento,
      dtcadastro,
      userId
    }, id)
  }

  static toDomains(raws: { id, limite, descricao, nomeBanco, dtfechamento, dtvencimento, dtcadastro, userId, dtatualizacao }[]): Cartao[] {
    return raws.map(this.toDomain)
  }
}