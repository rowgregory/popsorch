/*
  Warnings:

  - You are about to drop the column `clicks` on the `Sponsor` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Sponsor` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Sponsor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sponsor" DROP COLUMN "clicks",
DROP COLUMN "color",
DROP COLUMN "description";
