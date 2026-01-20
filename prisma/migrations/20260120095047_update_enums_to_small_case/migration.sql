/*
  Warnings:

  - The values [MORNING,MEALS,WORK,EVENING,OTHER] on the enum `AnchorCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [COMPLETED,MISSED,REDESIGNED] on the enum `LogStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [TOO_HARD,FORGOT,ANCHOR_MISSING,OTHER] on the enum `RedesignReason` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AnchorCategory_new" AS ENUM ('morning', 'meals', 'work', 'evening', 'other');
ALTER TABLE "public"."habit_recipe" ALTER COLUMN "anchor_category" DROP DEFAULT;
ALTER TABLE "habit_recipe" ALTER COLUMN "anchor_category" TYPE "AnchorCategory_new" USING ("anchor_category"::text::"AnchorCategory_new");
ALTER TYPE "AnchorCategory" RENAME TO "AnchorCategory_old";
ALTER TYPE "AnchorCategory_new" RENAME TO "AnchorCategory";
DROP TYPE "public"."AnchorCategory_old";
ALTER TABLE "habit_recipe" ALTER COLUMN "anchor_category" SET DEFAULT 'other';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "LogStatus_new" AS ENUM ('completed', 'missed', 'redesigned');
ALTER TABLE "daily_log" ALTER COLUMN "status" TYPE "LogStatus_new" USING ("status"::text::"LogStatus_new");
ALTER TYPE "LogStatus" RENAME TO "LogStatus_old";
ALTER TYPE "LogStatus_new" RENAME TO "LogStatus";
DROP TYPE "public"."LogStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "RedesignReason_new" AS ENUM ('too_hard', 'forgot', 'anchor_missing', 'other');
ALTER TABLE "daily_log" ALTER COLUMN "redesign_reason" TYPE "RedesignReason_new" USING ("redesign_reason"::text::"RedesignReason_new");
ALTER TYPE "RedesignReason" RENAME TO "RedesignReason_old";
ALTER TYPE "RedesignReason_new" RENAME TO "RedesignReason";
DROP TYPE "public"."RedesignReason_old";
COMMIT;

-- AlterTable
ALTER TABLE "habit_recipe" ALTER COLUMN "anchor_category" SET DEFAULT 'other';
