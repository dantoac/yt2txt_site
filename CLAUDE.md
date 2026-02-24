# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**yt2txt_site** is the frontend for a YouTube video transcription service. It is a zero-build static site — no bundler, no framework, no package manager. Files are served as-is.

The backend lives in a separate repo: `https://github.com/AInvirion/youtube-transcriber`. Issues must be filed there.

## Development

No build step. Serve the directory with any static HTTP server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Playwright is used for E2E testing (reports in `playwright-report/`).

## Architecture

Three files contain the entire application:

- **`index.html`** — Semantic HTML with structured data (schema.org), skip links, ARIA attributes, focus traps. A second page `pricing.html` exists for the pricing view.
- **`assets/css/styles.css`** (~3400 lines) — All styles. Uses 66+ CSS custom properties for theming, spacing, shadows, and radii. No preprocessor, no framework.
- **`assets/js/app.js`** (~1500 lines) — Single IIFE containing all logic: theme toggle, URL validation, queue management, API calls, DOM rendering, focus management.

### Data Flow

```
URL input → validateURL() → addToQueue() → processNextInQueue() (FIFO)
  → transcribe(url) [fetch + AbortController, 30s timeout]
  → renderResultCard(item) → accordion with transcript, downloads, AI actions
```

### API Integration

`API_BASE` is currently empty — all calls fall back to `mockTranscribe()` which returns a hardcoded transcript after 4.5s. The real backend expects:

- **POST** `/transcribe` with `{ "url": "string" }`
- **Response**: `{ "title": string, "duration": string, "segments": [{ "start": number, "text": string }] }`

Error handling uses a custom `ApiError` class with typed errors: `NETWORK`, `TIMEOUT`, `RATE_LIMIT`, `SERVER`, `MALFORMED`, `NOT_FOUND`.

### Theme System

Flash-free dark/light mode:
1. Inline `<script>` in `<head>` reads `localStorage('yt2txt-theme')` or `prefers-color-scheme` before first paint
2. Sets `data-theme` attribute on `<html>`
3. CSS applies via `[data-theme="dark"]` selector overriding custom properties

### State (in app.js IIFE)

- `queue[]` — Transcription items (max 10)
- `queueIdCounter` — ID generator
- `isProcessing` — Prevents concurrent transcriptions
- `activeControllers{}` — AbortController map for cancellation

## Design System

### Colors ("Ocean Depth")

| Token | Light | Dark |
|-------|-------|------|
| `--accent` | `#2563EB` | `#60A5FA` |
| `--bg` | `#FAFBFC` | `#0C0F14` |
| `--surface` | `#FFFFFF` | `#161B26` |
| `--error` | `#DC2626` | `#F87171` |

### Typography

- **Outfit** — Display/headlines (Google Fonts)
- **Satoshi** — Body text (Fontshare)
- **JetBrains Mono** — Timestamps only

### Spacing

All spacing uses `--space-{xs,sm,md,lg,xl,2xl,3xl}` (0.25rem–6rem). Radii: `--radius-{sm,md,lg}` (8–16px).

## Conventions

### CSS
- BEM-light naming: `.result-card-header`, `.ai-action-btn--active`
- Mobile-first with `clamp()` for fluid typography
- All magic numbers must be CSS custom properties
- **No grid/checkered backgrounds in dark mode** — use creative textures instead

### JavaScript
- camelCase for variables/functions
- Section headers: `// ── Title ──`
- Direct DOM creation via `document.createElement()` (no templates)
- Assumes modern browsers (fetch, AbortController, localStorage)

### HTML/Accessibility
- Semantic landmarks: `<main>`, `<nav>`, `<footer>`
- `aria-expanded` on accordion toggles, `aria-live="polite"` on errors
- `data-*` attributes for state: `data-status`, `data-id`, `data-theme`
- `prefers-reduced-motion` respected for all animations
- WCAG AA contrast minimum enforced

### SEO
- Schema.org JSON-LD: WebApplication, Organization, FAQPage
- Semantic HTML structure with proper heading hierarchy
