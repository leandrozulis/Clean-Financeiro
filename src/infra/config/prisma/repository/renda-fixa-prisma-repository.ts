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

}