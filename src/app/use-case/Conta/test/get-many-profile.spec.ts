import { makeCreateConta } from "../../../../../test/factories/make-create-conta"
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository"
import { CreateContaUseCase } from "../create-conta"
import { GetManyProfileUseCase } from "../get-many-profile"

let createConta: CreateContaUseCase
let inMemoryContaRepository: InMemoryContaRepository
let sut: GetManyProfileUseCase

describe('Get Many Profile Use Case', () => {
  beforeEach(() => {
    inMemoryContaRepository = new InMemoryContaRepository()
    createConta = new CreateContaUseCase(inMemoryContaRepository)
    sut = new GetManyProfileUseCase(inMemoryContaRepository)
  })

  it('Deve ser possível localizar mais de um perfil', async () => {

    const makeConta = makeCreateConta({})

    const { conta } = await createConta.execute(makeConta)

    await inMemoryContaRepository.create(conta)
    await inMemoryContaRepository.create(conta)

    const findConta = await sut.execute()

    expect(findConta.contas[0].nome).toEqual('Leandro')
    expect(findConta.contas[1].nome).toEqual('Leandro')
  })
})