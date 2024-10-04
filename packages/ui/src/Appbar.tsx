"use client"
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { signIn, signOut } from "next-auth/react";


export const Appbar = ({session}:any) => {
    const router = useRouter();
   async function handleSignout(){
    await signOut();
    router.push('/api/auth/signin');
   }
    return (
        <div
            className="flex justify-between border-b px-4"
        >
            <div className=" flex flex-col font-bold text-lg text-[#6a51a6] justify-center">
                TurboWallet
            </div>
            <div className="flex gap-3  p-2">
                
                {session.data?.user ? <div className="text-xl font-bold text-slate-500 ">{`Hii,${session.data?.user.name}`}</div> : null}
                <Button onClick={session.data?.user ? handleSignout : signIn }>{session.data?.user?"Logout":"Login"}</Button>
            </div>
        </div>
    )
}