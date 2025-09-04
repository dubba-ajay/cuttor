import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type CategoryKey = "mens-hair" | "womens-beauty" | "nail-studios" | "makeup-artists";

const DATA: Record<CategoryKey, { id: number; name: string; image: string; rating: number; service: string; price: string; location: string; }[]> = {
  "mens-hair": [
    { id: 101, name: "Elite Men's Grooming", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop", rating: 4.9, service: "Premium Haircut", price: "₹500", location: "Connaught Place" },
    { id: 102, name: "Classic Barbershop", image: "https://images.unsplash.com/photo-1512699355324-1ea38cf9f3f5?q=80&w=1600&auto=format&fit=crop", rating: 4.7, service: "Beard Grooming", price: "₹299", location: "Park Street" },
    { id: 103, name: "Premium Men's Studio", image: "https://images.unsplash.com/photo-1503951458645-643d53bfd90f?q=80&w=1600&auto=format&fit=crop", rating: 4.8, service: "Hair Color", price: "₹1999", location: "Uptown" },
  ],
  "womens-beauty": [
    { id: 201, name: "Elegance Beauty Studio", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1600", rating: 4.9, service: "Hair Styling", price: "₹800", location: "Khan Market" },
    { id: 202, name: "Glamour Hair & Beauty", image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&q=80&w=1600", rating: 4.7, service: "Bridal Package", price: "₹3500", location: "Bandra" },
    { id: 203, name: "Divine Beauty Lounge", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1600", rating: 4.8, service: "Luxury Facial", price: "₹2000", location: "CP Metro" },
  ],
  "nail-studios": [
    { id: 301, name: "Nail Art Studio", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1600&auto=format&fit=crop", rating: 4.8, service: "Gel Manicure", price: "₹599", location: "Koramangala" },
    { id: 302, name: "Polish Perfect", image: "https://images.unsplash.com/photo-1610992015732-9db8b1c1a1b5?q=80&w=1600&auto=format&fit=crop", rating: 4.9, service: "Spa Pedicure", price: "₹699", location: "City Center" },
    { id: 303, name: "Nail Couture", image: "https://images.unsplash.com/photo-1613940102133-5c21e9cc8b82?q=80&w=1600&auto=format&fit=crop", rating: 4.7, service: "Extensions", price: "₹1499", location: "Indiranagar" },
  ],
  "makeup-artists": [
    { id: 401, name: "Glamour Makeup Studio", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1600", rating: 4.9, service: "Party Makeup", price: "₹1999", location: "Hi-Tech City" },
    { id: 402, name: "Beauty Canvas", image: "https://images.unsplash.com/photo-1601042879364-f3947d3f9a3d?auto=format&fit=crop&q=80&w=1600", rating: 4.8, service: "Bridal Makeup", price: "₹4999", location: "City Center" },
    { id: 403, name: "Studio Luxe", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1600", rating: 4.7, service: "Hair Styling", price: "₹799", location: "Jubilee Hills" },
  ],
};

export default function CategoryHeroSlider({ category, showTabs = true }: { category: CategoryKey; showTabs?: boolean }) {
  const [cat, setCat] = useState<CategoryKey>(category);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(() => DATA[cat], [cat]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [cat]);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);

  const current = slides[currentSlide];

  const tabs: { key: CategoryKey; label: string }[] = [
    { key: "mens-hair", label: "Men's Hair" },
    { key: "womens-beauty", label: "Women's Beauty" },
    { key: "nail-studios", label: "Nail Studios" },
    { key: "makeup-artists", label: "Makeup Artists" },
  ];

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={current.image} alt={current.name} className="w-full h-full object-cover transition-all duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Category Tabs (optional) */}
      {showTabs && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/20">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setCat(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cat === t.key ? "bg-white text-gray-900" : "text-white hover:bg-white/20"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-6 pb-16">
          <div className="text-white max-w-2xl">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
              {current.rating} Rating
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 drop-shadow-lg">{current.name}</h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">{current.service} • {current.location}</p>
            <div className="flex items-center gap-6 mb-6">
              <span className="text-3xl md:text-4xl font-bold drop-shadow-md">{current.price}</span>
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 font-semibold">
                <Calendar className="w-5 h-5 mr-2" /> Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)} className={`w-3 h-3 rounded-full ${currentSlide === i ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"}`} />
        ))}
      </div>
    </section>
  );
}
