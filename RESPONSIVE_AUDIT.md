# Responsive audit

Date: 2026-10-02. Stack: Next.js 16, Tailwind 3.4. Pages: `/`, `/services`, `/contact`, `/mentions-legales`, `/protection-des-donnees`.
## Status

| ID | Status |
|----|--------|
| R-01 | **Fixed** (2026-10-02): `max-w-[56ch]` on the two mobile-only blocks in `Problems.tsx`. Re-measured at 768, 1000, 1023 and 1440: the longest remaining lines on `/` are FAQ answers (77–81, R-02). `npm run qa` still clean. |
| R-10 | **Deferred, keep as is**: the wrapper removal was a deliberate fix for hover not firing on the owner's device. Hover works in the current build (card lifts 6px, accent shadow, checked with real mouse moves in Chrome). The old class string also generates valid CSS, so the wrapper was not syntactically broken; it only blocks devices that report no hover capability. Cost of keeping it: on phones the card stays lifted after a tap (cosmetic). |
| R-04 | **Fixed**: `PageHero.tsx:34` gets `[@media(max-height:500px)_and_(max-width:1023px)]:h-[calc(100svh-100px)]`. At 667×375 the home title now starts at y=284 (was 519), inside the screen. The button is still below the fold. Applies to `/` and `/services`; portrait phones and 1024+ unchanged. |
| R-05 | **Fixed**: `Footer.tsx:53` `-mt-1` became `lg:-mt-1`. The LinkedIn link no longer sits 6px from the e-mail link on mobile. |
| R-06 | **Fixed**: `Footer.tsx` credit links now have `py-3` (44px tall). Desktop link uses `-my-3` to keep its layout; the mobile link uses `-mb-3` instead, because `-my-3` made its hit area overlap the legal links above it (caught by the probe and by axe `target-size` at 390; fixed and re-verified). Mobile and tablet pages are 12px taller. |
| R-07 | **Fixed**: `SolutionsCarousel.tsx:182` indicator buttons are `h-11` with `-my-2.5`, so the layout is unchanged. |
| R-02 | **Fixed**: FAQ answer cap `60ch` to `52ch` in `FaqList.tsx`. Checked in Figma (node 175:596): the 652px column matches ours and answers are not designed (collapsed state only), so the cap was ours. Longest line now 69 characters. |
| R-03 | **Fixed**: `max-w-[70ch]` to `max-w-[52ch]` in `LegalPage.tsx`. No legal page frame was found in the Figma pages that could be listed, so the width was ours. Longest line now 73 characters (was 100). |
| R-08 | **Fixed**: `ServiceDetail.tsx:14`, the illustration column is now `clamp(480px, calc(51.3vw - 45px), 519px)` instead of a fixed 519px. Re-measured: the overrun was only at about 1024px (29px; none from 1100 up), now 0. The column is exactly 519px from 1100px, so 1280+ is unchanged: `/services` captures at 1440 are identical before and after. The 6px overrun of the home page card heading at 320px is **Deferred**: it ends at x=310 of 320, nothing is clipped or overlapped, and it comes from the Figma mobile column widths. |
| R-09 | **Fixed on the owner's instruction** (labels must be level): `ContactSection.tsx:85` `lg:items-end` to `lg:items-start`. All four labels now share one top on `/contact` and `/` at 1024, 1280, 1440 and 1920 (checked). Because it was applied at 1280+, that is a deliberate desktop change, not confirmed against Figma. Earlier note: **Needs decision, not changed**: re-measured, and the "Zone de service" label sits 22px higher than the others at **every** desktop width (1024 to 1920, including 1440), so it is the base desktop design (`lg:items-end` in `ContactSection.tsx:85`), not a small-width bug. The Figma desktop contact frame could not be located through the MCP (only one page listed), so it is not confirmed whether the bottom alignment is intended. Fixing it would change the layout at 1280+. |

Verification after R-04 to R-07: `npm run qa` clean (5 pages × 9 viewports, axe included); probe shows no touch target under 44px outside inline text links, and no overlaps; screenshots at 1024, 1440 and 1920 are pixel-identical to before on all 5 pages.

## How this was checked

- **`npm run qa`** on a fresh production build, 5 pages × 9 viewports (1920, 1440, 1024, 768, 390, 375, 360, 320, plus 667×375 landscape): **no problems**. That covers horizontal overflow (carousel track excluded), text under 12px, console errors, HTTP errors, broken links/anchors, and axe WCAG 2.x A/AA at 1440 and 390.
  The only change to the QA scripts is the viewport list in `scripts/qa.mjs`.
- **Throwaway Playwright probes** (kept outside the repo) at 320×844, 375×844, 667×375, 768×1024, 1024×900, 1920×1080 on all five pages for what QA does not cover: touch target size and spacing, form field font size, mobile menu reachability, heading overflow, characters per line, hero first screen in landscape. Two screenshots were looked at (`/services` and `/contact` at 1024).
- **Static review** of `app/`, `components/`, `styles/`, `tailwind.config.ts`.

## Findings

