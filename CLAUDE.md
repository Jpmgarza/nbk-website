# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Commands

```bash
npm run dev        # dev server (localhost:3000)
npm run build      # production build (Turbopack)
npm run start      # production server
npm run lint       # ESLint (flat config, eslint-config-next)
npm run typecheck  # tsc --noEmit
npm run assets     # rebuild every served image from design/source
npm run qa         # screenshots + overflow/console/link/axe checks, needs a server on :3100
node scripts/qa-interactions.mjs   # menu, dropdown, carousel, FAQ, form, Spanish version checks on :3100
```

`qa-interactions` answers the form's server action itself so a run never e-mails Noelia; set
`QA_SEND=1` to send for real. In Git Bash, pass a path to `npm run qa` with `MSYS_NO_PATHCONV=1`
(otherwise `/es` is rewritten into a Windows path).

## OneDrive caveat

The project lives in a OneDrive-synced folder: `npm install` and `next dev` are slow. For visual
checks build and serve production (`npm run build && npx next start -p 3100`). Stop that server
before rebuilding, or it keeps serving old chunk names and CSS requests fail with 500.

## Deployment (Infomaniak Web hosting, Node.js site)

Live at https://nbk-interp.ch (apex only; www has no DNS record). The site lives in
`~/sites/nbk-interp.ch` on the host, cloned from the public GitHub repo. The Manager's Build button
does not pull from Git, so every update is:
1. SSH console (Control panel > Open the SSH console): `cd ~/sites/nbk-interp.ch && git pull`
2. Control panel > Build (answer "No" to reinstalling node_modules unless dependencies changed).

Settings: Node 24, build `npm install && npm run build`, run `npm run start -- -p 3000`, port 3000.
Use `npm install`, not `npm ci`: a lockfile written on Windows lacks sharp's Linux/WASM optional
deps (`@emnapi/*`) and `npm ci` refuses it. `sharp` must stay a production dependency (Next needs it
for `/_next/image`). Heavy commands over SSH get killed (shared-hosting limits); build with the button.
SMTP secrets are in `~/sites/nbk-interp.ch/.env` on the server only (git-ignored, never commit it);
the Manager has no environment-variable screen. The SSH console mangles pasted text: type commands.

## Architecture

Next.js 16 App Router, React 19, TypeScript, Tailwind 3.4. Everything is statically prerendered.

Bilingual, French by default. French: `/`, `/services`, `/contact`, `/mentions-legales`,
`/protection-des-donnees`. Spanish: `/es`, `/es/servicios`, `/es/contacto`, `/es/aviso-legal`,
`/es/proteccion-de-datos`. The path table is `PAGES` in `lib/i18n.ts`.

- Two root layouts (`app/(fr)/layout.tsx`, `app/(es)/layout.tsx`) so each language gets its own
  `<html lang>`; both render `components/layout/SiteShell.tsx`. Switching language is a full page load.
- With two root layouts there is no app-wide 404: `app/(fr)/[...missing]` and `app/(es)/es/[...missing]`
  call `notFound()` so unknown URLs get the 404 of their language (`global-not-found` is still experimental).
- Route files are thin; page bodies are in `components/pages/` and take `locale`.
- Header shows the other language as "ES"/"FR" (accessible name "Español"/"Français") and links to
  the same page in that language (`alternatePath`).

- `components/sections/<route>/`: one component per Figma section. `shared/` holds `PageHero`
  (home and services heroes), `FaqSection` and `ContactSection` (`variant: "home" | "page"`).
- `components/ui/`: `Button`/`ButtonLink`, `SectionTitle` (heading + red rule), `CalloutCard`, `FaqList`.
- `components/layout/`: `Header` (client: services dropdown, burger menu whose Services entry is a collapsed disclosure starting with "Tous les services"; fixed with a spacer, it shrinks to a compact logo + burger bar on every size once scrolled past 80px) and `Footer`.
- `components/ui/Select.tsx`: branded select-only combobox used by the contact form (native option lists cannot be styled).
- `lib/content/fr.ts` and `lib/content/es.ts`: all copy and navigation, typed by `lib/content/types.ts`
  (a missing Spanish string is a type error). Read it with `getContent(locale)` / `getServices(locale)`.
  The Spanish is adapted, not literal: "usted", Spanish legal and healthcare terms. Keep it that way.
- `lib/data/services.ts`: language-neutral service keys and illustrations. `lib/constants.ts`: contact details, domain.
- `lib/contact-schema.ts`: `makeContactSchema(messages)` shared by `ContactForm` and the server action
  (`components/forms/actions.ts`, which may only export async functions). Form values are keys
  (`juridique`, `fr-es`…), labels come from the content.

## Design system

