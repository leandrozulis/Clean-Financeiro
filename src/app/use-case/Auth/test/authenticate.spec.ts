import { hash } from "bcrypt"
import { makeCreateConta } from "../../../../../test/factories/make-create-conta"
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository"
import { CreateContaUseCase } from "../../Conta/create-conta"
import { AuthenticateUseCase } from "../authenticate"

let sut: AuthenticateUseCase
let createConta: CreateContaUseCase
let inMemoryConta: InMemoryContaRepository

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryConta = new InMemoryContaRepository()
    createConta = new CreateContaUseCase(inMemoryConta)
    sut = new AuthenticateUseCase(inMemoryConta)
  })

  it('Should be able to authenticate with a account', async () => {

    const makeConta = makeCreateConta({})
    let { conta } = await createConta.execute(makeConta)
    await inMemoryConta.create(conta)

    const { account } = await sut.execute({
      email: conta.email,
      senha: '123456'
    })

    expect(account).toEqual(conta)

  })
})