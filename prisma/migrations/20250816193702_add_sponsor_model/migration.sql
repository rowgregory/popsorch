-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "externalLink" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);
