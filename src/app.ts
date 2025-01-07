import fastify from "fastify";
import { allRoutes } from "./infra/routes";
import { fastifyJwt } from "@fastify/jwt"
import cors from '@fastify/cors'

export const app = fastify()

app.register(cors)

app.register(fastifyJwt, {
  secret: 'supersecret',
  sign: {
    expiresIn: '10m'
  }
})

app.register(allRoutes)