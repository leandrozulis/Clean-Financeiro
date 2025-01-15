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
}