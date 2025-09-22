# Saas Starter + Blazity Enterprise

## Description

Combination of two open-source starter kits for a modern web app.

- Blazity/next-enterprise [GitHub](https://github.com/Blazity/next-enterprise) [docs](https://docs.blazity.com/next-enterprise)
- nextjs/saas-starter [GitHub](https://github.com/nextjs/saas-starter) [docs](https://vercel.com/templates/authentication/next-js-saas-starter)


## Setup

To setup and run locally:

```cmd
pnpm install
stripe login
pnpm db:setup
pnpm db:seed
pnpm dev
```

# Development Tools

## Core

Template: [Blazity/next-enterprise](https://github.com/Blazity/next-enterprise) was cloned to setup dev tools
Framework: [Next.js 15](https://nextjs.org/) App Router + [React](https://react.dev/)
Language: [Strict TypeScript](https://www.typescriptlang.org/) with [ts-reset](https://github.com/total-typescript/ts-reset)
Styles: [Tailwind CSS v4](https://tailwindcss.com/) with [CVA](http://cva.style/) (Class Variance Authority) for CSS integration
Formatting: [ESlint 9](https://eslint.org/) + [Prettier](https://prettier.io/)
Testing: [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/react) + [Playwright](https://playwright.dev/)

## Scripts

| Script | Description |
|--------|-------------|
| postinstall | Applies patches to external dependencies |
| test | Runs unit and integration tests |
| e2e:headless | Runs end-to-end tests in headless mode |
| e2e:ui | Runs end-to-end tests with UI |
| storybook | Starts the Storybook server |
| coupling-graph | Generates a coupling and cohesion graph for the components |
| analyze | Analyzes the bundle sizes for Client, Server and Edge environments |

## Version Control

Commit management: [Conventional commits](https://www.conventionalcommits.org/) for a clean GitHub repo
DevOps: [GitHub Actions](https://github.com/features/actions) with workflows including bundle size and performance tracking
Changelog generation: [Semantic Release](https://github.com/semantic-release/semantic-release)

## Dependency Control

Package management: [Corepack](https://github.com/nodejs/corepack) + [pnpm](https://pnpm.io/)
Package security: [Renovate bot](https://www.whitesourcesoftware.com/free-developer-tools/renovate) for updates
Package fixes: [Patch-package](https://www.npmjs.com/package/patch-package) for resolving dependency errors and security
Bundle management: [Bundle analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) for tracking bundle size
Import management: [Absolute imports](https://nextjs.org/docs/advanced-features/module-path-aliases) so imports from same module are alphabetically ordered

## Component Development

State management: TBD, maybe [Recoil](https://recoiljs.org/)
Component workshop: [Storybook](https://storybook.js.org/)
Component dependency grapher: [Madge](https://github.com/pahen/madge)

## UI Libraries

- [shadcn/ui](https://ui.shadcn.com/) for standardized components using components.json
- [Radix UI](https://www.radix-ui.com/)
- Free to use any libraries for components

## Deployment

Host: TBD, maybe Vercel
Environment variable management: [T3 Env](https://env.t3.gg/)
Containerization: [Docker](https://www.docker.com/get-started/) for local hosting database + [Kubernetes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) for monitoring and health checks
Observability: [Open Telemetry](https://opentelemetry.io/)

## Data Storage

Database: [Postgres](https://www.postgresql.org/) currently locally hosted, will migrate to cloud
ORM (Object Relationship Management): [Drizzle](https://orm.drizzle.team/) for interaction between JS and SQL

## Integrations

[Stripe](https://docs.stripe.com/stripe-cli) for payments

# Features

## Pages

Home: mostly blank now
Pricing: users can pay for subscriptions using Stripe
Dashboard: basic user settings: subscription, team, name, email, activity history, password, delete account

## Identity

Authentication: email and password with JWTs stored to cookies
Activity logging: system for recording user events
RBAC (Role-Based Access Control): basic roles for Owner and Member