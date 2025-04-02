"use client"

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { CryptoSection } from '@/components/sections/crypto-section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, LineChart } from 'lucide-react';
import Link from 'next/link';

export default function CryptocurrencyPage() {
  const cryptoData = useSelector((state: RootState) => state.crypto.currencies);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-8">Cryptocurrency Details</h1>
      
      <div className="grid gap-6">
        <CryptoSection />
        
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <LineChart className="h-6 w-6" />
            Historical Data
          </h2>
          <div className="space-y-4">
            {Object.entries(cryptoData).map(([currency, data]) => (
              <div key={currency} className="p-4 rounded-lg bg-muted">
                <h3 className="text-xl font-medium mb-3 capitalize">{currency} - Price History</h3>
                <p className="text-muted-foreground">
                  Historical price data and advanced analytics will be available soon.
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}