# 📘 Kontas — Backend

![Visão geral do Kontas](/md/kontas-overview.png)

O **Kontas** é um sistema de **gestão financeira compartilhada para repúblicas**, criado para organizar despesas, dividir contas e acompanhar pagamentos de forma simples e transparente entre moradores.

A aplicação permite que os usuários:
- 🏠 Criem ou entrem em uma república
- 👥 Convidem moradores
- 💰 Cadastrem contas e despesas compartilhadas
- ➗ Dividam valores automaticamente
- ✅ Acompanhem quem já pagou e quem ainda está pendente

Backend de Alta Performance e Evolução Contínua  
**NestJS • Prisma • PostgreSQL • MVC → GraphQL • Clean Architecture • Data-Centric Design**

O backend do **Kontas** vem passando por uma evolução arquitetural significativa, sempre guiada por três objetivos centrais:

- ✨ Melhorar performance  
- 🔗 Desacoplar frontend e backend  
- ⚡ Reduzir retrabalho e acelerar o desenvolvimento  

Começamos com **API REST + MVC**, evoluímos para **GraphQL**, e hoje o sistema segue um modelo **Clean / Layered** totalmente alinhado com boas práticas modernas.

A transição não foi apenas técnica — foi **estratégica**. O foco é entregar um backend mais leve, eficiente, testável, escalável e que permita ao frontend trabalhar com total autonomia.

---

# 🌐 Panorama Geral da Arquitetura

| Camada / Tecnologia | Papel no Sistema |
|---------------------|------------------|
| **NestJS** | Estrutura modular, padronizada e escalável |
| **Prisma ORM** | Fonte da verdade do banco (**Data-Centric**) |
| **PostgreSQL** | Armazenamento relacional consistente |
| **GraphQL** | Contrato tipado, flexível e sem overfetch/underfetch |
| **Clean Architecture** | Isolamento de regras, testabilidade e independência |
| **MVC (inicial)** | Organização simples e direta para o estágio inicial |
| **JWT** | Autenticação segura |
| **class-validator** | Validação robusta |
| **Docker (futuro)** | Containerização |
| **Railway / Render** | Deploy |

---

# 🔄 Por que migramos de REST → GraphQL?

A decisão foi cuidadosamente analisada e baseada em desafios reais:

---

## 🟧 1. Reduzir o Número de Requisições

No REST, telas complexas exigiam várias chamadas encadeadas.

GraphQL resolve isso com:

- Uma única query entregando todo o pacote de dados  
- Menos tráfego  
- Menos latência  
- App mais rápido  

---

## 🟦 2. Evitar Overfetch & Underfetch

No REST:  
- **Overfetch** → Envia mais dados que o necessário  
- **Underfetch** → Envia menos e exige novas requisições  

No GraphQL:  
✔ O frontend pede **exatamente** o que precisa  
✔ Nenhum campo a mais ou a menos  
✔ Contrato limpo e eficiente  

---

## 🟩 3. Desacoplar Frontend e Backend

Antes:  
- Frontend dependia de mudanças no backend  
- Ajustes simples exigiam novos endpoints  
- Muito alinhamento e retrabalho  

Depois:  
✔ Contrato estável  
✔ Frontend evolui sem bloquear backend  
✔ Menos reuniões, mais produtividade  

---

## 🟪 4. Menos Endpoints, Menos Testes, Mais Tempo

Com o REST:  
- Explosão de rotas  
- Testes complexos  
- Respostas quebravam telas  
- QA lento  

Com GraphQL:  
✔ Contrato único  
✔ Estruturas tipadas e auto-documentadas  
✔ Testes mais simples  
✔ Backend mais leve  

---

## 🟨 5. Melhor Performance e Manutenção Simplificada

Benefícios atuais:

- Menos chamadas ao servidor  
- Respostas menores  
- Menos tráfego  
- Regras de negócio centralizadas  
- Services independentes e testáveis  
- Repositórios isolados  

---

## 🧩 Futuro Garantido

- Ideal para crescimento  
- Manutenção facilitada  
- Módulos evoluem sem quebrar outros  

---

## ⚙️ Código Padronizado

- Camadas claras  
- Patterns consistentes  
- Regras isoladas  

---

## 📈 Escalabilidade

- Pronto para novos módulos  
- Contrato sólido entre equipes  

---

## 🔍 Transparência e Documentação Viva

