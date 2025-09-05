import { useState, useMemo } from "react";
import { useLocation } from "@/contexts/LocationContext";
import { allStores } from "./AllStores";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Navigation, Clock } from "lucide-react";
import { Link } from "react-router-dom";

function toRad(d:number){return (d*Math.PI)/180}
function haversine(a:{lat:number;lng:number}, b:{lat:number;lng:number}){
  const R=6371e3;const dLat=toRad(b.lat-a.lat), dLon=toRad(b.lng-a.lng);
  const A=Math.sin(dLat/2)**2+Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLon/2)**2;const c=2*Math.atan2(Math.sqrt(A),Math.sqrt(1-A));
  const meters=R*c, km=meters/1000; const etaMin=Math.round((km/25)*60);
  return { km, etaMin };
}

// derive pseudo coordinates for stores for demo by seeding around user
function deriveStoreCoords(idx:number, base:{lat:number;lng:number}){
  const angle = (idx*57)%360; const r = 0.01 + (idx%5)*0.003; // ~1-3km
  const rad = toRad(angle);
  return { lat: base.lat + r*Math.cos(rad), lng: base.lng + r*Math.sin(rad) };
}

export default function MobileSearchBar(){
  const { location, requestLocation, setManualLocation, isLoading } = useLocation();
  const [q, setQ] = useState("");
  const [openSuggest, setOpenSuggest] = useState(false);

  const base = useMemo(()=> ({ lat: location?.latitude || 28.6139, lng: location?.longitude || 77.209}), [location]);

  const dataset = useMemo(() => {
    return allStores.map((s, i) => {
      const coords = deriveStoreCoords(i+1, base);
      const { km, etaMin } = haversine(base, coords);
      const openNow = (i % 3) !== 0; // simple flag
      const route = s.category === 'mens-hair' ? `/salon/${s.id}`
        : s.category === 'womens-beauty' ? `/womens-beauty/salon/${s.id}`
        : s.category === 'nail-studios' ? `/nail-studios/salon/${s.id}`
        : `/makeup-artists/salon/${s.id}`;
      return { id: s.id, name: s.name, category: s.category, address: s.address, priceRange: s.priceRange, route, km, etaMin, openNow };
    });
  }, [base]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = !term ? dataset.slice(0, 6) : dataset.filter((s) => (
      s.name.toLowerCase().includes(term) || s.address.toLowerCase().includes(term) || s.category.toLowerCase().includes(term)
    ));
    // sort by distance
    return list.sort((a,b)=> a.km - b.km).slice(0, 10);
  }, [q, dataset]);

  return (
    <div className="w-full">
      <div className="rounded-2xl border bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input value={q} onChange={(e)=>{ setQ(e.target.value); setOpenSuggest(true); }} onFocus={()=> setOpenSuggest(true)} placeholder="Search stores, salons, or home services" className="pl-9 h-11 rounded-xl" />
          </div>
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => requestLocation()} disabled={isLoading}>
            <Navigation className="w-4 h-4 mr-1" /> GPS
          </Button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <button className="text-sm inline-flex items-center gap-1 text-blue-600" onClick={() => setOpenSuggest(!openSuggest)}>
            <MapPin className="w-4 h-4" /> {location?.city || 'Set location'}
          </button>
          <div className="flex gap-1 overflow-x-auto max-w-[60%]">
            {["Mens Hair","Beauty","Nails","Makeup"].map(t=> (
              <Badge key={t} variant="secondary" className="whitespace-nowrap">{t}</Badge>
            ))}
          </div>
        </div>

        {openSuggest && (
          <div className="mt-3 rounded-xl border bg-white divide-y max-h-80 overflow-auto">
            {results.length === 0 && (
              <div className="p-3 text-sm text-muted-foreground">No results. Try a different term.</div>
            )}
            {results.map(r => (
              <Link to={r.route} key={r.id} className="flex items-center justify-between p-3 hover:bg-gray-50">
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.category.replace('-', ' ')} • {r.address}</div>
                </div>
                <div className="text-right text-xs">
                  <div className="font-medium">{r.km.toFixed(1)} km</div>
                  <div className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3" /> {r.etaMin} min</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
