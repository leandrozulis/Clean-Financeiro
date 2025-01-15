import { makeCreateCartao } from "../../../../../test/factories/make-create-cartao"
import { makeCreateConta } from "../../../../../test/factories/make-create-conta"
import { InMemoryCartaoRepository } from "../../../../../test/repositories/in-memory-cartao-repository"
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository"
import { CreateContaUseCase } from "../../Conta/create-conta"
import { RegisterCartaoUseCase } from "../register-cartao"

let sut: RegisterCartaoUseCase
let createConta: CreateContaUseCase;
let inMemoryCartaoRepository: InMemoryCartaoRepository
let inMemoryContaRepository: InMemoryContaRepository

describe('Create Cartao Use Case', () => {

  beforeEach(() => {
    inMemoryCartaoRepository = new InMemoryCartaoRepository()
    inMemoryContaRepository = new InMemoryContaRepository()
    createConta = new CreateContaUseCase(inMemoryContaRepository)
    sut = new RegisterCartaoUseCase(inMemoryCartaoRepository, inMemoryContaRepository)
  })

  it('should be able to create cartao', async () => {

    const makeconta = makeCreateConta({})
    const { conta } = await createConta.execute(makeconta)
    await inMemoryContaRepository.create(conta)

    const makeCreate = makeCreateCartao({
      userId: conta.id,
      token: conta.token
    })

    const { newCartao } = await sut.execute(makeCreate)

    await inMemoryCartaoRepository.register(newCartao)

    expect(inMemoryContaRepository.contas[0]).toEqual(conta)
    expect(inMemoryCartaoRepository.cartoes[0]).toEqual(newCartao)

  })
})