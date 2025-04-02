// weather-section.tsx
"use client"
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Droplets, ThermometerSun } from 'lucide-react';

export function WeatherSection() {
  const weatherData = useSelector((state: RootState) => state.weather.cities);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(weatherData).map(([city, data]) => (
            <div key={city} className="p-4 rounded-lg bg-muted">
              <h3 className="text-lg font-semibold mb-2">{city}</h3>
              {data.loading ? (
                <div className="flex items-center space-x-2">
                  <Cloud className="w-5 h-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <ThermometerSun className="w-5 h-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{data.temperature}°C</p>
                  <Droplets className="w-5 h-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{data.humidity}%</p>
                  <p className="text-sm text-muted-foreground">{data.conditions}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}