/*
  Warnings:

  - You are about to drop the column `processingStatus` on the `ProcessingDetails` table. All the data in the column will be lost.
  - You are about to drop the column `uploadingStatus` on the `ProcessingDetails` table. All the data in the column will be lost.
  - You are about to drop the column `uploaded` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `ContentDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContentDetails" DROP CONSTRAINT "ContentDetails_videoId_fkey";

-- AlterTable
ALTER TABLE "ProcessingDetails" DROP COLUMN "processingStatus",
DROP COLUMN "uploadingStatus";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "uploaded",
ADD COLUMN     "processed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "thumbnail" SET DEFAULT '/assets/default_thumbnail.png',
ALTER COLUMN "preview" DROP NOT NULL;

-- DropTable
DROP TABLE "ContentDetails";

-- DropEnum
DROP TYPE "ProcessingStatus";

-- DropEnum
DROP TYPE "UploadingStatus";
