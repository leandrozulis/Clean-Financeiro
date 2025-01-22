import { Cartao } from "../entities/Cartao";

export interface CartoesRepository {
  register(data: Cartao): Promise<void>
  delete(id: string): Promise<Cartao | null>
  findManyCartao(): Promise<Cartao[] | null>
  getById(id: string): Promise<Cartao | null>
}