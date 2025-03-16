/*
  Warnings:

  - Changed the type of `patronsTotal` on the `Lunch` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Lunch" DROP COLUMN "patronsTotal",
ADD COLUMN     "patronsTotal" INTEGER NOT NULL;
