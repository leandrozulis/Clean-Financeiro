import { SaidaSaldo } from "../../src/app/entities/Saida-saldo";
import { SaidaRepository } from "../../src/app/repository/saida-repository"

export class InMemorySaidaRepository implements SaidaRepository {

  public saidas: SaidaSaldo[] = []

  async register(data: SaidaSaldo): Promise<void> {
    await this.saidas.push(data)
  }

  async delete(id: string): Promise<SaidaSaldo | null> {
    const index = await this.saidas.findIndex(el => el.id === id)

    if (index === -1) {
      return null
    }

    const [remove] = await this.saidas.splice(index, 1)

    return remove

  }

  async getById(id: string): Promise<SaidaSaldo | null> {

    const getId = await this.saidas.find(el => el.id === id)

    if (!getId) {
      return null
    }

    return getId
  }

  async update(id: string, data: SaidaSaldo): Promise<SaidaSaldo | null> {

    let findSaida = await this.saidas.findIndex(el => el.id === id)

    if (findSaida === -1) {
      throw new Error('Saida não encontrada');
    }

    return this.saidas[findSaida] = data

  }

  async findManySaida(userId: string): Promise<SaidaSaldo[] | null> {
    const findSaidas = await this.saidas

    if (!findSaidas) {
      return null
    }

    return findSaidas
  }

}