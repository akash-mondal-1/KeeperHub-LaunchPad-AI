"use client"

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
      isMetaMask?: boolean;
    };
  }
}

export function Header() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;
    window.ethereum.request({ method: "eth_accounts" })
      .then(accounts => {
        if (accounts && accounts.length > 0) setAddress(accounts[0]);
      })
      .catch(console.error);
  }, []);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const walletClient = createWalletClient({
          chain: sepolia,
          transport: custom(window.ethereum)
        });
        const [account] = await walletClient.requestAddresses();
        setAddress(account);
      } catch (error) {
        console.error("Failed to connect wallet", error);
      }
    } else {
      alert("Please install MetaMask to connect your wallet.");
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-background/50 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${address ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" : "bg-red-500"}`} />
        <span className="text-sm font-medium text-muted-foreground">
          {address ? "Sepolia Connected" : "Not Connected"}
        </span>
      </div>
      <div className="flex items-center gap-4">
        {address ? (
          <Button variant="outline" className="gap-2 rounded-full border-green-500/50 text-green-500">
            <Wallet className="h-4 w-4" />
            <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
          </Button>
        ) : (
          <Button onClick={connectWallet} variant="outline" className="gap-2 rounded-full border-primary/20 hover:border-primary/50 transition-colors">
            <Wallet className="h-4 w-4 text-primary" />
            <span>Connect Wallet</span>
          </Button>
        )}
      </div>
    </header>
  );
}
