import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { EntradaController } from "../controllers/Entrada/entrada-controller";
import { EntradaPrismaRepository } from "../config/prisma/repository/entrada-prisma-repository";
import { ContaPrismaRepository } from "../config/prisma/repository/conta-prisma-repository";
import { DeleteEntradaUseCase } from "../../app/use-case/Entrada/delete-entrada";
import { EntradaSaldoUseCase } from "../../app/use-case/Entrada/create-entrada";
import { GetByEntradaUseCase } from "../../app/use-case/Entrada/get-entrada";
import { UpdateEntradaUseCase } from "../../app/use-case/Entrada/update-entrada";
import { GetManyEntradasUseCase } from "../../app/use-case/Entrada/get-all-entradas";
import { verifyJWT } from "../middleware/authenticate";

export async function EntradaRouter(app: FastifyInstance) {

  const entradaRepository = new EntradaPrismaRepository()
  const contaUseCase = new ContaPrismaRepository()
  const createEntradaUseCase = new EntradaSaldoUseCase(entradaRepository, contaUseCase)
  const deleteEntradaUseCase = new DeleteEntradaUseCase(entradaRepository, contaUseCase)
  const getByEntradaUseCase = new GetByEntradaUseCase(entradaRepository, contaUseCase)
  const updateEntradaUseCase = new UpdateEntradaUseCase(entradaRepository, contaUseCase)
  const getManyEntradasUseCase = new GetManyEntradasUseCase(entradaRepository, contaUseCase)
  const entradaController = new EntradaController(createEntradaUseCase, deleteEntradaUseCase, getByEntradaUseCase, updateEntradaUseCase, getManyEntradasUseCase)

  app.get('/entrada/:entradaId', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await entradaController.getByEntrada(req, reply)
  })

  app.get('/find/entradas', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await entradaController.getManyEntradas(req, reply)
  })

  app.post('/register/entrada', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await entradaController.register(req, reply)
  })

  app.put('/atualiza/entrada/:entradaId', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await entradaController.updateEntrada(req, reply)
  })

  app.delete('/delete/entrada', { onRequest: [verifyJWT] }, async (req: FastifyRequest, reply: FastifyReply) => {
    await entradaController.remove(req, reply)
  })

}