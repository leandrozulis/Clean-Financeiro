import { RendaFixa } from "../../../../app/entities/Renda_Fixa";
import { RendaFixaRepository } from "../../../../app/repository/renda-fixa-repository";
import { prisma } from "../../prisma";
import { RendaFixaMappers } from "../mappers/renda-fixa-mappers";

export class RendaFixaPrismaRepository implements RendaFixaRepository {

  async register(data: RendaFixa): Promise<void> {

    const renda = RendaFixaMappers.toPrisma(data)

    await prisma.rendaFixa.create({
      data: renda
    })

  }

  async findManyRendaFixa(userId: string): Promise<RendaFixa[] | null> {

    const findManyRendaFixas = await prisma.rendaFixa.findMany({
      where: {
        userId
      }
    })

    return RendaFixaMappers.toDomains(findManyRendaFixas)

  }

  async remove(id: string): Promise<RendaFixa | null> {
    const rendaFixa = await prisma.rendaFixa.delete({
      where: {
        id
      }
    })

    return RendaFixaMappers.toDomain(rendaFixa)
  }

}