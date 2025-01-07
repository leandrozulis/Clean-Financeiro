import { SaidaSaldo } from "../entities/Saida-saldo";

export interface SaidaRepository {
  register(data: SaidaSaldo): Promise<void>
  delete(id: string): Promise<SaidaSaldo | null>
  getById(id: string): Promise<SaidaSaldo | null>
  update(id: string, data: SaidaSaldo): Promise<SaidaSaldo | null>
  findManySaida(userId: string): Promise<SaidaSaldo[] | null>
}