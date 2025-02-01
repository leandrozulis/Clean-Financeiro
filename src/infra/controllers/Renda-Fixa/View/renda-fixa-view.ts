import { RendaFixa } from "../../../../app/entities/Renda_Fixa";

export class RendaFixaView {
  static createRendaFixa({ id, userId, valor, dtatualizacao, dtcadastro }: RendaFixa) {
    return {
      id,
      userId,
      valor,
      dtcadastro,
      dtatualizacao
    }
  }

  static deleteRendaFixa({ id, userId, valor, dtatualizacao, dtcadastro }: RendaFixa) {
    return {
      id,
      userId,
      valor,
      dtatualizacao,
      dtcadastro
    }
  }

  static getAllRendaFIxas(rendafixas: RendaFixa[]): any[] {
    return rendafixas.map((rendaFixa) => ({
      id: rendaFixa.id,
      userId: rendaFixa.userId,
      valor: rendaFixa.valor,
      dtcadastro: rendaFixa.dtcadastro,
      dtatualizacao: rendaFixa.dtatualizacao
    }))
  }
}