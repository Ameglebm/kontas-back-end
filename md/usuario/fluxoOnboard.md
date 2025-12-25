# 📱 Kontas — Próximo Fluxo do Aplicativo (Onboarding & República)

Este documento descreve o **fluxo que SERÁ IMPLEMENTADO** após a conclusão do cadastro básico global do usuário.

---

## 🚀 ETAPA 5 — Onboarding Inicial

📱 Após completar os **dados básicos globais**, o app revalida:

👉 **GET /users/me**

Backend retorna:
- `hasBasicData = true`
- `hasRepublica = false`

---

## 🧭 ETAPA 6 — Escolha Inicial do Usuário

Como o usuário **ainda não participa de nenhuma república**, o app exibe a tela de onboarding com duas opções:

- **Criar República**
- **Aguardar Convite**

📌 Enquanto `hasRepublica = false`:
- ❌ Usuário não acessa a Home
- ❌ Usuário não vê contas
- ❌ Usuário não vê moradores

---

## 🏗️ ETAPA 7 — Criar República (ADMIN)

👑 Usuário escolhe **Criar República**

Campos:
- Nome da república
- Foto (opcional)

### Backend:
- Cria `Republica`
- Cria vínculo `UserRepublica`:
  - `userId`
  - `republicaId`
  - `role = ADMIN`
  - `perfilCompleto = false`

✔️ Atualiza:
- `hasRepublica = true`

📱 App redireciona para:

👉 **“Complete seus dados da República”**

---

## 📝 ETAPA 8 — Completar Dados da República (OBRIGATÓRIO)

🚨 Mesmo após criar a república, o usuário **ainda não acessa a Home**.

Campos obrigatórios (por república):

- Nome
- Telefone
- Chave Pix

📌 Esses dados pertencem ao vínculo `UserRepublica`, não ao usuário global.

### Regras:
- ❌ Não pode enviar convites
- ❌ Não pode criar contas
- ❌ Não pode acessar a Home

✔️ Ao concluir:
- `perfilCompleto = true`
- ADMIN liberado

---

## 🏠 ETAPA 9 — Home da República

Após perfil completo:

O usuário acessa a **Home da República**, com abas:

- **Resumo**
  - Total de contas
  - Contas pagas
  - Contas pendentes
  - Dívida por morador
- **Contas**
- **Moradores**

📌 Apenas ADMIN vê:
- Botão **Adicionar Morador**

---

## ✉️ ETAPA 10 — Convidar Morador (ADMIN)

👑 Apenas ADMIN pode convidar.

Fluxo:
- ADMIN informa o **email**
- Backend cria `ConviteRepublica` com:
  - `status = PENDING`
  - `republicaId`
  - `email`

📱 Usuário convidado:
- Recebe notificação no **sininho**
- Visualiza convite pendente

---

## 🤝 ETAPA 11 — Aceitar Convite (USER)

Ao aceitar convite:

📱 App redireciona para:
👉 **“Complete seus dados da República”**

Campos:
- Nome
- Telefone
- Chave Pix

### Backend:
- Cria vínculo `UserRepublica`
  - `role = USER`
  - `perfilCompleto = true`
- Atualiza convite:
  - `status = ACCEPTED`

✔️ Usuário entra automaticamente na **Home da República**

---

## 👥 ETAPA 12 — Vida Normal na República

Todos os membros podem visualizar:

- Nome
- Email
- Telefone
- Chave Pix

---

## 🔐 Permissões

### 👑 ADMIN
- Criar república
- Apagar república
- Enviar convites
- Criar e gerenciar contas

### 👤 USER
- Visualizar contas
- Visualizar moradores
- Acompanhar dívidas
- ❌ Não envia convites
- ❌ Não apaga república

---

## ✅ Resumo Final

- Dados globais vêm antes de qualquer república
- Onboarding é controlado por flags (`hasBasicData`, `hasRepublica`)
- Dados pessoais por república ficam no vínculo `UserRepublica`
- Fluxo separado garante escalabilidade
- Estrutura pronta para múltiplas repúblicas no futuro

🚀 Este documento define o **próximo passo lógico do Kontas**.
