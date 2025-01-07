import { makeCreateConta } from "../../../../../test/factories/make-create-conta"
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository"
import { CreateContaUseCase } from "../create-conta"
import { GetProfileUseCase } from "../get-profile"

let createConta: CreateContaUseCase
let inMemoryContaRepository: InMemoryContaRepository
let sut: GetProfileUseCase

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    inMemoryContaRepository = new InMemoryContaRepository()
    createConta = new CreateContaUseCase(inMemoryContaRepository)
    sut = new GetProfileUseCase(inMemoryContaRepository)
  })

  it('Deve ser possível localizar um perfil', async () => {
    const makeConta1 = makeCreateConta({})

    const { conta } = await createConta.execute(makeConta1)
    await inMemoryContaRepository.create(conta)

    const { perfil } = await sut.execute({
      token: conta.token
    })

    expect(inMemoryContaRepository.contas[0]).toEqual(perfil)
  })
})