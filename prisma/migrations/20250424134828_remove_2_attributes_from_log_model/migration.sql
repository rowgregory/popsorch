/*
  Warnings:

  - You are about to drop the column `errorCode` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "errorCode",
DROP COLUMN "userId";
