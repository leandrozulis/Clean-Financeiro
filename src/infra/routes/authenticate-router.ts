import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthenticateUseCase } from "../../app/use-case/Auth/authenticate";
import { ContaPrismaRepository } from "../config/prisma/repository/conta-prisma-repository";
import { AuthController } from "../controllers/Auth/auth.controller";

export async function AuthenticateRouter(app: FastifyInstance) {

  const contaRepository = new ContaPrismaRepository()
  const authenticateUseCase = new AuthenticateUseCase(contaRepository)
  const authenticateController = new AuthController(authenticateUseCase)

  app.post('/autentica', async (req: FastifyRequest, reply: FastifyReply) => {
    await authenticateController.login(req, reply)
  })

}