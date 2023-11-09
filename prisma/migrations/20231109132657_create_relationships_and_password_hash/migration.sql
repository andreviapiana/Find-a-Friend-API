/*
  Warnings:

  - You are about to drop the column `password` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "password",
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "organization_id" TEXT;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
