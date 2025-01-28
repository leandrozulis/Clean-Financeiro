import { randomUUID } from "crypto"
import { Replace } from "../../helpers/Replace"

export interface CartaoSchema {
  valor: number
  descricao: string
  parcelas: string
  pago?: Date | null
  valorPago: number
  parcelaPaga: string
  cartaoId: string
  userId: string
  token?: string
  dtcadastro: Date
  dtatualizacao?: Date
}

export class ContasAPagar {

  private _id: string
  private props: CartaoSchema

  constructor(
    props: Replace<CartaoSchema, { dtcadastro?: Date, dtatualizacao?: Date, valorPago?: number, parcelaPaga?: string }>,
    id?: string
  ) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      valorPago: props.valorPago ?? 0,
      parcelaPaga: props.parcelaPaga ?? "0",
      dtcadastro: props.dtcadastro ?? new Date(),
      dtatualizacao: props.dtatualizacao ?? new Date()
    }
  }

  get id(): string {
    return this._id
  }

  get valor(): number { return this.props.valor }
  get descricao(): string { return this.props.descricao }
  get parcelas(): string { return this.props.parcelas }
  get pago(): Date | null | undefined { return this.props.pago }
  get token(): string | null | undefined { return this.props.token }
  get cartaoId(): string { return this.props.cartaoId }
  get userId(): string { return this.props.userId }
  get dtcadastro(): Date { return this.props.dtcadastro }
  get dtatualizacao(): Date | null | undefined { return this.props.dtatualizacao }
  get valorPago(): number { return this.props.valorPago }
  get parcelaPaga(): string { return this.props.parcelaPaga }

  set valor(valor: number) { this.props.valor = valor }
  set descricao(descricao: string) { this.props.descricao = descricao }
  set parcelas(parcelas: string) { this.props.parcelas = parcelas }
  set valorPago(valorPago: number) { this.props.valorPago = valorPago }
  set parcelaPaga(parcelaPaga: string) { this.props.parcelaPaga = parcelaPaga }
  set dtcadastro(dtcadastro: Date) { this.props.dtcadastro = dtcadastro }

  criaConta(valor: number) {
    return this.props.valor += valor;
  }

  removaConta(valor: number) {
    return this.props.valor -= valor;
  }

  contaPaga() {
    return this.props.pago = new Date()
  }

}