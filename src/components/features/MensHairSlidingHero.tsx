import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, MapPin, Calendar, Clock, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "@/contexts/LocationContext";

const heroSlides = [
  {
    id: 1,
    title: "Elite Men's Grooming Studio",
    subtitle: "Premium cuts & styling",
    description: "Experience luxury grooming with master barbers and premium products",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-600 via-purple-600 to-indigo-700",
    location: "Connaught Place, Delhi",
    rating: 4.9,
    reviews: 1234,
    services: [
      { name: "Premium Hair Cut", price: "₹450", duration: "45 min" },
      { name: "Beard Styling", price: "₹300", duration: "30 min" },
      { name: "Hot Towel Shave", price: "₹350", duration: "40 min" }
    ],
    stats: { barbers: "12+ Expert", bookings: "500+ this month", rating: "4.9/5" },
    specialOffer: "First visit 20% off"
  },
  {
    id: 2,
    title: "Classic Barbershop Experience",
    subtitle: "Traditional meets modern",
    description: "Authentic barbering traditions with contemporary styling techniques",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gradient: "from-orange-600 via-red-600 to-pink-700",
    location: "Khan Market, Delhi",
    rating: 4.8,
    reviews: 892,
    services: [
      { name: "Classic Hair Cut", price: "₹250", duration: "30 min" },
      { name: "Beard Trim", price: "₹200", duration: "25 min" },
      { name: "Complete Grooming", price: "₹500", duration: "60 min" }
    ],
    stats: { barbers: "8+ Master", bookings: "350+ this month", rating: "4.8/5" },
    specialOffer: "Student discount 15%"
  },
  {
    id: 3,
    title: "Modern Men's Salon",
    subtitle: "Contemporary styling hub",
    description: "Latest trends and techniques for the modern gentleman",
    image: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gradient: "from-green-600 via-teal-600 to-blue-700",
    location: "Select City Walk, Saket",
    rating: 4.9,
    reviews: 756,
    services: [
      { name: "Designer Cut", price: "₹600", duration: "50 min" },
      { name: "Hair Styling", price: "₹400", duration: "35 min" },
      { name: "Luxury Package", price: "₹1200", duration: "90 min" }
    ],
    stats: { barbers: "15+ Stylists", bookings: "450+ this month", rating: "4.9/5" },
    specialOffer: "Weekend special 25% off"
  },
  {
    id: 4,
    title: "Gentleman's Grooming Lounge",
    subtitle: "Executive styling services",
    description: "Premium grooming for business professionals and executives",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gradient: "from-purple-600 via-indigo-600 to-blue-700",
    location: "Cyber Hub, Gurgaon",
    rating: 4.8,
    reviews: 643,
    services: [
      { name: "Executive Cut", price: "₹550", duration: "45 min" },
      { name: "Business Styling", price: "₹450", duration: "40 min" },
      { name: "VIP Package", price: "₹1500", duration: "120 min" }
    ],
    stats: { barbers: "10+ Experts", bookings: "300+ this month", rating: "4.8/5" },
    specialOffer: "Corporate membership available"
  }
];

const MensHairSlidingHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { location } = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

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
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentHero.image}
          alt={currentHero.title}
          className="w-full h-full object-cover transition-all duration-1000"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${currentHero.gradient} opacity-85`}></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              {/* Top Badge */}
              <div className="flex items-center space-x-4">
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 font-semibold backdrop-blur-sm">
                  <Star className="w-4 h-4 mr-2 fill-current text-yellow-300" />
                  Top-rated in {location?.city || "Delhi"}
                </Badge>
                <Badge className="bg-orange-500 text-white px-3 py-1 font-semibold">
                  {currentHero.specialOffer}
                </Badge>
              </div>

              {/* Main Content */}
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                  {currentHero.title}
                </h1>
                <p className="text-xl md:text-2xl mb-3 opacity-95 font-medium">
                  {currentHero.subtitle}
                </p>
                <p className="text-lg mb-6 opacity-90 leading-relaxed max-w-2xl">
                  {currentHero.description}
                </p>
              </div>

              {/* Location & Rating */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{currentHero.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-current text-yellow-300" />
                  <span className="font-bold">{currentHero.rating}</span>
                  <span className="opacity-90">({currentHero.reviews} reviews)</span>
                </div>
              </div>

              {/* Quick Services */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentHero.services.map((service, index) => (
                  <div key={index} className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <h3 className="font-bold text-lg mb-1">{service.name}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-yellow-300 font-bold">{service.price}</span>
                      <span className="opacity-90">{service.duration}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">{currentHero.stats.barbers}</div>
                  <div className="text-sm opacity-90">Barbers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">{currentHero.stats.bookings}</div>
                  <div className="text-sm opacity-90">Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">{currentHero.stats.rating}</div>
                  <div className="text-sm opacity-90">Rating</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Button>
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl">
                  <MapPin className="w-5 h-5 mr-2" />
                  View Location
                </Button>
              </div>
            </div>

            {/* Right Content - Service Cards */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Popular Services</h3>
                  <p className="text-white/90">Most booked this week</p>
                </div>
                
                <div className="space-y-4">
                  {currentHero.services.map((service, index) => (
                    <div key={index} className="bg-white/15 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white">{service.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-white/80">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-yellow-300">{service.price}</div>
                        <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold mt-2">
                          Book
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-yellow-300" />
                      <span className="text-white font-medium">Verified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-green-300" />
                      <span className="text-white font-medium">Top Rated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Store Preview Cards */}
      <div className="absolute bottom-8 right-8 z-20 hidden xl:flex space-x-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`p-3 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
              currentSlide === index
                ? "bg-white/30 border-white/50 scale-110"
                : "bg-white/10 border-white/20 hover:bg-white/20"
            }`}
          >
            <div className="text-white text-center">
              <div className="text-xs font-bold">{slide.title.split(' ')[0]}</div>
              <div className="text-xs opacity-80">{slide.rating}★</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default MensHairSlidingHero;
