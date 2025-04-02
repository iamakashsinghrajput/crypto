'use client';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateCryptoPrice } from '@/lib/store/cryptoSlice';
import { toast } from 'sonner';

export function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Connect to CoinCap WebSocket
    ws.current = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');

    ws.current.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      Object.entries(data).forEach(([coin, price]) => {
        dispatch(updateCryptoPrice({
          coinId: coin,
          price: Number(price),
        }));

        // Show notification for significant price changes (e.g., >5%)
        if (Math.abs(Number(price)) > 5) {
          toast(`${coin.toUpperCase()} price changed significantly!`, {
            description: `New price: $${Number(price).toLocaleString()}`,
          });
        }
      });
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast.error('WebSocket connection error');
    };

    // Cleanup on unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [dispatch]);

  return ws.current;
}