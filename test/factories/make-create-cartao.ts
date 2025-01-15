import { CartaoSchema } from "../../src/app/entities/Cartao"

type CartaoSchemaMake = Partial<CartaoSchema>

export function makeCreateCartao(override: CartaoSchemaMake) {
  return {
    limite: 10000,
    descricao: "Nubank Gastos Fixos",
    nomeBanco: "Nubank",
    dtfechamento: "01",
    dtvencimento: "10",
    userId: '',
    token: '',
    ...override
  }
}