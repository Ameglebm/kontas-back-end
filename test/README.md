# 🧪 Testes do Backend (NestJS)

Este diretório contém os **testes automatizados** do backend do projeto **Kontas**, escritos com **Jest + Supertest** seguindo boas práticas de APIs REST.

Os testes aqui garantem:
- 1. 🔐 Security - Segurança (auth e permissões)
- 2. 📜 Contract - Estabilidade do contrato da API
- 3. 🔄 Flow - Funcionamento dos fluxos reais do sistema

---

## 📁 Estrutura de Pastas

```text
test/
 ├── security/
 ├── contract/
 ├── flow/
```

Cada pasta tem uma **responsabilidade clara**. Não misture conceitos.

---

## 🔐 `test/security/`
### Testes de Segurança e Autorização

Testa **quem pode ou não pode acessar** os endpoints.

### O que testar aqui:
- Requisições sem token → `401 Unauthorized`
- Token inválido ou expirado
- Usuário sem permissão → `403 Forbidden`
- Rotas protegidas por Guard

### Exemplos:
```ts
it('GET /republicas sem token → 401', async () => {
  await request(app.getHttpServer())
    .get('/republicas')
    .expect(401);
});
```

📌 **Objetivo:** garantir que nenhuma rota crítica fique exposta.

---

## 📜 `test/contract/`
### Testes de Contrato da API

Garante que o **formato das respostas** da API não seja quebrado.

Esses testes protegem o **frontend** e integrações externas.

### O que testar aqui:
- Estrutura do JSON
- Campos obrigatórios
- Tipos de dados
- Status HTTP esperados

### Exemplos:
```ts
it('POST /auth/login retorna contrato esperado', async () => {
  const res = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email, password })
    .expect(200);

  expect(res.body).toMatchObject({
    accessToken: expect.any(String),
    user: {
      id: expect.any(String),
      email: expect.any(String),
    },
  });
});
```

📌 **Objetivo:** se alguém mudar a API e quebrar o formato, o teste falha.

---

## 🔄 `test/flow/`
### Testes de Fluxo (End-to-End Real)

Testa **cenários reais do usuário**, do começo ao fim (happy path e regras de negócio).

### O que testar aqui:
- Cadastro e login
- Criação de república
- Entrada de moradores
- Criação e divisão de despesas
- Pagamentos / pendências

### Exemplos:
```ts
it('Usuário cria república e adiciona morador', async () => {
  const login = await loginUser();

  const republica = await request(app.getHttpServer())
    .post('/republicas')
    .set('Authorization', `Bearer ${login.token}`)
    .send({ nome: 'República A' })
    .expect(201);

  await request(app.getHttpServer())
    .post(`/republicas/${republica.body.id}/moradores`)
    .set('Authorization', `Bearer ${login.token}`)
    .send({ email: 'outro@email.com' })
    .expect(201);
});
```

📌 **Objetivo:** garantir que o sistema funciona como um todo.

---

## ▶️ Como Rodar os Testes

### Testes E2E:
```bash
npm run test:e2e
```

### Testes unitários:
```bash
npm run test
```

---

## ⚙️ Configuração de Ambiente

Para testes E2E, o projeto pode exigir:
- Variáveis de ambiente (`.env` ou `.env.test`)
- Banco de dados de teste ou mocks
- JWT secret configurado

Exemplo:
```env
JWT_SECRET=test-secret
DATABASE_URL=postgresql://user:pass@localhost:5432/kontas_test
```

---

## 🧠 Boas Práticas

- ✅ Não misture `security`, `contract` e `flow`
- ✅ Um teste deve falhar por **um motivo claro**
- ❌ Não testar lógica complexa em `security`
- ❌ Não validar payload em `flow` se já existe `contract`

Esses testes fazem parte da **qualidade do backend**.
Se um teste falhar:
- ❌ Não ignore
- ❌ Não comente
- ✅ Corrija o código ou ajuste o contrato conscientemente

---

🚀 Backend bem testado = menos bugs, menos retrabalho, mais confiança e maior missão retrabalho.
