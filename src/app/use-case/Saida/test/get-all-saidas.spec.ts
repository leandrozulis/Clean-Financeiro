import { makeCreateConta } from "../../../../../test/factories/make-create-conta";
import { makeRegisterSaida } from "../../../../../test/factories/make-register-saida";
import { InMemoryContaRepository } from "../../../../../test/repositories/in-memory-conta-repository";
import { InMemorySaidaRepository } from "../../../../../test/repositories/in-memory-saida-repository";
import { CreateContaUseCase } from "../../Conta/create-conta";
import { SaidaSaldoUseCase } from "../create-saida";
import { GetManySaidasUseCase } from "../get-all-saidas";

let sut: GetManySaidasUseCase;
let createConta: CreateContaUseCase;
let createSaida: SaidaSaldoUseCase
let inMemorySaidaRepository: InMemorySaidaRepository;
let inMemoryContaRepository: InMemoryContaRepository;

describe('Get All Saidas Use Case', () => {

  beforeEach(() => {
    inMemorySaidaRepository = new InMemorySaidaRepository()
    inMemoryContaRepository = new InMemoryContaRepository()
    createConta = new CreateContaUseCase(inMemoryContaRepository)
    createSaida = new SaidaSaldoUseCase(inMemorySaidaRepository, inMemoryContaRepository)
    sut = new GetManySaidasUseCase(inMemorySaidaRepository, inMemoryContaRepository)
  })

  it('should be able to get all saidas', async () => {

    // Cria a conta aqui
    const makeconta = makeCreateConta({
      saldo: 41.00
    })
    const { conta } = await createConta.execute(makeconta)
    await inMemoryContaRepository.create(conta)

    const makeCreate = makeRegisterSaida({
      userId: conta.id,
      token: conta.token
    })

    const { newSaida } = await createSaida.execute(makeCreate)
    await inMemorySaidaRepository.register(newSaida)
    await inMemorySaidaRepository.register(newSaida)

    const { saidas } = await sut.execute({
      token: conta.token
    })

    expect(inMemorySaidaRepository.saidas).toEqual(saidas)

  })
})