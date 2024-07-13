/*
  Warnings:

  - You are about to drop the column `rotate` on the `PersonTestimonials` table. All the data in the column will be lost.
  - Added the required column `reiting` to the `PersonTestimonials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PersonTestimonials" DROP COLUMN "rotate",
ADD COLUMN     "reiting" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "moderate" DROP NOT NULL,
ALTER COLUMN "moderate" SET DEFAULT false;
