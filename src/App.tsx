import "./App.css";
import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import WalletAirdrop from "./WalletAirdrop";
import "@solana/wallet-adapter-react-ui/styles.css";
import ShowSolBalance from "./ShowSolBalance";

function App() {
  //network
  const network = WalletAdapterNetwork.Devnet;

  //We can also provide the custom rpc provider
  //   const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint =
    "https://solana-devnet.g.alchemy.com/v2/jvvZVLY9uWw2Gssp7Lnfpo8_8DxAzcWr";

  //   const wallets = useMemo(() => [

  //     new UnsafeBurnerWalletAdapter(),
  //   ],
  //  [network]
  // )

  //Airdrop Component

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WalletAirdrop />
          </div>
          <ShowSolBalance />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
