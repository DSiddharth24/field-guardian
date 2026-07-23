# FieldGuard

FieldGuard is a platform built for plantation workers who've spent their entire working lives with no proof of their own labor — no record of the kilograms they picked, no safe way to raise a complaint, no visibility into the wages they were owed.

FieldGuard changes that. Attendance, harvest weight, grievances, injury reports, and payslips — all transparent, all in the worker's hands.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## About the Project

Plantation and field workers are often left with no formal record of their own labor: no proof of days worked, no log of harvest quantities, no safe channel to report a grievance or injury, and no clarity on how their pay was calculated. This lack of a paper trail leaves workers with little leverage to dispute unfair treatment or missing wages.

FieldGuard puts that record directly in the worker's hands. It gives every worker a transparent, accessible log of their attendance, harvest weight, injury reports, grievances, and payslips — built as a web app with a Supabase-backed database so records are persisted, auditable, and available whenever they're needed.

## Features

- 🗓️ **Attendance tracking** — a clear, verifiable record of days and hours worked
- ⚖️ **Harvest weight logging** — records of kilograms picked, tied to the worker who picked them
- 📢 **Grievance reporting** — a safe channel for workers to raise complaints
- 🩹 **Injury reporting** — a documented record of workplace injuries
- 💵 **Payslips** — transparent visibility into wages owed and paid
- 🔐 Supabase-backed authentication and data storage, so every worker's records are tied securely to their own account
- 📋 Form-driven data entry with validation (React Hook Form + Zod)
- 📊 Dashboards and charts for visualizing attendance, harvest, and pay history (Recharts)
- 📄 Exportable PDF payslips/reports (jsPDF + html2canvas)
- ⚡ Fast dev/build experience with Vite
- 🎨 Accessible, consistent UI built on shadcn-ui and Radix primitives
- 🔄 Client-side data fetching/caching with TanStack React Query
- 🧭 Client-side routing with React Router

## Tech Stack

**Frontend**
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool & dev server)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn-ui](https://ui.shadcn.com/) (Radix UI primitives)
- [React Router](https://reactrouter.com/)
- [TanStack React Query](https://tanstack.com/query)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [Recharts](https://recharts.org/) for data visualization
- [Framer Motion](https://www.framer.com/motion/) for animation
- [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/) for PDF export

**Backend / Data**
- [Supabase](https://supabase.com/) (Postgres database, auth, storage)

**Tooling**
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for unit/component tests
- [ESLint](https://eslint.org/) for linting

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+) and npm — [install via nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- A [Supabase](https://supabase.com/) project (URL + anon key)

### Installation

```bash
# Clone the repository
git clone https://github.com/DSiddharth24/Field_guardian.git

# Navigate into the project directory
cd Field_guardian

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (Vite's default port) unless configured otherwise.

### Environment Variables

The project depends on Supabase, so you'll need to provide your project's credentials. Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> Check the `supabase/` directory in this repo for any project-specific config or migrations to apply to your Supabase instance.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Build the app for production |
| `npm run build:dev` | Build the app in development mode |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run test` | Run the test suite once (Vitest) |
| `npm run test:watch` | Run the test suite in watch mode |

## Project Structure

```
Field_guardian/
├── public/          # Static assets
├── src/             # Application source code (components, pages, hooks, etc.)
├── supabase/         # Supabase configuration / migrations
├── index.html        # App entry HTML
├── package.json       # Dependencies and scripts
├── tailwind.config.ts   # Tailwind CSS configuration
├── vite.config.ts      # Vite configuration
└── vitest.config.ts     # Vitest configuration
```

## Testing

This project uses [Vitest](https://vitest.dev/) alongside [Testing Library](https://testing-library.com/) for component and unit tests.

```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

## Deployment

Build a production bundle with:

```bash
npm run build
```

This outputs static assets that can be deployed to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.). If this project was originally scaffolded with [Lovable](https://lovable.dev/), it can also be published directly from the Lovable dashboard.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request
