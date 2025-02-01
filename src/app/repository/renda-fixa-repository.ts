import { RendaFixa } from "../entities/Renda_Fixa"

export interface RendaFixaRepository {
  register(data: RendaFixa): Promise<void>
  remove(rendaFixaId: string): Promise<RendaFixa | null>
  findManyRendaFixa(userId: string): Promise<RendaFixa[] | null>
}