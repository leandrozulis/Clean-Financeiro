import { Cartao } from "../../../../app/entities/Cartao";
import { CartoesRepository } from "../../../../app/repository/cartoes-repository";
import { CartaoMappers } from "../mappers/cartao-mappers";
import { prisma } from "../../../config/prisma";

export class CartaoPrismaRepository implements CartoesRepository {
  async register(data: Cartao): Promise<void> {
    const cartao = CartaoMappers.toPrisma(data)

    await prisma.cartao.create({
      data: cartao
    })
  }

  async delete(id: string): Promise<Cartao | null> {
    const cartao = await prisma.cartao.delete({
      where: {
        id
      }
    })

    return CartaoMappers.toDomain(cartao)
  }

  async findManyCartao(userId: string): Promise<Cartao[] | null> {
    const findManyCartao = await prisma.cartao.findMany({
      where: {
        userId
      }
    })

    return CartaoMappers.toDomains(findManyCartao)
  }

  async getById(id: string): Promise<Cartao | null> {
    const findCartao = await prisma.cartao.findFirst({
      where: {
        id
      }
    })

    if (!findCartao) {
      return null
    }

    return CartaoMappers.toDomain(findCartao)
  }

  async updateSaldo(id: string, limite: number): Promise<Cartao | null> {
    const findId = await prisma.cartao.findFirst({
      where: {
        id
      }
    })

    if (!findId) {
      return null
    }

    const cartao = await prisma.cartao.update({
      where: {
        id
      },
      data: {
        limite,
        dtatualizacao: new Date()
      }
    })

    return CartaoMappers.toDomain(cartao)
  }

  async update(id: string, data: Cartao): Promise<Cartao | null> {
    const cartaoData = CartaoMappers.toPrisma(data)

    const cartao = await prisma.cartao.update({
      where: {
        id: id
      },
      data: cartaoData
    })

    if (!cartao) {
      return null
    }

    return CartaoMappers.toDomain(cartao)
  }
}