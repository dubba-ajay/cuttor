import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLocation as useAppLocation } from "@/contexts/LocationContext";
import LocationBasedStores from "@/components/features/LocationBasedStores";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Navigation, Route, Phone, MessageSquare, Crosshair } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

function haversine(lat1:number, lon1:number, lat2:number, lon2:number) {
  const R = 6371e3; // metres
  const toRad = (d:number)=> (d*Math.PI)/180;
  const dLat = toRad(lat2-lat1);
  const dLon = toRad(lon2-lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R*c; // meters
  const km = d/1000;
  const etaMin = Math.round((km/30)*60); // assume 30km/h
  return { meters: d, km, etaMin };
}

export default function Nearby() {
  const { location, requestLocation, setManualLocation, isLoading, nearbyAreas } = useAppLocation();
  const [view, setView] = useState<'map'|'list'>('map');
  const [cityInput, setCityInput] = useState("");
  const [homeService, setHomeService] = useState(true);
  const [provider, setProvider] = useState<{lat:number; lng:number} | null>(null);
  const [selectedSalon, setSelectedSalon] = useState<{lat:number; lng:number; name:string} | null>(null);
  const tickRef = useRef<number | null>(null);

  // initialize selected salon dummy near user
  useEffect(() => {
    if (location && !selectedSalon) {
      const { latitude, longitude } = location;
      setSelectedSalon({ lat: latitude + 0.01, lng: longitude + 0.01, name: "Nearby Salon" });
    }
  }, [location, selectedSalon]);

  // simulate provider movement for home services
  useEffect(() => {
    if (!homeService || !location) { if (tickRef.current) cancelAnimationFrame(tickRef.current); return; }
    // start provider 2km away to the north-east
    if (!provider) setProvider({ lat: location.latitude + 0.02, lng: location.longitude + 0.02 });
    let last = performance.now();
    const step = (now:number) => {
      const dt = (now - last)/1000; last = now;
      setProvider(prev => {
        if (!prev) return prev;
        const target = { lat: location.latitude, lng: location.longitude };
        const dx = target.lat - prev.lat; const dy = target.lng - prev.lng;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.0002) return target; // arrived
        const speed = 0.0005 * dt; // degrees per second approx
        return { lat: prev.lat + (dx/dist)*speed, lng: prev.lng + (dy/dist)*speed };
      });
      tickRef.current = requestAnimationFrame(step);
    };
    tickRef.current = requestAnimationFrame(step);
    return () => { if (tickRef.current) cancelAnimationFrame(tickRef.current); };
  }, [homeService, location, provider]);

  const eta = useMemo(() => {
    if (!location) return null;
    if (homeService && provider) return haversine(provider.lat, provider.lng, location.latitude, location.longitude);
    if (!homeService && selectedSalon) return haversine(location.latitude, location.longitude, selectedSalon.lat, selectedSalon.lng);
    return null;
  }, [homeService, provider, location, selectedSalon]);

  const mapsEmbed = useMemo(() => {
    if (!location) return null;
    const { latitude, longitude } = location;
    const center = `${latitude},${longitude}`;
    // basic embed centered on user; clicking opens maps with pin
    return `https://www.google.com/maps?q=${encodeURIComponent(center)}&z=14&output=embed`;
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div className="text-sm">
                <div className="font-semibold">{location?.city || 'Select location'}</div>
                <div className="text-xs text-muted-foreground">{location?.address || 'Enable GPS or pick a city'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => requestLocation()} disabled={isLoading} className="rounded-full">
                <Crosshair className="w-4 h-4 mr-1" /> {isLoading? 'Locating...':'Use GPS'}
              </Button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="sm:col-span-2 flex gap-2">
              <Input placeholder="Search or type a city (e.g., Mumbai)" value={cityInput} onChange={e=> setCityInput(e.target.value)} />
              <Button onClick={()=> { if (cityInput.trim()) { setManualLocation(cityInput.trim()); setView('map'); } }} className="whitespace-nowrap">Set Location</Button>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {nearbyAreas.slice(0,6).map(c => (
                <button key={c} onClick={()=> { setManualLocation(c); setView('map'); }} className="px-3 py-2 text-xs rounded-full border hover:bg-gray-50 whitespace-nowrap">{c}</button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Tabs value={view} onValueChange={v=> setView(v as any)} className="w-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>

              <TabsContent value="map" className="space-y-3">
                <Card>
                  <CardContent className="p-0">
                    {mapsEmbed ? (
                      <div className="relative w-full h-[360px] sm:h-[480px]">
                        <iframe title="map" src={mapsEmbed} width="100%" height="100%" loading="lazy" className="rounded-xl border" />
                        {/* Status banners */}
                        <div className="absolute top-2 left-2 flex flex-col gap-2">
                          <Badge variant="secondary" className="bg-white/90 backdrop-blur border shadow">{homeService? 'Home Service':'In-salon'}</Badge>
                          {eta && (
                            <Badge variant="secondary" className="bg-white/90 backdrop-blur border shadow">ETA: {eta.etaMin} min • {(eta.km).toFixed(1)} km</Badge>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-sm">Select a location to view the map.</div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-2 items-center">
                  <Button size="sm" variant={homeService? 'default':'outline'} onClick={()=> setHomeService(true)} className="rounded-full">Home Service</Button>
                  <Button size="sm" variant={!homeService? 'default':'outline'} onClick={()=> setHomeService(false)} className="rounded-full">In-Salon</Button>
                  {selectedSalon && !homeService && location && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={`https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${selectedSalon.lat},${selectedSalon.lng}`} target="_blank" rel="noopener">
                        <Route className="w-4 h-4 mr-1" /> Route
                      </a>
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="rounded-xl" asChild><a href="tel:+919876543210"><Phone className="w-4 h-4 mr-1" /> Call</a></Button>
                  <Button variant="outline" className="rounded-xl"><MessageSquare className="w-4 h-4 mr-1" /> Message</Button>
                </div>
              </TabsContent>

              <TabsContent value="list">
                <LocationBasedStores />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
