/*
  Warnings:

  - The `status_240p` column on the `ProcessingDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status_360p` column on the `ProcessingDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status_480p` column on the `ProcessingDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status_720p` column on the `ProcessingDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status_1080p` column on the `ProcessingDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TranscodingStatus" AS ENUM ('NOT_AVAILABLE', 'NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "ProcessingDetails" DROP COLUMN "status_240p",
ADD COLUMN     "status_240p" "TranscodingStatus" NOT NULL DEFAULT 'NOT_AVAILABLE',
DROP COLUMN "status_360p",
ADD COLUMN     "status_360p" "TranscodingStatus" NOT NULL DEFAULT 'NOT_AVAILABLE',
DROP COLUMN "status_480p",
ADD COLUMN     "status_480p" "TranscodingStatus" NOT NULL DEFAULT 'NOT_AVAILABLE',
DROP COLUMN "status_720p",
ADD COLUMN     "status_720p" "TranscodingStatus" NOT NULL DEFAULT 'NOT_AVAILABLE',
DROP COLUMN "status_1080p",
ADD COLUMN     "status_1080p" "TranscodingStatus" NOT NULL DEFAULT 'NOT_AVAILABLE';

-- DropEnum
DROP TYPE "ResolutionStatus";
