-- CreateTable
CREATE TABLE "career_applications" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "contact_number" VARCHAR(20) NOT NULL,
    "email_address" VARCHAR(255) NOT NULL,
    "department" VARCHAR(50) NOT NULL,
    "job_applied_for" VARCHAR(150) NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reference_code" VARCHAR(50),
    "experience" VARCHAR(50),
    "current_company" VARCHAR(150),
    "linkedin_url" VARCHAR(255),
    "notice_period" VARCHAR(50),
    "status" VARCHAR(50) DEFAULT 'SUBMITTED',

    CONSTRAINT "career_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "work_email" VARCHAR(255) NOT NULL,
    "city" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" VARCHAR(50),
    "service" VARCHAR(150),
    "organization" VARCHAR(150),
    "message" TEXT,
    "reference_code" VARCHAR(50),
    "source" VARCHAR(50) DEFAULT 'homepage',
    "status" VARCHAR(50) DEFAULT 'PENDING',

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waitlists" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "platform_type" VARCHAR(50) NOT NULL,
    "interest" VARCHAR(100),
    "status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waitlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletter_subscribers" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "source" VARCHAR(50) NOT NULL DEFAULT 'footer',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "career_applications_email_address_idx" ON "career_applications"("email_address");

-- CreateIndex
CREATE INDEX "career_applications_department_idx" ON "career_applications"("department");

-- CreateIndex
CREATE INDEX "contacts_work_email_idx" ON "contacts"("work_email");

-- CreateIndex
CREATE INDEX "contacts_service_idx" ON "contacts"("service");

-- CreateIndex
CREATE INDEX "waitlists_email_idx" ON "waitlists"("email");

-- CreateIndex
CREATE INDEX "waitlists_platform_type_idx" ON "waitlists"("platform_type");

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscribers_email_key" ON "newsletter_subscribers"("email");

-- CreateIndex
CREATE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers"("email");
