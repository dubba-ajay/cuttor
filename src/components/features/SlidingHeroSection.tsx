import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Search, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "@/contexts/LocationContext";
import mensHairHero from "@/assets/mens-hair-hero.jpg";
import womensBeautyHero from "@/assets/womens-beauty-hero.jpg";
import nailStudioHero from "@/assets/nail-studio-hero.jpg";
import makeupArtistHero from "@/assets/makeup-artist-hero.jpg";

const heroSlides = [
  {
    id: 1,
    image: mensHairHero,
    title: "Men's Hair & Grooming",
    subtitle: "Professional grooming services",
    description: "Expert cuts, beard styling and traditional grooming for modern Indian men",
    category: "mens",
    gradient: "bg-gradient-to-br from-orange-600 via-red-700 to-amber-800",
    link: "/mens-hair",
    nearbyCount: 150,
    avgPrice: "₹200-800",
    popularServices: ["Hair Cut", "Beard Styling", "Face Treatment"]
  },
  {
    id: 2,
    image: womensBeautyHero,
    title: "Women's Hair & Beauty",
    subtitle: "Beauty treatments & styling",
    description: "Complete beauty solutions from hair to skincare with traditional and modern services",
    category: "womens",
    gradient: "bg-gradient-to-br from-pink-600 via-rose-700 to-red-800",
    link: "/womens-beauty",
    nearbyCount: 200,
    avgPrice: "₹300-2000",
    popularServices: ["Hair Styling", "Facial", "Bridal Makeup"]
  },
  {
    id: 3,
    image: nailStudioHero,
    title: "Nail Studios",
    subtitle: "Nail care & art",
    description: "Creative nail art and premium manicure services with latest trends",
    category: "nails",
    gradient: "bg-gradient-to-br from-purple-600 via-violet-700 to-indigo-800",
    link: "/nail-studios",
    nearbyCount: 80,
    avgPrice: "₹150-900",
    popularServices: ["Manicure", "Pedicure", "Nail Art"]
  },
  {
    id: 4,
    image: makeupArtistHero,
    title: "Makeup Artists",
    subtitle: "Professional makeup",
    description: "Perfect looks for weddings, parties and special occasions with professional services",
    category: "makeup",
    gradient: "bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800",
    link: "/makeup-artists",
    nearbyCount: 60,
    avgPrice: "₹500-3000",
    popularServices: ["Bridal Makeup", "Party Makeup", "Pre-Wedding"]
  }
];

const SlidingHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { location, requestLocation, isLoading } = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <section className="relative h-[70vh] overflow-hidden bg-gradient-to-br from-orange-50 to-red-50">
      {/* Background Image Container with Indian design overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <img
            src={currentHero.image}
            alt={currentHero.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
            style={{
              minWidth: '100%',
              minHeight: '100%',
              objectPosition: 'center center'
            }}
          />
          <div className={`absolute inset-0 ${currentHero.gradient} opacity-75 transition-all duration-1000`} />
          
          {/* Indian pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-500/10 to-red-500/20" />
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-300">
              <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full text-orange-300">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="50" cy="50" r="20" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-5xl mx-auto">
          {/* Location Badge with Indian style */}
          {location && (
            <div className="mb-4 flex justify-center">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-sm px-4 py-2 shadow-lg">
                <MapPin className="w-4 h-4 mr-2" />
                📍 {location.city || "Near You"}
              </Badge>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
            {currentHero.title}
          </h1>
          <p className="text-lg md:text-xl mb-3 drop-shadow-md opacity-95 font-medium">
            {currentHero.subtitle}
          </p>
          <p className="text-sm md:text-base mb-6 drop-shadow-md opacity-90 max-w-3xl mx-auto leading-relaxed">
            {currentHero.description}
          </p>

          {/* Service Stats with Indian styling */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-md border border-orange-300/30 rounded-xl px-4 py-3 shadow-lg">
              <span className="text-2xl font-bold text-yellow-200">{currentHero.nearbyCount}+</span>
              <span className="text-sm opacity-90 ml-2 font-medium">Salons</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md border border-orange-300/30 rounded-xl px-4 py-3 shadow-lg">
              <span className="text-lg font-bold text-green-200">{currentHero.avgPrice}</span>
              <span className="text-sm opacity-90 ml-2 font-medium">Starting</span>
            </div>
          </div>

          {/* Popular Services Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {currentHero.popularServices.map((service, index) => (
              <Badge key={index} className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 border-0 font-semibold px-3 py-1">
                {service}
              </Badge>
            ))}
          </div>

          {/* Action Buttons with Indian style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            {!location ? (
              <Button 
                size="lg" 
                onClick={requestLocation}
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 px-8 py-4 font-bold shadow-lg text-lg"
              >
                <Navigation className="w-5 h-5 mr-2" />
                {isLoading ? "Finding Location..." : "🔍 Find Nearby Salons"}
              </Button>
            ) : (
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 px-8 py-4 font-bold shadow-lg text-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                {currentHero.nearbyCount}+ Salons Available
              </Button>
            )}
            
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 px-8 py-4 font-bold shadow-lg text-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              🚀 Book Instantly
            </Button>
          </div>

          {/* Location Message */}
          {location && (
            <p className="text-white/90 text-sm font-medium bg-black/20 rounded-full px-4 py-2 inline-block">
              <MapPin className="w-4 h-4 inline mr-1" />
              📍 Available in {location.city || "Your Area"}
            </p>
          )}
        </div>
      </div>

      {/* Navigation Arrows with Indian style */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators with Indian colors */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 shadow-lg ${
              currentSlide === index 
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 scale-125" 
                : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Service Category Cards Preview with Indian style */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 hidden lg:flex space-x-3">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`px-6 py-3 rounded-full backdrop-blur-md border transition-all duration-300 text-sm font-semibold shadow-lg ${
              currentSlide === index
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 border-yellow-300 scale-110"
                : "bg-white/20 text-white border-white/30 hover:bg-white/30"
            }`}
          >
            <div className="flex items-center">
              <span className="font-bold">{slide.title.split(" ")[0]}</span>
              {currentSlide === index && (
                <span className="ml-2 text-xs opacity-80">
                  {slide.nearbyCount}+ Salons
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default SlidingHeroSection;
