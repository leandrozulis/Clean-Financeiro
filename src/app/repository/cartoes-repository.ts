import { Cartao } from "../entities/Cartao";

export interface CartoesRepository {
  register(data: Cartao): Promise<void>
}