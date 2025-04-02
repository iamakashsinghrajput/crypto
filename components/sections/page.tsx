"use client"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import {WeatherSection} from './weather-section';
import {CryptoSection} from './crypto-section';
import {NewsSection} from './news-section';
import { fetchWeatherData } from '@/lib/store/weatherSlice';
import { fetchCryptoData } from '@/lib/store/cryptoSlice';
import { fetchNewsData } from '@/lib/store/newsSlice';

export function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Initial data fetch
    ['New York', 'London', 'Tokyo'].forEach(city => {
      dispatch(fetchWeatherData(city));
    });
    ['bitcoin', 'ethereum', 'cardano'].forEach(crypto => {
      dispatch(fetchCryptoData(crypto));
    });
    dispatch(fetchNewsData());

    // Set up periodic refresh
    const interval = setInterval(() => {
      ['New York', 'London', 'Tokyo'].forEach(city => {
        dispatch(fetchWeatherData(city));
      });
      ['bitcoin', 'ethereum', 'cardano'].forEach(crypto => {
        dispatch(fetchCryptoData(crypto));
      });
      dispatch(fetchNewsData());
    }, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WeatherSection />
          <CryptoSection />
          <NewsSection />
        </div>
      </main>
    </div>
  );
}