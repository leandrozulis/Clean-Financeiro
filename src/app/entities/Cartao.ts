import { randomUUID } from "crypto"
import { Replace } from "../../helpers/Replace"

export interface CartaoSchema {
  limite: number
  descricao: string
  nomeBanco: string,
  dtfechamento: string,
  dtvencimento: string,
  userId: string
  token?: string,
  dtcadastro: Date,
  dtatualizacao?: Date
}

export class Cartao {

  private _id: string
  private props: CartaoSchema

  constructor(
    props: Replace<CartaoSchema, { dtcadastro?: Date, dtatualizacao?: Date, token?: string }>,
    id?: string
  ) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      limite: props.limite ?? 0,
      dtcadastro: props.dtcadastro ?? new Date(),
      dtatualizacao: props.dtatualizacao ?? new Date()
    }
  }

  get id(): string {
    return this._id
  }

  get limite(): number { return this.props.limite }
  get descricao(): string { return this.props.descricao }
  get nomeBanco(): string { return this.props.nomeBanco }
  get dtfechamento(): string { return this.props.dtfechamento }
  get dtvencimento(): string { return this.props.dtvencimento }
  get token(): string | null | undefined { return this.props.token }
  get userId(): string { return this.props.userId }
  get dtcadastro(): Date { return this.props.dtcadastro }
  get dtatualizacao(): Date | null | undefined { return this.props.dtatualizacao }

  set limite(limite: number) { this.props.limite = limite }
  set descricao(descricao: string) { this.props.descricao = descricao }
  set nomeBanco(nomeBanco: string) { this.props.nomeBanco = nomeBanco }
  set dtfechamento(dtfechamento: string) { this.props.dtfechamento = dtfechamento }
  set dtvencimento(dtvencimento: string) { this.props.dtvencimento = dtvencimento }
  set dtcadastro(dtcadastro: Date) { this.props.dtcadastro = dtcadastro }

  entrada(valor: number) {
    return this.props.limite += valor;
  }

  saida(valor: number) {
    return this.props.limite -= valor;
  }

}