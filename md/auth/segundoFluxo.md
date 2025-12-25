# 📱 Kontas — Fluxo Atual do Aplicativo

Este documento descreve o **fluxo que JÁ ESTÁ IMPLEMENTADO ou EM IMPLEMENTAÇÃO** no backend do Kontas.

---

## 🔑 ETAPA 1 — Login com Google

📱 Usuário clica em **Entrar com Google**

Frontend envia:
- `idToken`

Backend:
- Valida token com Google
- Extrai `email`, `nome`, `foto`

---

## 🔐 ETAPA 2 — Usuário no Backend

### ❌ Usuário não existe
- Cria usuário automaticamente
- Define:
  - `verified = false`
- Gera código de verificação (6 dígitos)

### ✅ Usuário existe
- Se `verified = false`, solicita código
- Se `verified = true`, segue fluxo

---

## 📨 ETAPA 3 — Verificação de Código

✔️ Código válido:
- Marca `verified = true`
- Gera **JWT**
- Retorna token ao app

---

## 🧍 ETAPA 4 — Completar Dados Básicos (GLOBAL)

🚨 Após login bem-sucedido, o usuário **não acessa o app diretamente**.

👉 **GET /users/me**

O backend retorna:

- `id`
- `email`
- `verified`
- `hasBasicData` (boolean)
- `hasRepublica` (boolean)

---

## 🧍 ETAPA 4 — Completar Dados Básicos (GLOBAL)

🚨 Após login bem-sucedido, o usuário **não acessa o app diretamente**.

O app valida o retorno de `/users/me`.

### ❌ `hasBasicData = false`

O app redireciona para a tela:

👉 **“Complete seus dados”**

Campos obrigatórios (globais do usuário):

- Nome `Usuario Teste`
- Telefone `(xx) xxxxx-xxxx`
- Chave Pix `am@gmail.com`
- Email `Somente puxa ele, nao muda`

## ✅ Resumo Final

- Autenticação feita exclusivamente via **Google**
- Usuário é criado automaticamente no primeiro login
- Verificação por **código de 6 dígitos** garante segurança inicial
- Após login, o usuário **não entra direto no app**
- Existe uma etapa obrigatória de **dados básicos globais**
- Flags (`verified`, `hasBasicData`, `hasRepublica`) controlam o fluxo
- O frontend decide a navegação com base em `/users/me`
- O fluxo atual está preparado para:
  - Onboarding
  - Criação/entrada em repúblicas
  - Evolução futura sem quebra de regra

📌 Este documento representa **somente o que já está implementado ou em implementação**, servindo como base sólida para os próximos fluxos do Kontas.
