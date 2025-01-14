export class ValorParaSaque extends Error {
  constructor() {
    super('O valor para saque precisa ser maior que Zero!')
  }
}