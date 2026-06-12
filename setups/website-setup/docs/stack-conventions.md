# Stack Conventions

This document is the authoritative reference for all code work (Phases 5–9). Read it once before writing any file. When in doubt, re-read the relevant section rather than guessing.

---

## 1. Scaffolding (Phase 5, first code)

The Next.js project root is the **repository root** — the same directory that already contains `site/`, `process/`, `.agents/`, `MANIFESTO.md`, `AGENTS.md`, and `STATE.md`. `create-next-app` refuses to scaffold into a non-empty directory, so scaffold into a temporary directory and move the result up:

```bash
# 1. Scaffold into a temp directory
pnpm create next-app _scaffold --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-pnpm --yes

# 2. Move everything to the repo root (no name collisions with the setup files)
rm -rf _scaffold/.git                 # only if the scaffolder initialized one
rm -f  _scaffold/README.md            # the repo keeps its own README
cp -r _scaffold/. .                   # copies dotfiles too, portable across shells
rm -rf _scaffold

# 3. Verify
pnpm dev                              # must start on localhost:3000
```

Flag rationale: `--typescript` required by the stack; `--tailwind` creates `app/globals.css` with the import stub (replaced later in Phase 5); `--eslint` adds Next.js plugin rules; `--app` selects App Router; `--no-src-dir` keeps routes at `app/` for shorter import aliases; `--import-alias "@/*"` standardizes imports; `--use-pnpm` enforces the single package manager; `--yes` prevents interactive prompts in agent sessions.

After the move, `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `public/`, and `app/` (the App Router directory) sit at the repo root. The pre-existing markdown artifacts (`site/`, `process/`, `.agents/`, `MANIFESTO.md`, `AGENTS.md`, `STATE.md`) live alongside the Next.js app. Do not delete or move them, and make sure the generated `.gitignore` does not exclude any of them.

---

## 2. Project Layout After Scaffold

```
/                           ← repo root
├── app/                    ← Next.js App Router (layout, pages, globals.css)
│   ├── globals.css         ← Tailwind @import + @theme tokens + semantic layer
│   ├── layout.tsx          ← root layout; imports globals.css and next/font
│   └── [route]/page.tsx
├── components/
│   ├── primitives/         ← Phase 6: Button, Heading, Text, Link, Card, …
│   └── sections/           ← Phase 7: hero, feature-grid, testimonials, …
├── design/
│   ├── tokens.json         ← DTCG primitive token source of truth
│   └── DECISIONS.md        ← rationale for every visual choice
├── public/
│   └── og/                 ← OG images (1200×630 .png or .jpg)
├── reports/                ← qa.md, launch-checklist.md (Phase 8–9)
├── site/                   ← markdown content artifacts (Phases 1–4)
├── process/                ← pipeline, checklists, templates
└── .agents/skills/         ← per-phase skill files
```

---

## 3. Design Tokens

### Two-layer system

**Layer 1 — Primitives** (`design/tokens.json`, W3C DTCG format)
All raw values live here. This file is the single source of truth for every visual value in the project.

**Layer 2 — `app/globals.css`**
Mirror every primitive as a Tailwind `@theme` variable; then define semantic aliases that reference primitives via `var()`. Components touch only the semantic layer.

### `app/globals.css` structure

```css
@import "tailwindcss";

/* ─── Primitive tokens ─────────────────────────────────────── */
@theme {
  /* Color ramp (oklch: lightness chroma hue) — define 50–900 steps as needed */
  --color-brand-50:  oklch(97% 0.01 260);
  --color-brand-300: oklch(78% 0.10 260);
  --color-brand-600: oklch(47% 0.20 260);
  --color-brand-700: oklch(39% 0.18 260);
  --color-brand-900: oklch(22% 0.09 260);

  --color-neutral-0:   oklch(100% 0 0);
  --color-neutral-100: oklch(93%  0 0);
  --color-neutral-200: oklch(86%  0 0);
  --color-neutral-700: oklch(40%  0 0);
  --color-neutral-900: oklch(15%  0 0);

  /* Type scale — maps to text-* utilities */
  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;
  --text-4xl:  2.25rem;

  /* Spacing scale — maps to p-*/m-*/gap-* utilities */
  --spacing-1:  0.25rem;
  --spacing-2:  0.5rem;
  --spacing-4:  1rem;
  --spacing-6:  1.5rem;
  --spacing-8:  2rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-24: 6rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px oklch(0% 0 0 / 8%);
  --shadow-md: 0 4px 8px oklch(0% 0 0 / 12%);
  --shadow-lg: 0 12px 24px oklch(0% 0 0 / 16%);

  /* Breakpoints */
  --breakpoint-sm: 40rem;
  --breakpoint-md: 48rem;
  --breakpoint-lg: 64rem;
  --breakpoint-xl: 80rem;
}

