import { Cartao } from "../entities/Cartao";

export interface CartoesRepository {
  register(data: Cartao): Promise<void>
  delete(id: string): Promise<Cartao | null>
  getById(id: string): Promise<Cartao | null>
  findManyCartao(userId: string): Promise<Cartao[] | null>
  updateSaldo(id: string, limite: number): Promise<Cartao | null>
  update(id: string, data: Cartao): Promise<Cartao | null>
}