import { EntradaSaldoSchema } from "../../src/app/entities/Entrada-saldo";

type EntradaSchemaMake = Partial<EntradaSaldoSchema>

export function makeRegisterEntrada(override: EntradaSchemaMake) {

  return {
    valor: 20.50,
    descricao: "Uber",
    meioPagamento: "PIX",
    userId: '',
    token: '',
    ...override
  }

}