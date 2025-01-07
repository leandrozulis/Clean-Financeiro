import { EntradaSaldo } from "../../../../app/entities/Entrada-saldo";
import { EntradaRepository } from "../../../../app/repository/entrada-repository";
import { prisma } from "../../prisma";
import { EntradaMappers } from "../mappers/entrada-mappers";

export class EntradaPrismaRepository implements EntradaRepository {
  async register(data: EntradaSaldo): Promise<void> {
    const entrada = EntradaMappers.toPrisma(data)

    await prisma.entrada.create({
      data: entrada
    })
  }

  async delete(id: string): Promise<EntradaSaldo | null> {
    const entrada = await prisma.entrada.delete({
      where: {
        id
      }
    })

    return EntradaMappers.toDomain(entrada)
  }

  async getById(id: string): Promise<EntradaSaldo | null> {
    const entrada = await prisma.entrada.findFirst({
      where: {
        id
      }
    })

    if (!entrada) {
      return null
    }

    return EntradaMappers.toDomain(entrada)
  }

  async update(id: string, data: EntradaSaldo): Promise<EntradaSaldo | null> {

    const entradaData = EntradaMappers.toPrisma(data)

    const entrada = await prisma.entrada.update({
      where: {
        id: id
      },
      data: entradaData
    })

    if (!entrada) {
      return null
    }

    return EntradaMappers.toDomain(entrada)
  }

  async findManyEntrada(userId: string): Promise<EntradaSaldo[] | null> {

    const findManyEntradas = await prisma.entrada.findMany({
      where: {
        userId
      }
    })

    return EntradaMappers.toDomains(findManyEntradas)

  }

}