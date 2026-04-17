# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

KonitFlash is a flashcard app. This repo is its **marketing / companion web service** — promoting the app and sharing CSV decks and usage guides with users. The app itself lives elsewhere; this repo is the website only.

## Repo layout

The Next.js app lives in the `konit-flash-web/` subdirectory, not at the repo root. All `npm` commands must be run from there.

```
KonitFlashWeb/              ← repo root (this file)
└── konit-flash-web/        ← Next.js app (run commands here)
    ├── app/                ← App Router pages + layout + globals.css
    ├── public/             ← static assets
    └── AGENTS.md           ← critical Next.js 16 warning (read it)
```

## Commands

Run from `konit-flash-web/`:

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config, next/core-web-vitals + next/typescript)
```

No test runner is configured.

## Stack & conventions

- **Next.js 16.2.3** with the App Router (`app/` dir). See the warning in `konit-flash-web/AGENTS.md` — this is a newer Next.js than most training data covers, with breaking changes. Before writing non-trivial Next.js code, consult the bundled docs at `konit-flash-web/node_modules/next/dist/docs/` (specifically `01-app/` for App Router) rather than relying on memory.
- **React 19.2.4**.
- **Tailwind CSS v4** via `@tailwindcss/postcss`. Config is CSS-first: theme tokens live in `app/globals.css` under `@theme inline { ... }` (not a `tailwind.config.js`). Design tokens `--background` / `--foreground` switch via `prefers-color-scheme`.
- **TypeScript strict mode**. Path alias `@/*` maps to `konit-flash-web/*` (see `tsconfig.json`).
- Fonts loaded via `next/font/google` (Geist + Geist Mono) in `app/layout.tsx`, exposed as CSS vars `--font-geist-sans` / `--font-geist-mono`.

## Current state

The app is still largely the create-next-app boilerplate (`app/page.tsx`, `layout.tsx` metadata). Expect to replace the default page content and metadata when building out real pages — don't assume the existing copy/links should be preserved.
