-- CreateTable
CREATE TABLE "SeasonPackageBanner" (
    "id" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeasonPackageBanner_pkey" PRIMARY KEY ("id")
);
