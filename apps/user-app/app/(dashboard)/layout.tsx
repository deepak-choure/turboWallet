import { HomeIcon } from "../../components/HomeIcon-sidebaritem";
import { P2ptransactionIcon } from "../../components/P2pTransactionIcon-sidebaritem";
import { SidebarItem } from "../../components/SidebarItem";
import { TransactionsIcon } from "../../components/TransactionsIcon-sidebaritem";
import { DepositeIcon } from "../../components/TransferIcon-sidebaritem";
export default function Layout({children}:{children:React.ReactNode}):JSX.Element{
    return(
        <div className="flex">
            <div className="w-2/5 border-r border-slate-300 min-h-screen mr-4 pt-20">
                <div>
                    <SidebarItem href={"/dashboard"} title={"Home"} icon={<HomeIcon/>} ></SidebarItem>
                    <SidebarItem href={"/deposite"} title={"Add To Wallet"} icon={<DepositeIcon/>} ></SidebarItem>
                    <SidebarItem href={"/transactions"} title={"Transactions"} icon={<TransactionsIcon/>} ></SidebarItem>
                    <SidebarItem href={"/p2p"} title={"P2P Transfer"} icon={<P2ptransactionIcon/>}></SidebarItem>
                </div>
            </div>
            {children}
        </div>
    )
}
