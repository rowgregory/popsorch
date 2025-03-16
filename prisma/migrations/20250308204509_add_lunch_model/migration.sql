-- CreateTable
CREATE TABLE "Lunch" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "patronCount" INTEGER NOT NULL DEFAULT 6,
    "patronEmails" JSONB NOT NULL,
    "lunchDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lunch_pkey" PRIMARY KEY ("id")
);
