-- CreateTable
CREATE TABLE "p2pTransaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "senderUserId" INTEGER NOT NULL,
    "recieverUserId" INTEGER NOT NULL,

    CONSTRAINT "p2pTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "p2pTransaction" ADD CONSTRAINT "p2pTransaction_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2pTransaction" ADD CONSTRAINT "p2pTransaction_recieverUserId_fkey" FOREIGN KEY ("recieverUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
