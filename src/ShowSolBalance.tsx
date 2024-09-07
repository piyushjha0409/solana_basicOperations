import React, { useState } from 'react'
import {useConnection, useWallet} from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"


const ShowSolBalance = () => {

    const {connection} = useConnection()
    const wallet = useWallet()

    const [balance, setBalance] = useState(0)

    const getBalance = async () => {
        //if the public key is not null
     if(wallet.publicKey) {
         const balance = await connection.getBalance(wallet.publicKey)
         const result = balance / LAMPORTS_PER_SOL;
         setBalance(result)
     }
    }
  // calling the function
    getBalance();
  return (
    <div>
        <p> SOL Balance: {balance} </p>
    </div>
  )
}

export default ShowSolBalance