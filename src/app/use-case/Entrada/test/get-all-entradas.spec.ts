import { makeCreateConta } from "../../../../../test/factories/make-create-conta";
import { makeRegisterEntrada } from "../../../../../test/factories/make-register-entrada";
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository";
import { InMemoryEntradaRepository } from "../../../../../test/repositories/in-memory-entrada-repository";
import { CreateContaUseCase } from "../../Conta/create-conta";
import { EntradaSaldoUseCase } from "../create-entrada";
import { GetManyEntradasUseCase } from "../get-all-entradas";

let sut: GetManyEntradasUseCase;
let createConta: CreateContaUseCase;
let createEntrada: EntradaSaldoUseCase
let inMemoryEntradaRepository: InMemoryEntradaRepository;
let inMemoryContaRepository: InMemoryContaRepository;

describe('Get All Entradas Use Case', () => {

  beforeEach(() => {
    inMemoryEntradaRepository = new InMemoryEntradaRepository()
    inMemoryContaRepository = new InMemoryContaRepository()
    createConta = new CreateContaUseCase(inMemoryContaRepository)
    createEntrada = new EntradaSaldoUseCase(inMemoryEntradaRepository, inMemoryContaRepository)
    sut = new GetManyEntradasUseCase(inMemoryEntradaRepository, inMemoryContaRepository)
  })

  it('should be able to get all entradas', async () => {

    // Cria a conta aqui
    const makeconta = makeCreateConta({})
    const { conta } = await createConta.execute(makeconta)
    await inMemoryContaRepository.create(conta)

    const makeCreate = makeRegisterEntrada({
      userId: conta.id,
      token: conta.token
    })

    const { newEntrada } = await createEntrada.execute(makeCreate)
    await inMemoryEntradaRepository.register(newEntrada)
    await inMemoryEntradaRepository.register(newEntrada)

    const { entradas } = await sut.execute({
      token: conta.token
    })

    expect(inMemoryEntradaRepository.entradas).toEqual(entradas)

  })
})