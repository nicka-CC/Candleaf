/*
  Warnings:

  - You are about to drop the column `reiting` on the `PersonTestimonials` table. All the data in the column will be lost.
  - You are about to drop the column `testimonialsId` on the `PersonTestimonials` table. All the data in the column will be lost.
  - You are about to drop the `Testimonials` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `raiting` to the `PersonTestimonials` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PersonTestimonials" DROP CONSTRAINT "PersonTestimonials_testimonialsId_fkey";

-- DropIndex
DROP INDEX "PersonTestimonials_testimonialsId_idx";

-- AlterTable
ALTER TABLE "PersonTestimonials" DROP COLUMN "reiting",
DROP COLUMN "testimonialsId",
ADD COLUMN     "raiting" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Testimonials";
