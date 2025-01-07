import { Conta } from "../../../../app/entities/Conta";

export class ContaView {
  static createConta({
    id,
    email,
    nome,
    saldo,
    token,
    dtcadastro
  }: Conta) {
    return {
      id,
      email,
      nome,
      saldo,
      token,
      dtcadastro
    }
  }

  static getAllProfile(contas: Conta[]): any[] {
    return contas.map((conta) => ({
      id: conta.id,
      email: conta.email,
      nome: conta.nome,
      saldo: conta.saldo,
      token: conta.token,
      dtcadastro: conta.dtcadastro
    }))
  }
}