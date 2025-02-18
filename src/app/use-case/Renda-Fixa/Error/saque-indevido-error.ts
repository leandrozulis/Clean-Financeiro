export class SaqueIndevido extends Error {
  constructor() {
    super('Informe um valor para saque menor que o valor da Renda Fixa')
  }
}