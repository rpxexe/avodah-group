import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const sub = await prisma.newsletter_subscribers.upsert({
      where: { email: cleanEmail },
      update: {
        active: true,
        source: source || "footer",
      },
      create: {
        email: cleanEmail,
        source: source || "footer",
        active: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: sub.id,
        message: "Subscribed to Avodah & Khen market intelligence and advisory dispatches.",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[API_NEWSLETTER_ERROR]", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: "Failed to subscribe to intelligence reports.", details: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscriberCount = await prisma.newsletter_subscribers.count({
      where: { active: true },
    });

    return NextResponse.json({
      success: true,
      subscriberCount,
    });
  } catch (error: unknown) {
    console.error("[API_NEWSLETTER_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch newsletter metrics." },
      { status: 500 }
    );
  }
}
