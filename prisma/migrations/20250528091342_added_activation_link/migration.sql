-- AlterTable
ALTER TABLE "users" ADD COLUMN     "activated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "activation_link" TEXT;
