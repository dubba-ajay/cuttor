import { allStores } from "./AllStores";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Sparkles, IndianRupee } from "lucide-react";

const categories = [
  { key: "mens-hair", label: "Men's Hair" },
  { key: "womens-beauty", label: "Women's Beauty" },
  { key: "nail-studios", label: "Nail Studios" },
  { key: "makeup-artists", label: "Makeup Artists" },
] as const;

const priceMap: Record<string, number> = { "₹": 200, "₹₹": 500, "₹₹₹": 1200 };

function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function HomeAvailabilityPackages() {
  const byCategory = categories.map((c) => {
    const stores = allStores.filter((s) => s.category === c.key);
    const count = stores.length;
    const minFrom = stores.length
      ? Math.min(...stores.map((s) => priceMap[s.priceRange] || 500))
      : 0;
    return { ...c, count, minFrom };
  });

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {byCategory.map((c) => (
            <Card key={c.key} className="rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">{c.label}</div>
                  <Badge variant="secondary" className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1" /> {c.count} available
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">Packages from</div>
                <div className="mt-1 text-2xl font-bold flex items-center">
                  <IndianRupee className="w-5 h-5 mr-1" /> {formatINR(c.minFrom)}
                </div>
                <div className="mt-3 text-xs text-muted-foreground flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> Transparent pricing • No hidden fees
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
