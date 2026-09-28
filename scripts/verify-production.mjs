import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const require = createRequire("C:/Users/mugen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json");
const { chromium } = require("playwright");
const base = process.env.CHECK_BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const routes = ["/", "/projects", "/projects/multi-uav", "/projects/remote-4g-drone", "/projects/mugen-no-sekai", "/30-projects", "/about"];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const issues = [];
  page.on("pageerror", e => issues.push(e.message));
  page.on("console", m => { if (["error", "warning"].includes(m.type())) issues.push(m.text()); });
  const report = [];
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const metadata = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      ogTitle: document.querySelector('meta[property="og:title"]')?.content,
      ogDescription: document.querySelector('meta[property="og:description"]')?.content,
      ogImage: document.querySelector('meta[property="og:image"]')?.content,
      twitter: document.querySelector('meta[name="twitter:card"]')?.content,
      robots: document.querySelector('meta[name="robots"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      links: [...document.querySelectorAll('a[href^="/"]')].map(el => el.getAttribute("href").split("#")[0]),
    }));
    assert.ok(metadata.title.includes("Roman Quintero"));
    assert.equal(metadata.description, metadata.ogDescription);
    assert.equal(metadata.title, metadata.ogTitle);
    assert.equal(metadata.twitter, "summary_large_image");
    assert.ok(metadata.ogImage);
    const image = await page.request.get(base + new URL(metadata.ogImage).pathname);
    assert.equal(image.status(), 200);
    assert.ok(image.headers()["content-type"].includes("image/png"));
    for (const href of new Set(metadata.links)) assert.equal((await page.request.get(base + href)).status(), 200, href);
    report.push({route, ...metadata});
  }
  await page.goto(base + "/projects");
  assert.equal(await page.getByText("FEED PLACEHOLDER", {exact:true}).count(), 0);
  assert.equal(await page.getByText("SAMPLE ARM STATE", {exact:true}).count(), 0);
  assert.equal(await page.locator(".mission-readout").getByText("DEMO TIME", {exact:true}).count(), 1);
  const before = await page.locator(".showcase-uav").first().evaluate(el => getComputedStyle(el).offsetDistance);
  await page.waitForTimeout(1100);
  const after = await page.locator(".showcase-uav").first().evaluate(el => getComputedStyle(el).offsetDistance);
  assert.notEqual(before, after, "Normal UAV motion");
  await page.goto(base + "/30-projects");
  assert.equal(await page.locator(".awaiting-release").count(), 1);
  assert.equal(await page.locator(".awaiting-release .challenge-number").textContent(), "11");
  assert.notEqual(await page.locator(".awaiting-release .restricted-pattern").evaluate(el => getComputedStyle(el,"::after").animationName), "none");
  await page.emulateMedia({reducedMotion:"reduce"});
  assert.equal(await page.locator(".awaiting-release .restricted-pattern").evaluate(el => getComputedStyle(el,"::after").animationName), "none");
  assert.equal(await page.getByText("[ LOCKED ]", {exact:true}).count(), 1);
  assert.equal((await page.request.get(base + "/projects/unknown-project")).status(), 404);
  const cv = await page.request.get(base + "/Roman_Quintero_Royo_CV_2026.pdf");
  assert.equal(cv.status(), 200);
  assert.equal(createHash("sha256").update(await cv.body()).digest("hex"), createHash("sha256").update(await readFile("public/Roman_Quintero_Royo_CV_2026.pdf")).digest("hex"));
  const robots = await page.request.get(base + "/robots.txt");
  const sitemap = await page.request.get(base + "/sitemap.xml");
  assert.equal(robots.status(), 200); assert.equal(sitemap.status(), 200);
  if (report[0].canonical) {
    const origin = new URL(report[0].canonical).origin;
    assert.ok((await robots.text()).includes("Allow: /"));
    assert.ok((await robots.text()).includes(origin + "/sitemap.xml"));
    assert.equal(((await sitemap.text()).match(/<loc>/g) || []).length, 7);
    for (const entry of report) {
      assert.equal(entry.canonical, new URL(entry.route, origin).href);
      assert.equal(new URL(entry.ogImage).origin, origin);
    }
  } else {
    assert.ok((await robots.text()).includes("Disallow: /"), "Unconfigured origin must not be indexed");
    assert.ok(!(await sitemap.text()).includes("<loc>"), "No invented sitemap origins");
  }
  assert.deepEqual(issues, []);
  await writeFile("artifacts/production-smoke.json", JSON.stringify(report,null,2));
  console.log("PASS: page/social metadata, OG image, internal URLs, CV, 404, motion modes, next-release scan, sealed Level III and no browser console errors/warnings.");
} finally { await browser.close(); }
