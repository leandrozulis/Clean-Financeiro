import { ContasAPagar } from "../entities/Contas_a_Pagar"

export interface ContasAPagarRepository {
  register(data: ContasAPagar): Promise<void>
  delete(id: string): Promise<ContasAPagar | null>
  findManyContasAPagar(cartaoId: string): Promise<ContasAPagar[] | null>
  getById(id: string): Promise<ContasAPagar | null>
  quitarParcela(id: string, data: ContasAPagar): Promise<ContasAPagar | null>
}