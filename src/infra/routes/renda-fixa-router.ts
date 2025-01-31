import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RendaFixaPrismaRepository } from "../config/prisma/repository/renda-fixa-prisma-repository";
import { CreateRendaFixaUseCase } from "../../app/use-case/Renda-Fixa/create-renda-fixa";
import { ContaPrismaRepository } from "../config/prisma/repository/conta-prisma-repository";
import { RendaFixaController } from "../controllers/Renda-Fixa/renda-fixa-controller";
import { verifyJWT } from "../middleware/authenticate";

const rendaFixaPrisma = new RendaFixaPrismaRepository()
const contaPrisma = new ContaPrismaRepository()
const createRendaFixa = new CreateRendaFixaUseCase(rendaFixaPrisma, contaPrisma)
const rendaFixaController = new RendaFixaController(createRendaFixa)

export async function RendaFixaRouter(app: FastifyInstance) {

  app.post('/register/rendafixa', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await rendaFixaController.register(req, reply)
  })

}