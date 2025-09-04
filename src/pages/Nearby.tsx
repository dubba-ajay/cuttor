import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLocation as useAppLocation } from "@/contexts/LocationContext";
import LocationBasedStores from "@/components/features/LocationBasedStores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Crosshair } from "lucide-react";
import { useState } from "react";

export default function Nearby() {
  const { location, requestLocation, setManualLocation, isLoading, nearbyAreas } = useAppLocation();
  const [cityInput, setCityInput] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-4 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div className="text-sm">
                <div className="font-semibold">{location?.city || "Select location"}</div>
                <div className="text-xs text-muted-foreground">{location?.address || "Enable GPS or pick a city"}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => requestLocation()} disabled={isLoading} className="rounded-full">
                <Crosshair className="w-4 h-4 mr-1" /> {isLoading ? "Locating..." : "Use GPS"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="sm:col-span-2 flex gap-2">
              <Input placeholder="Type a city (e.g., Mumbai)" value={cityInput} onChange={e => setCityInput(e.target.value)} />
              <Button onClick={() => { if (cityInput.trim()) { setManualLocation(cityInput.trim()); } }} className="whitespace-nowrap">Set Location</Button>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {nearbyAreas.slice(0, 6).map(c => (
                <button key={c} onClick={() => { setManualLocation(c); }} className="px-3 py-2 text-xs rounded-full border hover:bg-gray-50 whitespace-nowrap">{c}</button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <LocationBasedStores />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
