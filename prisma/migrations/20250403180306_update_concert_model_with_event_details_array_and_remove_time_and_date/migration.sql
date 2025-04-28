/*
  Warnings:

  - You are about to drop the column `date` on the `Concert` table. All the data in the column will be lost.
  - You are about to drop the column `locations` on the `Concert` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Concert` table. All the data in the column will be lost.
  - Added the required column `eventDetails` to the `Concert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Concert" DROP COLUMN "date",
DROP COLUMN "locations",
DROP COLUMN "time",
ADD COLUMN     "eventDetails" JSONB NOT NULL;
