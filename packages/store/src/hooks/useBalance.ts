
import { useRecoilValue } from "recoil"
import { balanceatom } from "../atoms/balance"

export const useBalance = ()=>{
    return useRecoilValue<number>(balanceatom)
}