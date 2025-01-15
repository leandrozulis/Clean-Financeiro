import { FastifyInstance } from "fastify";
import { contaRouter } from "./conta-router";
import { EntradaRouter } from "./entrada-router";
import { SaidaRouter } from "./saida-router";
import { AuthenticateRouter } from "./authenticate-router";
import { CartaoaRouter } from "./cartao-router";

export async function allRoutes(app: FastifyInstance) {
  app.register(AuthenticateRouter)
  app.register(contaRouter)
  app.register(EntradaRouter)
  app.register(SaidaRouter)
  app.register(CartaoaRouter)
}