- O schema GraphQL **é** a documentação  
- Sem necessidade de Swagger manual  

---

## 🧠 Arquitetura

O projeto segue separação clara de responsabilidades:

- **Controller** → Camada HTTP
- **Service** → Regra de negócio
- **Repository** → Acesso a dados
- **Interfaces** → Contratos
- **DTOs** → Entrada e saída de dados
- **Types / Models** → Domínio interno
- **Prisma Schema** → Núcleo do sistema (Data-Centric)
- Services dependem apenas de **interfaces**
- Repositories isolam completamente o Prisma
- Controllers não contêm regra de negócio
- Schema Prisma define o domínio (Data-Centric)

---

## 🗄️ Data-Centric Design

- O **schema Prisma** define entidades e relacionamentos
- O domínio deriva diretamente do banco
- Regras de integridade garantidas no nível de dados
- Enums globais centralizados
- Relacionamentos explícitos (1:N, N:N)

---

## 🧩 Tecnologias Utilizadas

| Tecnologia       | Finalidade                            |
| ---------------- | ------------------------------------- |
| Node.js          | Ambiente de execução JavaScript       |
| TypeScript       | Tipagem estática e segurança          |
| NestJS           | Framework backend modular e escalável |
| Prisma ORM       | ORM moderno e tipado                  |
| PostgreSQL       | Banco de dados relacional             |
| JWT              | Autenticação segura                   |
| Swagger          | Documentação da API                   |
| class-validator  | Validação de dados                    |
| Docker (futuro)  | Containerização                       |
| Railway / Render | Deploy                                |

---

## 📂 Estrutura de Pastas
```text
/kontas-backend
│
├── prisma/
│   ├── migrations/              # Histórico de migrações do banco
│   └── schema.prisma            # Models, enums e relacionamentos (fonte de verdade)
│
├── src/
│   ├── enums/                   # Enums globais do domínio
│   │
│   ├── lib/
│   │   └── prisma.ts            # Instância única do PrismaClient
│   │
│   ├── middlewares/
│   │   ├── auth.guard.ts        # Autenticação JWT
│   │   ├── roles.guard.ts       # Controle de acesso por papel
│   │   └── perfilCompleto.guard.ts # Verificação de perfil completo
│   │
│   ├── models/                  # Domínios da aplicação
│   │   ├── auth/                # Autenticação e emissão de token
│   │   ├── usuario/             # Usuário e perfil
│   │   ├── republicas/          # Repúblicas | Antes com MVC, Api Rest
│   │   │   ├─ controllers/
│   │   │   │  └─ republicas.controller.ts   # Rotas HTTP
│   │   │   ├─ service/
│   │   │   │  └─ republicas.service.ts      # Regras de negócio
│   │   │   ├─ repository/
│   │   │   │  └─ republicas.repository.ts   # Acesso a dados (Prisma)
│   │   │   ├─ dtos/
│   │   │   │  ├─ create-republica.dto.ts
│   │   │   │  └─ update-republica.dto.ts
│   │   │   ├─ interface/ #
│   │   │   │  └─ republicas.repository.interface.ts
│   │   │   ├─ republicas.constants.ts
│   │   │   └─ republicas.module.ts
│   │   ├── morador/             # Relação usuário ↔ república
│   │   ├── convite/             # Convites para república
│   │   ├── contaMorador/        # Relação contas ↔ moradores
│   │   └── contas/              # Contas e despesas compartilhadas | Agora com Layered / Clean Architecture e Api graphQL
│   │   │  ├─ resolvers/
│   │   │  │  └─ contas.resolver.ts
│   │   │  ├─ service/
│   │   │  │  └─ contas.service.ts
│   │   │  ├─ repository/
│   │   │  │  └─ contas.repository.ts
│   │   │  ├─ common/
│   │   │  │  └─ conta.common.ts
│   │   │  ├─ graphql/
│   │   │  │  ├─ enums/
│   │   │  │  │  └─ status.conta.enum.ts
│   │   │  │  ├─ inputs/
│   │   │  │  │  ├─ create-conta.input.ts
│   │   │  │  │  └─ update-conta.input.ts
│   │   │  │  └─ types/
│   │   │  │     └─ conta.type.ts
│   │   │  ├─ contas.constants.ts
│   │   │  ├─ contas.module.ts
│   │   │  └─ README.md
│   │
│   ├── app.module.ts            # Módulo raiz da aplicação
│   └── main.ts                  # Bootstrap do NestJS
│
├── test/                        # Testes automatizados
├── .env                         # Variáveis de ambiente
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```
## 📦 Models

