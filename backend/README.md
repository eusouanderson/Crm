# CRM Backend

Um sistema de backend para um aplicativo de CRM (Customer Relationship Management) focado em gerenciamento de usuários, transações financeiras e autenticação.

---

## ✨ Features

- 🔐 **Autenticação de Usuários:** Sistema completo de registro e login.
- 👤 **Gerenciamento de Usuários:** Criação, leitura, atualização e exclusão de usuários.
- 💰 **Controle de Transações:** Registro de transações financeiras.
- 📊 **Resumo Mensal:** Agregação de dados para relatórios mensais.
- 🗂️ **Categorias:** Organização de transações por categorias.
- 🧪 **Testes:** Cobertura de testes para garantir a estabilidade do código.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **Runtime:** [Bun](https://bun.sh/)
- **Framework:** [Hono](https://hono.dev/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Validação:** [Zod](https://zod.dev/)
- **Autenticação:** [Stytch](https://stytch.com/) (integrado com Hono)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)

---

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

- [Bun](https://bun.sh/docs/installation)
- [Docker](https://www.docker.com/get-started) (ou uma instância do PostgreSQL rodando)
- Um editor de código de sua preferência, como o [VS Code](https://code.visualstudio.com/)

---

## ⚙️ Instalação e Setup

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

1.  **Clone o repositório:**

    ```bash
    git clone github.com/eusouanderson/Crm
    cd backend
    ```

2.  **Instale as dependências:**

    ```bash
    bun install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto, baseado no exemplo abaixo. Você precisará das suas credenciais do PostgreSQL e do Stytch.

    ```env
    # Configurações do Banco de Dados
    DATABASE_URL="postgres://USER:PASSWORD@HOST:PORT/DATABASE"

    # Credenciais do Stytch
    STYTCH_PROJECT_ID="SEU_PROJECT_ID"
    STYTCH_SECRET="SEU_SECRET"
    ```

4.  **Inicie o banco de dados (usando Docker):**
    Se você não tiver uma instância do PostgreSQL, pode usar o Docker para subir uma rapidamente.

    ```bash
    docker run --name crm-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
    ```

    _Lembre-se de atualizar a `DATABASE_URL` no seu arquivo `.env`._

5.  **Execute as migrations do banco de dados:**
    Este comando irá criar as tabelas no seu banco de dados com base nos schemas definidos.

    ```bash
    bun run migrate
    ```

6.  **(Opcional) Popule o banco com dados iniciais:**
    O script `seed` pode ser usado para popular o banco de dados com dados de teste.
    ```bash
    bun run seed
    ```

---

## 📜 Scripts Disponíveis

Os seguintes scripts estão disponíveis no `package.json`:

| Script                  | Descrição                                                                    |
| ----------------------- | ---------------------------------------------------------------------------- |
| `bun run dev`           | Inicia o servidor em modo de desenvolvimento com hot-reload.                 |
| `bun run start`         | Inicia o servidor em modo de produção.                                       |
| `bun run test`          | Executa todos os testes do projeto.                                          |
| `bun run test:coverage` | Executa os testes e gera um relatório de cobertura.                          |
| `bun run generate`      | Gera novos arquivos de migração com base nas alterações do schema.           |
| `bun run migrate`       | Aplica as migrações pendentes no banco de dados.                             |
| `bun run seed`          | Popula o banco de dados com dados iniciais (definidos em `scripts/seed.ts`). |

---

## Endpoints da API

A coleção de clientes HTTP (`/clients`) contém exemplos de requisições para os principais endpoints.

- `POST /auth/register`: Registra um novo usuário.
- `POST /auth/login`: Autentica um usuário e retorna um token.
- `GET /users`: Retorna uma lista de usuários (requer autenticação).
- `GET /users/:id`: Retorna os detalhes de um usuário específico.

---

## 📂 Estrutura do Projeto

O projeto segue uma estrutura modular para facilitar a manutenção e escalabilidade.

```bash
├── src
│ ├── config/ # Configurações (ex: variáveis de ambiente)
│ ├── database/ # Conexão com DB, migrations e schemas
│ │ ├── migrations/ # Arquivos de migração gerados pelo Drizzle
│ │ └── schema/ # Definição das tabelas do banco de dados
│ ├── middlewares/ # Middlewares do Hono (ex: errorHandler)
│ ├── modules/ # Módulos de negócio da aplicação
│ │ ├── auth/ # Lógica de autenticação
│ │ └── user/ # Lógica de gerenciamento de usuários
│ ├── tests/ # Testes globais e de middlewares
│ └── index.ts # Ponto de entrada da aplicação
├── clients/ # Requisições HTTP para teste de endpoints
├── scripts/ # Scripts auxiliares (ex: seed)
└── ... # Outros arquivos de configuração
```

---

## 🗄️ Banco de Dados

Utilizamos o **Drizzle ORM** para gerenciar o schema e as queries do banco de dados.

- **Schemas:** As definições das tabelas estão localizadas em `src/database/schema/`. Cada arquivo representa uma tabela (ex: `users.ts`, `transactions.ts`).
- **Migrations:** Para atualizar o banco de dados após uma alteração no schema, siga estes passos:
  1. Modifique o arquivo de schema desejado.
  2. Rode `bun run generate` para criar um novo arquivo de migração SQL.
  3. Rode `bun run migrate` para aplicar a migração ao banco de dados.
