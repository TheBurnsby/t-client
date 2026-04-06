## Project Configuration

- **Language**: JavaScript (JSDoc)
- **Package Manager**: npm
- **Add-ons**: none

---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important Rules
- Ask for approval before executing any scripts, installing any packages and writing any code.
- Always ask before making architectural changes.
- Add documentation comments in JSDoc format for any new code written
- Run `npm run check` after creating or modifying any component or store, and fix all errors before considering the task complete

## Overview

`t-client` is a SvelteKit single-page application styled with Tailwind CSS. It consumes a separate REST API project.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build locally
npm run check        # Svelte type-check
npm run lint         # Lint
npm run test         # Run Vitest unit tests
npm run test -- path/to/file.test.ts  # Run a single test file
```

## Architecture

- **SvelteKit** — routing, SSR/SPA config, and page/component structure live under `src/routes/` and `src/lib/`
- **Tailwind CSS** — utility-first styling; no separate CSS files unless needed
- **REST API** — a separate project; HTTP requests to it are made from this client (likely via `fetch` or a wrapper in `src/lib/api/`)
