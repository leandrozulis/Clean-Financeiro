import { FastifyReply, FastifyRequest } from "fastify";
import { CreateRendaFixaUseCase } from "../../../app/use-case/Renda-Fixa/create-renda-fixa";
import { validatedToken, ValidatedToken } from "../TokenDTO/validatedToken";
import { createRendaFixaDTO, CreateRendaFixaDTO } from "./DTO/create-renda-fixa-dto";
import { RendaFixaView } from "./View/renda-fixa-view";
import { GetManyRendaFixasUseCase } from "../../../app/use-case/Renda-Fixa/get-all-renda-fixa";

export class RendaFixaController {
  constructor(
    private createRendaFixaUseCase: CreateRendaFixaUseCase,
    private getManyRendaFixasUseCase: GetManyRendaFixasUseCase
  ) { }

  async register(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { valor }: CreateRendaFixaDTO = createRendaFixaDTO.parse(req.body)
      const { token }: ValidatedToken = validatedToken.parse(req.query)

      const { rendaFixa } = await this.createRendaFixaUseCase.execute({
        valor,
        token
      })

      reply.status(201).send({
        rendaFixa: RendaFixaView.createRendaFixa(rendaFixa)
      })

    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }
  }

  async findManyRendaFixa(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { token }: ValidatedToken = validatedToken.parse(req.query)

      const { rendaFixas } = await this.getManyRendaFixasUseCase.execute({
        token
      })

      reply.status(201).send({
        rendaFixa: RendaFixaView.getAllRendaFIxas(rendaFixas)
      })

    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }
  }
}