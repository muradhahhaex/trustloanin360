'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [prices, setPrices] = useState({ bitcoin: 0, ethereum: 0, solana: 0 });

  useEffect(() => {
    async function fetchPrices() {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"
      );
      const data = await res.json();
      setPrices({
        bitcoin: data.bitcoin.usd,
        ethereum: data.ethereum.usd,
        solana: data.solana.usd,
      });
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-3xl font-bold mb-6">My Crypto Wallet</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {Object.entries(prices).map(([key, value]) => (
          <Card key={key} className="rounded-2xl shadow-md p-4">
            <CardContent>
              <h2 className="text-xl font-semibold capitalize">{key}</h2>
              <p className="text-green-600 text-lg">${value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}