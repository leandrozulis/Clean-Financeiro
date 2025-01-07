import { makeCreateConta } from "../../../../../test/factories/make-create-conta";
import { makeRegisterEntrada } from "../../../../../test/factories/make-register-entrada"
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository";
import { InMemoryEntradaRepository } from "../../../../../test/repositories/in-memory-entrada-repository"
import { CreateContaUseCase } from "../../Conta/create-conta";
import { EntradaSaldoUseCase } from "../create-entrada"

let sut: EntradaSaldoUseCase;
let createConta: CreateContaUseCase;
let inMemoryEntradaRepository: InMemoryEntradaRepository;
let inMemoryContaRepository: InMemoryContaRepository;

describe('Create Entrada Use Case', () => {

  beforeEach(() => {
    inMemoryEntradaRepository = new InMemoryEntradaRepository()
    inMemoryContaRepository = new InMemoryContaRepository()
    createConta = new CreateContaUseCase(inMemoryContaRepository)
    sut = new EntradaSaldoUseCase(inMemoryEntradaRepository, inMemoryContaRepository)
  })

  it('should be able to create entrada', async () => {

    // Cria a conta aqui
    const makeconta = makeCreateConta({})
    const { conta } = await createConta.execute(makeconta)
    await inMemoryContaRepository.create(conta)

    const makeCreate = makeRegisterEntrada({
      userId: conta.id,
      token: conta.token
    })

    const { newEntrada } = await sut.execute(makeCreate)

    await inMemoryEntradaRepository.register(newEntrada)

    expect(inMemoryEntradaRepository.entradas[0]).toEqual(newEntrada)
    expect(inMemoryEntradaRepository.entradas[0].userId).toEqual(conta.id)
    expect(inMemoryEntradaRepository.entradas[0].valor).toEqual(20.50)
    expect(inMemoryContaRepository.contas[0].saldo).toEqual(newEntrada.valor)

  })
})