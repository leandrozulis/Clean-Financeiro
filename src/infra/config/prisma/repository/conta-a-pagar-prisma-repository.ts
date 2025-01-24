import { ContasAPagar } from "../../../../app/entities/Contas_a_Pagar";
import { ContasAPagarRepository } from "../../../../app/repository/conta-a-pagar-repository";
import { prisma } from "../../prisma";
import { ContaAPagarMappers } from "../mappers/conta-a-pagar-mappers";

export class ContaAPagarPrismaRepository implements ContasAPagarRepository {
  async register(data: ContasAPagar): Promise<void> {
    const conta = ContaAPagarMappers.toPrisma(data)

    await prisma.contaAPagar.create({
      data: conta
    })
  }

  async delete(id: string): Promise<ContasAPagar | null> {
    const conta = await prisma.contaAPagar.delete({
      where: {
        id
      }
    })

    return ContaAPagarMappers.toDomain(conta)
  }

  async getById(id: string): Promise<ContasAPagar | null> {
    const conta = await prisma.contaAPagar.findFirst({
      where: {
        id
      }
    })

    if (!conta) {
      return null
    }

    return ContaAPagarMappers.toDomain(conta)
  }

  async findManyContasAPagar(): Promise<ContasAPagar[] | null> {
    const findManyConta = await prisma.contaAPagar.findMany()

    return ContaAPagarMappers.toDomains(findManyConta)
  }
}