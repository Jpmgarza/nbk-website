// Interaction checks against a running server (default http://localhost:3100): `node scripts/qa-interactions.mjs`.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.QA_BASE_URL ?? "http://localhost:3100";
const outDir = path.join(process.cwd(), "qa/screenshots");
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const results = [];
const check = (name, ok, detail = "") => results.push(`${ok ? "OK  " : "FAIL"} ${name}${detail ? ` (${detail})` : ""}`);

// Mobile menu
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const toggle = page.getByRole("button", { name: "Ouvrir le menu" });
  await toggle.click();
  const menu = page.locator("#mobile-menu");
  check("menu mobile s’ouvre", await menu.isVisible());
  check("contenu principal inerte", await page.locator("main").evaluate((el) => el.inert === true));
  await page.screenshot({ path: path.join(outDir, "interaction-menu@390.png") });
  await page.keyboard.press("Escape");
  check("Échap ferme le menu", !(await menu.isVisible()));
  check("focus rendu au bouton", await page.getByRole("button", { name: "Ouvrir le menu" }).evaluate((el) => el === document.activeElement));
  await toggle.click();
  await menu.getByRole("link", { name: "Services", exact: true }).click();
  await page.waitForURL("**/services");
  check("lien du menu navigue et ferme", !(await menu.isVisible()));
  await page.close();
}

// Desktop services dropdown, carousel, FAQ
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const servicesButton = page.getByRole("button", { name: "Services" });
  await servicesButton.focus();
  await page.keyboard.press("Enter");
  check("menu Services au clavier", await page.locator("#services-menu").isVisible());
  await page.screenshot({ path: path.join(outDir, "interaction-dropdown@1440.png"), clip: { x: 0, y: 0, width: 1440, height: 560 } });
  await page.keyboard.press("Escape");
  check("Échap ferme le menu Services", !(await page.locator("#services-menu").isVisible()));

  await page.locator("#solutions").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /Afficher : Interprétation consécutive/ }).click();
  await page.waitForTimeout(900);
  const current = await page.locator("#solutions [aria-current=true]").getAttribute("aria-label");
  check("indicateur du carrousel", current?.includes("consécutive") ?? false, current ?? "aucun");
  await page.locator("#solutions").screenshot({ path: path.join(outDir, "interaction-carousel@1440.png") });

  const first = page.locator("#faq details").first();
  await first.locator("summary").click();
  check("FAQ s’ouvre", await first.evaluate((el) => el.open));

  // Header stays pinned and turns into the compact burger bar once scrolled, full nav back at the top
  await page.mouse.wheel(0, 1500);
  await page.waitForTimeout(600);
  const pinned = await page.locator("header").evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return { top: rect.top, height: Math.round(rect.height) };
  });
  const burger = page.getByRole("button", { name: "Ouvrir le menu" });
  const mainNav = page.getByRole("navigation", { name: "Navigation principale" });
  check(
    "header compact épinglé (burger seul)",
    pinned.top === 0 && pinned.height === 76 && (await burger.isVisible()) && !(await mainNav.isVisible()),
    `${pinned.top} / ${pinned.height}px`,
  );
  await burger.click();
  check("menu burger s’ouvre sur desktop", await page.locator("#mobile-menu").isVisible());
  await page.keyboard.press("Escape");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  check("navigation complète en haut de page", (await mainNav.isVisible()) && !(await burger.isVisible()));
  await page.close();
}

// Form validation and mission prefill
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/contact?mission=" + encodeURIComponent("Interprétation chuchotée"), { waitUntil: "networkidle" });
  const mission = await page.getByLabel("Type de mission").inputValue();
  check("mission pré-remplie depuis la page Services", mission === "Interprétation chuchotée", mission);
  await page.getByRole("button", { name: "Envoyer ma demande" }).first().click();
  const errors = await page.locator("form [id$='-error']").allTextContents();
  check("messages d’erreur affichés", errors.length >= 3, errors.join(" | "));
  check("champ invalide signalé", (await page.getByLabel("Nom et prénom").getAttribute("aria-invalid")) === "true");
  await page.locator("#formulaire").screenshot({ path: path.join(outDir, "interaction-form-errors@1440.png") });

  await page.getByLabel("Nom et prénom").fill("Test QA");
  await page.getByLabel("E-mail").fill("qa@example.com");
  await page.getByLabel("Langues concernées").selectOption("Espagnol → français");
  await page.getByLabel("Commentaire").fill("Audition prévue le mois prochain.");
  await page.getByRole("button", { name: "Envoyer ma demande" }).first().click();
  await page.waitForTimeout(1500);
  const alert = await page.locator("form [role=alert]").textContent().catch(() => null);
  const status = await page.locator("[role=status]").textContent().catch(() => null);
  check("envoi traité (production sans SMTP → message d’erreur honnête)", Boolean(alert || status), alert ?? status ?? "");
  await page.close();
}

await browser.close();
console.log(results.join("\n"));
