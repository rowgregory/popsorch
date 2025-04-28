/*
  Warnings:

  - You are about to drop the column `stats` on the `Concert` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Concert" DROP COLUMN "stats",
ADD COLUMN     "externalLink" TEXT NOT NULL DEFAULT '';
