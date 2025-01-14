export class ValorMaiorQueOSaldo extends Error {
  constructor() {
    super('Não é possível sacar um valor Maior que o Saldo Atual!')
  }
}