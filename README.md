<p align="center">
  <h1>Obsidian Store</h1>
  <b>A dark, motion-first storefront for a fictional streetwear label</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/dependencies-react%20%2B%20react--dom%20only-brightgreen" alt="No UI framework" />
</p>

> The repository is named after the course assignment it was written for. The project
> inside is called **`obsidian-store`**, which is its `package.json` name.

---

## What this is

A single-page storefront for a made-up streetwear brand, built as a **frontend
motion-design exercise**. There is no backend: the cart is a counter in React
state, and the catalogue is a hard-coded array.

The point of the project is the interaction layer — parallax, tilt, scroll reveals
and a custom cursor — implemented directly rather than pulled from an animation
library. The only runtime dependencies are `react` and `react-dom`.

---

## Interaction layer

The four hooks in `src/hooks/index.ts` carry most of the work:

| Hook | What it does |
|---|---|
| `useMouseParallax` | Normalises pointer position to `[-1, 1]` and smooths it in a `requestAnimationFrame` loop, lerping the current value toward the target at **0.05** per frame. Registered as a single global `mousemove` listener and torn down on unmount. |
| `useCardTilt` | Maps pointer position within an element's bounding box to a rotation of up to **±20°**, with a reset handler for pointer-out. |
| `useInView` | `IntersectionObserver` at a **0.15** threshold that latches to `true` once the element has entered — a one-shot reveal rather than a repeating toggle. |
| `useScrollY` | Window scroll offset via a `{ passive: true }` listener, used to drive the navbar's condensed state. |

The native cursor is hidden (`cursor: none`) and replaced by a `Cursor` component
that tracks the same parallax position.

`src/data/products.ts` also generates **30 floating particles** with randomised
position, size, speed and animation delay.

---

## Sections

`App.tsx` composes eight components in order:

`Navbar` → `HeroSection` → `MarqueeBar` → `ProductsSection` → `StatsSection` → `BannerSection` → `Footer`

plus the `Cursor` overlay, which sits above all of them.

The catalogue holds **6 products** across 6 categories, filterable through a
7-entry filter list (`ALL` plus one per category). Products are typed via
`Product` in `src/types/index.ts`; particles are typed via `Particle`.

---

## Stack

| Layer | Choice |
|---|---|
| UI | React 19 |
| Language | TypeScript 5.6 (`strict`) |
| Build | Vite 6 |
| Styling | Plain CSS — no Tailwind, no CSS-in-JS |
| Runtime deps | `react`, `react-dom` — nothing else |

---

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check with tsc, then build
npm run preview  # serve the production build
npm run lint     # eslint
```

---

## Project structure

```
index.html
vite.config.ts
tsconfig.json / tsconfig.app.json / tsconfig.node.json
src/
├── main.tsx              # React entry point
├── App.tsx               # composes all sections, owns cart state
├── index.css             # the entire stylesheet
├── components/
│   ├── Navbar.tsx        # scroll-aware navigation + cart badge
│   ├── Cursor.tsx        # custom cursor
│   ├── HeroSection.tsx   # largest section, parallax-driven
│   ├── MarqueeBar.tsx    # scrolling text strip
│   ├── ProductsSection.tsx
│   ├── ProductCard.tsx   # uses useCardTilt
│   ├── StatsSection.tsx  # useInView reveal
│   ├── BannerSection.tsx
│   └── Footer.tsx
├── data/products.ts      # catalogue, category filter list, particles
├── hooks/index.ts        # the four hooks described above
└── types/index.ts        # Product, MousePosition, Particle
```

---

## Note on repository hygiene

`node_modules/` is committed to this repository — roughly **3,300 of the 3,670
tracked files**. The `.gitignore` already lists `node_modules/`, but the
dependencies were committed before that rule took effect, so the ignore has
never applied retroactively.

This inflates the repository to ~18 MB and makes the actual source (15 files
under `src/`) hard to see. The fix is to stop tracking the directory and commit
only the lockfile:

```bash
git rm -r --cached node_modules
git commit -m "chore: stop tracking node_modules"
```

I have deliberately not done this — rewriting published history is the owner's
call, not a documentation change.
