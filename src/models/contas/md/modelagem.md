# 💰 Modelagem — Contas Compartilhadas

## 📌 Objetivo

Definir o comportamento funcional do módulo **Contas**, incluindo:

- Criação de contas compartilhadas
- Divisão de valores entre moradores
- Controle de status de pagamento
- Fluxo de confirmações
- Notificações entre participantes
- Regras de permissão
- Possível evolução para mensageria assíncrona (RabbitMQ / Observer Pattern)

---

## ⚙️ Regras Gerais

### 👑 Criador da Conta (Admin da Conta)

O criador da conta:

- Pode convidar qualquer morador da república
- Define participantes da conta
- Define divisão de valores
- Confirma pagamentos realizados pelos participantes
- Pode atualizar a conta (PATCH)
- Controla o status final da conta

---

### 👥 Participantes da Conta

Participantes podem:

- Visualizar contas vinculadas
- Marcar pagamento como realizado
- Receber notificações sobre confirmação ou rejeição do pagamento

---

## 🎨 Status de Pagamento

| Status | Cor | Descrição |
|----------|----------|-------------|
| ✅ Pago | Verde | Pagamento confirmado pelo criador da conta |
| ⏳ Pendente | Laranja | Aguardando confirmação do criador |
| ❌ Atrasado | Vermelho | Conta vencida sem pagamento confirmado |

---

## 🧾 Regras de Status

### 🟠 Ao Criar Conta

- Todos participantes iniciam como **PENDENTE**

---

### 💳 Participante Marca Como Pago

- Status → Pendente para o criador da conta
- Criador deve confirmar ou rejeitar

---

### ✔ Criador Confirma Pagamento

- Status → Pago
- Atualiza para participante

---

### ❌ Criador Rejeita Pagamento

- Status → Não pago
- Participante recebe notificação:
  - "Entre em contato com o criador da conta"
  - Volta para status pendente

---

### 🏠 Confirmação Final

Quando:

- Todos participantes estiverem como pagos

Então:

- Envia notificação para o **dono da república**
- Dono confirma ou não o fechamento da conta

---

## ➗ Tipos de Divisão

### 🟢 Divisão Igual
Valor dividido igualmente entre participantes

---

### 🔵 Divisão Personalizada
Permite definir valores individuais para cada morador

---

## 📅 Parcelamento

- Conta pode possuir parcelas
- Parcelas são criadas automaticamente
- Mantém mesmos participantes e regras de divisão
- Participantes podem pagar parcelas em qualquer momento

---

## 🔐 Permissões

### Pode Atualizar Conta

✔ Apenas o criador da conta (Admin da Conta)

---

## 📦 Estrutura Base da Conta

```ts
descricao: string
valor: number
vencimento: Date
status: StatusConta
divisao: IGUAL | PERSONALIZADA
republicaId: string
criadoPorId: string
