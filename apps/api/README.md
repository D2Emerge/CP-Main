# API Service

This is the backend API service built with NestJS, providing the necessary endpoints for the main website. The service uses TypeORM for database operations and includes Swagger documentation for API exploration.

## Development

### Prerequisites

- node.js
- docker & docker compose
- yarn package manager

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Run one of the scripts below

### Available Scripts

```bash
# Development
yarn start:dev          # Start development server
yarn start:debug        # Start in debug mode

# Database
yarn db-up             # Run database migrations

# Building
yarn build            # Build for production
yarn build:local      # Build for local environment
yarn build:stage      # Build for staging environment
yarn build:prod       # Build for production environment

# Testing
yarn test            # Run unit tests
yarn test:watch      # Run tests in watch mode
yarn test:cov        # Run tests with coverage
yarn test:e2e        # Run end-to-end tests

# Linting and Formatting
yarn lint            # Run ESLint
yarn format          # Format code with Prettier
yarn check-format    # Check code formatting
yarn check-types     # Check TypeScript types
```

## Project Structure

```
src/
├── config/          # Configuration files
├── db/             # Database configuration and migrations
├── internals/      # Internal utilities
├── test/           # Test files
└── src/            # Source code
    ├── core/       # Core utils, validation pipes, decorators etc
    ├── common/     # Shared code
    └── main.ts     # Application entry point
```

## API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:9000/api/docs
```

## Testing

The project uses Jest for testing. You can run different types of tests:

- Unit tests: `yarn test`
- E2E tests: `yarn test:e2e`
- Test coverage: `yarn test:cov`

## Database Migrations

To run database migrations:

```bash
yarn db-up
```

