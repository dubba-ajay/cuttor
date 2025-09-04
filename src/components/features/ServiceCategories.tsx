import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Star, TrendingUp, Users, Sparkles, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "@/contexts/LocationContext";

const categories = [
  {
    id: "mens-hair",
    title: "Men's Hair & Grooming",
    subtitle: "Professional grooming for modern men",
    description: "Expert cuts, beard styling, and traditional grooming services",
    gradient: "from-orange-600 via-red-600 to-amber-700",
    services: ["Hair Cut", "Beard Styling", "Face Treatment", "Hair Wash", "Head Massage", "Mustache Trim"],
    duration: "30-90 min",
    priceRange: "₹200-800",
    rating: 4.8,
    link: "/mens-hair",
    nearbyCount: 150,
    totalBookings: "25k",
    isPopular: true,
    features: ["Walk-ins Welcome", "Expert Barbers", "Premium Products"],
    icon: "💈",
    stats: { professionals: 1200, avgRating: 4.8, completedServices: 45000 }
  },
  {
    id: "womens-beauty",
    title: "Women's Hair & Beauty", 
    subtitle: "Complete beauty transformation",
    description: "Hair styling, facials, bridal makeup and complete beauty packages",
    gradient: "from-pink-600 via-rose-600 to-red-700",
    services: ["Hair Styling", "Facial", "Bridal Makeup", "Threading", "Hair Color", "Manicure"],
    duration: "45-180 min",
    priceRange: "₹300-2500",
    rating: 4.9,
    link: "/womens-beauty",
    nearbyCount: 200,
    totalBookings: "41k",
    isTrending: true,
    features: ["Luxury Treatments", "Latest Trends", "Bridal Specialists"],
    icon: "💄",
    stats: { professionals: 1800, avgRating: 4.9, completedServices: 62000 }
  },
  {
    id: "nail-studios",
    title: "Nail Studios",
    subtitle: "Creative nail art & care",
    description: "Manicures, pedicures, nail art and extensions with professional services",
    gradient: "from-purple-600 via-violet-600 to-indigo-700",
    services: ["Manicure", "Pedicure", "Nail Art", "Gel Polish", "Extensions", "Nail Care"],
    duration: "30-90 min",
    priceRange: "₹150-900",
    rating: 4.7,
    link: "/nail-studios",
    nearbyCount: 80,
    totalBookings: "18k",
    isNew: false,
    features: ["Creative Designs", "Premium Polish", "Hygienic Tools"],
    icon: "💅",
    stats: { professionals: 600, avgRating: 4.7, completedServices: 28000 }
  },
  {
    id: "makeup-artists",
    title: "Makeup Artists",
    subtitle: "Professional makeup for all occasions",
    description: "Professional makeup services for weddings, parties and special occasions",
    gradient: "from-green-600 via-emerald-600 to-teal-700",
    services: ["Bridal Makeup", "Party Makeup", "Pre-Wedding", "Engagement", "Photoshoot", "Event Makeup"],
    duration: "60-180 min",
    priceRange: "₹500-3500",
    rating: 4.9,
    link: "/makeup-artists",
    nearbyCount: 60,
    totalBookings: "9.8k",
    isPremium: true,
    features: ["Event Specialists", "Premium Brands", "Home Service"],
    icon: "✨",
    stats: { professionals: 400, avgRating: 4.9, completedServices: 15000 }
  }
];

