import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RegisterCartaoUseCase } from "../../app/use-case/Cartao/register-cartao";
import { CartaoController } from "../controllers/Cartao/cartao-controller";
import { verifyJWT } from "../middleware/authenticate";
import { CartaoPrismaRepository } from "../config/prisma/repository/cartao-prisma-repository";
import { ContaPrismaRepository } from "../config/prisma/repository/conta-prisma-repository";
import { DeleteCartaoUseCase } from "../../app/use-case/Cartao/delete-cartao";
import { GetManyCartaoUseCase } from "../../app/use-case/Cartao/get-many-cartao";

export async function CartaoaRouter(app: FastifyInstance) {

  const cartaoRepository = new CartaoPrismaRepository()
  const contaRepository = new ContaPrismaRepository()
  const getManyCartoesUseCase = new GetManyCartaoUseCase(cartaoRepository, contaRepository)
  const deleteCartaoUseCase = new DeleteCartaoUseCase(cartaoRepository, contaRepository)
  const createCartaoUseCase = new RegisterCartaoUseCase(cartaoRepository, contaRepository)
  const cartaoController = new CartaoController(createCartaoUseCase, deleteCartaoUseCase, getManyCartoesUseCase)

  app.get('/find/allcartoes', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await cartaoController.getManyCartoes(req, reply)
  })

  app.post('/register/cartao', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await cartaoController.create(req, reply)
  })

  app.delete('/delete/cartao', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await cartaoController.remove(req, reply)
  })

}