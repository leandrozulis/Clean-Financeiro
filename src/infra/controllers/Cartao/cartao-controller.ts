import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterCartaoUseCase } from "../../../app/use-case/Cartao/register-cartao";
import { createCartaoDTO, CreateCartaoDTO } from "./DTO/create-cartao-dto";
import { ValidatedToken, validatedToken } from "../TokenDTO/validatedToken";
import { CartaoView } from "./View/cartao-view";
import { deleteCartaoDTO, DeleteCartaoDTO } from "./DTO/delete-cartao-dto";
import { DeleteCartaoUseCase } from "../../../app/use-case/Cartao/delete-cartao";

export class CartaoController {
  constructor(
    private createCartaoUseCase: RegisterCartaoUseCase,
    private deleteCartaoUseCase: DeleteCartaoUseCase
  ) { }

  async create(req: FastifyRequest, reply: FastifyReply) {

    try {
      const { limite, descricao, nomeBanco, dtfechamento, dtvencimento }: CreateCartaoDTO = createCartaoDTO.parse(req.body)
      const { token }: ValidatedToken = validatedToken.parse(req.query)

      const { newCartao } = await this.createCartaoUseCase.execute({
        token,
        limite,
        descricao,
        nomeBanco,
        dtfechamento,
        dtvencimento
      })

      reply.status(201).send({
        cartao: CartaoView.createCartao(newCartao)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }

  }

  async remove(req: FastifyRequest, reply: FastifyReply) {

    try {
      const { cartaoId }: DeleteCartaoDTO = deleteCartaoDTO.parse(req.body)
      const { token }: ValidatedToken = validatedToken.parse(req.query)

      const { cartao } = await this.deleteCartaoUseCase.execute({
        cartaoId,
        token
      })

      reply.status(200).send({
        message: 'Cartao Deletado',
        cartao: CartaoView.deleteCartaoUseCase(cartao)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }
  }
}