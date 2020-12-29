/*
  Warnings:

  - The migration will change the primary key for the `Family` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `Member` table. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Family` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Member` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
