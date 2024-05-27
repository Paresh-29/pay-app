import { useCallback, useEffect, useState } from "react";
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios";
import { useRecoilState } from "recoil";
import { balanceState } from "../components/atom";

export const Dashboard = () => {

    const [balance, setBalance] = useRecoilState(balanceState);

   

    const fetchBalance = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/account/balance/", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if(response.data.balance) {
                setBalance(response.data.balance);
            } else {
                console.error("Error fetching balance:", response.data.error);
            }

        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    },[setBalance])

    useEffect(() => {
        fetchBalance();
    },[fetchBalance])


    return <div>
        <AppBar />
        <div className="m-8">
        {balance !== 'xxxx' ? (
                    <Balance value={balance} />
                ) : (
                    <p>Loading balance...</p>
                )}
            <Users />
        </div>
    </div>
}