import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ContaController } from "../controllers/Conta/conta-controller";
import { ContaPrismaRepository } from "../config/prisma/repository/conta-prisma-repository";
import { GetProfileUseCase } from "../../app/use-case/Conta/get-profile";
import { GetManyProfileUseCase } from "../../app/use-case/Conta/get-many-profile";
import { CreateContaUseCase } from "../../app/use-case/Conta/create-conta";
import { verifyJWT } from "../middleware/authenticate";

export async function contaRouter(app: FastifyInstance) {

  const contaPrismaRepository = new ContaPrismaRepository()
  const getProfile = new GetProfileUseCase(contaPrismaRepository)
  const getManyProfile = new GetManyProfileUseCase(contaPrismaRepository)
  const createContaUseCase = new CreateContaUseCase(contaPrismaRepository)
  const contaController = new ContaController(createContaUseCase, getProfile, getManyProfile)

  app.post('/create/conta', async (req: FastifyRequest, reply: FastifyReply) => {
    await contaController.create(req, reply)
  })

  app.get('/find/profile', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await contaController.getProfileAccount(req, reply)
  })

  app.get('/find/allprofiles', async (req: FastifyRequest, reply: FastifyReply) => {
    await contaController.getManyProfilesAccount(req, reply)
  })

}