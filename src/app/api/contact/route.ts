import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      organization,
      service,
      city,
      microMarket,
      message,
      source,
    } = body;

    // Basic Validation
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid corporate or personal email is required." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Contact phone number is required." },
        { status: 400 }
      );
    }

    if (!service || typeof service !== "string" || !service.trim()) {
      return NextResponse.json(
        { success: false, error: "Service selection is required." },
        { status: 400 }
      );
    }

    // Generate unique reference code
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `AK-${year}-${randomSuffix}`;

    // Determine city / market
    const resolvedCity = (city || microMarket || "Mumbai").trim();

    // Save to Neon DB contacts table
    const contact = await prisma.contacts.create({
      data: {
        name: fullName.trim(),
        work_email: email.trim().toLowerCase(),
        city: resolvedCity,
        phone: phone.trim(),
        service: service.trim(),
        organization: organization?.trim() || null,
        message: message?.trim() || null,
        reference_code: referenceCode,
        source: source?.trim() || "homepage",
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        referenceCode: contact.reference_code,
        id: contact.id,
        message: "Your advisory consultation request has been recorded in our institutional registry.",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[API_CONTACT_ERROR]", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: "Failed to record inquiry. Please try again.", details: message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);
    const service = searchParams.get("service");

    const contactsList = await prisma.contacts.findMany({
      where: service ? { service: { contains: service, mode: "insensitive" } } : undefined,
      take: limit,
      orderBy: { created_at: "desc" },
    });

    const totalCount = await prisma.contacts.count();

    return NextResponse.json({
      success: true,
      totalCount,
      contacts: contactsList,
    });
  } catch (error: unknown) {
    console.error("[API_CONTACT_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries." },
      { status: 500 }
    );
  }
}
