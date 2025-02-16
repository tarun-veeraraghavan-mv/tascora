-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "remarks" TEXT NOT NULL DEFAULT '';
