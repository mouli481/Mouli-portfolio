# Mouli V — Portfolio

Personal portfolio for Mouli V, a Python Full Stack Developer specializing in Generative AI and RAG. Next.js 15 frontend with a FastAPI backend, deployed as a single Vercel project.

> **Status:** work in progress. Project scaffolding, tooling and the full backend API (including the RAG-powered AI chat endpoint) are complete and tested. Frontend pages, animations and the 3D hero are still being built. This README will gain a full architecture diagram, screenshots and deployment walkthrough once the UI is finished.

## Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript strict, Tailwind CSS v4, Motion, GSAP, Lenis, React Three Fiber
- **Backend:** Python 3.12, FastAPI, Pydantic v2, deployed as a Vercel Python serverless function under `/api/py`
- **AI chat:** provider-agnostic client (Groq or Gemini, both free tiers) with a pure-Python BM25 retriever over the portfolio content, streamed over SSE using AG-UI style events, with a deterministic mock fallback when no API key is set

## Local setup

Requirements: Node.js 22+, Python 3.12 or 3.13, npm.

```bash
npm install
python -m venv .venv
```

Windows:

```bash
.venv\Scripts\pip install -r requirements-dev.txt
```

macOS/Linux:

```bash
.venv/bin/pip install -r requirements-dev.txt
```

Copy `.env.example` to `.env` if you want to enable real LLM providers, email delivery or Redis-backed rate limiting. The app runs fully with zero environment variables set (mock data, mock chatbot, in-memory contact storage).

Start both servers with one command:

```bash
npm run dev
```

This runs `next dev` on port 3000 and `uvicorn` on port 8000 concurrently, with Next.js rewriting `/api/py/*` requests to the local FastAPI server.

## Environment variables

See [.env.example](.env.example). Key ones:

- `LLM_PROVIDER` — `mock` (default), `groq`, or `gemini`
- `GROQ_API_KEY` / `GEMINI_API_KEY` — free tier keys for the chosen provider
- `RESEND_API_KEY` / `CONTACT_TO_EMAIL` — enables real email delivery from the contact form
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — enables durable, cross-instance rate limiting
- `ALLOWED_ORIGINS` — comma-separated CORS origins for the API

## Getting free API keys

- **Groq:** create a free account at [console.groq.com](https://console.groq.com), generate an API key, and set `LLM_PROVIDER=groq` and `GROQ_API_KEY`.
- **Gemini:** create a free API key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey), and set `LLM_PROVIDER=gemini` and `GEMINI_API_KEY`.

## Testing and quality checks

```bash
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit
npm run format:check  # Prettier
npm run test           # Vitest
npm run test:e2e       # Playwright (requires the dev server)
node scripts/check-no-comments.mjs   # enforces the project's no-comments rule

ruff check backend api
ruff format --check backend api
mypy backend api
pytest backend/tests -q
```

All of the above run in CI on every push (see `.github/workflows/ci.yml`).

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it in Vercel — the Next.js frontend and the `api/index.py` Python serverless function are deployed together from this one repository.
3. Optionally set the environment variables from `.env.example` in the Vercel project settings for real LLM responses, email delivery and durable rate limiting. The site works correctly with none of them set.

## Switching from mock data to Postgres

All portfolio content is served through the `PortfolioRepository` protocol in [backend/repositories/portfolio.py](backend/repositories/portfolio.py), currently implemented by `MockPortfolioRepository` reading from `backend/data/`. To move to a free [Neon](https://neon.tech) or [Supabase](https://supabase.com) Postgres database, implement a second class that satisfies the same protocol against your database, and switch `get_repository()` to return it — no router or schema changes required.

## Known issues

- Next.js 15's own PostCSS dependency has an unresolved advisory (path traversal / XSS, both limited to processing untrusted CSS or source maps) that is only fixed in Next.js 16. This project intentionally stays on Next.js 15 per spec; the advisory does not apply here since the project only processes its own CSS.
- Social links for GitHub/LinkedIn are not yet included in `backend/data/profile.py` — only email and phone, which were the contact details provided. Add real URLs there once available.
