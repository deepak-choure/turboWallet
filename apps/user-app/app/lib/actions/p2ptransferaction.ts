'use server'
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { client } from "@repo/db/client";


export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const sender = session.user.id;
    if (!sender) {
        //user not logged in 
        console.log("  session missing")
        return {
            message: "Error while sending make sure you logged in"
        }
    }
    const reciever = await client.user.findFirst({
        where: {
            number:to           
        },
        select:{
            email:true,
            name:true,
            number:true,
            id:true
        }
    });

    if (!reciever) {
        console.log("reciever not found ")
        return {
            message: "User with this number not found"
        }
    }
    if(reciever.id == sender){
        return {
            message:"Can't send money to self "
        }
    }
    console.log(reciever)
      try {
        await client.$transaction(async (tx) => {
            //prisma don't support the locks so we use rawquery
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(sender)} FOR UPDATE`;
            //until the entire transaction get done it keep it locked
            const senderBalance = await tx.balance.findUnique({
                where: { userId: Number(sender) },
            });
            if (!senderBalance || senderBalance.amount < amount) {
                throw new Error("Insuficient Balance in wallet")
            }
            //first deduction from sender 
            await tx.balance.update({
                where: { userId: Number(sender) },
                data: { amount: { decrement: amount } },
            })
            //then adding to reciever's wallet
           
            await tx.balance.upsert({
                where: { userId:Number(reciever.id) },
                update: { amount:{increment:amount} },
                create:{
                   userId:reciever.id,
                   amount:amount,
                   locked:0
                   
                }
            })
            await tx.p2pTransaction.create({
                data:{
                    senderUserId:Number(sender),
                    recieverUserId:Number(reciever.id),
                    amount,
                    timeStamp :new Date()
                }
            })

            
        })
    } catch (error) {
        console.error(error)
        return {
            error:error
        }
    }
    
}