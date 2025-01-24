import { ContaAPagar as RawContaAPagar } from "@prisma/client"
import { ContasAPagar } from "../../../../app/entities/Contas_a_Pagar";

export class ContaAPagarMappers {

  static toPrisma({ id, valor, descricao, parcelas, pago, cartaoId, userId, dtcadastro }: ContasAPagar) {
    return { id, valor, descricao, parcelas, pago, cartaoId, userId, dtcadastro }
  }

  static toDomain({ id, valor, descricao, parcelas, pago, cartaoId, userId, dtcadastro }: RawContaAPagar) {
    return new ContasAPagar({
      valor,
      descricao,
      parcelas,
      pago,
      cartaoId,
      userId,
      dtcadastro
    }, id)
  }

  static toDomains(raws: { id, valor, descricao, parcelas, pago, cartaoId, userId, dtcadastro, dtatualizacao }[]): ContasAPagar[] {
    return raws.map(this.toDomain)
  }
}