-- CreateTable
CREATE TABLE "AppMetric" (
    "id" TEXT NOT NULL,
    "desktopCount" INTEGER NOT NULL DEFAULT 0,
    "mobileCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppMetric_pkey" PRIMARY KEY ("id")
);
