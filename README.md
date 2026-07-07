# Smart Email Generator

Describe an email by typing or speaking, pick an email type and tone, and get an
AI-drafted subject/body. Past generations are kept in a browsable history.

- **Text + voice input** — dictate via the Web Speech API or type directly.
- **Email type & tone dropdowns** — formal request, follow-up, apology, and more;
  formal, casual, friendly, and more.
- **Formatted output** — subject and body rendered distinctly, with a copy-to-clipboard
  button.
- **Regeneration with version history** — regenerate for the same prompt and flip
  between versions without losing earlier drafts.
- **Persisted email history** — every generation is saved to `localStorage`, viewable
  on the History page, with delete/clear-all.
- **Light/dark theme** — follows the OS/browser `prefers-color-scheme`, fully responsive.

## Setup

```bash
npm install
cp .env.example .env   # then add your OPENAI_API_KEY
```

## Development

```bash
npm run dev
```

Starts the Vite dev server at `http://localhost:5173`. The `POST /api/generate`
endpoint is mounted directly into the dev server (see `server/vitePlugin.ts`) — no
second process, no proxy config.

## Production

```bash
npm run build
npm start
```

`npm start` runs a small Express server (`server/index.ts`) that serves the built
`dist/` assets and the same `/api/generate` endpoint, on `PORT` (default `3000`).

## Environment variables

See `.env.example`:

- `OPENAI_API_KEY` — required, server-side only.
- `OPENAI_MODEL` — optional, defaults to `gpt-4o-mini`.
- `PORT` — optional, production server port, defaults to `3000`.

## Project conventions

See [CLAUDE.md](./CLAUDE.md) for folder structure and coding conventions.

## Linting

```bash
npm run lint
```
