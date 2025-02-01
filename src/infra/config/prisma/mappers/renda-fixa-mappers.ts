import { RendaFixa as RawRendaFixa } from "@prisma/client";
import { RendaFixa } from "../../../../app/entities/Renda_Fixa";

export class RendaFixaMappers {

  static toPrisma({ id, valor, userId, dtcadastro }: RendaFixa) {
    return { id, valor, userId, dtcadastro }
  }

  static toDomain({ id, valor, userId, dtcadastro }: RawRendaFixa) {
    return new RendaFixa({
      valor,
      userId,
      dtcadastro
    }, id)
  }

  static toDomains(raws: { id, valor, userId, dtatualizacao, dtcadastro }[]): RendaFixa[] {
    return raws.map(this.toDomain)
  }

}