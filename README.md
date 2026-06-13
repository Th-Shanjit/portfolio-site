# Shanjit Thokchom — Portfolio

Personal portfolio site for a junior/entry-level Product Manager and AI product builder. The homepage is designed to help recruiters quickly understand who I am, what product work I do, what proof I have, and how to get in touch.

**Live:** [shanjitthokchom.xyz](https://shanjitthokchom.xyz)

## Featured project

**[PaperLoop](https://shanjitthokchom.xyz/paperloop)** — A tool that turns handwritten exam drafts into editable, PDF-ready papers for teachers. Built and tested with real educator workflows; currently in closed beta.

Case study: [/docs/paperloop-problem-space](https://shanjitthokchom.xyz/docs/paperloop-problem-space)

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Content:** Static TypeScript data (`data/portfolio-static.ts`, `data/docs-static.ts`)
- **Analytics:** Vercel Analytics
- **Deploy:** Vercel

## Local setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
pnpm build
pnpm start
```

## Project structure

```
app/                  # Routes and page components
  _components/home/   # Homepage sections
  docs/               # Product notes archive
  paperloop/          # PaperLoop landing (separate layout)
data/                 # Static content source
lib/                  # Shared utilities
public/               # Static assets
```
