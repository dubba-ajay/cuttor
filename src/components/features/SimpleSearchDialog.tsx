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

// map common phrases -> category
const categoryFromQuery = (q: string): string | null => {
  const t = q.toLowerCase();
  if ((/men|male|barber|groom|haircut/.test(t)) && /hair|cut|barber|groom/.test(t)) return "mens-hair";
  if (/(women|ladies|female).*(beauty|salon|hair|spa)/.test(t) || /(makeup)/.test(t)) return "womens-beauty";
  if (/(nail|manicure|pedicure|gel|extensions)/.test(t)) return "nail-studios";
  if (/(makeup|bridal|party makeup|artist)/.test(t)) return "makeup-artists";
  return null;
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

    if (!q) {
      return { stores: [], categories: [], services: [] };
    }

    const inferredCategory = categoryFromQuery(q);

    // base store matches
    const baseStores = allStores.filter(s => (
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.specialties.some(x => x.toLowerCase().includes(q)) ||
      (inferredCategory ? s.category === inferredCategory : false)
    ));

    // apply city filter if it yields any results; otherwise fall back
    const cityFiltered = city ? baseStores.filter(s => s.address.toLowerCase().includes(city)) : baseStores;
    const chosenStores = city && cityFiltered.length > 0 ? cityFiltered : baseStores;

    // score and sort stores to prioritize exact name matches
    const score = (s: typeof allStores[number]) => {
      const name = s.name.toLowerCase();
      let sc = 0;
      if (name === q) sc += 100;
      if (name.startsWith(q)) sc += 80;
      if (name.includes(q)) sc += 60;
      if (s.specialties.some(x => x.toLowerCase().includes(q))) sc += 40;
      if (s.description.toLowerCase().includes(q) || s.address.toLowerCase().includes(q)) sc += 20;
      if (inferredCategory && s.category === inferredCategory) sc += 10;
      return sc;
    };
    const stores = chosenStores.sort((a, b) => score(b) - score(a));

    const categoryDefs = [
      { key: "mens-hair", label: "Men's Hair", path: "/mens-hair" },
      { key: "womens-beauty", label: "Women's Beauty", path: "/womens-beauty" },
      { key: "nail-studios", label: "Nail Studios", path: "/nail-studios" },
      { key: "makeup-artists", label: "Makeup Artists", path: "/makeup-artists" },
    ];
    const categories = categoryDefs.filter(c => c.label.toLowerCase().includes(q) || c.key.includes(q) || c.key === inferredCategory);

    // services (from specialties across stores)
    const svcMap = new Map<string, string>();
    allStores.forEach(s => s.specialties.forEach(sp => {
      const k = sp.trim();
      const prev = svcMap.get(k) || s.category;
      svcMap.set(k, prev);
    }));
    const services = Array.from(svcMap.entries())
      .filter(([name]) => name.toLowerCase().includes(q))
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
      <DialogContent className="p-0 overflow-hidden left-0 top-0 translate-x-0 translate-y-0 w-full rounded-none sm:max-w-none" aria-label="Search dialog">
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="bg-white border-b">
          <div className="px-4 lg:px-6 py-3">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
              <Input
                autoFocus
                placeholder="Search services, stores, or categories"
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                onKeyDown={submitFirst}
                className="w-full pl-12 rounded-full shadow h-14 text-lg border-2 border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-600"
              />
              {query && (
                <button aria-label="Clear" className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600/80" onClick={()=> setQuery("")}> <X className="w-4 h-4"/> </button>
              )}
            </div>
            {query && (
              <div className="mt-2 flex flex-wrap gap-2">
                {presetCategories.map(p => (
                  <button key={p.label} onClick={()=> setQuery(p.q)} className="px-3 py-1.5 text-xs rounded-full border bg-white hover:bg-gray-50">
                    {p.label}
                  </button>
                ))}
              </div>
            )}
            {query && location?.city && (
              <div className="mt-2 text-xs text-muted-foreground">Results near <span className="font-medium">{location.city}</span></div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[70vh] overflow-auto">
          {query && (
            <div className="container mx-auto px-4 lg:px-6">
              {results.stores.length > 0 && (
                <div className="py-2 max-w-screen-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
                  <div className="px-0 pb-1 text-xs font-semibold text-muted-foreground">Stores</div>
                  {results.stores.map(s => (
                    <button key={s.id} className="w-full text-left px-4 py-3 hover:bg-accent/50 rounded-md" onClick={()=> go(s.id, s.category)}>
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

              {results.categories.length > 0 && (
                <div className="py-2 max-w-screen-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
                  <div className="px-0 pb-1 text-xs font-semibold text-muted-foreground">Categories</div>
                  {results.categories.map(c => (
                    <button key={c.key} className="w-full text-left px-4 py-2 hover:bg-accent/50 rounded-md" onClick={()=> { onOpenChange(false); navigate(c.path); }}>
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{c.label}</div>
                        <Badge variant="outline">Open</Badge>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {results.services.length > 0 && (
                <div className="py-2 max-w-screen-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
                  <div className="px-0 pb-1 text-xs font-semibold text-muted-foreground">Services</div>
                  {results.services.map(svc => (
                    <button key={svc.name} className="w-full text-left px-4 py-2 hover:bg-accent/50 rounded-md" onClick={()=> {
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

              {results.categories.length + results.services.length + results.stores.length === 0 && (
                <div className="p-4 text-sm text-muted-foreground max-w-screen-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">No results found.</div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
