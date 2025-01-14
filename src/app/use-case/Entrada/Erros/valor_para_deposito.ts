export class ValorParaDeposito extends Error {
  constructor() {
    super('O valor para depositório precisa ser maior que Zero!')
  }
}