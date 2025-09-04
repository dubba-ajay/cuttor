import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "@/contexts/LocationContext";
import SearchFiltersBar from "@/components/features/SearchFiltersBar";

const CleanHero = () => {
  const [query, setQuery] = useState("");
  const { location, requestLocation, isLoading } = useLocation();

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Book beauty and grooming services near you
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Transparent pricing, verified professionals, instant booking.
          </p>

          <div className="mb-4">
            <SearchFiltersBar compact />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search services, salons, or areas"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 h-12 text-base"
              />
            </div>
            {!location ? (
              <Button onClick={requestLocation} disabled={isLoading} className="h-12 px-6">
                <MapPin className="w-4 h-4 mr-2" /> {isLoading ? "Finding..." : "Use my location"}
              </Button>
            ) : (
              <Button className="h-12 px-6">
                Search
              </Button>
            )}
          </div>

          {location && (
            <div className="text-sm text-muted-foreground flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-primary" />
              Showing results for {location.city}, India
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CleanHero;
