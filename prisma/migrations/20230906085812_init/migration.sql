/*
  Warnings:

  - Added the required column `logo` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `restaurant` ADD COLUMN `logo` VARCHAR(191) NOT NULL;
