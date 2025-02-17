-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
