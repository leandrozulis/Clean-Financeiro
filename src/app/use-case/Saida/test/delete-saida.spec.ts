import { makeCreateConta } from "../../../../../test/factories/make-create-conta";
import { makeRegisterSaida } from "../../../../../test/factories/make-register-saida"
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository";
import { InMemorySaidaRepository } from "../../../../../test/repositories/in-memory-saida-repository"
import { CreateContaUseCase } from "../../Conta/create-conta";
import { SaidaSaldoUseCase } from "../create-saida"
import { DeleteSaidaUseCase } from "../delete-saida";

let sut: DeleteSaidaUseCase;
let saidaSaldo: SaidaSaldoUseCase;
let createConta: CreateContaUseCase;
let inMemorySaidaRepository: InMemorySaidaRepository;
let inMemoryContaRepository: InMemoryContaRepository;

describe('Delete Saida Use Case', () => {

  beforeEach(() => {
    inMemorySaidaRepository = new InMemorySaidaRepository()
    inMemoryContaRepository = new InMemoryContaRepository()
    createConta = new CreateContaUseCase(inMemoryContaRepository)
    saidaSaldo = new SaidaSaldoUseCase(inMemorySaidaRepository, inMemoryContaRepository)
    sut = new DeleteSaidaUseCase(inMemorySaidaRepository, inMemoryContaRepository)
  })

  it('should be able to delete one saida', async () => {

    // Cria a conta aqui
    const makeconta = makeCreateConta({
      saldo: 100.00
    })
    const { conta } = await createConta.execute(makeconta)
    await inMemoryContaRepository.create(conta)

    const makeCreate = makeRegisterSaida({
      userId: conta.id,
      token: conta.token
    })

    // Cria a saida aqui
    const { newSaida } = await saidaSaldo.execute(makeCreate)
    await inMemorySaidaRepository.register(newSaida)

    const { saida } = await sut.execute({
      saidaId: newSaida.id,
      token: conta.token
    })

    await inMemorySaidaRepository.delete(saida.id)

    expect(inMemoryContaRepository.contas[0].saldo).toEqual(100.00)
    expect(inMemorySaidaRepository.saidas).toEqual([])

  })
})