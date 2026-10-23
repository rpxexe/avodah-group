import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Get in Touch & Advisory Contact System", () => {
  const contactPagePath = path.resolve("src/app/contact/page.tsx");
  const getInTouchPagePath = path.resolve("src/app/get-in-touch/page.tsx");
  const contactClientPath = path.resolve("src/components/contact/ContactClient.tsx");
  const navPath = path.resolve("src/components/Navigation.tsx");
  const footerPath = path.resolve("src/components/Footer.tsx");

  test("Contact page route exists and integrates layout components and metadata", () => {
    assert.equal(fs.existsSync(contactPagePath), true, "src/app/contact/page.tsx must exist");
    const content = fs.readFileSync(contactPagePath, "utf-8");
    assert.match(content, /export\s+const\s+metadata/, "Contact page must export metadata");
    assert.match(content, /ContactClient/, "Contact page must render ContactClient");
    assert.match(content, /Navigation/, "Contact page must render Navigation");
    assert.match(content, /Footer/, "Contact page must render Footer");
    assert.match(content, /CustomCursor/, "Contact page must render CustomCursor");
    assert.match(content, /ThreeArchitecturalBackground/, "Contact page must render ThreeArchitecturalBackground");
    assert.match(content, /SparkleBackground/, "Contact page must render SparkleBackground");
  });

  test("Get in Touch route alias exists and exports contact page", () => {
    assert.equal(fs.existsSync(getInTouchPagePath), true, "src/app/get-in-touch/page.tsx must exist");
    const content = fs.readFileSync(getInTouchPagePath, "utf-8");
    assert.match(content, /export\s*\{\s*default,\s*metadata\s*\}\s*from\s*["']@\/app\/contact\/page["']/, "Must re-export contact page and metadata");
  });

  test("ContactClient includes interactive consultation form, advisory pillars and micro-markets", () => {
    assert.equal(fs.existsSync(contactClientPath), true, "ContactClient.tsx must exist");
    const content = fs.readFileSync(contactClientPath, "utf-8");
    assert.match(content, /Initiate a/i, "Must have headline");
    assert.match(content, /Strategic/i, "Must have styled emphasis");
    assert.match(content, /Developer Mandates/i, "Must include Developer Mandates pillar");
    assert.match(content, /Commercial Leasing/i, "Must include Commercial Leasing pillar");
    assert.match(content, /Investment & Capital/i, "Must include Investment pillar");
    assert.match(content, /Bandra Kurla Complex/i, "Must reference Mumbai micro-markets");
    assert.match(content, /Card3DTilt/, "Must use Card3DTilt container for luxury form");
    assert.match(content, /handleSubmit/, "Must have interactive form submission handler");
  });

  test("Navigation and Footer link Get in Touch directly to /contact", () => {
    const navContent = fs.readFileSync(navPath, "utf-8");
    assert.match(navContent, /href=["']\/contact["']/, "Navigation must link to /contact");

    const footerContent = fs.readFileSync(footerPath, "utf-8");
    assert.match(footerContent, /href=["']\/contact["']/, "Footer must link to /contact");
  });
});
