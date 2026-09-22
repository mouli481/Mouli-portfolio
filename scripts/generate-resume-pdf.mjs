import { chromium } from "@playwright/test";

const SITE_URL = process.env.RESUME_SOURCE_URL ?? "http://localhost:3000";
const OUTPUT_PATH = "public/resume.pdf";

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 1800 } });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${SITE_URL}/resume`, { waitUntil: "load", timeout: 120_000 });
  await page.locator("article.resume-document").waitFor({ state: "visible" });
  await page.waitForTimeout(1500);
  await page.emulateMedia({ media: "print", reducedMotion: "reduce" });
  await page.pdf({
    path: OUTPUT_PATH,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    scale: 0.86,
  });
  console.log(`Resume PDF written to ${OUTPUT_PATH}`);
} finally {
  await browser.close();
}
