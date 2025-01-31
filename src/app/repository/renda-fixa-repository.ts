import { RendaFixa } from "../entities/Renda_Fixa"

export interface RendaFixaRepository {
  register(data: RendaFixa): Promise<void>
}