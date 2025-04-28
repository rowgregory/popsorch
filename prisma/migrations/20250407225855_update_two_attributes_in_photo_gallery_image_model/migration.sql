/*
  Warnings:

  - You are about to drop the column `fileName` on the `PhotoGalleryImage` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `PhotoGalleryImage` table. All the data in the column will be lost.
  - Added the required column `imageFilename` to the `PhotoGalleryImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `PhotoGalleryImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhotoGalleryImage" DROP COLUMN "fileName",
DROP COLUMN "url",
ADD COLUMN     "imageFilename" VARCHAR(255) NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
