import { EntradaSaldo } from "../../src/app/entities/Entrada-saldo";
import { EntradaRepository } from "../../src/app/repository/entrada-repository";

export class InMemoryEntradaRepository implements EntradaRepository {

  public entradas: EntradaSaldo[] = []

  async register(data: EntradaSaldo): Promise<void> {
    await this.entradas.push(data)
  }

  async delete(id: string): Promise<EntradaSaldo | null> {
    const index = await this.entradas.findIndex(el => el.id === id)

    if (index === -1) {
      return null
    }

    const [remove] = await this.entradas.splice(index, 1)

    return remove

  }

  async getById(id: string): Promise<EntradaSaldo | null> {
    const getId = await this.entradas.find(el => el.id === id)

    if (!getId) {
      return null
    }

    return getId
  }

  async update(id: string, data: EntradaSaldo): Promise<EntradaSaldo | null> {

    let findEntrada = await this.entradas.findIndex(el => el.id === id)

    if (findEntrada === -1) {
      throw new Error('Entrada não encontrada');
    }

    return this.entradas[findEntrada] = data

  }

  async findManyEntrada(): Promise<EntradaSaldo[] | null> {

    const findEntradas = await this.entradas

    if (!findEntradas) {
      return null
    }

    return findEntradas
  }

}