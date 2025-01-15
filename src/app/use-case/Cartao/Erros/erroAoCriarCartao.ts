export class ErroAoCriarCartao extends Error {
  constructor() {
    super('Erro ao Criar o Cartão')
  }
}