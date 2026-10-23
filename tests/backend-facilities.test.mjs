import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

describe("Neon Database & Prisma Backend Integration Suite", () => {
  let pool;
  let prisma;

  before(async () => {
    assert.ok(process.env.DATABASE_URL, "DATABASE_URL must be defined in environment");
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter });
  });

  after(async () => {
    if (prisma) await prisma.$disconnect();
    if (pool) await pool.end();
  });

  test("Database connection is live and responds to raw ping query", async () => {
    const result = await prisma.$queryRaw`SELECT 1 as ping`;
    assert.ok(Array.isArray(result));
    assert.equal(Number(result[0].ping), 1);
  });

  test("Active Neon records and table schemas are healthy and queryable", async () => {
    const contactsCount = await prisma.contacts.count();
    const careersCount = await prisma.career_applications.count();

    assert.ok(typeof contactsCount === "number" && contactsCount >= 0, `Expected valid contacts count, found: ${contactsCount}`);
    assert.ok(typeof careersCount === "number" && careersCount >= 0, `Expected valid career applications count, found: ${careersCount}`);
  });

  test("Contacts facility: inserts new consultation inquiry and generates reference code", async () => {
    const testEmail = `test.inquiry.${Date.now()}@avodahgroup.co`;
    const refCode = `AK-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newContact = await prisma.contacts.create({
      data: {
        name: "Test Developer Principal",
        work_email: testEmail,
        city: "Bandra Kurla Complex (BKC)",
        phone: "+91 98765 00000",
        service: "Sole Selling Developer Mandate",
        organization: "Apex Real Estate Group",
        message: "Automated test advisory consultation inquiry.",
        reference_code: refCode,
        source: "test_suite",
        status: "PENDING",
      },
    });

    assert.ok(newContact.id > 0);
    assert.equal(newContact.work_email, testEmail);
    assert.equal(newContact.reference_code, refCode);

    // Clean up test record
    await prisma.contacts.delete({ where: { id: newContact.id } });
  });

  test("Waitlists facility: supports PropTech and FinTech early access registration", async () => {
    const testEmail = `test.waitlist.${Date.now()}@avodahgroup.co`;

    const proptechEntry = await prisma.waitlists.create({
      data: {
        email: testEmail,
        platform_type: "proptech",
        interest: "early_access",
        status: "PENDING",
      },
    });

    assert.ok(proptechEntry.id > 0);
    assert.equal(proptechEntry.platform_type, "proptech");

    // Clean up
    await prisma.waitlists.delete({ where: { id: proptechEntry.id } });
  });

  test("Career Applications facility: records confidential applicant dossier", async () => {
    const testEmail = `test.applicant.${Date.now()}@avodahgroup.co`;
    const refCode = `AVK-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const application = await prisma.career_applications.create({
      data: {
        first_name: "Automated",
        last_name: "Candidate",
        contact_number: "+91 99999 88888",
        email_address: testEmail,
        department: "PropTech & Engineering",
        job_applied_for: "Lead PropTech Systems Architect",
        message: "Automated test application dossier.",
        reference_code: refCode,
        status: "SUBMITTED",
      },
    });

    assert.ok(application.id > 0);
    assert.equal(application.reference_code, refCode);

    // Clean up
    await prisma.career_applications.delete({ where: { id: application.id } });
  });

  test("Newsletter Subscribers facility: records market intelligence subscription", async () => {
    const testEmail = `test.subscriber.${Date.now()}@avodahgroup.co`;

    const subscriber = await prisma.newsletter_subscribers.upsert({
      where: { email: testEmail },
      update: { active: true },
      create: {
        email: testEmail,
        source: "test_suite",
        active: true,
      },
    });

    assert.ok(subscriber.id > 0);
    assert.equal(subscriber.email, testEmail);

    // Clean up
    await prisma.newsletter_subscribers.delete({ where: { id: subscriber.id } });
  });

  test("Prisma Singleton and schema files exist with proper config", () => {
    const clientPath = path.resolve("src/lib/prisma.ts");
    const schemaPath = path.resolve("prisma/schema.prisma");
    const configPath = path.resolve("prisma.config.ts");

    assert.ok(fs.existsSync(clientPath), "src/lib/prisma.ts must exist");
    assert.ok(fs.existsSync(schemaPath), "prisma/schema.prisma must exist");
    assert.ok(fs.existsSync(configPath), "prisma.config.ts must exist");

    const schemaContent = fs.readFileSync(schemaPath, "utf-8");
    assert.match(schemaContent, /model contacts/);
    assert.match(schemaContent, /model career_applications/);
    assert.match(schemaContent, /model waitlists/);
    assert.match(schemaContent, /model newsletter_subscribers/);
  });

  test("All Backend API route handlers exist", () => {
    const contactRoute = path.resolve("src/app/api/contact/route.ts");
    const waitlistRoute = path.resolve("src/app/api/waitlist/route.ts");
    const careersRoute = path.resolve("src/app/api/careers/route.ts");
    const newsletterRoute = path.resolve("src/app/api/newsletter/route.ts");
    const healthRoute = path.resolve("src/app/api/health/route.ts");

    assert.ok(fs.existsSync(contactRoute), "src/app/api/contact/route.ts must exist");
    assert.ok(fs.existsSync(waitlistRoute), "src/app/api/waitlist/route.ts must exist");
    assert.ok(fs.existsSync(careersRoute), "src/app/api/careers/route.ts must exist");
    assert.ok(fs.existsSync(newsletterRoute), "src/app/api/newsletter/route.ts must exist");
    assert.ok(fs.existsSync(healthRoute), "src/app/api/health/route.ts must exist");
  });
});