| ID | Page | Component/File:line | Width(s) affected | Issue | Severity | Proposed fix |
|----|------|---------------------|-------------------|-------|----------|--------------|
| R-01 | `/` | `components/sections/home/Problems.tsx:16` (summary) and `:42-46` (risk callout), both `lg:hidden` | about 800–1023 (worst 1000–1023: 102–108 chars/line; 81 at 768) | The mobile layout is used up to 1023px and its paragraphs stretch across the whole container, giving lines of 100+ characters (limit 75). | Major | Add `max-w-[56ch]` to the summary paragraph and the callout wrapper. Both are hidden from `lg`, so nothing at 1024+ changes. Re-measure after. |
| R-02 | `/`, `/contact`, `/services` (FAQ section) | `components/ui/FaqList.tsx` (answer text); data in `lib/data/faq.ts` | 768 and 1440+ (77–81 chars/line) | FAQ answers run slightly over 75 characters per line. | Minor | Cap the answer width (about `max-w-[62ch]`). **Needs decision**: it changes the layout at 1280+. |
| R-03 | `/mentions-legales`, `/protection-des-donnees` | `components/sections/legal/LegalPage.tsx:10` (`max-w-[70ch]`) | 1280+ (measured 100 chars/line at 1440 and 1920) | `70ch` is wider than it looks: the text still reaches about 100 characters per line. | Minor | Lower to about `max-w-[52ch]`. **Needs decision**: changes the layout at 1280+. |
| R-04 | `/`, `/services` (shared `PageHero`) | `components/sections/shared/PageHero.tsx:34` (`h-[510px]`) | 667×375 landscape and any very short viewport | The hero image is taller than the screen. On the home page the title starts at y=519 and the button at y=718 in a 375px viewport, so the first screen shows only the image. | Minor | On short landscape screens only, cap the hero height, e.g. `[@media(max-height:500px)]:h-[calc(100svh-100px)]`. Portrait phones and desktop are unchanged. |
| R-05 | all 5 (footer) | `components/layout/Footer.tsx:53` (`-mt-1`) | below 1024 | The LinkedIn icon link sits 6px under the e-mail link (minimum 8px). | Minor | Change `-mt-1` to `lg:-mt-1`, so only the mobile footer moves (by 4px). |
| R-06 | all 5 (footer) | `components/layout/Footer.tsx:134` (mobile credit link, 166×20) and `:111` (desktop, 305×34) | all widths | The "Site conçu par Studio PWI" link is smaller than 44px tall. | Minor | Add vertical padding with an equal negative margin (`py-3 -my-3`) so the footer layout stays identical. |
| R-07 | `/` | `components/sections/home/SolutionsCarousel.tsx:182` (`h-6 w-12`) | 1024+ (carousel is not rendered below `lg`) | The carousel indicator buttons are 48×24px. | Minor | `h-11` with a negative vertical margin to keep the 24px of space they take now. No visual change at 1280+. |
| R-08 | `/services` | `components/sections/services/ServiceDetail.tsx` (title column) | about 1024–1100 | The title box (340px) is narrower than the word "communautaire" (about 370px). The text overruns its box by about 30px (no collision with the illustration) and "et" ends up alone on a line. The home page card heading overruns by 6px at 320, still inside the gutter. | Minor | **Needs decision**: widen the column or lower the `h2` clamp at `lg`; the Figma desktop width may be intentional. |
| R-09 | `/contact` | `components/sections/shared/ContactSection.tsx` (details row) | about 1024–1200 | "Zone de service" has a 3-line value, so its label sits higher than the other three labels. | Minor | **Needs decision**: top-align the row, or give the value more width. May change the desktop look. |
| R-10 | `/` | `components/sections/home/Expertise.tsx:23` | touch devices | The card hover (`hover:shadow-card-hover`, `hover:-translate-y-1.5`) is no longer wrapped in `@media (hover: hover)`, so on touch the card stays lifted after a tap. The hover wrapper was removed in the last commit. | Minor | **Needs decision**: restore `[@media(hover:hover)]:` if the removal was not intentional. |

**Count: Critical 0, Major 1, Minor 9** (R-02, R-03, R-08, R-09 and R-10 need a decision).

## Checked and passing (no finding)

- **Viewport meta**: present with `width=device-width` on all pages (probe, all pages).
- **Horizontal overflow**: none at any listed width (`npm run qa`).
- **Mobile menu**: scrolls to its last link at 320×568, 375×667, 667×375 and 768×1024 with the page locked behind it (probe).
- **Form fields**: no input, select or textarea below 16px, so no iOS zoom (probe).
- **Touch targets**: all navigation, buttons and form controls are 44px or more. The exceptions are listed above.
- **Images**: no raw `<img>`; every responsive `next/image` has a suitable `sizes`; static imports supply width and height.
- **Breakpoints**: `globals.css` uses 768/1024/1280 and `motion.css` 1024, matching Tailwind `md`/`lg`/`xl`. No breakpoint is hardcoded in TSX; JS uses `matchMedia` only for reduced motion.
- **Viewport-height units**: no `100vh`, `h-screen` or `w-screen` anywhere.
- **Fixed widths**: `Button` `min-w-[240px]` fits at 320 (288px available); the other fixed widths apply from `lg`.
- **Carousel**: not rendered below 1024. At 1024 the 410px cards fit the track. (QA excludes `.carousel-track` from its overflow check; this was checked separately.)
- **Tables/code blocks**: none on the site.

## Could not verify

- Real devices and mobile browser chrome (iOS Safari address bar). No viewport-height units are used, so the risk is low, but it was not tested on a phone.
- Touch behaviour (sticky hover, tap targets by finger). Emulated viewports only.
- Characters per line is measured on rendered text in Chrome; other browsers may wrap slightly differently.
