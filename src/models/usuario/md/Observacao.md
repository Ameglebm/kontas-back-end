# 🧩 Arquitetura — Usuário (Visão Clara)

## 1️⃣ `usuario.repository.interface.ts`

➡️ **Contrato de acesso a dados (Banco / Prisma)**  
Responsável **exclusivamente** por buscar, criar e atualizar dados do usuário no banco.

### Papel do Repository
- Buscar usuário por **id**
- Buscar usuário por **email**
- Criar usuário
- Atualizar usuário

📌 **Só fala de banco**  
📌 **Não contém regra de negócio**

---

## 2️⃣ `usuario.service.interface.ts`

➡️ **Contrato da regra de negócio**  
Define **o que o sistema pode fazer** com o usuário, não **como** os dados são salvos.

### Papel do Service
- Obter perfil do usuário
- Atualizar perfil
- Entrar em república
- Sair da república

📌 **Não sabe nada de Prisma**  
📌 **Só regra de negócio**

---

## 🧠 Forma simples de entender

Pensa assim:


---

## 🔍 Diferença rápida (tabela mental)

| Arquivo / Camada            | Serve para quê |
|-----------------------------|----------------|
| `repository.interface.ts`   | Contrato com o banco |
| `repository (Prisma)`       | Implementação do acesso ao banco |
| `service.interface.ts`      | Contrato da regra de negócio |
| `service.ts`                | Regra de negócio |
| `controller.ts`             | HTTP (req / res) |

---

## 🟢 Regra prática (pra não se perder)

- Tudo que é **find / create / update no banco** → **Repository**
- Tudo que é **decisão, validação, fluxo** → **Service**
- Tudo que é **req / res (HTTP)** → **Controller**
- Tudo que é **formato de entrada e saída** → **DTO**

---

## 🧠 Regra de ouro — tipos de dados

- **DTO** → vem de fora  
  (request / controller)

- **Type** → usado dentro do sistema  
  (modelo de domínio)

- **ResponseDto** → sai para fora  
  (response da API)

---

## ✔ Arquitetura — Separação clara de responsabilidades

- `controller` → entrada HTTP
- `service` → regra de negócio
- `repository` → acesso a dados
- `types` → modelo de domínio
- `dtos` → contrato de entrada e saída

---

## 🔐 Boas práticas aplicadas

- Uso correto de **token de injeção** (`USUARIO_REPOSITORY`)
- `@Inject(USUARIO_REPOSITORY)` aplicado corretamente
- **Service depende de interface**, não de Prisma
- **Repository isolado** com Prisma
- Código desacoplado, testável e escalável
