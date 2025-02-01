import { randomUUID } from "node:crypto"
import { Replace } from "../../helpers/Replace"

export interface SchemaRendaFixa {
  valor: number
  dtcadastro: Date
  dtatualizacao?: Date
  userId: string
  token?: string
}

export class RendaFixa {
  private _id: string
  private props: SchemaRendaFixa

  constructor(
    props: Replace<SchemaRendaFixa, { dtcadastro?: Date, dtatualizacao?: Date, token?: string }>,
    id?: string
  ) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      dtcadastro: props.dtcadastro ?? new Date(),
      dtatualizacao: props.dtatualizacao ?? new Date()
    }
  }

  get id(): string {
    return this._id
  }

  get valor(): number {
    return this.props.valor
  }

  get dtcadastro(): Date {
    return this.props.dtcadastro
  }

  get dtatualizacao(): Date | null | undefined {
    return this.props.dtatualizacao
  }

  get token(): string | undefined {
    return this.props.token
  }

  get userId(): string {
    return this.props.userId
  }


  set valor(valor: number) {
    this.props.valor = valor
  }

  set dtcadastro(dtcadastro: Date) {
    this.props.dtcadastro = dtcadastro
  }

  set token(token: string) {
    this.token = token
  }

  entrada(valor: number) {
    return this.props.valor += valor;
  }

  saida(valor: number) {
    return this.props.valor -= valor;
  }
}