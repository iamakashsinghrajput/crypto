"use client"

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { WeatherSection } from '@/components/sections/weather-section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WeatherPage() {
  const weatherData = useSelector((state: RootState) => state.weather.cities);

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
      
      <h1 className="text-4xl font-bold mb-8">Weather Details</h1>
      
      <div className="grid gap-6">
        <WeatherSection />
        
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
          <div className="space-y-4">
            {Object.entries(weatherData).map(([city, data]) => (
              <div key={city} className="p-4 rounded-lg bg-muted">
                <h3 className="text-xl font-medium mb-3">{city} - Extended Forecast</h3>
                <p className="text-muted-foreground">
                  Detailed weather information and forecasts will be available soon.
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

