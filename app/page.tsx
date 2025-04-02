import { WeatherSection } from "@/components/sections/weather-section";
import { CryptoSection } from "@/components/sections/crypto-section";
import { NewsSection } from "@/components/sections/news-section";

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WeatherSection />
        <CryptoSection />
        <NewsSection />
      </div>
    </div>
  );
}