import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const require = createRequire(
  "C:/Users/mugen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json",
);
const { chromium } = require("playwright");
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
await mkdir("artifacts", { recursive: true });
const results = [];
const base = process.env.CHECK_BASE_URL || "http://localhost:3000";
try {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 1024, height: 900 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
    { width: 320, height: 740 },
  ]) {
    const context = await browser.newContext({
      viewport,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of [
      "/",
      "/projects",
      "/projects/multi-uav",
      "/projects/remote-4g-drone",
      "/projects/mugen-no-sekai",
      "/30-projects",
      "/about",
    ]) {
      const response = await page.goto(`${base}${route}`, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200, route);
      const metrics = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
        h1: document.querySelectorAll("h1").length,
        active: document
          .querySelector("nav a[aria-current]")
          ?.getAttribute("href"),
        motion: getComputedStyle(
          document.querySelector(".telemetry-signal") || document.body,
        ).animationName,
      }));
      if (metrics.scroll > metrics.width)
        console.log(
          await page.evaluate(() =>
            [...document.querySelectorAll("body *")]
              .filter((el) => el.getBoundingClientRect().right > innerWidth)
              .map((el) => ({
                tag: el.tagName,
                class: el.className,
                right: el.getBoundingClientRect().right,
                text: el.textContent.slice(0, 80),
              })),
          ),
        );
      assert.ok(
        metrics.scroll <= metrics.width,
        `Overflow ${route} at ${viewport.width}: ${metrics.scroll}`,
      );
      assert.equal(metrics.h1, 1);
      assert.equal(
        metrics.active,
        route.startsWith("/projects/") ? "/projects" : route,
      );
      assert.equal(metrics.motion, "none");
      const audit = await page.evaluate(() => {
        const elements = [...document.querySelectorAll("body *")];
        const headings = elements.filter(el => /^H[1-6]$/.test(el.tagName)).map(el => ({ level: Number(el.tagName[1]), text: el.textContent }));
        const unnamed = elements.filter(el => el.matches("a,button") && !el.textContent.trim() && !el.getAttribute("aria-label") && !el.getAttribute("aria-labelledby")).length;
        const animated = elements.filter(el => getComputedStyle(el).animationName !== "none").map(el => el.className);
        const insecure = [...document.querySelectorAll('a[target="_blank"]')].filter(el => !/noreferrer|noopener/.test(el.rel)).length;
        return { headings, unnamed, animated, insecure, main: document.querySelectorAll("main").length };
      });
      assert.equal(audit.main, 1);
      assert.equal(audit.unnamed, 0);
      assert.equal(audit.insecure, 0);
      assert.deepEqual(audit.animated, []);
      for (let i = 1; i < audit.headings.length; i++) assert.ok(audit.headings[i].level <= audit.headings[i-1].level + 1, "Heading jump " + route + ": " + audit.headings[i].text);
      // Fresh navigation: keyboard-only skip link must be hidden, then focus main.
      await page.evaluate(() => { document.activeElement?.blur(); scrollTo(0,0); });
      assert.ok(await page.locator(".skip-link").evaluate(el => el.getBoundingClientRect().bottom <= 0));
      await page.keyboard.press("Tab");
      assert.equal(await page.locator(".skip-link").evaluate(el => el === document.activeElement), true);
      assert.ok(await page.locator(".skip-link").evaluate(el => el.getBoundingClientRect().top >= 0));
      await page.keyboard.press("Enter");
      assert.equal(await page.locator("main").evaluate(el => el === document.activeElement), true);
      await page.keyboard.press("Tab");
      assert.ok(await page.evaluate(() => document.querySelector("main").contains(document.activeElement)));
      await page.evaluate(() => { document.activeElement?.blur(); scrollTo(0,0); });

      if (route === "/30-projects") {
        assert.equal(
          await page.locator(".challenge-card:not(.locked)").count(),
          9,
        );
        assert.equal(await page.locator(".challenge-card.locked").count(), 9);
        assert.equal(await page.locator(".data-notice").count(), 0);
      }
      results.push({ route, viewport: viewport.width, ...metrics });
      await page.evaluate(() => document.activeElement?.blur());
      if (viewport.width !== 320)
        await page.screenshot({
          path: `artifacts/${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${viewport.width}.png`,
          fullPage: true,
        });
    }
    await page.goto(base);
    await page.getByRole("link", { name: "Explore my work" }).click();
    await page.waitForURL("**/projects");
    await page.getByRole("link", { name: "30 Projects", exact: true }).click();
    await page.waitForURL("**/30-projects");
    await page.getByRole("link", { name: "Explore the portfolio" }).click();
    await page.waitForURL(base + "/");
    await page.keyboard.press("Tab");
    assert.equal(errors.length, 0, errors.join("\n"));
    await context.close();
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto(base);
  await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    "Overflow at 200% text",
  );
  await page.screenshot({
    path: "artifacts/home-200-percent.png",
    fullPage: true,
  });
  await context.close();
  await writeFile(
    "artifacts/browser-checks.json",
    JSON.stringify(results, null, 2),
  );
  console.log(
    `PASS: ${results.length} route/viewport checks, navigation, reduced motion, 200% text and no client errors.`,
  );
} finally {
  await browser.close();
}
