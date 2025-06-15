-- CreateTable
CREATE TABLE "HeaderButton" (
    "id" TEXT NOT NULL,
    "animation" TEXT NOT NULL DEFAULT 'scale',
    "backgroundColor" TEXT NOT NULL,
    "fontColor" TEXT NOT NULL,
    "text" TEXT NOT NULL DEFAULT 'Get Started',
    "linkType" TEXT NOT NULL DEFAULT 'internal',
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeaderButton_pkey" PRIMARY KEY ("id")
);
