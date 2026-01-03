/*
  Warnings:

  - You are about to drop the `FeatureToggleCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SeasonPackageBanner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FeatureToggleCard";

-- DropTable
DROP TABLE "SeasonPackageBanner";

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "value" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL DEFAULT 'boolean',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");
