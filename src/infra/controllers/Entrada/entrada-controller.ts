import { FastifyReply, FastifyRequest } from "fastify";
import { EntradaSaldoUseCase } from "../../../app/use-case/Entrada/create-entrada";
import { CreateEntradaDTO, createEntradaDTO } from "./DTO/create-entrada-dto";
import { EntradaView } from "./View/entrada-view";
import { deleteEntradaDTO, DeleteEntradaDTO } from "./DTO/delete-entrada-dto";
import { validatedToken, ValidatedToken } from '../TokenDTO/validatedToken';
import { DeleteEntradaUseCase } from "../../../app/use-case/Entrada/delete-entrada";
import { consultaEntradaDto, ConsultaEntradaDto } from "./DTO/consulta-entrada-dto";
import { GetByEntradaUseCase } from "../../../app/use-case/Entrada/get-entrada";
import { idEntradaDto, IdEntradaDto, updateEntradaDTO, UpdateEntradaDTO } from "./DTO/update-entrada-dto";
import { UpdateEntradaUseCase } from "../../../app/use-case/Entrada/update-entrada";
import { GetManyEntradasUseCase } from "../../../app/use-case/Entrada/get-all-entradas";

export class EntradaController {
  constructor(
    private entradaSaldoUseCase: EntradaSaldoUseCase,
    private deleteEntradaUseCase: DeleteEntradaUseCase,
    private getByEntradaUseCase: GetByEntradaUseCase,
    private updateEntradaUseCase: UpdateEntradaUseCase,
    private getManyEntradasUseCase: GetManyEntradasUseCase
  ) { }

  async register(req: FastifyRequest, reply: FastifyReply) {

    try {
      const { valor, descricao, meioPagamento }: CreateEntradaDTO = createEntradaDTO.parse(req.body)
      const { token }: ValidatedToken = validatedToken.parse(req.query)

      const { newEntrada } = await this.entradaSaldoUseCase.execute({
        valor, descricao, meioPagamento, token
      })

      reply.status(201).send({
        entrada: EntradaView.createEntrada(newEntrada)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }
  }

  async remove(req: FastifyRequest, reply: FastifyReply) {

    const { entradaId }: DeleteEntradaDTO = deleteEntradaDTO.parse(req.body)
    const { token }: ValidatedToken = validatedToken.parse(req.query)

    const { entrada } = await this.deleteEntradaUseCase.execute({
      entradaId,
      token
    })

    reply.status(200).send({
      message: 'Entrada Deletada',
      entrada: EntradaView.deleteEntrada(entrada)
    })

  }

  async getByEntrada(req: FastifyRequest, reply: FastifyReply) {

    try {
      const { entradaId }: ConsultaEntradaDto = consultaEntradaDto.parse(req.params)
      const { token }: ValidatedToken = validatedToken.parse(req.query)

      const { entrada } = await this.getByEntradaUseCase.execute({
        entradaId,
        token
      })

      reply.status(200).send({
        entrada: EntradaView.getByEntrada(entrada)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }
  }

  async updateEntrada(req: FastifyRequest, reply: FastifyReply) {

    try {
      const { entradaId }: IdEntradaDto = idEntradaDto.parse(req.params)
      const { valor, descricao, meioPagamento }: UpdateEntradaDTO = updateEntradaDTO.parse(req.body)
      const { token }: ValidatedToken = validatedToken.parse(req.query)

      const { entrada } = await this.updateEntradaUseCase.execute({
        entradaId,
        token,
        valor,
        descricao,
        meioPagamento
      })

      reply.status(201).send({
        entrada: EntradaView.retEntrada(entrada)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }

  }

  async getManyEntradas(req: FastifyRequest, reply: FastifyReply) {

    try {
      const { token }: ValidatedToken = validatedToken.parse(req.query)
      const { entradas } = await this.getManyEntradasUseCase.execute({
        token
      })

      reply.status(200).send({
        entrada: EntradaView.getAllEntradas(entradas)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }
  }
}