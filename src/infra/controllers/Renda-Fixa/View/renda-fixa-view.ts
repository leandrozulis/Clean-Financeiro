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
}