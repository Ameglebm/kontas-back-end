# 📘 Kontas — Backend

![Visão geral do Kontas](../kontas-back-end/md/kontas-overview.png.png)

O **Kontas** é um sistema de **gestão financeira compartilhada para repúblicas**, criado para organizar despesas, dividir contas e acompanhar pagamentos de forma simples e transparente entre moradores.

A aplicação permite que os usuários:

- 🏠 Criem ou entrem em uma república  
- 👥 Convidem moradores  
- 💰 Cadastrem contas e despesas compartilhadas  
- ➗ Dividam valores automaticamente  
- ✅ Acompanhem quem já pagou e quem ainda está pendente  

O backend foi desenvolvido com **NestJS**, **Prisma ORM** e **PostgreSQL**, utilizando uma abordagem **Data-Centric** para garantir integridade, consistência e segurança dos dados.

---


## 📃 Sobre o Projeto

O Kontas foi pensado para resolver o controle financeiro em ambientes compartilhados, como repúblicas, de forma simples, segura e organizada.

Fluxo de uso principal:

1. O usuário cria uma conta e faz login
2. Cria ou entra em uma república
3. Recebe ou envia convites
4. Gerencia contas e despesas compartilhadas
5. Acompanham-se responsabilidades e pagamentos

---

## 🧭 Fluxo geral do sistema

O diagrama abaixo representa o fluxo principal do **Kontas**, desde a autenticação do usuário até o gerenciamento das contas compartilhadas, seguindo a arquitetura **Data-Centric**.

```mermaid
flowchart LR
    U[👤 Usuário]
    A[🔐 Auth<br/>JWT]
    R[🏠 República]
    M[👥 Moradores]
    V[✉️ Convites]
    C[💰 Contas]
    CM[🔗 ContaMorador]
    D[(🗄️ PostgreSQL)]

    %% Fluxo principal
    U --> A --> R

    %% Fluxo humano
    R --> M --> V

    %% Fluxo financeiro
    R --> C --> CM

    %% Persistência
    M --> D
    V --> D
    C --> D
    CM --> D
    R --> D

    %% Data-centric
    D --- DC[🧠 Data-Centric<br/>Banco = Verdade]

    %% Regras de papel
    M --- ADM[🟢 ADMIN<br/>Acesso total]
    M --- USR[🔵 USER<br/>Permissões limitadas]

    %% Cores dos fluxos
    linkStyle 0,1 stroke:#6C63FF,stroke-width:2px   %% Auth
    linkStyle 2,3 stroke:#2ECC71,stroke-width:2px   %% Humano
    linkStyle 4,5 stroke:#F39C12,stroke-width:2px   %% Financeiro
    linkStyle 6,7,8,9,10 stroke:#95A5A6,stroke-width:1.5px %% DB
```

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

/kontas-backend
│
├── prisma/
│ ├── migrations/ # Histórico de migrações do banco
│ └── schema.prisma # Models, enums e relacionamentos (fonte de verdade)
│
├── src/
│ ├── enums/ # Enums globais do domínio
│ │
│ ├── lib/
│ │ └── prisma.ts # Instância única do PrismaClient
│ │
│ ├── middlewares/
│ │ ├── auth.guard.ts # Autenticação JWT
│ │ ├── roles.guard.ts # Controle de acesso por papel
│ │ └── perfilCompleto.guard.ts # Verificação de perfil completo
│ │
│ ├── models/ # Domínios da aplicação
│ │ ├── auth/ # Autenticação e emissão de token
│ │ │
│ │ ├── usuario/ # Usuário e perfil
│ │ │
│ │ ├── republicas/ # Repúblicas
│ │ │
│ │ ├── morador/ # Relação usuário ↔ república
│ │ │
│ │ ├── convite/ # Convites para república
│ │ │
│ │ ├── contaMorador/ # Relação contas ↔ moradores
│ │ │
│ │ └── contas/ # Contas e despesas compartilhadas
│ │ ├── controllers/ # Camada HTTP
│ │ │ └── contas.controller.ts
│ │ ├── dtos/ # DTOs de entrada e saída
│ │ │ ├── contas.dto.ts
│ │ │ ├── contas-update.dto.ts
│ │ │ └── contas-response.dto.ts
│ │ ├── interface/ # Contratos
│ │ │ ├── contas.repository.interface.ts
│ │ │ └── contas.service.interface.ts
│ │ ├── repository/ # Acesso a dados (Prisma)
│ │ │ └── contas.repository.ts
│ │ ├── service/ # Regras de negócio
│ │ │ └── contas.service.ts
│ │ ├── types/ # Tipos do domínio
│ │ ├── contas.constants.ts # Tokens e constantes do módulo
│ │ └── contas.module.ts # Configuração do módulo
│ │
│ ├── app.module.ts # Módulo raiz da aplicação
│ └── main.ts # Bootstrap do NestJS
│
├── test/ # Testes automatizados
├── .env # Variáveis de ambiente
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

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

| Módulo        | Descrição                                     | Endpoints Principais      |
| ------------- | --------------------------------------------- | ------------------------- |
| Auth          | Autenticação JWT e Google OAuth 2.0           | /auth/login, /auth/google |
| Usuários      | Cadastro e gerenciamento de usuários          | /usuarios                 |
| Repúblicas    | Criação e gestão de repúblicas                | /republicas               |
| Moradores     | Gestão de moradores vinculados às repúblicas  | /moradores                |
| Contas        | Criação e gerenciamento de contas financeiras | /contas                   |
| ContasMorador | Associação de contas aos moradores            | /contas-morador           |
| Convites      | Envio e gerenciamento de convites             | /convites                 |

## 🚧 Autor

- Nome: **Alisson**
- GitHub: [Ameglebm](https://github.com/Ameglebm)
- Email: [ameglevr@gmail.com](mailto:ameglevr@gmail.com)
