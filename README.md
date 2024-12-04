# Node Hex Boilerplate

A powerful boilerplate for quickly setting up RESTful APIs using Node.js, Express, Prisma ORM, and TypeScript. This project adheres to clean architecture, clean code principles, and SOLID design principles.

## Features

- 🚀 Fast setup for RESTful APIs
- 🧱 Clean Architecture
- 🧼 Clean Code principles
- 🔧 SOLID design principles
- 🔒 TypeScript for type safety
- 🚂 Express.js for routing
- 🗄️ Prisma ORM for database operations
- 🔄 Easy to extend and maintain

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
my-api/
├── src/
│   ├── application/
│   │   └── use-cases/
│   ├── domain/
│   │   ├── entities/
│   │   └── repositories/
│   ├── infrastructure/
│   │   ├── database/
│   │   │   └── prisma/
│   │   └── web/
│   │       └── routes/
│   └── interfaces/
│       ├── controllers/
│       └── presenters/
├── tests/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Setup

1. Navigate to your project directory:
   ```bash
   cd my-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your database credentials and other configuration.

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

## Running the Application

To start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:4000` by default.

## Testing

Run the test suite:

```bash
npm test
```

## Building for Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)

## Support

If you have any questions or need help, please open an issue in the GitHub repository.

Happy coding! 🚀
```

This README provides a comprehensive guide for users of your `create-node-hex` boilerplate. It includes sections on features, prerequisites, quick start, project structure, setup instructions, running the application, testing, building for production, contributing guidelines, license information, acknowledgments, and support.

Feel free to adjust any part of this README to better fit your specific boilerplate's features or requirements.
