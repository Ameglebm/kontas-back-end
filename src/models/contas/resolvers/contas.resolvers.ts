// Antigo Controller
import { UseGuards, Inject } from '@nestjs/common';
import { ApiBearerAuth} from '@nestjs/swagger';
import { AuthGuard } from '../../../middlewares/auth.guard';
import { CONTA_SERVICE } from '../contas.constants';
import type { ContaService } from '../interface/contas.service.interface';
import { CriarContaInput } from '../graphql/inputs/create-conta.type';
import { Resolver, Context, Mutation, Args, Query } from '@nestjs/graphql'
import { ContaType } from '../graphql/types/conta.type';
import { AtualizarContaInput } from '../graphql/inputs/update-conta.input';

interface GqlContext {
  req: {
    user: {
      id: string;
    };
  };
}

@ApiBearerAuth()
@Resolver(() => ContaType)
@UseGuards(AuthGuard)
export class ContaResolver {
    constructor(
        @Inject(CONTA_SERVICE)
        private readonly contaService: ContaService,
    ) {}
    // 🔹 Criar conta 
    @Mutation(() => ContaType)
    async criarConta(
        @Args('data') graphql: CriarContaInput,
        @Context() ctx: GqlContext
    ) {
        return this.contaService.criar(graphql, ctx.req.user.id);
    }

    // 🔹 Listar contas da república
    @Query(() => [ContaType])
    async contasPorRepublica(
        @Args('republicaId') republicaId: string,
    ) {
        return this.contaService.listarPorRepublica(republicaId); //mudar para contasPorRep
    }

    // 🔹 Atualizar status da conta (ADMIN da república)
    @Mutation(() => ContaType)
    async atualizarStatus(
        @Args('contaId') contaId: string,
        @Args('data') data: AtualizarContaInput,
        @Context() ctx: GqlContext,
    ) {
        return this.contaService.atualizarStatus(
            contaId, 
            data, 
            ctx.req.user.id
        );
    }
    
    // 🔹 Remover conta (ADMIN da república)
    @Mutation(() => Boolean)
    async removerConta(
        @Args('contaId') contaId: string,
        @Context() ctx: GqlContext,
    ) {
        return this.contaService.remover(contaId, ctx.req.user.id);
    }
}
