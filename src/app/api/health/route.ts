import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const startTime = Date.now();
  try {
    // Ping direct Neon connection via raw query
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - startTime;

    const [contactsCount, careersCount, waitlistsCount, subscribersCount] = await Promise.all([
      prisma.contacts.count().catch(() => 0),
      prisma.career_applications.count().catch(() => 0),
      prisma.waitlists.count().catch(() => 0),
      prisma.newsletter_subscribers.count().catch(() => 0),
    ]);

    return NextResponse.json({
      status: "healthy",
      database: "Neon PostgreSQL",
      connection: "connected",
      latencyMs,
      metrics: {
        contacts: contactsCount,
        careerApplications: careersCount,
        waitlistReservations: waitlistsCount,
        newsletterSubscribers: subscribersCount,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const latencyMs = Date.now() - startTime;
    console.error("[HEALTH_CHECK_ERROR]", error);
    const message = error instanceof Error ? error.message : "Database connection failed";
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "Neon PostgreSQL",
        connection: "disconnected",
        latencyMs,
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
