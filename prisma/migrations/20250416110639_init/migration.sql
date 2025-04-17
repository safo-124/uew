/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to alter the column `createdById` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_createdById_fkey`;

-- DropIndex
DROP INDEX `User_createdById_fkey` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `role` ENUM('REGISTRY', 'COORDINATOR', 'LECTURER') NOT NULL DEFAULT 'LECTURER',
    MODIFY `createdById` CHAR(36) NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Claim` (
    `id` CHAR(36) NOT NULL,
    `claimId` VARCHAR(191) NOT NULL,
    `claimType` ENUM('TEACHING', 'THESIS') NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'PROCESSED') NOT NULL DEFAULT 'PENDING',
    `submittedById` CHAR(36) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `courseCode` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `contactHours` INTEGER NULL,
    `startTime` VARCHAR(191) NULL,
    `endTime` VARCHAR(191) NULL,
    `isTransportation` BOOLEAN NOT NULL DEFAULT false,
    `transportMode` ENUM('PUBLIC', 'PRIVATE') NULL,
    `registrationNumber` VARCHAR(191) NULL,
    `cubicCapacity` INTEGER NULL,
    `from` VARCHAR(191) NULL,
    `to` VARCHAR(191) NULL,
    `distance` DOUBLE NULL,
    `thesisType` ENUM('SUPERVISION', 'EXAMINATION') NULL,
    `degree` ENUM('PhD', 'MPHIL', 'MA', 'ED', 'PGDE') NULL,
    `currentApproverId` CHAR(36) NULL,
    `approvedById` CHAR(36) NULL,
    `processedById` CHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Claim_claimId_key`(`claimId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentData` (
    `id` CHAR(36) NOT NULL,
    `claimId` CHAR(36) NOT NULL,
    `studentNumber` VARCHAR(191) NOT NULL,
    `studentName` VARCHAR(191) NOT NULL,
    `thesisTitle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claim` ADD CONSTRAINT `Claim_submittedById_fkey` FOREIGN KEY (`submittedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claim` ADD CONSTRAINT `Claim_currentApproverId_fkey` FOREIGN KEY (`currentApproverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claim` ADD CONSTRAINT `Claim_approvedById_fkey` FOREIGN KEY (`approvedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claim` ADD CONSTRAINT `Claim_processedById_fkey` FOREIGN KEY (`processedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentData` ADD CONSTRAINT `StudentData_claimId_fkey` FOREIGN KEY (`claimId`) REFERENCES `Claim`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
