/*
  Warnings:

  - You are about to drop the column `videoFilename` on the `Concert` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Concert` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Concert" DROP COLUMN "videoFilename",
DROP COLUMN "videoUrl",
ADD COLUMN     "pressRelease" TEXT NOT NULL DEFAULT '';
