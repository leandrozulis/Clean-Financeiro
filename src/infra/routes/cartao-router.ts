import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RegisterCartaoUseCase } from "../../app/use-case/Cartao/register-cartao";
import { CartaoController } from "../controllers/Cartao/cartao-controller";
import { verifyJWT } from "../middleware/authenticate";
import { CartaoPrismaRepository } from "../config/prisma/repository/cartao-prisma-repository";
import { ContaPrismaRepository } from "../config/prisma/repository/conta-prisma-repository";

export async function CartaoaRouter(app: FastifyInstance) {

  const cartaoRepository = new CartaoPrismaRepository()
  const contaRepository = new ContaPrismaRepository()
  const createCartaoUseCase = new RegisterCartaoUseCase(cartaoRepository, contaRepository)
  const cartaoController = new CartaoController(createCartaoUseCase)

  app.post('/register/cartao', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await cartaoController.create(req, reply)
  })

}