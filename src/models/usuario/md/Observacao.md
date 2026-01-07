1️⃣ usuario.repository.interface.ts

➡️ Contrato de acesso a dados (Prisma / Banco)
Responsável por buscar, criar, atualizar usuário no banco.

Exemplo do papel dele:

buscar usuário por id

buscar por email

criar usuário

atualizar usuário

📌 Só fala de banco

2️⃣ usuario.service.interface.ts

➡️ Contrato da regra de negócio
Define o que o sistema pode fazer com usuário, não como.

Exemplo do papel dele:

obter perfil do usuário

atualizar perfil

entrar em república

sair da república

📌 Não sabe nada de Prisma
📌 Só regra de negócio

🧠 Forma simples de entender

Pensa assim:

Controller 👉 fala com o mundo (HTTP)

Service 👉 pensa e decide

Repository 👉 mexe no banco

🔍 Diferença rápida (tabela mental)
Arquivo Serve => pra quê
repository.interface => Contrato com o banco
repository Prisma
service.interface => Contrato da regra
service => Regra de negócio
controller => HTTP

🟢 Regra prática (pra não se perder)

Tudo que é find/create/update no banco → Repository

Tudo que é decisão, validação, fluxo → Service

Tudo que é req/res → Controller

Tudo que é formato de entrada/saída → DTO

🧠 Regra de ouro (bem simples)

DTO → vem de fora (request / controller)

Type → usado dentro do sistema

ResponseDto → sai para fora (response)

🧠 Regra de ouro (bem simples)

DTO → vem de fora (request / controller)

Type → usado dentro do sistema

ResponseDto → sai para fora (response)

✔ Arquitetura

Separação clara:

controller → entrada HTTP

service → regra de negócio

repository → acesso a dados

types → modelo de domínio

dtos → contrato de entrada/saída

Uso correto de token (USUARIO_REPOSITORY)

@Inject(USUARIO_REPOSITORY) aplicado corretamente

Service depende de interface, não de Prisma

Repository isolado com Prisma

