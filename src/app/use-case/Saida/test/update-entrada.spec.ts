import { makeCreateConta } from "../../../../../test/factories/make-create-conta";
import { makeRegisterSaida } from "../../../../../test/factories/make-register-saida"
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository";
import { InMemorySaidaRepository } from "../../../../../test/repositories/in-memory-saida-repository"
import { CreateContaUseCase } from "../../Conta/create-conta";
import { SaidaSaldoUseCase } from "../create-saida"
import { UpdateSaidaUseCase } from "../update-saida";

let sut: UpdateSaidaUseCase;
let createConta: CreateContaUseCase;
let createSaida: SaidaSaldoUseCase
let inMemorySaidaRepository: InMemorySaidaRepository;
let inMemoryContaRepository: InMemoryContaRepository;

describe('Update Saida Use Case', () => {

  beforeEach(() => {
    inMemorySaidaRepository = new InMemorySaidaRepository()
    inMemoryContaRepository = new InMemoryContaRepository()
    createConta = new CreateContaUseCase(inMemoryContaRepository)
    createSaida = new SaidaSaldoUseCase(inMemorySaidaRepository, inMemoryContaRepository)
    sut = new UpdateSaidaUseCase(inMemorySaidaRepository, inMemoryContaRepository)
  })

  it('should be able to updated saida', async () => {

    // Cria a conta aqui
    const makeconta = makeCreateConta({
      saldo: 20.50
    })
    const { conta } = await createConta.execute(makeconta)
    await inMemoryContaRepository.create(conta)

    const makeCreate = makeRegisterSaida({
      userId: conta.id,
      token: conta.token
    })

    // cria a saida
    const { newSaida } = await createSaida.execute(makeCreate)
    await inMemorySaidaRepository.register(newSaida)

    // altera a saida
    const { saida } = await sut.execute({
      saidaId: newSaida.id,
      valor: 10,
      token: conta.token
    })

    expect(inMemorySaidaRepository.saidas[0].valor).toEqual(10)
    expect(inMemorySaidaRepository.saidas[0].userId).toEqual(conta.id)
    expect(inMemoryContaRepository.contas[0].saldo).toEqual(10.50)

  })
})