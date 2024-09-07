import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import Button from './Components/Button';
import { LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

const SendTransactions = () => {
    const [amount, setAmount] = useState('');
    const [toAddress, setToAddress] = useState('');
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const sendTokens = async () => {
        if (!publicKey) {
            alert('Wallet not connected');
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (!toAddress) {
            alert('Please enter a valid address');
            return;
        }

        try {
            const transaction = new Transaction();
            transaction.add(SystemProgram.transfer({
                fromPubkey: publicKey,
                lamports: Number(amount) * LAMPORTS_PER_SOL,
                toPubkey: new PublicKey(toAddress)
            }));

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'processed');
            alert(`Sent ${amount} SOL to ${toAddress}`);
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed. Please try again.');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter the address on which you want to send Solana"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter the amount of SOL:"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <Button onClick={sendTokens}>Send Transaction</Button>
        </div>
    );
};

export default SendTransactions;
