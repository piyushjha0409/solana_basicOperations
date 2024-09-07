import Button from "./Components/Button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

const WalletAirdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [amount, setAmount] = useState("");

  const handleAirdrop = async () => {
    if (!wallet.publicKey) {
      return null;
    }
    await connection.requestAirdrop(
      wallet?.publicKey,
      parseFloat(amount) * LAMPORTS_PER_SOL
    );
    alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
  };
  return (  
    <div style={{ display:"flex", gap:4}}>
      <input
        type="text"
        id="number"
        placeholder="Enter amount"
        onChange={(e) => setAmount(e?.target.value)}
        value={amount}
      />
      <Button children={"Request Airdrop!"} handleAirdrop={handleAirdrop} />
    </div>
  );
};

export default WalletAirdrop;
