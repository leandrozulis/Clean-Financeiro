export class ErroAoDeletarCartao extends Error {
  constructor() {
    super('Erro ao Deletar Cartão!')
  }
}