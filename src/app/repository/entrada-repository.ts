import { EntradaSaldo } from "../entities/Entrada-saldo";

export interface EntradaRepository {
  register(data: EntradaSaldo): Promise<void>
  delete(id: string): Promise<EntradaSaldo | null>
  getById(id: string): Promise<EntradaSaldo | null>
  update(id: string, data: EntradaSaldo): Promise<EntradaSaldo | null>
  findManyEntrada(userId: string): Promise<EntradaSaldo[] | null>
}