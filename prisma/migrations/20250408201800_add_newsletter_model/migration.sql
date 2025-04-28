-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "isOption1" BOOLEAN NOT NULL DEFAULT false,
    "isOption2" BOOLEAN NOT NULL DEFAULT false,
    "isOption3" BOOLEAN NOT NULL DEFAULT false,
    "isOption4" BOOLEAN NOT NULL DEFAULT false,
    "agreedToPrivacyStatement" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_email_key" ON "Newsletter"("email");