Figma file "NBK website" (6 pages: Mobile/Desktop main, service, contact). Designed at 360px and
1440px; the desktop layout starts at `lg` (1024px), the full nav at `xl` (1280px).

- Colours are CSS variables in `styles/globals.css`, exposed to Tailwind as `bg`, `ink`, `accent`
  (`accent-strong` is the hover shade). Opacity steps 8/72/85 come from Figma.
- Fonts: Inter (`font-sans`, text) and Source Sans 3 (`font-display`, headings) via `next/font`.
- Type scale (18px base, ratio 1.333) is named in `tailwind.config.ts`. `h1`/`h2` are `clamp()`
  values that reach the Figma sizes at 1440px. Mobile headings are Regular, desktop SemiBold, as in Figma.
- `.container-page` uses `--gutter` (16 / 40 / 48 / 80px). `.section` gives the Figma rhythm
  (desktop 184px top + 72px bottom = 256px between sections).
- Several sections render different markup per breakpoint from the same data (problems rows vs
  paragraph + card, carousel vs alternating list, zigzag timeline vs list). Keep both in sync.
- The process timeline is a CSS grid with `grid-cols-subgrid` rows; the `lg:gap-[normal]` on each
  row is required, otherwise the mobile `gap-6` overrides the parent gap and shifts the centre column.
- In `ContactSection` the title needs its explicit `lg:col-start-1`: the map is placed explicitly in
  column 2, and an auto-placed title would be pushed into an implicit column.
- The carousel end padding (`.carousel-track`) lets every card reach the start position, so each
  indicator maps to one card. The carousel loops: cards render three times (copies are aria-hidden,
  links `tabIndex=-1`) and the track jumps back to the middle set when a scroll ends in a copy.
  Autoplay is driven by the active segment's `.carousel-progress` animationend (5s); it pauses on
  hover, keyboard focus and off screen (no pause button, client choice), and is off with reduced motion.

## Motion

No animation library. `styles/motion.css` (unlayered, so it beats utilities) documents every variant.
- Scroll reveals: add `data-reveal="self" | "children" | "rows" | "step" | "title" | "clip"`;
  `MotionObserver` (root layout) sets `data-reveal-state` only when JS runs and motion is allowed,
  and skips anything already on screen. Stagger children with `revealIndex(i)` from `lib/motion.ts`;
  set direction with `[--reveal-x:…] [--reveal-y:…]`. Never put `data-reveal` on an element with its
  own transform/transition utilities (buttons, for example).
- Header items (`.motion-header-item`, stagger `--header-i`) drop in on load; desktop links replay it when the full nav returns at the top.
- `SectionTitle reveal="scroll" | "load"` splits a string title into masked words.
- Hero entrance (`.motion-hero-media`, `.motion-load-up`) is pure CSS on load. Parallax
  (`.motion-parallax`) uses CSS scroll-driven animations behind `@supports`.
- Process timeline: one line (`ProcessLine`, client) runs behind the opaque tiles from tile 1 to the
  last. Its tip follows the scroll (65% of the viewport) and reveals each step (tile pops, text slides
  in 350ms later) when it reaches the tile, then waits at that tile's top edge until the tile's opacity
  transition has ended; steps stay revealed, scrolling up only shortens the line.
  The steps carry `data-reveal-manual` so `MotionObserver` leaves them alone.
- `ContactSection variant="page"` plays its top block on load instead (title `reveal="load"`,
  `.motion-load-up`, `.motion-load-clip`), because it is on screen at load and scroll reveals skip that.
- Rolled out on the home page, `/services` and `/contact` (plus the shared hero, FAQ and contact sections). Service
  illustrations (carousel and service pages) only fade, by client choice. `npm run qa` runs
  with reduced motion, so screenshots show the settled page.

## Assets

Figma exports live in `design/source/` (not served). `npm run assets` writes WebP files to
`assets/images/` (imported statically by `next/image`), plus `public/og-share.jpg` and the icons.
Favicons come from the studio set in `design/source/favicon/` (favicon.ico 16–256, 512, 180 apple, 32) and
are copied as they are to `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` and
`public/icons/icon-512.png`; only `public/icons/icon-192.png` (manifest) is scaled from the 512. The logo exists only as a 713x423 PNG. The home hero portrait (`design/source/noelia-portrait.jpg`,
full-size export received 8 October 2026, 6334x4223) is wired into `components/pages/HomePage.tsx`
(`imageClassName="object-[50%_20%]"`); `lib/content/*.ts` `hero.imageAlt` holds the alt text. It
replaced the old 1150x766 placeholder in place (recoverable from git history, commit a325d43, if ever
needed); the Figma portrait is kept as `noelia-portrait-figma.png`. All PDF photos are in
`design/source/photos-noelia/`. Replace the source and rerun `npm run assets` for any future portrait
change.
Hero photos render at `quality={90}` (PageHero). Next 16 silently coerces any quality not in
`images.qualities` (default `[75]`) to the nearest allowed value, so 90 is listed in `next.config.ts`;
add any new quality there too or it will quietly fall back to 75.

