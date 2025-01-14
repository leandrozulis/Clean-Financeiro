export class RegistroNaoEncontrado extends Error {
  constructor() {
    super('Registro não encontrado!')
  }
}