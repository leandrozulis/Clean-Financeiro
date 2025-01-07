import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ContaPrismaRepository } from "../config/prisma/repository/conta-prisma-repository";
import { SaidaPrismaRepository } from "../config/prisma/repository/saida-prisma-repository";
import { SaidaController } from "../controllers/Saida/saida-controller";
import { SaidaSaldoUseCase } from "../../app/use-case/Saida/create-saida";
import { DeleteSaidaUseCase } from "../../app/use-case/Saida/delete-saida";
import { GetBySaidaUseCase } from "../../app/use-case/Saida/get-saida";
import { UpdateSaidaUseCase } from "../../app/use-case/Saida/update-saida";
import { GetManySaidasUseCase } from "../../app/use-case/Saida/get-all-saidas";
import { verifyJWT } from "../middleware/authenticate";

export async function SaidaRouter(app: FastifyInstance) {

  const saidaRepository = new SaidaPrismaRepository()
  const contaUseCase = new ContaPrismaRepository()
  const createSaidaSaldo = new SaidaSaldoUseCase(saidaRepository, contaUseCase)
  const deleteSaidaSaldo = new DeleteSaidaUseCase(saidaRepository, contaUseCase)
  const getBySaida = new GetBySaidaUseCase(saidaRepository, contaUseCase)
  const updateSaida = new UpdateSaidaUseCase(saidaRepository, contaUseCase)
  const getManySaidas = new GetManySaidasUseCase(saidaRepository, contaUseCase)
  const saidaController = new SaidaController(createSaidaSaldo, deleteSaidaSaldo, getBySaida, updateSaida, getManySaidas)

  app.get('/saida/:saidaId', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await saidaController.getBySaida(req, reply)
  })

  app.get('/find/saidas', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await saidaController.getManySaidas(req, reply)
  })

  app.post('/register/saida', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await saidaController.register(req, reply)
  })

  app.put('/atualiza/saida/:saidaId', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await saidaController.updateSaida(req, reply)
  })

  app.delete('/delete/saida', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await saidaController.delete(req, reply)
  })

}