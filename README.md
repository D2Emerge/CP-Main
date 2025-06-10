# Code Project Main

This is a monorepo project containing Next.js project in cooperation with Nest.js backend. In this repository you could find codebase for the **Main Website**

## Project Structure

```
├── apps/
│   ├── api/        # Backend API service
│   └── web/        # Frontend web application
├── packages/       # Shared packages and utilities
└── docker-compose.yml
```

## 🚀 Getting Started

### Prerequisites

- node
- yarn 
- docker & docker compose

### Quick start

1. Clone the repository:
```bash
git clone <repository-url>
cd CP-Main
```

2. Install dependencies:
```bash
yarn install
```

3. Start the containers 
```bash
docker-compose up --build
```

### Development

The project uses Docker Compose for development. Here are the available commands:

```bash
# Start all services
yarn docker:start

# Start services in detached mode
yarn docker:build

# Start services in development mode
yarn docker:dev

# Stop all services
yarn docker:stop

# Clean up Docker resources
yarn docker:clean

# View logs
yarn docker:logs
yarn docker:logs:api
yarn docker:logs:web
yarn docker:logs:db

# Restart services
yarn docker:restart
yarn docker:restart:api
yarn docker:restart:web

# Access service shells
yarn docker:shell:api
yarn docker:shell:web

# codegen/openapi

npm run codegen local ./generated       
npm run codegen stage ./generated       
npm run codegen prod ./generated       

npm run codegen [env] [path_to_folder]
# [env] - local/stage/prod 
# [path_to_folder] - path where generated will be created
```

### Services

- **Web Frontend**: http://localhost:3000
- **API Backend**: http://localhost:9000
- **PostgreSQL Database**: localhost:5555
  - Database: cp-main-db
  - User: admin
  - Password: 1


### Git Commit Messages

This project follows conventional commit messages. Make sure to follow the format:
```
type(scope): subject
```

#### Example 
```
git commit -m "feat: layout"
```

Types include:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding or modifying tests
- chore: Maintenance tasks