const ServiceCategories = () => {
  const { location } = useLocation();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full shadow-xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Explore Our Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            Experience India's finest beauty and grooming services with 
            <span className="font-bold text-orange-600"> professional artists</span> and 
            <span className="font-bold text-green-600"> transparent INR pricing</span>.
            {location && (
              <span className="block mt-4 text-orange-600 font-semibold">
                <MapPin className="w-6 h-6 inline mr-2" />
                📍 Available in {location.city || "Your City"}
              </span>
            )}
          </p>
          
          {/* Service Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-gray-700">
            <div className="flex items-center space-x-3 bg-white/80 rounded-2xl px-6 py-4 shadow-lg border border-orange-200">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">1L+</div>
                <div className="text-sm font-medium">Happy Customers</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 rounded-2xl px-6 py-4 shadow-lg border border-yellow-200">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600">4.8⭐</div>
                <div className="text-sm font-medium">Average Rating</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 rounded-2xl px-6 py-4 shadow-lg border border-green-200">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-sm font-medium">Indian Cities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className="group overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 bg-white relative h-[650px]"
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-0 relative h-full">
                {/* Background with Gradient */}
                <div className="absolute inset-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500" />
                  
                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-40 h-40">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-300">
                        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="50" cy="50" r="10" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 w-32 h-32">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-orange-300">
                        <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Special Badges */}
                <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
                  <div className="text-4xl bg-white/20 rounded-full p-3 backdrop-blur-sm">{category.icon}</div>
                  {category.isPopular && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg border-0">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      🔥 Popular
                    </Badge>
                  )}
                  {category.isTrending && (
                    <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold shadow-lg border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      📈 Trending
                    </Badge>
                  )}
                  {category.isPremium && (
                    <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold shadow-lg border-0">
                      👑 Premium
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  {/* Top Section */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-white/25 backdrop-blur-lg rounded-full px-4 py-2 border-2 border-white/40 shadow-lg">
                          <Star className="w-5 h-5 text-yellow-300 fill-current" />
                          <span className="text-white font-bold text-lg">{category.rating}⭐</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/25 backdrop-blur-lg rounded-full px-4 py-2 border-2 border-white/40 shadow-lg">
                          <Clock className="w-5 h-5 text-white opacity-90" />
                          <span className="text-white text-sm font-semibold">{category.duration}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white drop-shadow-lg">
                      {category.title}
                    </h3>
                    <p className="text-lg text-white opacity-95 font-medium mb-4">
                      {category.subtitle}
                    </p>
                    <p className="text-white opacity-90 mb-6 text-base leading-relaxed">
                      {category.description}
                    </p>

                    {/* Services Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {category.services.slice(0, 6).map((service) => (
                        <div
                          key={service}
                          className="bg-white/20 backdrop-blur-lg border-2 border-white/30 rounded-xl px-4 py-3 group-hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          <span className="text-white text-sm font-bold">{service}</span>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {category.features.map((feature, idx) => (
                        <Badge key={idx} className="bg-gradient-to-r from-yellow-300 to-orange-300 text-gray-900 border-0 font-bold px-3 py-1">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div>
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4 mb-6 bg-gradient-to-r from-white/15 to-white/25 backdrop-blur-lg rounded-2xl p-5 border-2 border-white/30 shadow-lg">
                      <div className="text-center">
                        <div className="text-white text-2xl font-bold">{category.nearbyCount}+</div>
                        <div className="text-white text-xs opacity-90 font-semibold">Salons</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white text-2xl font-bold">{category.totalBookings}</div>
                        <div className="text-white text-xs opacity-90 font-semibold">Bookings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white text-lg font-bold">{category.priceRange}</div>
                        <div className="text-white text-xs opacity-90 font-semibold">Price Range</div>
                      </div>
                    </div>

                    {/* Professional Stats (shown on hover) */}
                    {hoveredCard === category.id && (
                      <div className="mb-6 bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30 animate-in slide-in-from-bottom-2">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-white text-lg font-bold">{category.stats.professionals}</div>
                            <div className="text-white text-xs opacity-90">Professionals</div>
                          </div>
                          <div>
                            <div className="text-white text-lg font-bold">{category.stats.avgRating}⭐</div>
                            <div className="text-white text-xs opacity-90">Avg Rating</div>
                          </div>
                          <div>
                            <div className="text-white text-lg font-bold">{(category.stats.completedServices / 1000).toFixed(0)}k</div>
                            <div className="text-white text-xs opacity-90">Completed</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <Link to={category.link} className="block">
                      <Button 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-500 hover:to-red-500 text-gray-900 border-0 transition-all duration-500 group-hover:scale-105 font-bold text-lg py-6 rounded-xl shadow-xl hover:shadow-2xl"
                      >
                        <span className="flex items-center justify-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          🎯 Book {category.nearbyCount}+ Salons
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
