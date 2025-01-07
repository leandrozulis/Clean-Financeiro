import { SaidaSaldo } from "../../../../app/entities/Saida-saldo";
import { SaidaRepository } from "../../../../app/repository/saida-repository";
import { SaidaMappers } from "../mappers/saida-mappers";
import { prisma } from "../../prisma"

export class SaidaPrismaRepository implements SaidaRepository {
  async register(data: SaidaSaldo): Promise<void> {
    const saida = SaidaMappers.toPrisma(data)

    await prisma.saida.create({
      data: saida
    })
  }

  async delete(id: string): Promise<SaidaSaldo | null> {

    const saida = await prisma.saida.delete({
      where: {
        id
      }
    })

    return SaidaMappers.toDomain(saida)
  }

  async getById(id: string): Promise<SaidaSaldo | null> {
    const saida = await prisma.saida.findFirst({
      where: {
        id
      }
    })

    if (!saida) {
      return null
    }

    return SaidaMappers.toDomain(saida)
  }

  async update(id: string, data: SaidaSaldo): Promise<SaidaSaldo | null> {

    const saidaRet = SaidaMappers.toPrisma(data)

    const saida = await prisma.saida.update({
      where: {
        id
      },
      data: saidaRet
    })

    if (!saida) {
      return null
    }

    return SaidaMappers.toDomain(saida)

  }

  async findManySaida(userId: string): Promise<SaidaSaldo[] | null> {
    const findManySaidas = await prisma.saida.findMany({
      where: {
        userId
      }
    })

    return SaidaMappers.toDomains(findManySaidas)
  }
}