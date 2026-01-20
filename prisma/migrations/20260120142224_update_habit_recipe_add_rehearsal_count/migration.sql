/*
  Warnings:

  - Added the required column `rehearsalCount` to the `habit_recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "habit_recipe" ADD COLUMN     "rehearsalCount" INTEGER NOT NULL;
