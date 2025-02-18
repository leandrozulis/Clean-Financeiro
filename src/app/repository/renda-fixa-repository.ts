import { RendaFixa } from "../entities/Renda_Fixa"

export interface RendaFixaRepository {
  register(data: RendaFixa): Promise<void>
  remove(rendaFixaId: string): Promise<RendaFixa | null>
  findManyRendaFixa(userId: string): Promise<RendaFixa[] | null>
  getById(id: string): Promise<RendaFixa | null>
  updateSaldo(id: string, valor: number): Promise<RendaFixa | null>
}