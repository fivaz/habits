/*
  Warnings:

  - Added the required column `order` to the `anchor_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "anchor_category" ADD COLUMN     "order" INTEGER NOT NULL;
