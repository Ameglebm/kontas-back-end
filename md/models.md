# 🧩 Kontas — Modelagem de Dados (Atual)

Este documento descreve **todos os models necessários no momento atual do Kontas**, explicando o **papel de cada um**, suas responsabilidades e por que **nenhum é redundante**.

---

## ✅ Total de Models Necessários (AGORA)

| Model              | Status |
|--------------------|--------|
| Usuario            | ✅ |
| Republica          | ✅ |
| Morador            | ✅ |
| Convite            | ✅ |
| Conta              | ✅ |
| ContaMorador       | ✅ |
| CodigoVerificacao  | ✅ |

👉 **Total: 7 models**  
👉 **Nenhum redundante**  
👉 **Nenhum faltando**  
👉 **Arquitetura limpa, escalável e coerente com o fluxo**

---

## 🧍 Model: Usuario

### 📌 Responsabilidade
Representa o **usuário global do sistema**, independente de república.

### 💡 Por que existe
- Login com Google
- Autenticação (JWT)
- Pode existir sem participar de república

### 🔗 Relacionamentos
- Pode ter **0..N Morador**
- Pode ter **0..N CodigoVerificacao**

### 🔑 Dados principais
- Email
- Nome
- Foto
- `verified`
- Flags de onboarding (`hasBasicData`, `hasRepublica`)

📌 **Nunca armazena dados específicos da república.**

---

## 🏠 Model: Republica

### 📌 Responsabilidade
Representa uma **república/casa** dentro do sistema.

### 💡 Por que existe
- Centraliza contas
- Centraliza moradores
- Permite múltiplos usuários por república

### 🔗 Relacionamentos
- Possui **1..N Morador**
- Possui **1..N Conta**
- Possui **1..N Convite**

### 🔑 Dados principais
- Nome
- Foto
- Data de criação

---

## 👥 Model: Morador

### 📌 Responsabilidade
Representa o **vínculo do usuário com uma república**.

> É aqui que o usuário “vira morador”.

### 💡 Por que existe
- Um usuário pode estar em várias repúblicas
- Dados pessoais variam por república
- Define permissões (`ADMIN` / `USER`)

### 🔗 Relacionamentos
- Pertence a **1 Usuario**
- Pertence a **1 Republica**
- Possui **0..N ContaMorador**

### 🔑 Dados principais
- Nome (por república)
- Telefone
- Chave Pix
- Role
- `perfilCompleto`

📌 **Esse model substitui totalmente a ideia de "dados da república no usuário".**

---

## ✉️ Model: Convite

### 📌 Responsabilidade
Gerencia o **processo de convite para uma república**.

### 💡 Por que existe
- Permite fluxo assíncrono
- Evita criar moradores antes da aceitação
- Controla estado do convite

### 🔗 Relacionamentos
- Pertence a **1 Republica**
- Pode se relacionar com **1 Usuario (por email)**

### 🔑 Dados principais
- Email convidado
- Status (`PENDING`, `ACCEPTED`, `REJECTED`)
- Data de criação

---

## 💰 Model: Conta

### 📌 Responsabilidade
Representa uma **conta financeira da república**.

### 💡 Por que existe
- Centraliza despesas
- Permite múltiplos tipos de divisão
- Base para relatórios e resumo

### 🔗 Relacionamentos
- Pertence a **1 Republica**
- Possui **1..N ContaMorador**

### 🔑 Dados principais
- Descrição
- Valor total
- Vencimento
- Método de pagamento
- Tipo de divisão (`IGUAL` / `CUSTOMIZADO`)
- Morador responsável

---

## 🔗 Model: ContaMorador

### 📌 Responsabilidade
Representa **quanto cada morador paga em uma conta**.

### 💡 Por que existe
- Resolve relação N:N entre Conta e Morador
- Permite valores diferentes por pessoa
- Base para cálculo de dívidas

### 🔗 Relacionamentos
- Pertence a **1 Conta**
- Pertence a **1 Morador**

### 🔑 Dados principais
- Valor devido
- Status (`PAGO`, `PENDENTE`)
- Data de pagamento (opcional)

📌 **Sem esse model, divisão de contas não escala.**

---

## 🔐 Model: CodigoVerificacao

### 📌 Responsabilidade
Controla a **verificação de usuários**.

### 💡 Por que existe
- Segurança
- Confirmação de identidade
- Login confiável

### 🔗 Relacionamentos
- Pertence a **1 Usuario**

### 🔑 Dados principais
- Código (6 dígitos)
- Expiração
- Usado ou não

---

## 🧠 Conclusão da Arquitetura

✔️ Models separados por responsabilidade  
✔️ Nenhum campo duplicado  
✔️ Nenhuma regra de negócio misturada  
✔️ Pronto para:
- Múltiplas repúblicas por usuário
- Histórico financeiro
- Escalar funcionalidades

---

## ✅ Resumo Final

- **Usuario** é identidade global
- **Morador** é identidade dentro da república
- **Republica** é o contexto
- **Conta** e **ContaMorador** resolvem financeiro corretamente
- **Convite** garante fluxo seguro
- **CodigoVerificacao** garante autenticação confiável

🚀 **Essa modelagem sustenta todo o Kontas sem gambiarra.**
