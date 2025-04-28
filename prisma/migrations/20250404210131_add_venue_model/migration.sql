-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "accessibility" TEXT NOT NULL,
    "immersiveEnvironment" TEXT NOT NULL,
    "parking" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imageFilename" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);
