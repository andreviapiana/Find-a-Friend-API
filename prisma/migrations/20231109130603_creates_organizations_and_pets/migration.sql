-- CreateEnum
CREATE TYPE "Age" AS ENUM ('FILHOTE', 'ADULTO', 'SENIOR');

-- CreateEnum
CREATE TYPE "Termperament" AS ENUM ('CALMO', 'NEUTRO', 'TEMPERAMENTAL');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('PEQUENO', 'MEDIO', 'GRANDE');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "age" "Age" NOT NULL,
    "temperament" "Termperament" NOT NULL,
    "size" "Size" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsAppNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_key" ON "organizations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_whatsAppNumber_key" ON "organizations"("whatsAppNumber");