/* ─── Semantic aliases ─────────────────────────────────────── */
/* Use @theme for semantic aliases that need utility generation; :root for CSS-only vars. */
@theme {
  --color-primary:        var(--color-brand-600);
  --color-primary-hover:  var(--color-brand-700);
  --color-primary-subtle: var(--color-brand-50);
  --color-surface:        var(--color-neutral-0);
  --color-text:           var(--color-neutral-900);
  --color-muted:          var(--color-neutral-700);
  --color-border:         var(--color-neutral-200);
}
```

`@theme` variables are automatically emitted as CSS custom properties, so `var(--color-primary)` works anywhere in CSS too.

### Token rules (enforced at GATE 3 and GATE 4)

1. **Components use semantic tokens only.** Write `bg-primary`, `text-text`, `border-border`, `rounded-md`, `shadow-sm`. Never `bg-brand-600` or `text-neutral-900` inside a component file.
2. **No raw values.** `#3b4eff`, `16px`, `rgba(...)` are forbidden in component or page files.
3. **No arbitrary values.** `p-[13px]`, `text-[#aaa]` are forbidden. The only exception is documented in `design/DECISIONS.md` under a dated entry explaining why no token covers the need.
4. **No `tailwind.config.js`.** Tailwind v4 is configured exclusively via `@theme` in `app/globals.css`.

---

## 4. Components

### Server-first

Every component is a React Server Component by default. Add `"use client"` only when the component requires browser APIs, event handlers, or React state/effects. Document the reason in a comment on the same line.

### Variants

Use `cva` (class-variance-authority) for components with multiple visual variants. It produces fully-typed props, keeps the class list in one place, and integrates cleanly with TypeScript inference. Plain template-string concatenation is acceptable only for components with a single variant.

```tsx
// components/primitives/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  {
    variants: {
      intent: {
        primary:   "bg-primary text-surface hover:bg-primary-hover",
        secondary: "border border-border bg-surface text-text",
        ghost:     "text-primary hover:bg-primary-subtle",
      },
      size: { sm: "h-8 px-3 text-sm", md: "h-10 px-4 text-base", lg: "h-12 px-6 text-lg" },
    },
    defaultVariants: { intent: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export function Button({ intent, size, className, ...props }: ButtonProps) {
  return <button className={button({ intent, size, className })} {...props} />;
}
```

### File and naming rules

- One component per file.
- File name matches the exported component name, PascalCase: `Button.tsx`, `HeroSection.tsx`.
- Props interface defined in the same file, named `{Component}Props`.
- No inline `style` props. No CSS Modules. Tailwind utilities only.
- Import alias: `@/components/primitives/Button`, `@/components/sections/Hero`.

---

## 5. Accessibility Conventions

These are not optional — WCAG 2.2 AA is the floor (AGENTS.md hard rule).

- **Landmarks.** One `<main>` per page. Use `<header>`, `<nav>`, `<footer>`, `<section aria-labelledby>` appropriately.
- **Heading discipline.** Exactly one `<h1>` per page. Levels nest without skipping. Text comes from approved copy only.
- **Focus styles.** Standard pattern: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`. Never suppress `outline` without a visible replacement. Use `focus-visible:` not `focus:`.
- **Motion.** Wrap animations with `@media (prefers-reduced-motion: reduce)` or the `motion-reduce:` Tailwind variant.
- **Forms.** Every field has an associated `<label>` via `htmlFor`/`id`. Error messages use `aria-describedby`.
- **Images.** Decorative: `alt=""`. Informative: concise descriptive `alt`. Attribute is never omitted.
- **Contrast.** Normal text ≥ 4.5:1; large text ≥ 3:1; UI components and focus indicators ≥ 3:1 (WCAG 2.2 AA).

---

## 6. SEO and Metadata

### Metadata API

Set metadata from the corresponding page brief (`site/page-briefs/<slug>.md`) using Next.js `generateMetadata` or the static `metadata` export. Never hardcode fallback values — if a brief is missing a field, stop and raise it.

```tsx
// app/about/page.tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Us — Acme Corp",         // page brief: seo.title
  description: "…",                       // page brief: seo.metaDescription
  openGraph: {
    title: "About Us — Acme Corp",
    description: "…",
    images: [{ url: "/og/about.png", width: 1200, height: 630 }],
  },
};
```

### OG images

Static OG images: `public/og/<slug>.png`, 1200×630 px. One image per page. Referenced as `/og/<slug>.png` in metadata.

### sitemap.xml and robots.txt

Generate via App Router conventions: `app/sitemap.ts` (async default export returning URL list) and `app/robots.ts` (default export returning rules object). Both are created in Phase 9. Do not use static files.

---

## 7. Performance

- **Images.** Use `next/image` for every content image. Set explicit `width` and `height` (or `fill` with a sized container). Never use a plain `<img>` tag.
- **Fonts.** Load all fonts via `next/font` in `app/layout.tsx`. Assign the font variable to a CSS custom property (`--font-sans`), reference it in `@theme`. Never load fonts from a `<link>` tag or `@import` inside CSS.
- **Client JS.** Default to Server Components. Every `"use client"` boundary needs a comment justifying it. No third-party client libraries without an entry in `design/DECISIONS.md`.
- **Core Web Vitals budgets.** Taken from `site/strategy.md`. Defaults when unspecified: LCP < 2.5 s, CLS < 0.1, Lighthouse Performance ≥ 90 mobile, Lighthouse Accessibility ≥ 95. Measured against the production build (`pnpm build`), not the dev server.

---

## 8. Quality Commands

All four commands must pass cleanly before GATE 4 (`pnpm build` must also pass before any deployment).

```bash
pnpm dev          # development server (Turbopack)
pnpm lint         # ESLint with Next.js plugin rules
pnpm typecheck    # tsc --noEmit (no type errors tolerated)
pnpm build        # production build; must complete with exit 0
```

Add `"typecheck": "tsc --noEmit"` to `package.json` scripts if the scaffolder does not include it. The `pnpm build` output (`.next/`) is not committed to the repository.
