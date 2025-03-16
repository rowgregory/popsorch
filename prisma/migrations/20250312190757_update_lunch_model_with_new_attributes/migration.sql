/*
  Warnings:

  - You are about to drop the column `lunchDate` on the `Lunch` table. All the data in the column will be lost.
  - You are about to drop the column `patronEmails` on the `Lunch` table. All the data in the column will be lost.
  - Added the required column `description` to the `Lunch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `host` to the `Lunch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lunchLocation` to the `Lunch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lunchTime` to the `Lunch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patrons` to the `Lunch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patronsTotal` to the `Lunch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lunch" DROP COLUMN "lunchDate",
DROP COLUMN "patronEmails",
ADD COLUMN     "description" VARCHAR(250) NOT NULL,
ADD COLUMN     "host" VARCHAR(50) NOT NULL,
ADD COLUMN     "isFilled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lunchLocation" VARCHAR(250) NOT NULL,
ADD COLUMN     "lunchTime" VARCHAR(150) NOT NULL,
ADD COLUMN     "patrons" JSONB NOT NULL,
ADD COLUMN     "patronsTotal" VARCHAR(50) NOT NULL;
