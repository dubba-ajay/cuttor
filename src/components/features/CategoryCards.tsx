import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Star, TrendingUp, Users, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "@/contexts/LocationContext";
import mensHairHero from "@/assets/mens-hair-hero.jpg";
import womensBeautyHero from "@/assets/womens-beauty-hero.jpg";
import nailStudioHero from "@/assets/nail-studio-hero.jpg";
import makeupArtistHero from "@/assets/makeup-artist-hero.jpg";

const categories = [
  {
    id: "mens-hair",
    title: "Men's Hair & Grooming",
    subtitle: "Hair care for men",
    description: "Professional haircuts, beard styling and traditional grooming services",
    image: mensHairHero,
    gradient: "bg-gradient-to-br from-orange-600 via-red-700 to-amber-800",
    textColor: "text-white",
    services: ["Hair Cut", "Beard Styling", "Face Treatment", "Hair Wash"],
    duration: "30-180 min",
    priceRange: "₹200-800",
    rating: 4.8,
    link: "/mens-hair",
    nearbyCount: 150,
    totalBookings: "25k",
    isPopular: true,
    features: ["Walk-ins Welcome", "Traditional & Modern"],
    icon: "💈",
    features2: ["Instant Service", "Expert Barbers"]
  },
  {
    id: "womens-beauty",
    title: "Women's Hair & Beauty", 
    subtitle: "Beauty services for women",
    description: "Hair styling, facials, bridal makeup and complete beauty packages",
    image: womensBeautyHero,
    gradient: "bg-gradient-to-br from-pink-600 via-rose-700 to-red-800",
    textColor: "text-white",
    services: ["Hair Styling", "Facial", "Bridal Makeup", "Threading"],
    duration: "45-300 min",
    priceRange: "₹300-2000",
    rating: 4.9,
    link: "/womens-beauty",
    nearbyCount: 200,
    totalBookings: "41k",
    isTrending: true,
    features: ["Luxury Treatments", "Latest Trends"],
    icon: "💄",
    features2: ["Wedding Specials", "Trending Styles"]
  },
  {
    id: "nail-studios",
    title: "Nail Studios",
    subtitle: "Nail art and manicure",
    description: "Manicures, pedicures, nail art and extensions with professional services",
    image: nailStudioHero,
    gradient: "bg-gradient-to-br from-purple-600 via-violet-700 to-indigo-800",
    textColor: "text-white",
    services: ["Manicure", "Pedicure", "Nail Art", "Gel Polish"],
    duration: "30-120 min",
    priceRange: "₹150-900",
    rating: 4.7,
    link: "/nail-studios",
    nearbyCount: 80,
    totalBookings: "18k",
    isNew: false,
    features: ["Creative Designs", "Premium Polish"],
    icon: "💅",
    features2: ["Creative Designs", "Latest Trends"]
  },
  {
    id: "makeup-artists",
    title: "Makeup Artists",
    subtitle: "Professional makeup artists",
    description: "Professional makeup services for weddings, parties and special occasions",
    image: makeupArtistHero,
    gradient: "bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800",
    textColor: "text-white",
    services: ["Bridal Makeup", "Party Makeup", "Pre-Wedding", "Engagement"],
    duration: "60-240 min",
    priceRange: "₹500-3000",
    rating: 4.9,
    link: "/makeup-artists",
    nearbyCount: 60,
    totalBookings: "9.8k",
    isPremium: true,
    features: ["Event Specialists", "Bridal Packages"],
    icon: "✨",
    features2: ["Wedding Experts", "Home Service"]
  }
];

