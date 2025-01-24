import { ContasAPagar } from "../entities/Contas_a_Pagar"

export interface ContasAPagarRepository {
  register(data: ContasAPagar): Promise<void>
  delete(id: string): Promise<ContasAPagar | null>
  findManyContasAPagar(): Promise<ContasAPagar[] | null>
  getById(id: string): Promise<ContasAPagar | null>
}