-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);
