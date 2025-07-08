-- CreateTable
CREATE TABLE "FeatureToggleCard" (
    "id" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "isLive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeatureToggleCard_pkey" PRIMARY KEY ("id")
);
