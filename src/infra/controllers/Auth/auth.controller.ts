import { FastifyReply, FastifyRequest } from "fastify";
import { AuthenticateUseCase } from "../../../app/use-case/Auth/authenticate";
import { authDTO, AuthDTO } from "./DTO/auth.dto";

export class AuthController {

  constructor(
    private authenticate: AuthenticateUseCase
  ) { }

  async login(req: FastifyRequest, reply: FastifyReply) {

    try {

      const { email, senha }: AuthDTO = authDTO.parse(req.body)

      const { account } = await this.authenticate.execute({
        email,
        senha
      })

      const accessToken = reply.jwtSign({
        id: account.id,
        nome: account.nome,
        email: account.email
      })

      return reply.status(200).send({
        message: 'Login Realizado!',
        token: (await accessToken).toString(),
        tokenConta: account.token
      })

    } catch (error: any) {
      reply.status(401).send({ error: error.message })
    }
  }

}