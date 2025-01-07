import { makeCreateConta } from "../../../../../test/factories/make-create-conta";
import { makeRegisterEntrada } from "../../../../../test/factories/make-register-entrada"
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository";
import { InMemoryEntradaRepository } from "../../../../../test/repositories/in-memory-entrada-repository"
import { CreateContaUseCase } from "../../Conta/create-conta";
import { EntradaSaldoUseCase } from "../create-entrada"
import { UpdateEntradaUseCase } from "../update-entrada";

let sut: UpdateEntradaUseCase;
let createConta: CreateContaUseCase;
let createEntrada: EntradaSaldoUseCase
let inMemoryEntradaRepository: InMemoryEntradaRepository;
let inMemoryContaRepository: InMemoryContaRepository;

describe('Update Entrada Use Case', () => {

  beforeEach(() => {
    inMemoryEntradaRepository = new InMemoryEntradaRepository()
    inMemoryContaRepository = new InMemoryContaRepository()
    createConta = new CreateContaUseCase(inMemoryContaRepository)
    createEntrada = new EntradaSaldoUseCase(inMemoryEntradaRepository, inMemoryContaRepository)
    sut = new UpdateEntradaUseCase(inMemoryEntradaRepository, inMemoryContaRepository)
  })

  it('should be able to updated entrada', async () => {

    // Cria a conta aqui
    const makeconta = makeCreateConta({})
    const { conta } = await createConta.execute(makeconta)
    await inMemoryContaRepository.create(conta)

    const makeCreate = makeRegisterEntrada({
      userId: conta.id,
      token: conta.token
    })

    // cria a entrada
    const { newEntrada } = await createEntrada.execute(makeCreate)
    await inMemoryEntradaRepository.register(newEntrada)

    // altera a entrada
    const { entrada } = await sut.execute({
      entradaId: newEntrada.id,
      valor: 10,
      token: conta.token
    })

    expect(inMemoryEntradaRepository.entradas[0].valor).toEqual(10)
    expect(inMemoryEntradaRepository.entradas[0].userId).toEqual(conta.id)
    expect(inMemoryContaRepository.contas[0].saldo).toEqual(entrada.valor)

  })
})