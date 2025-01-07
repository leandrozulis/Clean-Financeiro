import { Conta } from "../entities/Conta";

export interface ContaRepository {
  create(data: Conta): Promise<void>
  findByToken(token: string): Promise<Conta | null>
  findByEmail(email: string): Promise<Conta | null>
  findManyProfile(): Promise<Conta[] | null>
  findByProfile(token: string): Promise<Conta | null>
  findByName(nome: string): Promise<Conta | null>
  updateSaldo(id: string, saldo: number): Promise<Conta | null>
}