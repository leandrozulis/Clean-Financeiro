import { makeCreateConta } from "../../../../../test/factories/make-create-conta";
import { makeRegisterEntrada } from "../../../../../test/factories/make-register-entrada";
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository";
import { InMemoryEntradaRepository } from "../../../../../test/repositories/in-memory-entrada-repository";
import { CreateContaUseCase } from "../../Conta/create-conta";
import { EntradaSaldoUseCase } from "../create-entrada";
import { GetByEntradaUseCase } from "../get-entrada";

let sut: GetByEntradaUseCase;
let createConta: CreateContaUseCase;
let createEntrada: EntradaSaldoUseCase
let inMemoryEntradaRepository: InMemoryEntradaRepository;
let inMemoryContaRepository: InMemoryContaRepository;

describe('Get Entrada Use Case', () => {

  beforeEach(() => {
    inMemoryEntradaRepository = new InMemoryEntradaRepository()
    inMemoryContaRepository = new InMemoryContaRepository()
    createConta = new CreateContaUseCase(inMemoryContaRepository)
    createEntrada = new EntradaSaldoUseCase(inMemoryEntradaRepository, inMemoryContaRepository)
    sut = new GetByEntradaUseCase(inMemoryEntradaRepository, inMemoryContaRepository)
  })

  it('should be able to get one entrada', async () => {

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

    const { entrada } = await sut.execute({
      entradaId: newEntrada.id,
      token: conta.token
    })

    expect(inMemoryEntradaRepository.entradas[0]).toEqual(entrada)
    expect(inMemoryEntradaRepository.entradas[0].userId).toEqual(conta.id)
    expect(inMemoryEntradaRepository.entradas[0].valor).toEqual(20.50)
    expect(inMemoryContaRepository.contas[0].saldo).toEqual(entrada.valor)

  })
})