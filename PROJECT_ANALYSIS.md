# Folio Portfolio — Project Analysis

> **Template:** Folio HTML · Tailwind CSS · Alpine.js  
> **Author:** Laurent Begey / ThemeWagon  
> **Demo:** [themewagon.github.io/folio-html](https://themewagon.github.io/folio-html/)

---

## Folder Tree

```
folio-tailwind-1.0.0/
├── .github/
│   └── workflows/
│       └── release.yml
├── index.html              # Homepage (single-page, anchor navigation)
├── projects.html           # All projects grid + category filters
├── case-study.html         # Novu case study (long-form article)
├── blog.html               # Blog listing + featured article
├── blog-article.html       # Single blog post
└── README.md
```

**Note:** No local assets — all images load from Unsplash CDN and Pravatar. No build step; Tailwind and Alpine.js load via CDN.

---

## Page Map

| File | Route (original) | Purpose |
|------|------------------|---------|
| `index.html` | `/` | Landing: Hero, Services, Work, About, Reviews, Blog preview, Contact |
| `projects.html` | `/projects.html` | Filterable project grid (9 items) + CTA |
| `case-study.html` | `/case-study.html` | Full case study with prose, stats, process steps |
| `blog.html` | `/blog.html` | Blog index with featured hero card + 6 articles |
| `blog-article.html` | `/blog-article.html` | Article with reading progress bar |

---

## Component Tree

### Global (all pages)

```
App
├── Header / Navbar
│   ├── Logo (eli + ott accent split)
│   ├── Desktop nav links
│   ├── Dark mode toggle
│   ├── "Contact me" CTA
│   └── Mobile hamburger menu (Alpine x-show + x-transition)
├── Main content (page-specific)
└── Footer
    ├── Copyright + credits
    └── "Built with Tailwind CSS & Alpine.js"
```

### Homepage (`index.html`)

```
HomePage
├── Navbar (section-aware active state)
├── Hero
│   ├── Eyebrow, H1, subtitle, CTAs
│   ├── Stats row (34+ / 21+ / 5y)
│   └── Portrait photo + "Open to projects" badge
├── Services (3 cards, middle card dark)
├── Work (2-col grid, featured spans 2 rows)
├── About (photo + bio + skill tags)
├── Reviews / Testimonials (3 blockquotes, middle dark)
├── Blog preview (3 cards)
├── Contact (dark card, info + form)
└── Footer
```

### Projects page

```
ProjectsPage
├── Page hero + filter pills (Alpine reactive filter)
├── Project grid (9 cards, x-show per category)
├── Empty state message
└── CTA banner
```

### Case study page

```
CaseStudyPage
├── Reading progress bar (scroll %)
├── Article header (tags, meta grid)
├── Hero image
├── Stats banner (4 metrics)
├── Prose body (.prose-cs)
├── Process steps (numbered badges)
├── Before/after images
├── More projects section
└── CTA banner
```

### Blog pages

```
BlogPage
├── Hero + category filter pills (UI only on original)
├── Featured article (2-col card)
├── Article grid (6 cards)
└── Pagination

BlogArticlePage
├── Reading progress bar
├── Article header + author row + share buttons
├── Hero image
├── Prose body (.prose-article)
└── Related articles (3 cards)
```

---

## Animation System

| Class / Pattern | Trigger | Effect | Timing |
|-----------------|---------|--------|--------|
| `.reveal` | IntersectionObserver | `opacity 0→1`, `translateY 22–26px→0` | 0.5–0.6s, `cubic-bezier(.4,0,.2,1)` |
| `.reveal.in` / `.visible` | IO adds class | Visible state | — |
| `.d1`–`.d4` / `.reveal-delay-*` | CSS delay | Stagger 0.07–0.08s increments | — |
| `.nl` / `.nav-link` | `:hover`, `.on` | Underline width 0→100% | 0.22–0.25s |
| `.shimmer` / `.btn-primary` | `:hover` | Skewed light sweep left→right | 0.4s |
| `.card-h` / `.card` / `.project-card` | `:hover` | `translateY(-3px to -4px)` | 0.28–0.3s |
| `.stag` | `:hover` | Border → accent | 0.18s |
| Alpine `x-transition` | Mobile menu | Fade + translateY | 150–200ms |
| Alpine `x-show` + filter | Projects page | Scale + opacity transition | 200–300ms |
| Header `:class` | `scrollY > 20` | Backdrop blur + shadow | 300ms |
| `body` | Dark toggle | Background/color transition | 0.3s |
| Progress bar | Scroll % | Width update | 0.1s linear |

**Libraries:** Alpine.js 3.x only. No GSAP, Framer Motion, or Lottie.

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `accent` | `#FF6B2B` | CTAs, highlights, scrollbar, progress bar, stars |
| `accent-light` | `#FF8F5C` | Button hover |
| `orange-50` | Tailwind | Tag backgrounds (light) |
| `orange-200` | Tailwind | Tag borders (light) |
| `zinc-50`–`zinc-950` | Tailwind | Neutrals, dark mode base |
| `#fff7f4` | Custom | Blockquote bg (light) |
| `#d4d4d8` / `#e4e4e7` | Custom | Photo frame fallback bg |

**Dark mode:** `class` strategy on `<html>`, persisted in `localStorage.theme`.

---

## Font System

| Role | Family | Weights | Tailwind class |
|------|--------|---------|----------------|
| Display (headings) | PT Sans | 400, 700 | `font-display` |
| Body | DM Sans | 300, 400, 500 | `font-body` / default |

Loaded via Google Fonts with `preconnect`.

---

## Responsive Layout

| Breakpoint | Key changes |
|------------|-------------|
| Default | Single column, hamburger nav |
| `sm` (640px) | Contact form 2-col name/email |
| `md` (768px) | Desktop nav, 2–3 col grids, hero 2-col |
| `lg` (1024px) | Larger hero typography (text-7xl), projects 3-col |

**Container:** `max-w-6xl mx-auto px-6` (homepage sections); prose uses `max-w-3xl` / `max-w-4xl`.

**Fixed header:** `h-16`, content `pt-16` or `pt-32`–`pt-36` on inner pages.

---

## Assets Used

All remote — no bundled images:

- **Portraits:** Unsplash `photo-1507003211169`
- **Projects:** Various Unsplash IDs (dashboard, fintech, agency, etc.)
- **Blog:** Unsplash coding/design photos
- **Avatars:** `i.pravatar.cc/80?img=11|52|47`
- **Noise overlay:** Inline SVG data URI (fractalNoise filter)
- **Icons:** Inline Heroicons-style SVGs (stroke + fill)

---

## Scroll Behaviour

- `html.scroll-smooth` for anchor navigation
- Header gains `bg-white/90 backdrop-blur-md shadow-sm` after 20px scroll
- Homepage: active nav section tracked via scroll position (`updateSection()`)
- Case study / blog article: top reading progress bar (0–100%)
- Reveal animations fire once via IntersectionObserver (`threshold: 0.08–0.1`)

---

## Navigation Behaviour

### Homepage
- Anchor links: `#services`, `#work`, `#about`, `#reviews`, `#blog`, `#contact`
- Active link class `.on` + underline
- Mobile menu closes on link click

### Subpages
- Logo → `index.html`
- Services/About/Contact → `index.html#section`
- Work → `projects.html` (accent when active)
- Blog → `blog.html` (accent when active)
- Case study links → `case-study.html`

---

## UI Patterns

1. **Eyebrow label** — `text-xs text-accent tracking-widest uppercase`
2. **Section heading** — `font-display font-bold text-4xl md:text-5xl`
3. **Dark feature card** — Middle card in Services/Reviews uses inverted colors
4. **Tag pills** — Accent-bordered primary tag + neutral secondary tags
5. **Photo frame** — `.pf` / `.photo-frame`: overflow hidden, object-cover
6. **CTA banner** — `bg-zinc-900 rounded-3xl` + accent blur orbs
7. **Shimmer button** — Primary actions with skewed highlight sweep
8. **Glassmorphism** — Header only: `bg-white/90 backdrop-blur-md`
9. **Noise texture** — Fixed `body::before` pseudo-element
10. **Stat blocks** — Large display numbers + small caption

---

## Reusable Components (React migration target)

| Component | Used on |
|-----------|---------|
| `Navbar` | All pages (variants: home / page) |
| `Footer` | All pages (variants: full / minimal) |
| `ThemeToggle` | Navbar |
| `MobileMenu` | Navbar |
| `Reveal` | All animated sections |
| `SectionHeader` | Services, Work, About, etc. |
| `ShimmerButton` | CTAs |
| `Tag` | Projects, blog, case study |
| `PhotoFrame` | All images |
| `ProjectCard` | Work, Projects, Case study |
| `BlogCard` | Blog sections |
| `TestimonialCard` | Reviews |
| `ServiceCard` | Services |
| `ContactForm` | Contact |
| `CtaBanner` | Projects, Case study |
| `ReadingProgress` | Case study, Blog article |
| `FilterPills` | Projects, Blog |

---

## JavaScript / Alpine State

### `index.html` — `app()`
- `dark`, `mm` (mobile menu), `sc` (scrolled), `s` (active section)
- Watches `dark` → localStorage
- Scroll listener → header + section tracking
- IntersectionObserver for `.reveal`

### `projects.html` — `projects()`
- `filter`, `allProjects[]`, `visibleCount` computed
- Filter uses `x-show` per card (not re-render)

### Subpages
- Inline Alpine: `dark`, `scrolled`, `mobileMenu`, `progress` (where applicable)

---

## SEO & Meta (original)

- Per-page `<title>`, `<meta description>`, Open Graph tags
- Semantic HTML: `<header>`, `<main>`, `<footer>`, `<article>`, `<blockquote>`
- ARIA: nav labels, expanded states, star ratings, progress bars

---

## Performance Notes (original)

- CDN Tailwind (no purge in production — full runtime)
- `loading="lazy"` on below-fold images; hero `loading="eager"`
- Passive scroll listeners
- IO unobserve after reveal (one-shot animations)

---

## Known Original Issues

- `index.html` line 279: broken href `href=case-study.html"` (missing opening quote)
- Blog filter pills on `blog.html` are visual only (no filtering logic)
- Pagination links are `#` placeholders

---

## Migration Notes

- Replace Alpine.js with React hooks + CSS transitions
- Replace CDN Tailwind with compiled Tailwind v4/v3 + config
- External images → local placeholders (Phase 6)
- Personal content → placeholder data files under `/data`
- Routes: `/`, `/projects`, `/case-study`, `/blog`, `/blog/[slug]`
