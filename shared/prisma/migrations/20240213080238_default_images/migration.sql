-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "image" TEXT NOT NULL DEFAULT '/assets/default_profile.png';

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "image" TEXT NOT NULL DEFAULT '/assets/default_profile.png';
