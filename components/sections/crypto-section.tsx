'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { fetchCryptoData } from "@/lib/store/cryptoSlice";
import { useWebSocket } from "@/lib/hooks/useWebSocket";
import type { RootState } from "@/lib/store";
import Link from "next/link";

export function CryptoSection() {
  const dispatch = useDispatch();
  const { coins, loading, error } = useSelector((state: RootState) => state.crypto);
  const favoriteCryptos = useSelector((state: RootState) => state.preferences.favoriteCryptos);
  
  // Initialize WebSocket connection
  useWebSocket();

  useEffect(() => {
    favoriteCryptos.forEach((crypto) => {
      dispatch(fetchCryptoData(crypto) as any);
    });
  }, [dispatch, favoriteCryptos]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cryptocurrency</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cryptocurrency</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cryptocurrency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {favoriteCryptos.map((crypto) => {
            const data = coins[crypto];
            return (
              <Link
                key={crypto}
                href={`/crypto/${crypto}`}
                className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium capitalize">{crypto}</span>
                </div>
                {data && (
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      ${data.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      {data.change24h > 0 ? (
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={data.change24h > 0 ? "text-green-500" : "text-red-500"}
                      >
                        {Math.abs(data.change24h).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}