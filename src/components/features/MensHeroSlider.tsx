import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Scissors, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "@/contexts/LocationContext";
import salon1 from "@/assets/salon-1.jpg";
import salon2 from "@/assets/salon-2.jpg";
import salon3 from "@/assets/salon-3.jpg";

const mensServices = [
  {
    id: 1,
    image: salon1,
    title: "Classic Barbershop",
    subtitle: "Traditional cuts & shaves",
    service: "Haircut + Beard Trim",
    price: "₹349",
    duration: "60 min",
    rating: 4.9,
    gradient: "bg-gradient-to-r from-black/70 to-mens-primary/50",
    features: ["Hot Towel", "Traditional"]
  },
  {
    id: 2,
    image: salon2,
    title: "Modern Styling",
    subtitle: "Contemporary cuts",
    service: "Designer Cut",
    price: "₹549",
    duration: "75 min", 
    rating: 4.8,
    gradient: "bg-gradient-to-r from-slate-800/70 to-mens-primary/60",
    features: ["Modern", "Trendy"]
  },
  {
    id: 3,
    image: salon3,
    title: "Executive Grooming",
    subtitle: "Premium service",
    service: "Executive Package",
    price: "₹749",
    duration: "90 min",
    rating: 4.9,
    gradient: "bg-gradient-to-r from-gray-900/70 to-mens-primary/40",
    features: ["VIP", "Premium"]
  },
  {
    id: 4,
    image: salon1,
    title: "Express Service",
    subtitle: "Quick cuts",
    service: "Express Haircut",
    price: "₹199",
    duration: "30 min",
    rating: 4.6,
    gradient: "bg-gradient-to-r from-neutral-800/70 to-mens-primary/50", 
    features: ["Quick", "Walk-ins"]
  }
];

const MensHeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { location } = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mensServices.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mensServices.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mensServices.length) % mensServices.length);
  };

  const currentService = mensServices[currentSlide];

  return (
    <section className="relative h-[70vh] overflow-hidden bg-gray-900">
      {/* Background Image Container with proper scaling */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <img
            src={currentService.image}
            alt={currentService.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
            style={{
              minWidth: '100%',
              minHeight: '100%',
              objectPosition: 'center center'
            }}
          />
          <div className={`absolute inset-0 ${currentService.gradient} transition-all duration-1000`} />
        </div>
      </div>

      {/* Service Preview Cards - Positioned at Top */}
      <div className="absolute top-4 right-4 z-20 hidden lg:block">
        <div className="flex flex-col gap-1 w-56">
          {mensServices.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setCurrentSlide(index)}
              className={`cursor-pointer transition-all duration-300 p-2 rounded-md backdrop-blur-md border text-xs ${
                currentSlide === index
                  ? "bg-white/25 border-white/50 scale-105"
                  : "bg-white/10 border-white/20 hover:bg-white/15"
              }`}
            >
              <div className="flex items-center justify-between text-white">
                <div className="flex-1">
                  <h4 className="font-semibold text-xs">{service.service}</h4>
                  <p className="text-xs opacity-80">{service.duration}</p>
                </div>
                <div className="text-right ml-2">
                  <span className="font-bold text-xs">{service.price}</span>
                  <div className="flex items-center justify-end">
                    <Star className="w-2 h-2 mr-1 fill-current" />
                    <span className="text-xs">{service.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl">
            {/* Left Content */}
            <div className="text-white">
              <div className="flex items-center mb-3">
                <Badge className="bg-white/20 text-white border-white/30 mr-3 text-xs">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {currentService.rating}
                </Badge>
                <Badge variant="outline" className="bg-mens-primary text-white border-mens-primary text-xs">
                  <Scissors className="w-3 h-3 mr-1" />
                  Men's Grooming
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
                {currentService.title}
              </h1>
              
              <p className="text-lg md:text-xl mb-6 drop-shadow-md opacity-90">
                {currentService.subtitle}
              </p>

              {/* Service Details */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 mb-6 max-w-sm">
                <h3 className="text-lg font-bold mb-3">{currentService.service}</h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <span className="text-xl font-bold">{currentService.price}</span>
                    <span className="text-xs opacity-80 ml-1">from</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold">{currentService.duration}</span>
                    <span className="text-xs opacity-80 ml-1">duration</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {currentService.features.map((feature, index) => (
                    <Badge key={index} className="bg-white/20 text-white border-white/30 text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="default" 
                  className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-6 py-3 font-semibold"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Service
                </Button>
                <Button 
                  size="default"
                  variant="outline"
                  className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 px-6 py-3 font-semibold"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Nearby
                </Button>
              </div>

              {/* Location Info */}
              {location && (
                <div className="mt-4 flex items-center text-white/80 text-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>Available near {location.city || "your location"}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {mensServices.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-white scale-110" 
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Mobile Service Navigation */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 lg:hidden flex space-x-1">
        {mensServices.map((service, index) => (
          <button
            key={service.id}
            onClick={() => setCurrentSlide(index)}
            className={`px-2 py-1 rounded-full backdrop-blur-md border transition-all duration-300 text-xs ${
              currentSlide === index
                ? "bg-white text-gray-900 border-white"
                : "bg-white/20 text-white border-white/30 hover:bg-white/30"
            }`}
          >
            {service.service.split(" ")[0]}
          </button>
        ))}
      </div>
    </section>
  );
};

export default MensHeroSlider;
