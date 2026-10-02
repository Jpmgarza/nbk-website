// Visual and technical QA against a running server (default http://localhost:3100).
// Usage: npm run build && npx next start -p 3100, then `npm run qa` (optionally `npm run qa -- /services 390`).
import { mkdir } from "node:fs/promises";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const BASE = process.env.QA_BASE_URL ?? "http://localhost:3100";
const [onlyPath, onlyWidth] = process.argv.slice(2);
const PAGES = onlyPath ? [onlyPath] : ["/", "/services", "/contact", "/mentions-legales", "/protection-des-donnees"];
const VIEWPORTS = onlyWidth
  ? [{ width: Number(onlyWidth), height: Number(onlyWidth) >= 1024 ? 900 : 844 }]
  : [1920, 1440, 1024, 768, 390, 375, 360, 320]
      .map((width) => ({ width, height: width >= 1024 ? 900 : 844 }))
      .concat([{ width: 667, height: 375 }]);
const outDir = path.join(process.cwd(), "qa/screenshots");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const problems = [];
const links = new Set();

for (const pagePath of PAGES) {
  for (const { width, height } of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce" });
    const page = await context.newPage();
    const tag = `${pagePath === "/" ? "home" : pagePath.slice(1)}@${width}${height === 375 ? "x375" : ""}`;
    page.on("console", (msg) => msg.type() === "error" && problems.push(`${tag} console: ${msg.text()}`));
    page.on("pageerror", (err) => problems.push(`${tag} pageerror: ${err.message}`));
    page.on("response", (res) => res.status() >= 400 && problems.push(`${tag} HTTP ${res.status()} ${res.url()}`));

    await page.goto(BASE + pagePath, { waitUntil: "networkidle" });
    // Load every lazy image before the full-page capture.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");

    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const offenders = [];
      document.querySelectorAll("body *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width && r.right > docWidth + 1 && !el.closest(".carousel-track") && getComputedStyle(el).position !== "fixed") {
          offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)}`);
        }
      });
      return { scroll: document.documentElement.scrollWidth > docWidth, offenders: offenders.slice(0, 5) };
    });
    if (overflow.scroll || overflow.offenders.length) problems.push(`${tag} overflow: ${JSON.stringify(overflow)}`);

    const smallText = await page.evaluate(() => {
      const found = new Set();
      document.querySelectorAll("body *").forEach((el) => {
        if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || el.closest(".sr-only")) return;
        if (parseFloat(style.fontSize) < 12) found.add(`${el.tagName.toLowerCase()} ${style.fontSize}`);
      });
      return [...found];
    });
    if (smallText.length) problems.push(`${tag} text < 12px: ${smallText.join(", ")}`);

    const hrefs = await page.locator("a[href]").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    hrefs.forEach((href) => links.add(href));

    if (width === 1440 || width === 390) {
      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      axe.violations.forEach((v) =>
        problems.push(`${tag} axe ${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`),
      );
    }

    await page.screenshot({ path: path.join(outDir, `${tag}.png`), fullPage: true });
    await context.close();
  }
}

for (const href of links) {
  if (!href.startsWith("/") || href.startsWith("//")) continue;
  const url = new URL(href, BASE);
  const res = await fetch(url.origin + url.pathname);
  if (!res.ok) problems.push(`broken link ${href} -> ${res.status}`);
  if (url.hash) {
    const html = await (await fetch(url.origin + url.pathname)).text();
    if (!html.includes(`id="${url.hash.slice(1)}"`)) problems.push(`missing anchor ${href}`);
  }
}

await browser.close();
console.log(problems.length ? problems.join("\n") : "QA: aucun problème détecté");
console.log(`Captures : ${outDir}`);
