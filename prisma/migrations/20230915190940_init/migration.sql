/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[restaurantId]` on the table `restaurantUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Restaurant_id_key` ON `Restaurant`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `restaurantUser_restaurantId_key` ON `restaurantUser`(`restaurantId`);
