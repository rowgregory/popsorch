/*
  Warnings:

  - Made the column `imageUrl` on table `Concert` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageFilename` on table `Concert` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `Venue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageFilename` on table `Venue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Concert" ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "imageFilename" SET NOT NULL;

-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "imageFilename" SET NOT NULL;
