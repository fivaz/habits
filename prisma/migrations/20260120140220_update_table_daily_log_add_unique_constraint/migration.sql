/*
  Warnings:

  - A unique constraint covering the columns `[habit_id,date]` on the table `daily_log` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `daily_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "daily_log" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "daily_log_habit_id_date_key" ON "daily_log"("habit_id", "date");
