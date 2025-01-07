import { FastifyReply, FastifyRequest } from 'fastify';
import { SaidaSaldoUseCase } from '../../../app/use-case/Saida/create-saida';
import { DeleteSaidaUseCase } from '../../../app/use-case/Saida/delete-saida';
import { GetBySaidaUseCase } from '../../../app/use-case/Saida/get-saida';
import { GetManySaidasUseCase } from '../../../app/use-case/Saida/get-all-saidas'
import { validatedToken, ValidatedToken } from '../TokenDTO/validatedToken';
import { consultaSaidaDto, ConsultaSaidaDto } from './DTO/consulta-saida-dto';
import { createSaidaDTO, CreateSaidaDTO } from './DTO/create-saida-dto';
import { deleteSaidaDTO, DeleteSaidaDTO } from './DTO/delete-saida-dto';
import { SaidaView } from './View/saida-view';
import { idSaidaDto, IdSaidaDto, updateSaidaDTO, UpdateSaidaDTO } from './DTO/update-saida-dto';
import { UpdateSaidaUseCase } from '../../../app/use-case/Saida/update-saida';

export class SaidaController {

  constructor(
    private saidaSaldoUseCase: SaidaSaldoUseCase,
    private deleteSaidaUseCase: DeleteSaidaUseCase,
    private getBySaidaUseCase: GetBySaidaUseCase,
    private updateSaidaUseCase: UpdateSaidaUseCase,
    private getManySaidasUseCase: GetManySaidasUseCase
  ) { }

  async register(req: FastifyRequest, reply: FastifyReply) {
    const { valor, descricao, meioPagamento }: CreateSaidaDTO = createSaidaDTO.parse(req.body)
    const { token }: ValidatedToken = validatedToken.parse(req.query)

    const { newSaida } = await this.saidaSaldoUseCase.execute({
      valor, descricao, meioPagamento, token
    })

    reply.status(201).send({
      saida: SaidaView.createSaida(newSaida)
    })
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { saidaId }: DeleteSaidaDTO = deleteSaidaDTO.parse(req.body)
    const { token }: ValidatedToken = validatedToken.parse(req.query)

    const { saida } = await this.deleteSaidaUseCase.execute({
      saidaId,
      token
    })

    reply.status(201).send({
      message: 'Saída deletada',
      saida: SaidaView.deleteSaida(saida)
    })
  }

  async getBySaida(req: FastifyRequest, reply: FastifyReply) {

    try {
      const { saidaId }: ConsultaSaidaDto = consultaSaidaDto.parse(req.params)
      const { token }: ValidatedToken = validatedToken.parse(req.query)

      const { saida } = await this.getBySaidaUseCase.execute({
        saidaId,
        token
      })

      reply.status(200).send({
        saida: SaidaView.getBySaida(saida)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }
  }

  async updateSaida(req: FastifyRequest, reply: FastifyReply) {

    try {
      const { saidaId }: IdSaidaDto = idSaidaDto.parse(req.params)
      const { valor, descricao, meioPagamento }: UpdateSaidaDTO = updateSaidaDTO.parse(req.body)
      const { token }: ValidatedToken = validatedToken.parse(req.query)

      const { saida } = await this.updateSaidaUseCase.execute({
        saidaId,
        token,
        valor,
        descricao,
        meioPagamento
      })

      reply.status(200).send({
        saida: SaidaView.retSaida(saida)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }

  }

  async getManySaidas(req: FastifyRequest, reply: FastifyReply) {

    try {
      const { token }: ValidatedToken = validatedToken.parse(req.query)

      const { saidas } = await this.getManySaidasUseCase.execute({
        token
      })

      reply.status(200).send({
        saida: SaidaView.getManySaidas(saidas)
      })
    } catch (error) {
      reply.status(400).send({
        message: error.message
      })
    }
  }

}