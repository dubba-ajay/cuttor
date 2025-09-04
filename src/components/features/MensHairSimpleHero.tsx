import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const topStores = [
  {
    id: 1,
    name: "Elite Men's Grooming",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    service: "Premium Hair Cut",
    price: "₹450",
    location: "Connaught Place"
  },
  {
    id: 2,
    name: "Classic Barbershop",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    service: "Traditional Cut",
    price: "₹250",
    location: "Khan Market"
  },
  {
    id: 3,
    name: "Modern Men's Studio",
    image: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    service: "Designer Cut",
    price: "₹600",
    location: "Select City Walk"
  }
];

const MensHairSimpleHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % topStores.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % topStores.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + topStores.length) % topStores.length);
  };

  const currentStore = topStores[currentSlide];

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentStore.image}
          alt={currentStore.name}
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-1000" />
      </div>

      {/* Simple Text Overlay */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-6 pb-16">
          <div className="text-white max-w-2xl">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
              {currentStore.rating} Rating
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 drop-shadow-lg">
              {currentStore.name}
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              {currentStore.service} • {currentStore.location}
            </p>
            
            <div className="flex items-center gap-6 mb-6">
              <span className="text-3xl md:text-4xl font-bold drop-shadow-md">
                {currentStore.price}
              </span>
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-8 py-3 font-semibold"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {topStores.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-white scale-110" 
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Store Preview Pills */}
      <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
        {topStores.map((store, index) => (
          <button
            key={store.id}
            onClick={() => setCurrentSlide(index)}
            className={`px-4 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 text-sm font-medium ${
              currentSlide === index
                ? "bg-white text-gray-900 border-white"
                : "bg-white/20 text-white border-white/30 hover:bg-white/30"
            }`}
          >
            {store.name.split(' ')[0]}
          </button>
        ))}
      </div>
    </section>
  );
};

export default MensHairSimpleHero;
