import { ContaSchema } from "../../src/app/entities/Conta"

type ContaSchemaMake = Partial<ContaSchema>

export function makeCreateConta(override: ContaSchemaMake) {
  return {
    email: "teste@teste.com",
    senha: "123456",
    nome: "Leandro",
    ...override
  }
}