## Form

`sendContactRequest` validates with Zod, drops honeypot submissions, and sends with Nodemailer when
`SMTP_HOST`, `SMTP_USER` and `SMTP_PASS` are set (variables listed in the README). Without SMTP it
logs the request; in production it then returns an error telling the visitor to write or call
instead, so no request is silently lost; a failed request shows the same message. Service pages link
to `/contact?mission=<key>` (or `/es/contacto?mission=<key>`) to preselect the mission. The e-mail to
Noelia is always in French and says which language the visitor used.

## SEO

The domain `https://nbk-interp.ch` (apex, no www: www has no DNS record) is fixed in `lib/constants.ts` (not an env var) so canonical
tags and the sitemap always point to it. Every page sets metadata with `pageMetadata()` from
`lib/seo.ts` (`pageMetadata({ locale, page })`), which also writes hreflang alternates (fr-CH, es,
x-default = French); the sitemap lists both languages with alternates. Legal pages are `noindex` and
not in the sitemap. `robots.ts` blocks Vercel previews. `/llms.txt` (`app/llms.txt/route.ts`) is built
from the content files, so it follows copy changes.
JSON-LD lives in `lib/structured-data.ts` (builders) and `components/seo/JsonLd.tsx` (the only
place using React's raw-HTML prop; the local security hook warns on the first write, retry it). The
shell emits `ProfessionalService`, home and contact emit `FAQPage`, services emits an `ItemList`
of `Service`, each in the page's language. Pass it only static data from our own files.

## Content decisions to confirm with the client

- Phone: 078 942 12 67 everywhere (the Figma desktop footer said 079).
- Service page texts come from the mobile Figma page (the desktop page repeated the legal text).
  Service CTAs use the specific mobile labels. "Elle comprendre" was corrected to "Elle comprend".
- Contact page heading is "Parlons de votre situation" on all sizes (desktop Figma repeated the footer sentence).
- FAQ answers in `lib/content/*.ts` were written from known facts; tarifs, délai and paiement must be validated.
- The whole Spanish version (2 October 2026) needs a read-through by Noelia, who is a native speaker.
- Noelia's file (CV, diplomas, employer certificates) holds no interpreting certification, so the site no
  longer says "certifiée"/"certificada": it says Spanish mother tongue, legal training, about ten years in
  legal settings (7 at the Paraguayan Ministerio Público), interpreting since 2022, and Spanish language
  assistant in two collèges of Saint-Julien-en-Genevois in 2010–2011 (Académie de Grenoble appointment,
  1 Oct 2010 to 30 Apr 2011, sent by Noelia). Use "juriste de
  formation", not "avocate", in Swiss-facing copy (protected title). If she does hold a certificate, add its
  name, issuer and year to the Expertise section, `llms.txt` and the Person schema.
- Not published until confirmed: a possible one-off mission for the UN (entity, year, role and proof
  needed).
- SEO copy added without the client: "Lausanne" in the service area and home meta description. The
  `/services` H1 is the short "Services d’interprétariat et de traduction" (client choice): the longer
  "…, pensés pour chaque situation" wrapped to six lines and ran under the hero photo.
- The services hero reuses the home portrait with a tighter crop (`noelia-services.webp`, built by
  `npm run assets`); the stock photo is gone. A second real photo of Noelia in a working setting
  (tall, plain background, no logos) would be better: drop it in `design/source/` and change the crop.
- Noelia is not entered in the commercial register, so there is no IDE number; the mentions légales say
  "entreprise individuelle non inscrite au registre du commerce". The LCD art. 3 al. 1 let. s contact
  address is her home address (SITE.address in lib/constants.ts, confirmed by her), shown on the
  mentions légales in both languages. Deliberately not in the ProfessionalService structured data: a
  schema.org address there can read as a visiting address, and she works at clients' sites, not from
  home. "Conditions générales" is not linked until a text exists.
- FAQ tariff answer ("le tarif dépend… un devis vous est transmis") kept as is: checked against the
  Vaud cantonal police interpreter tariff and INTERPRET's 2013 tariff-structure recommendations
  (design/source or ask for the PDFs again if needed) — both confirm rates vary by institution,
  qualification and intervention type, with no single number that would apply to her. Publishing a
  specific figure risked being wrong for her actual clients (private individuals, law firms), who
  aren't the police or an INTERPRET-affiliated service.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
