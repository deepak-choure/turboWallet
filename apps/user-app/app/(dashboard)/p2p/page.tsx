import {  getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import { client } from "@repo/db/client";
import { P2pTransactions } from "../../../components/P2pHistoryCard-p2p";

async function getP2PTransactions(): Promise<{
    time: Date; amount: number; reciever: {
        id: number;
        number: string;
        name: string | null;
    }; sender: {
        id: number;
        number: string;
        name: string | null;
    };
}[]> {
    

const session = await getServerSession(authOptions);

        const txns = await client.p2pTransaction.findMany({
            where: {
                OR: [
                    {
                        recieverUserId: Number(session?.user.id)
                    },
                    {
                        senderUserId: Number(session?.user.id)
                    }
                ],

            },
            
            select: {
                amount: true,
                timeStamp: true,
                sender: {
                    select: {
                        id:true,
                        number: true,
                        name: true
                    }
                },
                reciever: {
                    select: {
                        id:true,
                        number: true,
                        name: true
                    }
                },
                
            },
            orderBy: {
                timeStamp: 'desc',  // Ordering by timeStamp in descending order
              },

        });
        // console.log(txns);
        
        return txns.map(t => ({
            time: t.timeStamp,
            amount: t.amount,
            reciever: t.reciever,
            sender: t.sender,

        }))
    

}
export default async  function P2P() {
    const transactions = await getP2PTransactions()
    // console.log(transactions);
    
    return (
        <div className="w-full ">
            <SendCard></SendCard>
            <P2pTransactions transactions={transactions} />
        </div>
    )
}