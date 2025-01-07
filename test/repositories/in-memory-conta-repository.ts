import { Conta } from "../../src/app/entities/Conta";
import { ContaRepository } from "../../src/app/repository/conta-repository";

export class InMemoryContaRepository implements ContaRepository {

  public contas: Conta[] = []

  async create(data: Conta): Promise<void> {
    await this.contas.push(data)
  }

  async findByToken(token: string): Promise<Conta | null> {
    const findToken = await this.contas.find((el) => el.token === token)

    if (!findToken) {
      return null
    }

    return findToken
  }

  async findByEmail(email: string): Promise<Conta | null> {
    const findEmail = await this.contas.find((el) => el.email === email)

    if (!findEmail) {
      return null
    }

    return findEmail
  }

  async findByName(nome: string): Promise<Conta | null> {
    const findName = await this.contas.find((el) => el.nome === nome)

    if (!findName) {
      return null
    }

    return findName
  }

  async updateSaldo(id: string, saldo: number): Promise<Conta | null> {
    const findId = await this.contas.find((el) => el.id === id)

    if (!findId) {
      return null
    }

    findId.saldo = saldo

    return findId
  }

  async findByProfile(token: string): Promise<Conta | null> {
    const findProfile = await this.contas.find(el => el.token === token)

    if (!findProfile) {
      return null
    }

    return findProfile
  }

  async findManyProfile(): Promise<Conta[] | null> {
    const findProfiles = await this.contas

    if (!findProfiles) {
      return null
    }

    return findProfiles
  }
}