-- CreateTable
CREATE TABLE "ExpenseTracker" (
    "id" SERIAL NOT NULL,
    "feesPerSemester" INTEGER NOT NULL,
    "otherCollegeCharges" INTEGER NOT NULL,
    "otherSpending" INTEGER NOT NULL,
    "currentSavings" INTEGER NOT NULL,
    "savingsGoal" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ExpenseTracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseTracker_userId_key" ON "ExpenseTracker"("userId");

-- AddForeignKey
ALTER TABLE "ExpenseTracker" ADD CONSTRAINT "ExpenseTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
