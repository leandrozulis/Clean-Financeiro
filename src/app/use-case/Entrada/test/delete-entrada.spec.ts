import { makeCreateConta } from "../../../../../test/factories/make-create-conta";
import { makeRegisterEntrada } from "../../../../../test/factories/make-register-entrada"
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository";
import { InMemoryEntradaRepository } from "../../../../../test/repositories/in-memory-entrada-repository"
import { CreateContaUseCase } from "../../Conta/create-conta";
import { EntradaSaldoUseCase } from "../create-entrada"
import { DeleteEntradaUseCase } from "../delete-entrada";

let sut: DeleteEntradaUseCase;
let entradaSaldo: EntradaSaldoUseCase;
let createConta: CreateContaUseCase;
let inMemoryEntradaRepository: InMemoryEntradaRepository;
let inMemoryContaRepository: InMemoryContaRepository;

describe('Delete Entrada Use Case', () => {

  beforeEach(() => {
    inMemoryEntradaRepository = new InMemoryEntradaRepository()
    inMemoryContaRepository = new InMemoryContaRepository()
    createConta = new CreateContaUseCase(inMemoryContaRepository)
    entradaSaldo = new EntradaSaldoUseCase(inMemoryEntradaRepository, inMemoryContaRepository)
    sut = new DeleteEntradaUseCase(inMemoryEntradaRepository, inMemoryContaRepository)
  })

  it('should be able to delete one entrada', async () => {

    // Cria a conta aqui
    const makeconta = makeCreateConta({})
    const { conta } = await createConta.execute(makeconta)
    await inMemoryContaRepository.create(conta)

    const makeCreate = makeRegisterEntrada({
      userId: conta.id,
      token: conta.token
    })

    // Cria a entrada aqui
    const { newEntrada } = await entradaSaldo.execute(makeCreate)
    await inMemoryEntradaRepository.register(newEntrada)

    const { entrada } = await sut.execute({
      entradaId: newEntrada.id,
      token: conta.token
    })

    await inMemoryEntradaRepository.delete(entrada.id)

    expect(inMemoryContaRepository.contas[0].saldo).toEqual(0)
    expect(inMemoryEntradaRepository.entradas).toEqual([])

  })
})