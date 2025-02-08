# Node Hex Boilerplate

A powerful boilerplate for quickly setting up RESTful APIs using Node.js, Fastify, Prisma ORM, and TypeScript. This project adheres to clean architecture, clean code principles, and SOLID design principles.

## Features

- 🚀 Fast setup for RESTful APIs
- 🧱 Clean Architecture
- 🧼 Clean Code principles
- 🔧 SOLID design principles
- 🔒 TypeScript for type safety
- 🚂 Fastify for routing (replacing Express)
- 🗄️ Prisma ORM for database operations
- 🗃️ Database caching service
- 📜 Swagger documentation added
- 🔑 Authentication via Auth0
- 🔄 Modularized structure for better maintainability

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- npm (v6 or later)
- Git

## Quick Start

To create a new project using this boilerplate, run the following command:

```bash
npx create-node-hex my-api
```

Replace `my-api` with your desired project name.

## Project Structure

The generated project follows a clean architecture structure:

```
Directory structure:
└── node-boilerplate/
    ├── Dockerfile
    ├── docker.compose.yml
    ├── eslint.config.js
    ├── generate-docs.js
    ├── nodemon.json
    ├── package.json
    ├── pnpm-lock.yaml
    ├── tsconfig.json
    ├── .dockerignore
    ├── .env.example
    ├── prisma/
    │   └── schema.prisma
    └── src/
        ├── Auth/
        │   ├── Plugins/
        │   ├── Types/
        │   └── Utils/
        ├── Cache/
        │   ├── Application/
        │   │   └── Services/
        │   ├── Domain/
        │   │   └── Repositories/
        │   └── Infrastructure/
        │       └── Repositories/
        ├── Main/
        │   ├── Domain/
        │   │   ├── Entities/
        │   │   │   ├── Base.ts
        │   │   │   └── Tokens/
        │   │   └── Repositories/
        │   └── Infrastructure/
        │       ├── Criteria/
        │       ├── Errors/
        │       ├── Repositories/
        │       ├── Server/
        │       │   ├── app.ts
        │       ├── Types/
        │       └── Utils/
        ├── Shared/
        │   ├── Config/
        │   │   ├── prisma.ts
        │   │   ├── redisConfig.ts
        │   │   ├── serverConfig.ts
        │   │   └── swaggerConfig.ts
        │   ├── DI/
        │   │   ├── DIContainer.ts
        │   ├── Errors/
        │   │   └── HTTPError.ts
        │   ├── HTTP/
        │   │   ├── ApiResponse.ts
        │   │   └── StatusCode.ts
        │   └── Schemas/
        └── User/
            ├── Application/
            ├── Domain/
            └── Infrastructure/
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
