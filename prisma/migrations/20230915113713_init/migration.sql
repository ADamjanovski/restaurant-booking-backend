-- DropForeignKey
ALTER TABLE `restaurantuser` DROP FOREIGN KEY `restaurantUser_restaurantId_fkey`;

-- AlterTable
ALTER TABLE `restaurantuser` MODIFY `restaurantId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `restaurantUser` ADD CONSTRAINT `restaurantUser_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