---

## 🔐 Módulo Auth

Responsável por:

- Autenticação do usuário
- Emissão e validação de token JWT
- Identificação do usuário autenticado

Centraliza a lógica de segurança inicial da aplicação.

Separação clara entre:

- Controller → fluxo de autenticação
- Service → regras de validação
- Repository → acesso a dados do usuário

---

## 🧍 Módulo Usuário

Responsável por:

- Perfil do usuário
- Autenticação
- Identidade do sistema

Separação clara entre:

- Repository → acesso a dados
- Service → regra de negócio

---

## 🏠 Módulo República

Responsável por:

- Criação de repúblicas
- Gestão de moradores
- Controle de acesso à república

### Endpoints principais

- `POST /republicas`
- `GET /republicas`
- `GET /republicas/:id`
- `PATCH /republicas/:id`
- `DELETE /republicas/:id`

---

## 👥 Módulo Morador

Responsável por:

- Vínculo entre usuário e república
- Papel do usuário dentro da república (roles)
- Controle de permissões internas

Representa a relação **N:N** entre usuários e repúblicas.

---

## ✉️ Módulo Convites

Responsável por:

- Convites para entrada em repúblicas
- Controle do fluxo de aceite ou recusa

Status controlado via enum:

- `PENDENTE`
- `ACEITO`
- `RECUSADO`

---

## 💰 Módulo Contas

Responsável por:

- Criação de contas/despesas
- Controle de valores, vencimento e pagamento
- Associação da conta à república

Centraliza a regra de negócio financeira.

---

## 🔗 Módulo ContaMorador

Responsável por:

- Relacionar contas aos moradores
- Definir quem participa de cada despesa
- Base para divisão de valores

Representa a relação **N:N** entre contas e moradores.

---

## 🔐 Segurança

- Autenticação obrigatória
- Guards aplicados nos controllers
- Validações e autorizações tratadas no service
- Controllers sem regra de negócio

---

### 1. Clonar o repositório

```bash
git clone  https://github.com/Ameglebm/backend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar o banco de dados

Configure o arquivo `.env` com a sua URL de conexão do banco PostgreSQL

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/imobifacil"
JWT_SECRET="sua_chave_jwt"
```

### 4. Rodar as migrações e iniciar o projeto

```bash
npx prisma migrate dev
npm run start:dev
```

## 🔢 Scripts disponíveis

```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run start:prod

# Rodar testes
npm run test

# Testes E2E
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 🗕️ Funcionalidades principais

- Autenticação segura com JWT
- Login com Google OAuth 2.0
- Controle de acesso baseado em papéis (RBAC)
- Cadastro e gerenciamento de usuários
- Criação e gerenciamento de repúblicas
- Sistema de convites para usuários
- Middleware de autenticação e autorização
- Validação de dados com DTOs
- Integração com PostgreSQL via Prisma
- Arquitetura orientada a dados (Data-Centric)
- Camada de domínio orientada a dados

## 📦 Deploy

O projeto pode ser deployado em qualquer ambiente Node.js, como:

- Railway
- Render
- AWS
- Heroku

## 📦 Módulos Principais

| Módulo       | Descrição                                     | Endpoints Principais          |
| ------------ | --------------------------------------------- | ----------------------------- |
| Auth         | Autenticação JWT e Google OAuth 2.0           | `/auth/login`, `/auth/google` |
| Usuário      | Cadastro e gerenciamento de usuários          | `/usuarios`                   |
| Repúblicas   | Criação e gestão de repúblicas                | `/republicas`                 |
| Moradores    | Gestão de moradores vinculados às repúblicas  | `/moradores`                  |
| Contas       | Criação e gerenciamento de contas financeiras | `/contas`                     |
| ContaMorador | Associação de contas aos moradores            | `/contas-morador`             |
| Convites     | Envio e gerenciamento de convites             | `/convites`                   |

## 🚧 Autor

- Nome: **Alisson**
- GitHub: [Ameglebm](https://github.com/Ameglebm)
- Email: [ameglevr@gmail.com](mailto:ameglevr@gmail.com)
