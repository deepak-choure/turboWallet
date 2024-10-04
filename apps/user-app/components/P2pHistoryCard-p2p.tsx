import { Card } from "@repo/ui/card"
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

export const P2pTransactions =async  ({
    transactions
}:{
    transactions:{
        time: Date;
        amount: number;
        reciever: {
            id:number;
            number: string;
            name: string | null;
        };
        sender: {
            id:number;
            number: string;
            name: string | null;
        };
    }[]
   
}
) => {
    const session = await getServerSession(authOptions)
    // console.log(transactions);
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center text-slate-500 font-bold pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    
   
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div  className="flex justify-between">
                <div>
                    <div className="text-sm">
                       {t.reciever.id == session.user?.id? `Recieved from ${t.sender.name} `:`Sent to ${t.reciever.name} `}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center ">
                {t.reciever.id == session.user?.id? `+ RS ${t.amount/100}.00 `:` - Rs ${t.amount/100}.00 `}
                     
                </div>

            </div>)}
        </div>
    </Card>
}

