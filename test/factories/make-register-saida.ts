import { SaidaSaldoSchema } from "../../src/app/entities/Saida-saldo";

type SaidaSchemaMake = Partial<SaidaSaldoSchema>

export function makeRegisterSaida(override: SaidaSchemaMake) {

  return {
    valor: 20.50,
    descricao: "Uber",
    meioPagamento: "PIX",
    userId: '',
    token: '',
    ...override
  }

}