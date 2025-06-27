# Main Website

This is the main website built with Next.js. In this subrepository the frontend for the Main App will be located.

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
yarn dev           # Start development server with codegen from stage idp
yarn dev:local     # Start development server with codegen from local idp
yarn dev:prod      # Start development server with codegen from prod idp

# Building
yarn build        # Build for production

# Code Quality
yarn lint         # Run ESLint
yarn type-check   # Run TypeScript type checking


# codegen/openapi

npm run codegen local ./generated       
npm run codegen stage ./generated       
npm run codegen prod ./generated       

npm run codegen [env] [path_to_folder]
# [env] - local/stage/prod 
# [path_to_folder] - path where generated will be created

```

## Project Structure and details

### Structure

```
src/
├── components/   # Reusable React components
├── hooks/        # Custom React hooks (will be added in future)
├── pages/        # Next.js pages (file-based routing)
├── lib/          # Utility functions and configurations
├── config/       # Configuration files
├── modules/      # Zustand modules
└── styles/       # Global styles and Tailwind configurations
```

### Details
**Note**: Make sure not to duplicate data between state managers
- State managers used: 
    - Zustand  - main state manager
    - @tanstack/react-query - used for making and caching requests
