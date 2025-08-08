-- AlterTable
ALTER TABLE "HeaderButton" ADD COLUMN     "dropdownItems" JSONB DEFAULT '[]',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'button';
