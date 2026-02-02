/*
  Warnings:

  - A unique constraint covering the columns `[id,user_id]` on the table `habit_recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "habit_recipe_id_user_id_key" ON "habit_recipe"("id", "user_id");
