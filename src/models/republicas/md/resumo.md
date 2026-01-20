## 📌 Resumo do Pull Request — Módulo República

Este Pull Request consolida a **criação e estruturação do módulo de República**, incluindo a model de domínio, contratos de serviço e a exposição completa dos **endpoints REST** para gerenciamento de repúblicas.

O módulo foi desenvolvido seguindo rigorosamente a separação de responsabilidades entre **controller, service e repository**, garantindo clareza de fluxo, segurança e facilidade de manutenção.

---

## ✨ feat — Funcionalidades implementadas

- Criação da **Model República** como domínio central
- Implementação do **RepublicaController** com endpoints protegidos por autenticação
- Criação do contrato de serviço (`IRepublicaService`)
- Implementação dos fluxos de:
  - Criar república
  - Buscar república por ID
  - Listar repúblicas do usuário autenticado
  - Atualizar dados da república
  - Deletar república

---

## 🌐 Endpoints disponíveis

- `POST /republicas`
  - Cria uma nova república vinculada ao usuário autenticado

- `GET /republicas/:id`
  - Busca uma república pelo ID

- `GET /republicas`
  - Lista todas as repúblicas do usuário autenticado

- `PATCH /republicas/:id`
  - Atualiza os dados da república (somente pelo usuário autorizado)

- `DELETE /republicas/:id`
  - Remove uma república do sistema

Todos os endpoints estão protegidos com **AuthGuard** e documentados via **Swagger**.

---

## 🛠️ Arquitetura e organização

- Controller responsável apenas por **HTTP (req / res)**
- Service centralizando **regras de negócio e validações**
- Repository isolado para **acesso a dados**
- Uso de **interfaces** para desacoplamento
- Injeção de dependência via token (`REPUBLICA_SERVICE`)
- DTOs utilizados para entrada e atualização de dados

---

## 🧠 Decisões de arquitetura

- Controller não acessa banco diretamente
- Service não conhece Prisma
- Repository não contém regra de negócio
- República sempre vinculada ao usuário autenticado
- Validações e permissões tratadas na camada de serviço

---

## 🔐 Segurança

- Todos os endpoints protegidos por autenticação
- Usuário autenticado obtido via `req.user.id`
- Operações sensíveis (update/delete) vinculadas ao dono da república

---

## 🚀 Impacto

- Base sólida para funcionalidades futuras relacionadas à república
- Código organizado, previsível e escalável
- Padrão arquitetural consistente com o módulo de Usuário
- Facilita manutenção e evolução do sistema

---

## 📎 Observações

Este PR segue o padrão arquitetural definido no projeto e estabelece o **módulo de República como um domínio independente e bem estruturado**, pronto para expansão futura.
