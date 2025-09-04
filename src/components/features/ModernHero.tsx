import { Link } from "react-router-dom";
import { Calendar, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchFiltersBar from "@/components/features/SearchFiltersBar";
import mensHero from "@/assets/mens-hair-hero.jpg";
import womensHero from "@/assets/womens-beauty-hero.jpg";
import nailsHero from "@/assets/nail-studio-hero.jpg";
import makeupHero from "@/assets/makeup-artist-hero.jpg";

const categories = [
  { key: "mens-hair", label: "Men's Hair", image: mensHero, href: "/mens-hair" },
  { key: "womens-beauty", label: "Women's Beauty", image: womensHero, href: "/womens-beauty" },
  { key: "nail-studios", label: "Nail Studios", image: nailsHero, href: "/nail-studios" },
  { key: "makeup-artists", label: "Makeup Artists", image: makeupHero, href: "/makeup-artists" },
] as const;

export default function ModernHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white" />
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-[-10%] h-[28rem] w-[28rem] rounded-full bg-purple-200/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-14">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs text-muted-foreground shadow-sm">
              <Sparkles className="mr-2 h-4 w-4 text-emerald-600" /> Transparent pricing • Instant booking
            </div>
            <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Book beauty & grooming near you
            </h1>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Clean, modern experience to find trusted professionals across all services.
            </p>

            {/* Filters card */}
            <div className="mt-6 rounded-3xl border bg-white p-4 shadow-xl ring-1 ring-black/5">
              <SearchFiltersBar />
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center"><Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" /> 4.8 avg rating</span>
                <span>•</span>
                <span>1M+ bookings</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="lg" className="px-6">
                <Calendar className="mr-2 h-5 w-5" /> Book now
              </Button>
              <span className="text-sm text-muted-foreground">No hidden fees</span>
            </div>
          </div>

          {/* Right: category gallery */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {categories.map((c) => (
              <Link key={c.key} to={c.href} className="group relative overflow-hidden rounded-3xl border bg-white shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md">
                <img src={c.image} alt={c.label} className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                  <div className="text-sm font-semibold drop-shadow">{c.label}</div>
                  <div className="rounded-full bg-white/20 px-2 py-0.5 text-xs backdrop-blur">Explore</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
