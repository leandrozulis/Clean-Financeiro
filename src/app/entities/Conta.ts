import { randomUUID } from "crypto"
import { Replace } from "../../helpers/Replace"

export interface ContaSchema {
  email: string
  senha: string
  nome: string
  saldo: number,
  token: string,
  dtcadastro: Date,
  dtatualizacao?: Date
}

export class Conta {

  private _id: string
  private props: ContaSchema

  constructor(
    props: Replace<ContaSchema, { dtcadastro?: Date, dtatualizacao?: Date, token?: string }>,
    id?: string
  ) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      token: props.token ?? randomUUID(),
      saldo: props.saldo ?? 0,
      dtcadastro: props.dtcadastro ?? new Date(),
      dtatualizacao: props.dtatualizacao ?? new Date()
    }
  }

  get id(): string {
    return this._id
  }

  get email(): string {
    return this.props.email
  }

  get senha(): string {
    return this.props.senha
  }

  get nome(): string {
    return this.props.nome
  }

  get saldo(): number {
    return this.props.saldo
  }

  get dtcadastro(): Date {
    return this.props.dtcadastro
  }

  get dtatualizacao(): Date | null | undefined {
    return this.props.dtatualizacao
  }

  get token(): string {
    return this.props.token
  }

  set email(email: string) {
    this.props.email = email
  }

  set senha(senha: string) {
    this.props.senha = senha
  }

  set nome(nome: string) {
    this.props.nome = nome
  }

  set saldo(saldo: number) {
    this.props.saldo = saldo
  }

  set dtcadastro(dtcadastro: Date) {
    this.props.dtcadastro = dtcadastro
  }

  entrada(valor: number) {
    return this.props.saldo += valor;
  }

  saida(valor: number) {
    return this.props.saldo -= valor;
  }

}