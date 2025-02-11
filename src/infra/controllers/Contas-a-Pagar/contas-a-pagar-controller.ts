import { FastifyReply, FastifyRequest } from "fastify";
import { CreateContaAPagarUseCase } from "../../../app/use-case/Contas-a-Pagar/create-conta-a-pagar";
import { validatedCartaoIdDTO, ValidatedCartaoIdDTO } from "../TokenDTO/validatedCartaoId";
import { validatedToken, ValidatedToken } from "../TokenDTO/validatedToken";
import { createContaAPagarDTO, CreateContaAPagarDTO } from "./DTO/create-conta-a-pagar-dto";
import { ContaAPagarView } from "./View/conta-a-pagar-view";
import { GetManyContaApagarUseCase } from "../../../app/use-case/Contas-a-Pagar/get-many-conta-pagar";
import { deleteContaAPagarDTO, DeleteContaAPagarDTO } from "./DTO/delete-conta-a-pagar-dto";
import { DeleteContaAPagarUseCase } from "../../../app/use-case/Contas-a-Pagar/remote-conta-a-pagar";
import { GetByContaAPagarUseCase } from "../../../app/use-case/Contas-a-Pagar/get-conta-a-pagar";
import { QuitarParcelaUseCase } from "../../../app/use-case/Contas-a-Pagar/quitar-parcela";
import { quitarparcelaContaAPagarDTO, QuitarParcelaContaAPagarDTO } from "./DTO/quitar-conta-a-pagar-dto";

export class ContasAPagarController {

  constructor(
    private createContaAPagarUseCase: CreateContaAPagarUseCase,
    private getByContaAPagarUseCase: GetByContaAPagarUseCase,
    private getManyContaApagarUseCase: GetManyContaApagarUseCase,
    private deleteContaAPagarUseCase: DeleteContaAPagarUseCase,
    private quitarParcelaUseCase: QuitarParcelaUseCase
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

  async getByContaAPagar(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { cartaoId }: ValidatedCartaoIdDTO = validatedCartaoIdDTO.parse(req.query)
      const { token }: ValidatedToken = validatedToken.parse(req.query)
      const { contaapagarId }: DeleteContaAPagarDTO = deleteContaAPagarDTO.parse(req.params)

      const { contaPagar } = await this.getByContaAPagarUseCase.execute({
        contaapagarId,
        cartaoId,
        token
      })

      return reply.status(200).send({
        contaApagar: ContaAPagarView.getByContaAPagar(contaPagar)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }
  }

  async getManyContasAPagar(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { cartaoId }: ValidatedCartaoIdDTO = validatedCartaoIdDTO.parse(req.query)
      const { token }: ValidatedToken = validatedToken.parse(req.query)

      const { contaApagar } = await this.getManyContaApagarUseCase.execute({
        token,
        cartaoId
      })

      return reply.status(200).send({
        contaApagar: ContaAPagarView.getAllContasAPagar(contaApagar)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }
  }

  async remove(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { cartaoId }: ValidatedCartaoIdDTO = validatedCartaoIdDTO.parse(req.query)
      const { token }: ValidatedToken = validatedToken.parse(req.query)
      const { contaapagarId }: DeleteContaAPagarDTO = deleteContaAPagarDTO.parse(req.body)

      const { contaapagar } = await this.deleteContaAPagarUseCase.execute({
        contaapagarId,
        cartaoId,
        token
      })

      return reply.status(200).send({
        contaApagar: ContaAPagarView.deleteContaAPagar(contaapagar)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }
  }

  async quitarParcela(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { cartaoId }: ValidatedCartaoIdDTO = validatedCartaoIdDTO.parse(req.query)
      const { token }: ValidatedToken = validatedToken.parse(req.query)
      const { contaapagarId, valorPago }: QuitarParcelaContaAPagarDTO = quitarparcelaContaAPagarDTO.parse(req.body)

      const { newContaAPagar } = await this.quitarParcelaUseCase.execute({
        contaapagarId,
        valorPago,
        cartaoId,
        token
      })

      console.log('controller', newContaAPagar);


      return reply.status(200).send({
        contaApagar: ContaAPagarView.updateContaAPagar(newContaAPagar)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }
  }

}