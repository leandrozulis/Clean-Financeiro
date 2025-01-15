import { Cartao } from "../../src/app/entities/Cartao";
import { CartoesRepository } from "../../src/app/repository/cartoes-repository";

export class InMemoryCartaoRepository implements CartoesRepository {

  public cartoes: Cartao[] = []

  async register(data: Cartao) {
    await this.cartoes.push(data)
  }
}