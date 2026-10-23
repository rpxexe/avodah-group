import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      firstName,
      lastName,
      email,
      phone,
      department,
      roleTitle,
      experience,
      currentCompany,
      noticePeriod,
      linkedinUrl,
      message,
      coverNote,
    } = body;

    // Resolve first name and last name
    let resolvedFirstName = (firstName || "").trim();
    let resolvedLastName = (lastName || "").trim();

    if (!resolvedFirstName && fullName) {
      const parts = fullName.trim().split(" ");
      resolvedFirstName = parts[0] || "Applicant";
      resolvedLastName = parts.slice(1).join(" ") || parts[0];
    }

    if (!resolvedFirstName) {
      return NextResponse.json(
        { success: false, error: "Applicant name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const contactNumber = (phone || "").trim();
    if (!contactNumber) {
      return NextResponse.json(
        { success: false, error: "Contact phone number is required." },
        { status: 400 }
      );
    }

    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `AVK-${year}-${randomSuffix}`;

    const application = await prisma.career_applications.create({
      data: {
        first_name: resolvedFirstName,
        last_name: resolvedLastName || resolvedFirstName,
        contact_number: contactNumber,
        email_address: email.trim().toLowerCase(),
        department: (department || "General Advisory").trim(),
        job_applied_for: (roleTitle || "Spontaneous Application").trim(),
        message: (message || coverNote || "Submitted via Avodah & Khen career portal").trim(),
        reference_code: referenceCode,
        experience: experience?.trim() || null,
        current_company: currentCompany?.trim() || null,
        linkedin_url: linkedinUrl?.trim() || null,
        notice_period: noticePeriod?.trim() || null,
        status: "SUBMITTED",
      },
    });

    return NextResponse.json(
      {
        success: true,
        referenceCode: application.reference_code,
        id: application.id,
        message: "Confidential dossier received. An advisory partner will review your credentials.",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[API_CAREERS_ERROR]", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: "Failed to submit career dossier.", details: message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const department = searchParams.get("department");

    const applications = await prisma.career_applications.findMany({
      where: department ? { department: { contains: department, mode: "insensitive" } } : undefined,
      orderBy: { created_at: "desc" },
      take: 50,
    });

    const totalApplications = await prisma.career_applications.count();

    return NextResponse.json({
      success: true,
      totalApplications,
      applications,
    });
  } catch (error: unknown) {
    console.error("[API_CAREERS_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve career applications." },
      { status: 500 }
    );
  }
}
