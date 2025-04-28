/*
  Warnings:

  - Added the required column `errorCode` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Log` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_userId_fkey";

-- DropIndex
DROP INDEX "Log_level_idx";

-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "errorCode" INTEGER NOT NULL,
ADD COLUMN     "metadata" JSONB,
ALTER COLUMN "level" SET DATA TYPE TEXT,
ALTER COLUMN "message" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET NOT NULL;
