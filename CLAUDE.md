# CLAUDE.md

## Project

Smart Email Generator — Vite + React 19 + TypeScript SPA with a small Express-based
REST backend for OpenAI (`gpt-4o-mini`) email generation. One app, one repo, one port
in production; the API is mounted inside the Vite dev server during development.

## Folder structure (where new code goes)

- `src/components/<domain>/Name.tsx` — reusable UI, grouped by domain (`generator/`,
  `history/`, `layout/`). Colocate `Name.module.css` next to the component when it
  needs scoped styles.
- `src/components/common/Name.tsx` — presentational UI shared across two or more
  domains (e.g. `Stamp.tsx`, used by both `generator/` and `history/`). Don't put
  domain-specific components here just because they feel reusable in theory — only
  move something into `common/` once a second domain actually imports it.
- `src/pages/NamePage.tsx` — top-level views, registered in `App.tsx`'s route switch
  (driven by `useHashRoute`).
- `src/hooks/useX.ts` — reusable stateful logic. If a component's logic exceeds ~150
  lines, extract a hook.
- `src/lib/api/*` — the ONLY place `fetch()` may be called. No inline `fetch` calls
  in components/pages/hooks.
- `src/lib/storage/*` — the ONLY place `localStorage` may be touched. Email history
  goes through the `HistoryStorageAdapter` interface (import the shared `historyStorage`
  singleton from `getHistoryStorage.ts`); simpler standalone preferences (e.g.
  `themePreference.ts`) can be their own small get/set module. Never call
  `localStorage.getItem/setItem` outside this folder.
- `src/types/*.ts` — all domain types (`EmailType`, `Tone`, `GeneratedEmail`,
  `HistoryEntry`, request/response shapes). Do not duplicate ad-hoc inline object
  shapes across files.
- `server/**` — backend only. `server/routes/` for request handlers, `server/services/`
  for external integrations (OpenAI), `server/lib/` for env/config helpers.
  New REST endpoints: add a handler in `server/routes/`, register it in
  `server/apiRouter.ts`. Do not write one-off inline route handlers elsewhere.
  `server/**` may import shared types/constants from `src/types/*`, but nothing under
  `src/**` may import from `server/**`.

## Naming

- Components/pages: PascalCase, file name matches the exported component
  (`EmailOutput.tsx`).
- Hooks: camelCase, `use` prefix (`useEmailGenerator.ts`).
- Lib/service functions: camelCase, verb-first (`postGenerateEmail`,
  `generateEmailContent`).
- CSS Modules: `Component.module.css`, one per component that needs scoped styles.
  Only use class selectors inside a `.module.css` file — bare tag selectors
  (`select { ... }`) are NOT scoped by CSS Modules and leak globally.

## Hard rules

- No inline `fetch(` outside `src/lib/api/*`.
- No direct `localStorage.*` calls outside `src/lib/storage/*`.
- Server secrets (`OPENAI_API_KEY`, etc.) are read only via `server/lib/env.ts` and
  never referenced from `src/**`. New secrets must be documented in `.env.example`.
- Relative imports use the real file extension (`./App.tsx`, `./env.ts`) — matches
  `allowImportingTsExtensions`, enabled in every tsconfig here.
- `verbatimModuleSyntax` is on: use `import type { X } from '...'` for type-only
  imports.
- Keep components small and focused; push logic into hooks or `lib/`.

## Styling

- Global tokens/reset live only in `src/index.css`. Light is the default and is
  defined on plain `:root`; dark is opt-in only, defined under `:root[data-theme='dark']`
  and applied by `useTheme.ts` (persisted via `src/lib/storage/themePreference.ts`).
  The app does NOT follow OS `prefers-color-scheme` — this was a deliberate reversal
  of an earlier "OS-only" design, so don't reintroduce a `prefers-color-scheme` media
  query as the source of truth without discussing first.
- The inline script in `index.html` reads the same `smart-email-generator:theme`
  localStorage key before React mounts, purely to avoid a flash of the wrong theme on
  reload. Keep its key in sync with `themePreference.ts` if that key ever changes.
- All other styling is CSS Modules, mobile-first. When adding a breakpoint, prefer
  the existing `640px` convention unless a component genuinely needs another.
- No CSS framework/UI kit is installed. Do not add one without updating this file.
- When a flex container switches `flex-direction` at a breakpoint, double-check any
  `flex-basis` set on its children still makes sense on the new axis (a fixed
  `flex-basis` meant for width becomes a min-height once the axis flips to column).

## Backend

- One shared Express app (`server/apiRouter.ts`'s `createApiApp()`) is mounted both
  by the Vite dev plugin (`server/vitePlugin.ts`) and the production server
  (`server/index.ts`). Route logic must live in `server/routes/` + `server/services/`,
  not duplicated between the two adapters.
- Mount API sub-apps as full Express apps (`express()`), not bare `Router()` instances,
  when attaching directly to Vite's `server.middlewares` — a bare `Router` mounted
  outside of an `express()` app never gets `res.status`/`res.json` patched onto the
  response object.
- OpenAI model name is a named constant/env var (`OPENAI_MODEL`, default
  `gpt-4o-mini`), never hardcoded inline in a request call.
- `EMAIL_TYPE_OPTIONS`/`TONE_OPTIONS` in `src/types/email.ts` are the single source of
  truth for both the `<select>` labels and the server-side prompt wording — don't
  duplicate these lists.

## Linting / testing

- Run `npm run lint` (oxlint) before committing.
- No test runner is configured yet. If you need one, propose it explicitly rather
  than silently adding Jest/Vitest.
