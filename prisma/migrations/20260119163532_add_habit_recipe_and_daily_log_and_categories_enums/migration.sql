-- CreateEnum
CREATE TYPE "AnchorCategory" AS ENUM ('MORNING', 'MEALS', 'WORK', 'EVENING', 'OTHER');

-- CreateEnum
CREATE TYPE "LogStatus" AS ENUM ('COMPLETED', 'MISSED', 'REDESIGNED');

-- CreateEnum
CREATE TYPE "RedesignReason" AS ENUM ('TOO_HARD', 'FORGOT', 'ANCHOR_MISSING', 'OTHER');

-- CreateTable
CREATE TABLE "habit_recipe" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "anchor" TEXT NOT NULL,
    "tiny_behavior" TEXT NOT NULL,
    "celebration" TEXT NOT NULL,
    "anchor_category" "AnchorCategory" NOT NULL DEFAULT 'OTHER',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "total_completions" INTEGER NOT NULL DEFAULT 0,
    "last_completed_date" TEXT,
    "times_redesigned" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "habit_recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_log" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "status" "LogStatus" NOT NULL,
    "celebration_done" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "redesign_reason" "RedesignReason",
    "habit_id" TEXT NOT NULL,

    CONSTRAINT "daily_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "habit_recipe_userId_idx" ON "habit_recipe"("userId");

-- CreateIndex
CREATE INDEX "daily_log_date_idx" ON "daily_log"("date");

-- CreateIndex
CREATE INDEX "daily_log_habit_id_idx" ON "daily_log"("habit_id");

-- AddForeignKey
ALTER TABLE "habit_recipe" ADD CONSTRAINT "habit_recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_log" ADD CONSTRAINT "daily_log_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habit_recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
