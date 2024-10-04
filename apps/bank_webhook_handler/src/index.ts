import express from "express";
import { client } from "@repo/db/client";
const app = express();
app.use(express.json());
//basically bank server hit this server to say that i have deducted money from user and send it to turbowallet bank whic bank know already
//so the balance in your turbowallet account (you are one user of turbowallet) goes up
//note that the transaction section shows that user has added money to the wallet from bank server netbanking
//it not necessary to show that amt on balance until bank does not confirm that 

app.post("/hdfcwebhook",async (req,res)=>{
    const paymentInfo = {
        token:req.body.token,
        userId:req.body.user_identifier,
        amount:req.body.amount
    };
    try {
        await client.$transaction([
            client.balance.upsert({
                where:{
                    userId:Number(paymentInfo.userId)
                },

                update: { 
                    amount:{
                        increment:Number(paymentInfo.amount)
                    } 
                },

                create:{
                    userId:paymentInfo.userId,
                    amount:req.body.amount,
                    locked:0
                    
                }
            }),
            //updating the status also to success once bank sent
            client.onRampTransaction.update({
                where:{
                    token:paymentInfo.token
                },
                data:{
                    status:"Success"
                }
            })

        ]); 
        res.status(200).json({
            message:"Captured"
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3003);