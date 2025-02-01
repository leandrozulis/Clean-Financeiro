import { RendaFixa } from "../entities/Renda_Fixa"

export interface RendaFixaRepository {
  register(data: RendaFixa): Promise<void>
  findManyRendaFixa(userId: string): Promise<RendaFixa[] | null>
}