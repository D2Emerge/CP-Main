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
yarn dev           # Start development server
yarn start:dev     # Start production server

# Building
yarn build        # Build for production

# Code Quality
yarn lint         # Run ESLint
yarn type-check   # Run TypeScript type checking
```

## Project Structure

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
