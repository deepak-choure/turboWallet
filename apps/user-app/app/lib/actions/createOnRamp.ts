"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { client } from "@repo/db/client";
//every time user add money to wallet onRamptransaction generated which need to fulfil by bank
export async  function createOnRampTransaction(amount:number,provider:string){
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session.user?.id;
    if(!userId){
        return{
            message:"User not logged in"
        }
           
        
    }
    try{
        await client.onRampTransaction.create({
            data:{
                userId:Number(userId),
                amount:amount,
                status:"Processing",
                startTime:new Date(),
                provider,
                token

            }
        })
        return {
            message:"on ramp transaction added"
        }
    }catch(error){

        console.error(error);
    }

}