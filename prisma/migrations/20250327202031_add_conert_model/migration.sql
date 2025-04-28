-- CreateTable
CREATE TABLE "Concert" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "locations" JSONB NOT NULL,
    "stats" JSONB NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageFilename" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "videoFilename" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Concert_pkey" PRIMARY KEY ("id")
);
