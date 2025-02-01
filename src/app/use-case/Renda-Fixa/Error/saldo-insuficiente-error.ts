export class SaldoInsuficienteError extends Error {
  constructor() {
    super('Saldo insuficiente na Conta!')
  }
}