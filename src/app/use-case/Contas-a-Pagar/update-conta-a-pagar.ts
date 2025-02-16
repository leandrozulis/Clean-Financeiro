import { ContasAPagar } from "../../entities/Contas_a_Pagar";
import { CartoesRepository } from "../../repository/cartoes-repository";
import { ContasAPagarRepository } from "../../repository/conta-a-pagar-repository";
import { ContaRepository } from "../../repository/conta-repository";
import { RegistroNaoEncontrado } from "../Erros/registro_nao_encontrado";

interface UpdateContaAPagarUseCaseRequest {
  contaapagarId: string;
  token: string;
  cartaoId: string;
  valor?: number;
  descricao?: string;
  parcelas?: string;
  userId?: string;
}

interface UpdateContaAPagarUseCaseResponse {
  newContaAPagar: ContasAPagar;
}

export class UpdateContaAPagarUseCase {
  constructor(
    private contaapagarRepository: ContasAPagarRepository,
    private cartaoRepository: CartoesRepository,
    private contaRepository: ContaRepository
  ) { }

  async execute({
    contaapagarId,
    token,
    cartaoId,
    valor,
    descricao,
    parcelas
  }: UpdateContaAPagarUseCaseRequest): Promise<UpdateContaAPagarUseCaseResponse> {
    const conta = await this.contaRepository.findByToken(token);
    const cartao = await this.cartaoRepository.getById(cartaoId);
    const contaapagar = await this.contaapagarRepository.getById(contaapagarId);

    if (!conta) {
      throw new RegistroNaoEncontrado();
    }

    if (!cartao) {
      throw new RegistroNaoEncontrado();
    }

    if (!contaapagar) {
      throw new RegistroNaoEncontrado();
    }

    const updatedValor = valor ?? contaapagar.valor;

    const newContaAPagar = new ContasAPagar(
      {
        valor: updatedValor,
        descricao: descricao ?? contaapagar.descricao,
        parcelas: parcelas ?? contaapagar.parcelas,
        userId: conta.id,
        cartaoId: cartao.id,
        dtcadastro: contaapagar.dtcadastro,
      },
      contaapagar.id
    );

    try {

      await this.contaapagarRepository.quitarParcela(contaapagar.id, newContaAPagar);

      if (updatedValor < contaapagar.valor) {
        let newValue = contaapagar.valor - updatedValor
        cartao.saida(newValue)
      } else if (updatedValor > contaapagar.valor) {
        let newValue = updatedValor - contaapagar.valor
        cartao.entrada(newValue)
      } else {
        cartao.limite
      }

      await this.cartaoRepository.updateSaldo(cartao.id, cartao.limite);

      return {
        newContaAPagar,
      };
    } catch (error) {
      console.error("Erro ao atualizar conta a pagar:", error);
      throw new Error("Erro ao atualizar conta a pagar");
    }
  }
}