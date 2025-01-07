import { makeCreateConta } from "../../../../../test/factories/make-create-conta";
import { makeRegisterSaida } from "../../../../../test/factories/make-register-saida"
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository";
import { InMemorySaidaRepository } from "../../../../../test/repositories/in-memory-saida-repository";
import { CreateContaUseCase } from "../../Conta/create-conta";
import { SaidaSaldoUseCase } from '../create-saida';

let sut: SaidaSaldoUseCase;
let createConta: CreateContaUseCase;
let inMemorySaidaRepository: InMemorySaidaRepository;
let inMemoryContaRepository: InMemoryContaRepository;

describe('Create Saida Use Case', () => {

  beforeEach(() => {
    inMemorySaidaRepository = new InMemorySaidaRepository()
    inMemoryContaRepository = new InMemoryContaRepository()
    createConta = new CreateContaUseCase(inMemoryContaRepository)
    sut = new SaidaSaldoUseCase(inMemorySaidaRepository, inMemoryContaRepository)
  })

  it('should be able to create Saida', async () => {

    const makeconta = makeCreateConta({
      saldo: 50.00
    })

    const { conta } = await createConta.execute(makeconta)

    await inMemoryContaRepository.create(conta)

    const makeCreate = makeRegisterSaida({
      userId: conta.id,
      token: conta.token
    })

    const { newSaida } = await sut.execute(makeCreate)

    await inMemorySaidaRepository.register(newSaida)

    expect(inMemorySaidaRepository.saidas[0]).toEqual(newSaida)
    expect(inMemorySaidaRepository.saidas[0].userId).toEqual(conta.id)
    expect(inMemoryContaRepository.contas[0].saldo).toEqual(29.50)

  })
})