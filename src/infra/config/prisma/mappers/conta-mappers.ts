import { Conta } from "../../../../app/entities/Conta";
import { Conta as ContaRaw } from "@prisma/client"

export class ContaMappers {
  static toPrisma({ id, email, senha, nome, saldo, dtcadastro, token }: Conta) {
    return {
      id,
      email,
      senha,
      nome,
      saldo,
      dtcadastro,
      token
    }
  }

  static toDomain({ id, email, senha, nome, saldo, dtcadastro, token }: ContaRaw): Conta {
    return new Conta({
      email,
      senha,
      nome,
      saldo,
      dtcadastro,
      token,
    }, id)
  }

  static toDomains(raws: { id, email, senha, nome, saldo, dtcadastro, token, dtatualizacao }[]): Conta[] {
    return raws.map(this.toDomain)
  }
}