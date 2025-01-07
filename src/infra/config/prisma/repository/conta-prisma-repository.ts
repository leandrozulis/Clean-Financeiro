import { Conta } from "../../../../app/entities/Conta";
import { ContaRepository } from "../../../../app/repository/conta-repository";
import { prisma } from "../../../config/prisma";
import { ContaMappers } from "../mappers/conta-mappers";

export class ContaPrismaRepository implements ContaRepository {

  async create(data: Conta): Promise<void> {

    const conta = ContaMappers.toPrisma(data)

    await prisma.conta.create({
      data: conta
    })
  }

  async findByToken(token: string): Promise<Conta | null> {
    const findToken = await prisma.conta.findFirst({
      where: {
        token
      }
    })

    if (!findToken) {
      return null
    }

    return ContaMappers.toDomain(findToken)
  }

  async findByEmail(email: string): Promise<Conta | null> {
    const findEmail = await prisma.conta.findUnique({
      where: {
        email
      }
    })

    if (!findEmail) {
      return null
    }

    return ContaMappers.toDomain(findEmail)
  }

  async findByName(nome: string): Promise<Conta | null> {
    const findName = await prisma.conta.findFirst({
      where: {
        nome
      }
    })

    if (!findName) {
      return null
    }

    return ContaMappers.toDomain(findName)
  }

  async updateSaldo(id: string, saldo: number): Promise<Conta | null> {

    const findId = await prisma.conta.findFirst({
      where: {
        id
      }
    })

    if (!findId) {
      return null
    }

    const conta = await prisma.conta.update({
      where: {
        id
      },
      data: {
        saldo,
        dtatualizacao: new Date()
      }
    })

    return ContaMappers.toDomain(conta)
  }

  async findByProfile(token: string): Promise<Conta | null> {

    const findAccount = await prisma.conta.findFirst({
      where: {
        token
      }
    })

    if (!findAccount) {
      return null
    }

    return ContaMappers.toDomain(findAccount)

  }

  async findManyProfile(): Promise<Conta[]> {

    const findManyAccount = await prisma.conta.findMany()

    return ContaMappers.toDomains(findManyAccount)

  }
}