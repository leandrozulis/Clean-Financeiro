import { FastifyReply, FastifyRequest } from "fastify";
import { CreateContaAPagarUseCase } from "../../../app/use-case/Contas-a-Pagar/create-conta-a-pagar";
import { validatedCartaoIdDTO, ValidatedCartaoIdDTO } from "../TokenDTO/validatedCartaoId";
import { validatedToken, ValidatedToken } from "../TokenDTO/validatedToken";
import { createContaAPagarDTO, CreateContaAPagarDTO } from "./DTO/create-conta-a-pagar-dto";
import { ContaAPagarView } from "./View/conta-a-pagar-view";

export class ContasAPagarController {

  constructor(
    private createContaAPagarUseCase: CreateContaAPagarUseCase
  ) { }

  async register(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { valor, descricao, parcelas, pago }: CreateContaAPagarDTO = createContaAPagarDTO.parse(req.body)
      const { cartaoId }: ValidatedCartaoIdDTO = validatedCartaoIdDTO.parse(req.query)
      const { token }: ValidatedToken = validatedToken.parse(req.query)

      const { contaAPagar } = await this.createContaAPagarUseCase.execute({
        valor,
        descricao,
        parcelas,
        pago,
        token,
        cartaoId
      })

      return reply.status(201).send({
        contaAPagar: ContaAPagarView.createContaAPagar(contaAPagar)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }
  }

}