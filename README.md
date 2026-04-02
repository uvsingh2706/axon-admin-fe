# Axon EV Admin Dashboard

Admin panel for the Axon EV charging infrastructure.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 8
- **Styling:** Tailwind CSS v4
- **Server State:** TanStack React Query v5
- **Client State:** Zustand v5
- **Routing:** React Router v7

## Getting Started

### Prerequisites

- Node.js >= 22 (see `.nvmrc`)
- npm

### Setup

```bash
# Clone the repo
git clone <repo-url>
cd axon-ev-admin-fe

# Use correct Node version
nvm use

# Install dependencies
npm install

# Copy env file and configure
cp .env.example .env

# Start dev server
npm run dev
```

## Scripts

| Command                | Description                   |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Start Vite dev server         |
| `npm run build`        | Type-check + production build |
| `npm run lint`         | Run ESLint                    |
| `npm run lint:fix`     | Run ESLint with auto-fix      |
| `npm run format`       | Format code with Prettier     |
| `npm run format:check` | Check formatting              |
| `npm run type-check`   | TypeScript type checking      |
| `npm run preview`      | Preview production build      |

## Project Structure

```
src/
├── assets/        # Static assets (icons, images)
├── component/     # Reusable UI components
├── config/        # App config (navigation, constants)
├── lib/           # Third-party lib wrappers (axios, query client)
├── pages/         # Page-level components
├── providers/     # React context providers
├── router/        # Route definitions
├── services/      # API service layer
├── store/         # Zustand stores
├── types/         # Shared TypeScript types
└── utils/         # Utility functions
```

## Environment Variables

See `.env.example` for all available variables.
