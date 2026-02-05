# 📚 Módulo Contas – API GraphQL

## 🔹 Visão Geral
Este módulo é responsável pelo gerenciamento de **contas de uma república**.

Anteriormente, a API utilizava **REST + MVC**. Nesta PR, o módulo foi **migrado para GraphQL**, adotando **Arquitetura em Camadas (Layered / Clean Architecture)**, promovendo maior separação de responsabilidades, melhor testabilidade e um contrato de API mais explícito.

**Arquitetura:**
```
Cliente → Resolver → Service → Repository / Adapter → Database
        ↳ GraphQL Types / Inputs / Enums
```

---

## 🧱 Camadas da Arquitetura

| Camada | Responsabilidade |
|------|------------------|
| **Resolver** | Substitui o Controller REST. Recebe Queries e Mutations GraphQL |
| **Service** | Contém regras de negócio e validações |
| **Repository / Adapter / Common** | Acesso a dados e adaptação para GraphQL |
| **GraphQL Types / Inputs / Enums** | Contrato da API e validação de dados |

---

## 📁 Estrutura de Pastas

```txt
models/
└─ contas/
   ├─ resolvers/
   │  └─ contas.resolver.ts
   ├─ service/
   │  └─ contas.service.ts
   ├─ repository/
   │  └─ contas.repository.ts
   ├─ common/
   │  └─ conta.common.ts
   ├─ graphql/
   │  ├─ enums/
   │  │  └─ status.conta.enum.ts
   │  ├─ inputs/
   │  │  ├─ create-conta.input.ts
   │  │  └─ update-conta.input.ts
   │  └─ types/
   │     └─ conta.type.ts
   ├─ contas.constants.ts
   ├─ contas.module.ts
   └─ README.md
```

---

## 🔹 GraphQL – Enums, Inputs e Types

### Enum: StatusConta
```ts
import { registerEnumType } from '@nestjs/graphql';
import { StatusConta } from '@prisma/client';

registerEnumType(StatusConta, {
  name: 'StatusConta',
  description: 'Status da conta',
});
```

### Input: CriarContaInput
```ts
@InputType()
export class CriarContaInput {
  @Field()
  descricao!: string;

  @Field(() => Float)
  valor!: number;

  @Field()
  vencimento!: Date;

  @Field()
  republicaId!: string;

  @Field(() => StatusConta, { nullable: true })
  status?: StatusConta;
}
```

### Input: AtualizarContaInput
```ts
@InputType()
export class AtualizarContaInput {
  @Field(() => StatusConta, { nullable: true })
  status?: StatusConta;
}
```

### Type: ContaType
```ts
@ObjectType()
export class ContaType {
  @Field()
  id!: string;

  @Field()
  descricao!: string;

  @Field(() => Float)
  valor!: number;

  @Field()
  vencimento!: Date;

  @Field()
  status!: StatusConta;

  @Field()
  republicaId!: string;

  @Field()
  criadoEm!: Date;

  @Field()
  atualizadoEm!: Date;
}
```

---

## 🔹 Common / Adapter
Responsável por adaptar entidades do banco para o contrato GraphQL.

```ts
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
```

---

## 🔹 Resolver
Substitui os Controllers REST e expõe Queries e Mutations GraphQL.

```ts
@Resolver(() => ContaType)
@UseGuards(AuthGuard)
export class ContaResolver {
  constructor(
    @Inject(CONTA_SERVICE)
    private readonly contaService: ContaService,
  ) {}

  @Mutation(() => ContaType)
  async criarConta(
    @Args('data') graphql: CriarContaInput,
    @Context() ctx: GqlContext,
  ) {
    return this.contaService.criar(graphql, ctx.req.user.id);
  }

  @Query(() => [ContaType])
  async contasPorRepublica(
    @Args('republicaId') republicaId: string,
  ) {
    return this.contaService.listarPorRepublica(republicaId);
  }

  @Mutation(() => ContaType)
  async atualizarStatus(
    @Args('contaId') contaId: string,
    @Args('data') data: AtualizarContaInput,
    @Context() ctx: GqlContext,
  ) {
    return this.contaService.atualizarStatus(
      contaId,
      data,
      ctx.req.user.id,
    );
  }

  @Mutation(() => Boolean)
  async removerConta(
    @Args('contaId') contaId: string,
    @Context() ctx: GqlContext,
  ) {
    return this.contaService.remover(contaId, ctx.req.user.id);
  }
}
```

---

## 🔹 Módulo Contas

```ts
@Module({
  providers: [
    ContaResolver,
    { provide: CONTA_SERVICE, useClass: ContaService },
    { provide: CONTA_REPOSITORY, useClass: ContaRepository },
    { provide: MORADOR_REPOSITORY, useClass: MoradorRepository },
  ],
  exports: [CONTA_SERVICE],
})
export class ContaModule {}
```

---

## 🔄 Fluxo de Dados

```
Client (GraphQL Query/Mutation)
  ↓
ContaResolver
  ↓
ContaService
  ↓
ContaRepository / ContaAdapter
  ↓
Banco de Dados (Prisma)
  ↑
ContaType (retorno GraphQL)
```

---

## 🧪 Exemplos de Queries e Mutations

### Criar Conta
```graphql
mutation {
  criarConta(
    data: {
      descricao: "Conta de luz"
      valor: 350.5
      vencimento: "2026-02-10"
      republicaId: "uuid-republica"
      status: PENDENTE
    }
  ) {
    id
    descricao
    valor
    status
    vencimento
  }
}
```

### Listar Contas por República
```graphql
query {
  contasPorRepublica(republicaId: "uuid-republica") {
    id
    descricao
    valor
    status
    vencimento
  }
}
```

### Atualizar Status
```graphql
mutation {
  atualizarStatus(
    contaId: "uuid-conta"
    data: { status: PAGO }
  ) {
    id
    descricao
    status
  }
}
```

### Remover Conta
```graphql
mutation {
  removerConta(contaId: "uuid-conta")
}
```

---

## ✅ Benefícios da Migração REST → GraphQL
- Contrato fortemente tipado
- Menor overfetch / underfetch
- Evolução de API sem breaking changes
- Melhor alinhamento com Clean Architecture
- Resolvers substituem Controllers mantendo responsabilidades claras
