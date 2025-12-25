# 📱 Kontas — Fluxo Geral do Aplicativo

Este documento descreve o **fluxo completo do app Kontas**, desde o login até o uso diário dentro de uma república, incluindo regras de permissão e comportamento do sistema.

---

## 🔑 ETAPA 1 — Login no App

📱 O usuário abre o aplicativo  
👉 Clica em **“Entrar com Google”**

O app envia para o backend:

- `email`
- `nome`
- `foto` (opcional)
- `token do Google`

---

## 🔐 ETAPA 2 — Autenticação (Backend)

O backend executa o seguinte fluxo:

### 🔍 Verificação de usuário
- Procura usuário pelo **email**

### ❌ Usuário NÃO encontrado
- Cria o usuário automaticamente
- Gera um **código de verificação de 6 dígitos**
- Define `verified = false`

### ✅ Usuário encontrado
- Apenas realiza o login

---

### 📨 Verificação de código
Se o usuário **não estiver verificado**:

- O app exibe a tela:  
  👉 **“Digite o código de verificação”**

✔️ Código válido → usuário verificado  
✔️ Backend retorna **JWT de autenticação**

---

## 🏠 ETAPA 3 — Primeira vez no App

Após o login, o app verifica:

👉 **Usuario vai para pagina home**

### ❌ Não participa
O app mostra duas opções:

- **Criar República**
- **Aguardar Convite**

📌 A opção **Aguardar Convite** exibe um **sininho de notificações**  
Se chegar um convite, ele aparece ali automaticamente.

---

## 🏗️ ETAPA 4 — Criar República (ADMIN)

O usuário escolhe:

- Nome da república
- Foto da república (opcional)

### Backend:
- Cria a república
- Cria vínculo `UserRepublica`:
  - `role = ADMIN`
  - Dados pessoais ainda **não preenchidos**

📱 O app redireciona automaticamente para:

👉 **“Complete seus dados da República”**

---

## 📝 ETAPA 5 — Completar Dados da República (OBRIGATÓRIO)

Campos obrigatórios para **TODOS**, inclusive ADMIN:

- Nome
- Telefone `(xx) xxxxx-xxxx`
- Chave Pix

⚠️ Enquanto não completar:
- ❌ Não entra na Home
- ❌ Não envia convites
- ❌ Não usa o app

✔️ Dados salvos:
- ADMIN ativo
- Acesso liberado

---

## 🏠 ETAPA 6 — Home da República

Após completar os dados, o usuário acessa a **Home da República**, onde vê:

- Nome da república
- Resumo
- Contas
- Moradores
- Adicionar moradores (apenas ADMIN)

✨ A experiência principal do app começa aqui.

---

## ✉️ ETAPA 7 — Convite para República (ADMIN)

👑 Apenas o **ADMIN** pode convidar.

Fluxo:
- ADMIN informa o **email do convidado**
- Backend cria um convite com status `PENDING`

### Usuário convidado:
- Recebe notificação no **sininho**
- Abre o app
- Visualiza o convite pendente

---

## 🤝 ETAPA 8 — Aceitar Convite (USER)

Ao aceitar o convite, o usuário preenche:

- Nome
- Telefone
- Chave Pix

### Backend:
- Cria vínculo `UserRepublica`
  - `role = USER`
- Atualiza convite para `ACCEPTED`

🎉 Usuário entra automaticamente na **Home da República**

---

## 👥 ETAPA 9 — Vida Normal na República

### Visibilidade
Todos os membros da república podem ver:

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
- Ver todos os dados

### 👤 USER
- Ver dados dos membros
- Usar funcionalidades da república
- ❌ Não pode apagar república
- ❌ Não pode enviar convites

---

## ✅ Resumo Final

- Login simples com Google
- Cadastro automático e seguro
- Dados pessoais vinculados à república
- Controle claro de permissões
- Fluxo intuitivo e escalável

🚀 O Kontas nasce preparado para crescer.
