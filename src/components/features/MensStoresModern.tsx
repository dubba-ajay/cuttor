import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Phone, Clock, Filter, Sparkles, ArrowRight } from "lucide-react";
import { allStores } from "./AllStores";

const priceTiers = [
  { value: "all", label: "All Prices" },
  { value: "₹", label: "₹ Budget" },
  { value: "₹₹", label: "₹₹ Moderate" },
  { value: "₹₹₹", label: "₹₹₹ Premium" },
] as const;

type PriceTier = typeof priceTiers[number]["value"];

type CategoryKey = "mens-hair" | "womens-beauty" | "nail-studios" | "makeup-artists";

type CategoryFilter = CategoryKey | "all";

export default function MensStoresModern({ category = "mens-hair" }: { category?: CategoryFilter }) {
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState<PriceTier>("all");
  const [sortBy, setSortBy] = useState<"rating" | "distance" | "price" | "reviews">("rating");

  const stores = useMemo(() => (category === "all" ? allStores : allStores.filter(s => s.category === category)), [category]);

  const labels: Record<CategoryFilter, { unit: string; placeholder: string }> = {
    "mens-hair": { unit: "barber", placeholder: "Search barbers, areas, or specialties" },
    "womens-beauty": { unit: "salon", placeholder: "Search salons, areas, or services" },
    "nail-studios": { unit: "studio", placeholder: "Search nail studios, areas, or services" },
    "makeup-artists": { unit: "artist", placeholder: "Search makeup artists, areas, or services" },
    "all": { unit: "store", placeholder: "Search stores, areas, or services" },
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = stores.filter(s =>
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.specialties.some(sp => sp.toLowerCase().includes(q))
    );
    if (price !== "all") list = list.filter(s => s.priceRange === price);
    list.sort((a, b) => {
      switch (sortBy) {
        case "rating": return b.rating - a.rating;
        case "distance": return parseFloat(a.distance) - parseFloat(b.distance);
        case "price": return a.priceRange.length - b.priceRange.length;
        case "reviews": return b.reviews - a.reviews;
        default: return 0;
      }
    });
    return list;
  }, [stores, price, sortBy, query]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Controls */}
        <div className="backdrop-blur bg-white/70 border rounded-2xl p-4 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative md:col-span-2">
              <Input
                placeholder={labels[category].placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11"
              />
            </div>
            <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
              <SelectTrigger className="h-11">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="distance">Nearest</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>
            <Select value={price} onValueChange={(v: any) => setPrice(v)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                {priceTiers.map(t => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            Showing {filtered.length} {labels[category].unit}{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((store) => (
            <Card key={store.id} className="group overflow-hidden border-0 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all bg-white">
              <div className="relative">
                <img src={store.image} alt={store.name} className="w-full h-52 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-white/20 text-white border-white/30 font-semibold">
                    <Star className="w-4 h-4 mr-1 fill-[#EAB308] text-[#EAB308]" />
                    {store.rating}
                  </Badge>
                  <Badge variant="outline" className="bg-black/30 text-white border-white/20">
                    {store.priceRange}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold drop-shadow-sm text-white">{store.name}</h3>
                    <span className="text-xs opacity-90">{store.distance}</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-white/90">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="truncate">{store.address}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {store.specialties.slice(0,3).map((sp, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {sp}
                    </Badge>
                  ))}
                  {store.specialties.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{store.specialties.length - 3} more</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center"><Clock className="w-4 h-4 mr-1" />{store.openHours}</div>
                  <div className="flex items-center"><Phone className="w-4 h-4 mr-1" />{store.phone}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link to={`/salon/${store.id}`}>
                    <Button className="w-full group bg-gradient-to-r from-[#EAB308] to-[#1E293B] hover:from-[#f3c336] hover:to-[#0b1625] text-white">
                      <Sparkles className="w-4 h-4 mr-2" />View & Book
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-white border-[#1E293B] text-[#1E293B] hover:bg-slate-50" onClick={() => window.open(`tel:${store.phone}`, "_self") }>
                    <Phone className="w-4 h-4 mr-2" />Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/all-stores">
            <Button size="lg" className="rounded-xl">
              Explore all stores <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
