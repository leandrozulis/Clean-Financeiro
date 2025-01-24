import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ContaAPagarPrismaRepository } from "../config/prisma/repository/conta-a-pagar-prisma-repository";
import { CreateContaAPagarUseCase } from "../../app/use-case/Contas-a-Pagar/create-conta-a-pagar";
import { ContaPrismaRepository } from "../config/prisma/repository/conta-prisma-repository";
import { CartaoPrismaRepository } from "../config/prisma/repository/cartao-prisma-repository";
import { ContasAPagarController } from "../controllers/Contas-a-Pagar/contas-a-pagar-controller";
import { verifyJWT } from "../middleware/authenticate";

export async function ContaAPagarRouter(app: FastifyInstance) {
  const contasAPagarRepository = new ContaAPagarPrismaRepository()
  const contaRepository = new ContaPrismaRepository()
  const cartaoPrismaRepository = new CartaoPrismaRepository()
  const createContaAPagarUseCase = new CreateContaAPagarUseCase(contasAPagarRepository, contaRepository, cartaoPrismaRepository)
  const contaAPagarController = new ContasAPagarController(createContaAPagarUseCase)

  app.post('/register/contaapagar', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await contaAPagarController.register(req, reply)
  })
}