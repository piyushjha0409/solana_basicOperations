import React, { useState } from 'react'
import { ed25519 } from '@noble/curves/ed25519'
import { useWallet } from '@solana/wallet-adapter-react'
import bs58 from 'bs58'
import Button from './Components/Button'

const SignMessage = () => {

    const { publicKey, signMessage }  = useWallet()
    const [message, setMessage] = useState('')

    //function authenticate
    async function handleAuthenticate () {
      //edge cases
      if(!publicKey) throw new Error("Publick key is not defined!")
      if(!signMessage) throw new Error('Signed message is not defined!')
        const encodeMessage = new TextEncoder().encode(message); 
        const signature = await signMessage(encodeMessage)

        if(!ed25519.verify(signature, encodeMessage, publicKey.toBytes())) throw new Error("Message Signature Failed!")
        alert(`Message Signature: ${bs58.encode(signature)}`);
    }

  return (
    <div>
      <span>Sign Message!</span>
      <input type="text" placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value) } />
      <Button children={"Authenticate"} onClick={handleAuthenticate} />
    </div>
  )
}

export default SignMessage