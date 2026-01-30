/*
  Warnings:

  - You are about to drop the column `anchor_category` on the `habit_recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "habit_recipe" DROP COLUMN "anchor_category",
ADD COLUMN     "anchor_category_id" TEXT;

-- DropEnum
DROP TYPE "AnchorCategory";

-- CreateTable
CREATE TABLE "anchor_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "color" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "anchor_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anchor_suggestion" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "anchor_category_id" TEXT NOT NULL,

    CONSTRAINT "anchor_suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anchor_category_name_key" ON "anchor_category"("name");

-- AddForeignKey
ALTER TABLE "habit_recipe" ADD CONSTRAINT "habit_recipe_anchor_category_id_fkey" FOREIGN KEY ("anchor_category_id") REFERENCES "anchor_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anchor_suggestion" ADD CONSTRAINT "anchor_suggestion_anchor_category_id_fkey" FOREIGN KEY ("anchor_category_id") REFERENCES "anchor_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
