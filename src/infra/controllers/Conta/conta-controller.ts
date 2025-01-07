import { FastifyReply, FastifyRequest } from "fastify";
import { CreateContaUseCase } from "../../../app/use-case/Conta/create-conta";
import { createContaDTO, CreateContaDTO } from "./DTO/create-conta-dto";
import { validatedToken, ValidatedToken } from '../TokenDTO/validatedToken';
import { GetProfileUseCase } from "../../../app/use-case/Conta/get-profile";
import { GetManyProfileUseCase } from "../../../app/use-case/Conta/get-many-profile";
import { ContaView } from "./View/conta-view";

export class ContaController {
  constructor(
    private createContaUseCase: CreateContaUseCase,
    private getProfile: GetProfileUseCase,
    private getManyProfile: GetManyProfileUseCase
  ) { }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const { email, senha, nome, saldo }: CreateContaDTO = createContaDTO.parse(req.body)
    const { conta } = await this.createContaUseCase.execute({
      email,
      senha,
      nome,
      saldo
    })

    reply.status(201).send({
      conta: ContaView.createConta(conta)
    })
  }

  async getProfileAccount(req: FastifyRequest, reply: FastifyReply) {

    const { token }: ValidatedToken = validatedToken.parse(req.query)
    const { perfil } = await this.getProfile.execute({ token })

    reply.status(200).send({
      conta: ContaView.createConta(perfil)
    })
  }

  async getManyProfilesAccount(req: FastifyRequest, reply: FastifyReply) {

    const { contas } = await this.getManyProfile.execute()

    reply.status(200).send({
      contas: ContaView.getAllProfile(contas)
    })

  }
}