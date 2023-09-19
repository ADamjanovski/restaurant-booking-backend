/*
  Warnings:

  - Added the required column `email` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfRating` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreOfRating` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `restaurant` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `numberOfRating` INTEGER NOT NULL,
    ADD COLUMN `scoreOfRating` INTEGER NOT NULL;
