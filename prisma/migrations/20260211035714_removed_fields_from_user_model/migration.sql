/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isSuperUser` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isSupporter` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `securityAnswerHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `securityQuestion` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AppMetric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DailyMetric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lunch` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin",
DROP COLUMN "isSuperUser",
DROP COLUMN "isSupporter",
DROP COLUMN "password",
DROP COLUMN "securityAnswerHash",
DROP COLUMN "securityQuestion",
ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "AppMetric";

-- DropTable
DROP TABLE "DailyMetric";

-- DropTable
DROP TABLE "Lunch";
