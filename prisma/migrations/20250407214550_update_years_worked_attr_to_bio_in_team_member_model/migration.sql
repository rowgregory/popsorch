/*
  Warnings:

  - You are about to drop the column `yearsWorked` on the `TeamMember` table. All the data in the column will be lost.
  - Added the required column `bio` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "yearsWorked",
ADD COLUMN     "bio" TEXT NOT NULL;
