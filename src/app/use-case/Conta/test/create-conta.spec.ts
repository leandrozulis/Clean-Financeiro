import { makeCreateConta } from "../../../../../test/factories/make-create-conta"
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository"
import { CreateContaUseCase } from "../create-conta"

let sut: CreateContaUseCase
let inMemoryContaRepository: InMemoryContaRepository

describe('Create Conta Use Case', () => {

  beforeEach(() => {
    inMemoryContaRepository = new InMemoryContaRepository()
    sut = new CreateContaUseCase(inMemoryContaRepository)
  })

  it('should be able to create account', async () => {

    const makeCreate = makeCreateConta({})

    const { conta } = await sut.execute(makeCreate)

    await inMemoryContaRepository.create(conta)

    expect(inMemoryContaRepository.contas[0]).toEqual(conta)

  })
})