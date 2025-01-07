import { randomUUID } from "crypto"
import { Replace } from "../../helpers/Replace"

export interface SaidaSaldoSchema {
  valor: number
  descricao: string
  meioPagamento: string
  dtcadastro: Date
  userId: string
  token?: string
}

export class SaidaSaldo {

  private _id: string
  private props: SaidaSaldoSchema

  constructor(props: Replace<SaidaSaldoSchema, { dtcadastro?: Date }>, id?: string) {
    this._id = id ?? randomUUID(),
      this.props = {
        ...props,
        dtcadastro: props.dtcadastro ?? new Date()
      }
  }

  get id(): string {
    return this._id
  }

  get valor(): number {
    return this.props.valor
  }

  get descricao(): string {
    return this.props.descricao
  }

  get meioPagamento(): string {
    return this.props.meioPagamento
  }

  get dtcadastro(): Date {
    return this.props.dtcadastro
  }

  get userId(): string {
    return this.props.userId
  }

  get token(): string | null | undefined {
    return this.props.token
  }

  set valor(valor: number) {
    this.props.valor = valor
  }

  set descricao(descricao: string) {
    this.props.descricao = descricao
  }

  set meioPagamento(meioPagamento: string) {
    this.props.meioPagamento = meioPagamento
  }

  set dtcadastro(dtcadastro: Date) {
    this.props.dtcadastro = dtcadastro
  }
}