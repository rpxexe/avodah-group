import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, type, interest } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const platformType =
      type === "fintech" ? "fintech" : type === "voicebot" ? "voicebot" : "proptech";
    const cleanEmail = email.trim().toLowerCase();

    // Find existing or create
    const existing = await prisma.waitlists.findFirst({
      where: {
        email: cleanEmail,
        platform_type: platformType,
      },
    });

    let entry;
    if (existing) {
      entry = await prisma.waitlists.update({
        where: { id: existing.id },
        data: {
          interest: interest || existing.interest || "early_access",
          status: "PENDING",
        },
      });
    } else {
      entry = await prisma.waitlists.create({
        data: {
          email: cleanEmail,
          platform_type: platformType,
          interest: interest || "early_access",
          status: "PENDING",
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        id: entry.id,
        type: entry.platform_type,
        message: `Priority whitelist reservation confirmed for ${platformType.toUpperCase()}.`,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[API_WAITLIST_ERROR]", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: "Failed to join early access list.", details: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [proptechCount, fintechCount, totalCount] = await Promise.all([
      prisma.waitlists.count({ where: { platform_type: "proptech" } }),
      prisma.waitlists.count({ where: { platform_type: "fintech" } }),
      prisma.waitlists.count(),
    ]);

    return NextResponse.json({
      success: true,
      totalCount,
      stats: {
        proptech: proptechCount,
        fintech: fintechCount,
      },
    });
  } catch (error: unknown) {
    console.error("[API_WAITLIST_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve waitlist statistics." },
      { status: 500 }
    );
  }
}
