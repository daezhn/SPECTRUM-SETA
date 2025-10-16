# Copilot Instructions for SPECTRUM-SETA

## Project Overview
- **Monorepo**: Contains `client/` (React 18 + Vite + Tailwind + shadcn/ui) and `server/` (Express, Node.js, Vercel-ready).
- **Shared Types**: Use `shared/schema.ts` for all data validation and type definitions (drizzle-orm, zod).
- **Storage**: In-memory by default. To enable PostgreSQL, edit `server/storage.ts` and set `DATABASE_URL`.

## Developer Workflows
- **Install**: `npm install`
- **Dev**: `npm run dev` (starts server and Vite in middleware mode)
- **Build**: `npm run build` (bundles client and server)
- **Prod**: `npm start` (runs built server)
- **Type Check**: `npm run check`
- **Vercel Deploy**: Use “Other” preset, not Vite. Set build command to `npm run build` and install command to `npm install`.

## API & Backend
- **Endpoints**: All API routes are under `/api/*` (see `server/routes.ts`). Example: `/api/contact` for contact form.
- **Error Handling**: Centralized in `server/index.ts` middleware.
- **Static Serving**: In production, static files are served from `client/public/`.
- **Vite Integration**: In dev, Vite is used as middleware (see `server/vite.ts`).

## Frontend Patterns
- **Routing**: Uses `wouter` in `client/src/App.tsx`.
- **State/Context**: Language, theme, and query management via React context providers.
- **UI/UX**: Animations with Framer Motion, micro-animations, dark mode, auto-rotating carousels.
- **Component Structure**: Add new UI in `client/src/components/` and register in `client/src/pages/home.tsx`.

## Conventions & Tips
- **Validation**: Always use zod schemas from `shared/schema.ts` for API input.
- **Logs**: All API requests and errors are logged with custom middleware.
- **Extending API**: Add endpoints in `server/routes.ts` and update storage logic as needed.
- **Enabling DB**: Uncomment PostgreSQL code in `server/storage.ts` and set `DATABASE_URL`.
- **Vercel**: Ensure `vercel.json` is present at root for correct deployment.

## Key Files
- `client/src/App.tsx`, `client/src/pages/home.tsx`, `client/src/components/`
- `server/index.ts`, `server/routes.ts`, `server/storage.ts`, `server/vite.ts`
- `shared/schema.ts`

For more, see `README.md`.