const CategoryCards = () => {
  const { location } = useLocation();

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Explore Our Services
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Experience India's finest beauty and grooming services.
            Professional artists and modern technology combined.
            {location && (
              <span className="block mt-3 text-orange-600 dark:text-orange-400 font-semibold">
                <MapPin className="w-5 h-5 inline mr-2" />
                📍 Available in {location.city || "Your City"}
              </span>
            )}
          </p>
          
          {/* Indian-style Service Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-gray-700 dark:text-gray-300">
            <div className="flex items-center space-x-3 bg-white/80 dark:bg-gray-800/80 rounded-2xl px-6 py-4 shadow-lg border border-orange-200">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">1L+</div>
                <div className="text-sm font-medium">Happy Customers</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 dark:bg-gray-800/80 rounded-2xl px-6 py-4 shadow-lg border border-yellow-200">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600">4.8⭐</div>
                <div className="text-sm font-medium">Average Rating</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 dark:bg-gray-800/80 rounded-2xl px-6 py-4 shadow-lg border border-green-200">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <Card key={category.id} className="group overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 bg-white dark:bg-gray-800 relative border-2 border-orange-200 hover:border-orange-400">
              <CardContent className="p-0 relative h-[520px]">
                {/* Indian-style Background with Traditional Patterns */}
                <div className="absolute inset-0">
                  <div className={`absolute inset-0 ${category.gradient}`} />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-all duration-500" />
                  
                  {/* Traditional Indian Pattern Overlay */}
                  <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-0 right-0 w-40 h-40">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-300">
                        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="50" cy="50" r="10" fill="currentColor"/>
                        <path d="M20 50 L80 50 M50 20 L50 80" stroke="currentColor" strokeWidth="1"/>
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 w-32 h-32">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-orange-300">
                        <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Indian-style Special Badges */}
                <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
                  <div className="text-3xl bg-white/20 rounded-full p-2 backdrop-blur-sm">{category.icon}</div>
                  {category.isPopular && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg border-0">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      🔥 Popular
                    </Badge>
                  )}
                  {category.isTrending && (
                    <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold shadow-lg border-0">
                      <Zap className="w-3 h-3 mr-1" />
                      📈 Trending
                    </Badge>
                  )}
                  {category.isPremium && (
                    <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold shadow-lg border-0">
                      👑 Premium
                    </Badge>
                  )}
                </div>

                {/* Enhanced Content Layout */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  {/* Top Section */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-white/25 backdrop-blur-lg rounded-full px-4 py-2 border-2 border-white/40 shadow-lg">
                          <Star className="w-5 h-5 text-yellow-300 fill-current" />
                          <span className={`${category.textColor} font-bold text-lg`}>
                            {category.rating}⭐
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/25 backdrop-blur-lg rounded-full px-4 py-2 border-2 border-white/40 shadow-lg">
                          <Clock className={`w-5 h-5 ${category.textColor} opacity-90`} />
                          <span className={`${category.textColor} text-sm font-semibold`}>
                            {category.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className={`text-3xl md:text-4xl font-bold mb-2 ${category.textColor} drop-shadow-lg`}>
                      {category.title}
                    </h3>
                    <p className={`text-lg ${category.textColor} opacity-95 font-medium mb-4`}>
                      {category.subtitle}
                    </p>
                    <p className={`${category.textColor} opacity-90 mb-6 text-base leading-relaxed`}>
                      {category.description}
                    </p>

                    {/* Indian-style Services Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {category.services.slice(0, 4).map((service) => (
                        <div
                          key={service}
                          className="bg-white/20 backdrop-blur-lg border-2 border-white/30 rounded-xl px-4 py-3 group-hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          <span className={`${category.textColor} text-sm font-bold`}>
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Additional Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {category.features2.map((feature, idx) => (
                        <Badge key={idx} className="bg-gradient-to-r from-yellow-300 to-orange-300 text-gray-900 border-0 font-bold px-3 py-1">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div>
                    {/* Indian-style Stats Row */}
                    <div className="grid grid-cols-3 gap-4 mb-6 bg-gradient-to-r from-white/15 to-white/25 backdrop-blur-lg rounded-2xl p-5 border-2 border-white/30 shadow-lg">
                      <div className="text-center">
                        <div className={`${category.textColor} text-2xl font-bold`}>
                          {category.nearbyCount}+
                        </div>
                        <div className={`${category.textColor} text-xs opacity-90 font-semibold`}>
                          Salons
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`${category.textColor} text-2xl font-bold`}>
                          {category.totalBookings}
                        </div>
                        <div className={`${category.textColor} text-xs opacity-90 font-semibold`}>
                          Bookings
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`${category.textColor} text-lg font-bold`}>
                          {category.priceRange}
                        </div>
                        <div className={`${category.textColor} text-xs opacity-90 font-semibold`}>
                          Price
                        </div>
                      </div>
                    </div>

                    {/* Indian-style Action Button */}
                    <Link to={category.link} className="block">
                      <Button 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-500 hover:to-red-500 text-gray-900 border-0 transition-all duration-500 group-hover:scale-105 font-bold text-lg py-6 rounded-xl shadow-xl hover:shadow-2xl"
                      >
                        <span className="flex items-center justify-center">
                          🎯 View {category.nearbyCount}+ Salons
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Indian-style Decorative Border */}
                <div className="absolute inset-0 border-4 border-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
