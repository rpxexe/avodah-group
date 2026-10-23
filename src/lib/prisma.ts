import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

function getConnectionString(): string {
  return process.env.DATABASE_URL || "";
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
  activeUrl: string | undefined;
};

const currentUrl = getConnectionString();

// If the database connection URL changes or needs reinitialization, cleanly cycle pool
if (globalForPrisma.activeUrl !== currentUrl) {
  if (globalForPrisma.pool) {
    globalForPrisma.pool.end().catch(() => {});
  }
  globalForPrisma.pool = undefined;
  globalForPrisma.prisma = undefined;
  globalForPrisma.activeUrl = currentUrl;
}

const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString: currentUrl,
    ssl: { rejectUnauthorized: false },
    max: 10,
  });

globalForPrisma.pool = pool;

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

globalForPrisma.prisma = prisma;

export default prisma;
