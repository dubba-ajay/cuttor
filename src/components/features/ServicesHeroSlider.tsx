import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SearchFiltersBar from "@/components/features/SearchFiltersBar";
import mensHero from "@/assets/mens-hair-hero.jpg";
import womensHero from "@/assets/womens-beauty-hero.jpg";
import nailsHero from "@/assets/nail-studio-hero.jpg";
import makeupHero from "@/assets/makeup-artist-hero.jpg";

const slides = [
  { key: "mens-hair", title: "Men's Hair", href: "/mens-hair", image: mensHero, blurb: "Top barbers and salons for fades, trims, and styling." },
  { key: "womens-beauty", title: "Women's Beauty", href: "/womens-beauty", image: womensHero, blurb: "Hair, skin, and spa services from trusted pros." },
  { key: "nail-studios", title: "Nail Studios", href: "/nail-studios", image: nailsHero, blurb: "Manicure, pedicure, nail art, and more." },
  { key: "makeup-artists", title: "Makeup Artists", href: "/makeup-artists", image: makeupHero, blurb: "Party, bridal, and editorial makeup specialists." },
] as const;

export default function ServicesHeroSlider() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white" />
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-[-10%] h-[28rem] w-[28rem] rounded-full bg-purple-200/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="mb-6 inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs text-muted-foreground shadow-sm">
          <Sparkles className="mr-2 h-4 w-4 text-emerald-600" /> Transparent pricing • Instant booking
        </div>

        <div className="rounded-3xl border bg-white/60 backdrop-blur-xl p-4 shadow-xl ring-1 ring-black/5">
          <SearchFiltersBar />
        </div>

        <div className="mt-8">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {slides.map((s) => (
                <CarouselItem key={s.key} className="basis-full lg:basis-1/2 xl:basis-1/2">
                  <Link to={s.href} className="group relative block overflow-hidden rounded-3xl border bg-white shadow-sm ring-1 ring-black/5">
                    <img src={s.image} alt={s.title} className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h2 className="text-2xl font-bold drop-shadow-md">{s.title}</h2>
                      <p className="mt-1 text-sm opacity-90 drop-shadow">{s.blurb}</p>
                      <span className="mt-3 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur transition-colors group-hover:bg-white/30">Explore</span>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
