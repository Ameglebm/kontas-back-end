import { Conta } from "@prisma/client";
import { ContaType } from "../graphql/types/conta.type";

export class ContaAdapter {
  static toGraphQL(conta: Conta): ContaType {
    return {
      id: conta.id,
      descricao: conta.descricao,
      valor: Number(conta.valor),
      vencimento: conta.vencimento,
      status: conta.status,
      republicaId: conta.republicaId,
      criadoEm: conta.criadoEm,
      atualizadoEm: conta.atualizadoEm,
    };
  }
}
