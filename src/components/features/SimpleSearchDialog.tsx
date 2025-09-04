import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Crosshair, X, Star } from "lucide-react";
import { allStores } from "@/components/features/AllStores";
import { useLocation as useAppLocation } from "@/contexts/LocationContext";

interface Props { open: boolean; onOpenChange(open: boolean): void; }

const categoryLabel = (c: string) => {
  switch (c) {
    case "mens-hair": return "Men's Hair";
    case "womens-beauty": return "Women's Beauty";
    case "nail-studios": return "Nail Studios";
    case "makeup-artists": return "Makeup Artists";
    default: return "Store";
  }
};

const linkForStore = (store: { id: number; category: string }) => {
  switch (store.category) {
    case "mens-hair": return `/salon/${store.id}`;
    case "womens-beauty": return `/womens-beauty/salon/${store.id}`;
    case "nail-studios": return `/nail-studios/salon/${store.id}`;
    case "makeup-artists": return `/makeup-artists/salon/${store.id}`;
    default: return `/salon/${store.id}`;
  }
};

export default function SimpleSearchDialog({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const { location, requestLocation, setManualLocation, isLoading, nearbyAreas } = useAppLocation();
  const [query, setQuery] = useState("");
  const [locQuery, setLocQuery] = useState("");

  useEffect(() => {
    if (open) setLocQuery(location?.city || "");
    else setQuery("");
  }, [open, location?.city]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const lq = locQuery.trim().toLowerCase();
    return allStores
      .filter(s => (q ? (
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.specialties.some(x => x.toLowerCase().includes(q))
      ) : true))
      .filter(s => (lq ? (s.address.toLowerCase().includes(lq)) : true))
      .slice(0, 12);
  }, [query, locQuery]);

  const go = (id: number, category: string) => {
    onOpenChange(false);
    navigate(linkForStore({ id, category }));
  };

  const submitFirst: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && results[0]) {
      go(results[0].id, results[0].category);
    }
  };

  const presetCategories = [
    { label: "Men's Hair", q: "mens" },
    { label: "Women's Beauty", q: "beauty" },
    { label: "Nail Studios", q: "nail" },
    { label: "Makeup Artists", q: "makeup" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden sm:max-w-2xl" aria-label="Search dialog">
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="p-4 border-b bg-white">
          {/* Booksy-style stacked fields on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <div className="sm:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  autoFocus
                  placeholder="Search services, stores, or categories"
                  value={query}
                  onChange={(e)=> setQuery(e.target.value)}
                  onKeyDown={submitFirst}
                  className="pl-9 rounded-full"
                />
                {query && (
                  <button aria-label="Clear" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={()=> setQuery("")}> <X className="w-4 h-4"/> </button>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {presetCategories.map(p => (
                  <button key={p.label} onClick={()=> setQuery(p.q)} className="px-3 py-1.5 text-xs rounded-full border bg-white hover:bg-gray-50">
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Location (city/area)"
                  value={locQuery}
                  onChange={(e)=> setLocQuery(e.target.value)}
                  className="pl-9 rounded-full"
                />
                {locQuery && (
                  <button aria-label="Clear location" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={()=> setLocQuery("")}> <X className="w-4 h-4"/> </button>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 overflow-x-auto">
                <Button size="sm" variant="outline" className="rounded-full" onClick={()=> requestLocation()} disabled={isLoading}>
                  <Crosshair className="w-4 h-4 mr-1"/> {isLoading? 'Locating...' : 'Use GPS'}
                </Button>
                {nearbyAreas.slice(0,5).map(a => (
                  <button key={a} onClick={()=> { setLocQuery(a); setManualLocation(a); }} className="px-3 py-1.5 text-xs rounded-full border bg-white hover:bg-gray-50 whitespace-nowrap">{a}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-auto divide-y">
          {(!query && !locQuery) && (
            <div className="p-4 text-sm text-muted-foreground">Start typing to search stores and services. Use the location field to filter by area.</div>
          )}
          {results.length === 0 && (query || locQuery) && (
            <div className="p-4 text-sm text-muted-foreground">No results found.</div>
          )}
          {results.map(s => (
            <button key={s.id} className="w-full text-left px-4 py-3 hover:bg-accent/50" onClick={()=> go(s.id, s.category)}>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{s.name}</div>
                  <div className="text-xs text-muted-foreground truncate flex items-center gap-2">
                    <span className="inline-flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />{s.rating} ({s.reviews})</span>
                    <span>•</span>
                    <span>{categoryLabel(s.category)}</span>
                    <span>•</span>
                    <span>{s.address}</span>
                  </div>
                </div>
                <Badge variant="outline" className="whitespace-nowrap">View</Badge>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
