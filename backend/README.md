# crm

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.18. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

```bash
backend/
│
├── src/                      # Código-fonte principal
│   ├── config/               # Configurações globais (env, DB, logger, etc.)
│   ├── modules/              # Domínios da aplicação (ex: users, auth, orders...)
│   │   └── user/             # Exemplo de módulo
│   │       ├── controllers/  # Entrada da requisição (HTTP)
│   │       ├── services/     # Regras de negócio
│   │       ├── repositories/ # Acesso a dados (DB, API externa, etc.)
│   │       ├── models/       # Schemas/entidades
│   │       ├── validators/   # Validação de entrada (DTOs, zod, yup, pydantic)
│   │       └── routes.ts     # Rotas desse módulo
│   │
│   ├── shared/               # Código reutilizável (utils, helpers, middlewares)
│   ├── middlewares/          # Middlewares globais (auth, error handler, etc.)
│   ├── database/             # Conexão com banco e migrations
│   ├── jobs/                 # Filas e jobs assíncronos
│   ├── main.ts / index.ts    # Entry point da aplicação
│   └── app.ts                # Setup da aplicação (express/fastapi/config)
│
├── tests/                    # Testes unitários e de integração
│   ├── modules/              # Testes por módulo
│   └── setup.ts              # Configuração dos testes (mock, DB, etc.)
│
├── drizzle/                  # drizzle
│
├── scripts/                  # Scripts utilitários (seed, setup, etc.)
│
├── .env                      # Variáveis de ambiente
├── docker-compose.yml        # Docker com DB, Redis, etc.
├── Dockerfile                # Docker da aplicação
├── package.json / pyproject.toml
├── tsconfig.json / mypy.ini  # Configs do TS ou Python
└── README.md
```
