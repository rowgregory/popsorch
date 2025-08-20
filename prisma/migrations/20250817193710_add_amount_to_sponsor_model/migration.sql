/*
  Warnings:

  - Added the required column `amount` to the `Sponsor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Sponsor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Sponsor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sponsor" ADD COLUMN     "amount" TEXT NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "level" TEXT NOT NULL;
