import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ContaAPagarPrismaRepository } from "../config/prisma/repository/conta-a-pagar-prisma-repository";
import { CreateContaAPagarUseCase } from "../../app/use-case/Contas-a-Pagar/create-conta-a-pagar";
import { ContaPrismaRepository } from "../config/prisma/repository/conta-prisma-repository";
import { CartaoPrismaRepository } from "../config/prisma/repository/cartao-prisma-repository";
import { ContasAPagarController } from "../controllers/Contas-a-Pagar/contas-a-pagar-controller";
import { verifyJWT } from "../middleware/authenticate";
import { GetManyContaApagarUseCase } from "../../app/use-case/Contas-a-Pagar/get-many-conta-pagar";
import { DeleteContaAPagarUseCase } from "../../app/use-case/Contas-a-Pagar/remote-conta-a-pagar";
import { GetByContaAPagarUseCase } from "../../app/use-case/Contas-a-Pagar/get-conta-a-pagar";
import { QuitarParcelaUseCase } from "../../app/use-case/Contas-a-Pagar/quitar-parcela";

export async function ContaAPagarRouter(app: FastifyInstance) {
  const contasAPagarPrismaRepository = new ContaAPagarPrismaRepository()
  const contaPrismaRepository = new ContaPrismaRepository()
  const cartaoPrismaRepository = new CartaoPrismaRepository()
  const createContaAPagarUseCase = new CreateContaAPagarUseCase(contasAPagarPrismaRepository, cartaoPrismaRepository, contaPrismaRepository)
  const getByContaAPagarUseCase = new GetByContaAPagarUseCase(contasAPagarPrismaRepository, cartaoPrismaRepository, contaPrismaRepository)
  const getManyContasAPagarUseCase = new GetManyContaApagarUseCase(contasAPagarPrismaRepository, cartaoPrismaRepository, contaPrismaRepository)
  const deleteContaAPagarUseCase = new DeleteContaAPagarUseCase(contasAPagarPrismaRepository, cartaoPrismaRepository, contaPrismaRepository)
  const quitarParcelaUseCase = new QuitarParcelaUseCase(contasAPagarPrismaRepository, cartaoPrismaRepository, contaPrismaRepository)
  const contaAPagarController = new ContasAPagarController(createContaAPagarUseCase, getByContaAPagarUseCase, getManyContasAPagarUseCase, deleteContaAPagarUseCase, quitarParcelaUseCase)

  app.get('/find/allcontasapagar', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await contaAPagarController.getManyContasAPagar(req, reply)
  })

  app.get('/find/contasapagar/:contaapagarId', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await contaAPagarController.getByContaAPagar(req, reply)
  })

  app.post('/register/contaapagar', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await contaAPagarController.register(req, reply)
  })

  app.put('/atualiza/contaapagar', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await contaAPagarController.quitarParcela(req, reply)
  })

  app.delete('/remove/contaapagar', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await contaAPagarController.remove(req, reply)
  })
}