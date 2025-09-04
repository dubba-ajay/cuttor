import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, Star } from "lucide-react";
import { allStores } from "@/components/features/AllStores";
import { useLocation as useAppLocation } from "@/contexts/LocationContext";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();
  const { location, requestLocation } = useAppLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      if (user && !location?.latitude) requestLocation();
    } else {
      setQuery("");
    }
  }, [open, user, location?.latitude, requestLocation]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const city = (location?.city || "").toLowerCase();

    const stores = allStores
      .filter(s => (q ? (
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.specialties.some(x => x.toLowerCase().includes(q))
      ) : true))
      .filter(s => (city ? s.address.toLowerCase().includes(city) : true));

    // categories
    const categoryDefs = [
      { key: "mens-hair", label: "Men's Hair", path: "/mens-hair" },
      { key: "womens-beauty", label: "Women's Beauty", path: "/womens-beauty" },
      { key: "nail-studios", label: "Nail Studios", path: "/nail-studios" },
      { key: "makeup-artists", label: "Makeup Artists", path: "/makeup-artists" },
    ];
    const categories = categoryDefs.filter(c => !q || c.label.toLowerCase().includes(q) || c.key.includes(q));

    // services (from specialties across stores)
    const svcMap = new Map<string, string>(); // service -> category key (dominant)
    allStores.forEach(s => s.specialties.forEach(sp => {
      const k = sp.trim();
      const prev = svcMap.get(k) || s.category;
      // simple heuristic: prefer existing, else current
      svcMap.set(k, prev);
    }));
    const services = Array.from(svcMap.entries())
      .filter(([name]) => q && name.toLowerCase().includes(q))
      .map(([name, cat]) => ({ name, category: cat }));

    return {
      stores: stores.slice(0, 12),
      categories,
      services: services.slice(0, 8),
    };
  }, [query, location?.city]);

  const go = (id: number, category: string) => {
    onOpenChange(false);
    navigate(linkForStore({ id, category }));
  };

  const submitFirst: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      if (results.stores[0]) return go(results.stores[0].id, results.stores[0].category);
      if (results.services[0]) {
        const svc = results.services[0];
        const match = allStores.find(s => s.category === svc.category && s.specialties.includes(svc.name));
        if (match) return go(match.id, match.category);
      }
      if (results.categories[0]) {
        onOpenChange(false);
        return navigate(results.categories[0].path);
      }
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              autoFocus
              placeholder="Search services, stores, or categories"
              value={query}
              onChange={(e)=> setQuery(e.target.value)}
              onKeyDown={submitFirst}
              className="pl-9 rounded-full shadow"
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
          {location?.city && (
            <div className="mt-2 text-xs text-muted-foreground">Results near <span className="font-medium">{location.city}</span></div>
          )}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-auto">
          {!query && (
            <div className="p-4 text-sm text-muted-foreground">Start typing to search stores and services.</div>
          )}

          {/* Categories */}
          {results.categories.length > 0 && (
            <div className="py-2">
              <div className="px-4 pb-1 text-xs font-semibold text-muted-foreground">Categories</div>
              {results.categories.map(c => (
                <button key={c.key} className="w-full text-left px-4 py-2 hover:bg-accent/50" onClick={()=> { onOpenChange(false); navigate(c.path); }}>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{c.label}</div>
                    <Badge variant="outline">Open</Badge>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Services */}
          {results.services.length > 0 && (
            <div className="py-2">
              <div className="px-4 pb-1 text-xs font-semibold text-muted-foreground">Services</div>
              {results.services.map(svc => (
                <button key={svc.name} className="w-full text-left px-4 py-2 hover:bg-accent/50" onClick={()=> {
                  const match = allStores.find(s => s.category === svc.category && s.specialties.includes(svc.name));
                  if (match) go(match.id, match.category);
                }}>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{svc.name}</div>
                    <Badge variant="outline">{categoryLabel(svc.category)}</Badge>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Stores */}
          {results.stores.length > 0 && (
            <div className="py-2">
              <div className="px-4 pb-1 text-xs font-semibold text-muted-foreground">Stores</div>
              {results.stores.map(s => (
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
          )}

          {query && results.categories.length + results.services.length + results.stores.length === 0 && (
            <div className="p-4 text-sm text-muted-foreground">No results found.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
