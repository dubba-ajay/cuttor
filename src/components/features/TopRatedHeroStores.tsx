import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Clock } from "lucide-react";
import { allStores } from "./AllStores";

const categories: { key: "mens-hair" | "womens-beauty" | "nail-studios" | "makeup-artists"; label: string }[] = [
  { key: "mens-hair", label: "Men's Hair" },
  { key: "womens-beauty", label: "Women's Beauty" },
  { key: "nail-studios", label: "Nail Studios" },
  { key: "makeup-artists", label: "Makeup Artists" },
];

const getCategoryLink = (store: any) => {
  switch (store.category) {
    case "mens-hair":
      return `/salon/${store.id}`;
    case "womens-beauty":
      return `/womens-beauty/salon/${store.id}`;
    case "nail-studios":
      return `/nail-studios/salon/${store.id}`;
    case "makeup-artists":
      return `/makeup-artists/salon/${store.id}`;
    default:
      return `/salon/${store.id}`;
  }
};

export default function TopRatedHeroStores() {
  const picks = categories
    .map((c) => {
      const stores = allStores.filter((s) => s.category === c.key);
      const top = [...stores].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)[0];
      return top ? { ...top, catLabel: c.label } : null;
    })
    .filter(Boolean) as (typeof allStores[number] & { catLabel: string })[];

  if (picks.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold">Top rated stores</h3>
        <div className="text-sm text-muted-foreground">Across all services</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {picks.map((store) => (
          <Card key={`${store.category}-${store.id}`} className="group overflow-hidden border-0 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all bg-white">
            <div className="relative h-40">
              <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-white/20 text-white border-white/30 font-semibold">
                  <Star className="w-3 h-3 mr-1 fill-[#EAB308] text-[#EAB308]" />
                  {store.rating}
                </Badge>
                <Badge variant="outline" className="bg-black/30 text-white border-white/20">
                  {store.priceRange}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold truncate" title={store.name}>{store.name}</h3>
                  <span className="text-xs opacity-90">{store.distance}</span>
                </div>
                <div className="mt-1 flex items-center text-xs text-white/90">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="truncate">{store.address}</span>
                </div>
              </div>
            </div>
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs text-[#0F172A] border-slate-200">{store.catLabel}</Badge>
                <div className="flex items-center text-xs text-[#6B7280]">
                  <Clock className="w-3 h-3 mr-1" />{store.openHours}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {store.specialties.slice(0,3).map((sp, i) => (
                  <Badge key={i} variant="outline" className="text-[10px]">
                    {sp}
                  </Badge>
                ))}
                {store.specialties.length > 3 && (
                  <Badge variant="outline" className="text-[10px]">+{store.specialties.length - 3} more</Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link to={getCategoryLink(store)}>
                  <Button size="sm" className="w-full group bg-gradient-to-r from-[#EAB308] to-[#1E293B] hover:from-[#f3c336] hover:to-[#0b1625] text-white">View & Book</Button>
                </Link>
                <Button size="sm" variant="outline" className="w-full bg-white border-[#1E293B] text-[#1E293B] hover:bg-slate-50" onClick={() => window.open(`tel:${store.phone}`, "_self") }>
                  <Phone className="w-3 h-3 mr-1" />Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
