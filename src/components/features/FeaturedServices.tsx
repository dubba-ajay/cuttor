import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Star, MapPin, Search, Filter, Zap, Calendar, TrendingUp, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "@/contexts/LocationContext";

const featuredServices = [
  {
    id: 1,
    name: "Express Hair Cut",
    category: "Men's Hair",
    duration: "30 min",
    price: "₹200",
    originalPrice: "₹300",
    discount: "33% OFF",
    rating: 4.8,
    availability: "Available Now",
    nearbyCount: 120,
    link: "/mens-hair",
    gradient: "from-orange-500 to-red-600",
    emoji: "💈",
    features: ["Walk-in OK", "Quick Service", "Professional Styling"],
    isPopular: true,
    bookingsToday: 45,
    reviews: 2340
  },
  {
    id: 2,
    name: "Deep Cleansing Facial",
    category: "Women's Beauty",
    duration: "75 min",
    price: "₹800",
    originalPrice: "₹1200",
    discount: "33% OFF",
    rating: 4.9,
    availability: "Next slot: 2:30 PM",
    nearbyCount: 90,
    link: "/womens-beauty",
    gradient: "from-pink-500 to-rose-600",
    emoji: "✨",
    features: ["Deep Cleansing", "Anti-Aging", "Skin Brightening"],
    isTrending: true,
    bookingsToday: 32,
    reviews: 1890
  },
  {
    id: 3,
    name: "Gel Manicure",
    category: "Nail Studios",
    duration: "45 min",
    price: "₹500",
    originalPrice: "₹700",
    discount: "29% OFF",
    rating: 4.7,
    availability: "Available Now",
    nearbyCount: 80,
    link: "/nail-studios",
    gradient: "from-purple-500 to-violet-600",
    emoji: "💅",
    features: ["Long Lasting", "Premium Polish", "Nail Art Options"],
    isNew: true,
    bookingsToday: 28,
    reviews: 1560
  },
  {
    id: 4,
    name: "Bridal Makeup Trial",
    category: "Makeup Artists",
    duration: "120 min",
    price: "₹1500",
    originalPrice: "₹2500",
    discount: "40% OFF",
    rating: 4.9,
    availability: "By Appointment",
    nearbyCount: 60,
    link: "/makeup-artists",
    gradient: "from-green-500 to-emerald-600",
    emoji: "👰",
    features: ["Complete Look", "Photo Shoot Ready", "Premium Products"],
    isPremium: true,
    bookingsToday: 18,
    reviews: 980
  },
  {
    id: 5,
    name: "Beard Styling & Trim",
    category: "Men's Hair",
    duration: "25 min",
    price: "₹250",
    originalPrice: "₹350",
    discount: "29% OFF",
    rating: 4.6,
    availability: "Available Now",
    nearbyCount: 100,
    link: "/mens-hair",
    gradient: "from-blue-500 to-indigo-600",
    emoji: "🧔",
    features: ["Expert Styling", "Beard Oil Treatment", "Shape Design"],
    bookingsToday: 38,
    reviews: 1670
  },
  {
    id: 6,
    name: "Hair Color & Highlights",
    category: "Women's Beauty",
    duration: "150 min",
    price: "₹2000",
    originalPrice: "₹3000",
    discount: "33% OFF",
    rating: 4.8,
    availability: "Next slot: 4:00 PM",
    nearbyCount: 75,
    link: "/womens-beauty",
    gradient: "from-pink-600 to-purple-600",
    emoji: "🎨",
    features: ["Professional Color", "Damage Protection", "Style Consultation"],
    isPopular: true,
    bookingsToday: 22,
    reviews: 1420
  },
  {
    id: 7,
    name: "Pedicure Deluxe",
    category: "Nail Studios",
    duration: "60 min",
    price: "₹600",
    originalPrice: "₹850",
    discount: "29% OFF",
    rating: 4.7,
    availability: "Available Now",
    nearbyCount: 85,
    link: "/nail-studios",
    gradient: "from-teal-500 to-cyan-600",
    emoji: "🦶",
    features: ["Relaxing Soak", "Exfoliation", "Moisturizing"],
    bookingsToday: 26,
    reviews: 1340
  },
  {
    id: 8,
    name: "Party Makeup",
    category: "Makeup Artists",
    duration: "90 min",
    price: "₹1200",
    originalPrice: "₹1800",
    discount: "33% OFF",
    rating: 4.8,
    availability: "Next slot: 6:00 PM",
    nearbyCount: 70,
    link: "/makeup-artists",
    gradient: "from-yellow-500 to-orange-600",
    emoji: "🎉",
    features: ["Glamorous Look", "Long Lasting", "Touch-up Kit"],
    isTrending: true,
    bookingsToday: 19,
    reviews: 1120
  }
];

const FeaturedServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const { location } = useLocation();

  const filteredServices = featuredServices
    .filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(service => categoryFilter === "all" || service.category === categoryFilter)
    .filter(service => {
      if (priceFilter === "all") return true;
      const price = parseInt(service.price.replace('₹', ''));
      switch (priceFilter) {
        case "under-500": return price < 500;
        case "500-1000": return price >= 500 && price <= 1000;
        case "1000-2000": return price > 1000 && price <= 2000;
        case "above-2000": return price > 2000;
        default: return true;
      }
    });

  const categories = [...new Set(featuredServices.map(service => service.category))];
  const totalBookingsToday = featuredServices.reduce((acc, service) => acc + service.bookingsToday, 0);

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Featured Services with Best Prices
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            Book instantly from our most popular services with 
            <span className="font-bold text-green-600"> transparent INR pricing</span> and 
            <span className="font-bold text-orange-600"> exclusive discounts</span>.
            {location && (
              <span className="block mt-4 text-orange-600 font-semibold">
                <MapPin className="w-6 h-6 inline mr-2" />
                📍 Available in {location.city || "Your Area"}
              </span>
            )}
          </p>

          {/* Live Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-white/80 rounded-2xl px-6 py-4 shadow-lg border border-orange-200">
              <div className="text-3xl font-bold text-orange-600">{totalBookingsToday}</div>
              <div className="text-sm font-medium text-gray-600">Bookings Today</div>
            </div>
            <div className="bg-white/80 rounded-2xl px-6 py-4 shadow-lg border border-green-200">
              <div className="text-3xl font-bold text-green-600">₹{Math.min(...featuredServices.map(s => parseInt(s.price.replace('₹', ''))))}</div>
              <div className="text-sm font-medium text-gray-600">Starting From</div>
            </div>
            <div className="bg-white/80 rounded-2xl px-6 py-4 shadow-lg border border-blue-200">
              <div className="text-3xl font-bold text-blue-600">{(featuredServices.reduce((acc, s) => acc + s.rating, 0) / featuredServices.length).toFixed(1)}⭐</div>
              <div className="text-sm font-medium text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-200 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-orange-200 focus:border-orange-400 rounded-xl"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="border-2 border-orange-200 focus:border-orange-400 rounded-xl">
                <Filter className="w-4 h-4 mr-2 text-orange-500" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="border-2 border-orange-200 focus:border-orange-400 rounded-xl">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-500">Under ₹500</SelectItem>
                <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                <SelectItem value="1000-2000">₹1000 - ₹2000</SelectItem>
                <SelectItem value="above-2000">Above ₹2000</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-3 border border-green-200">
              <div className="text-sm font-semibold text-green-800">{filteredServices.length} Services Found</div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredServices.map((service) => (
            <Card key={service.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-orange-200 hover:border-orange-400 bg-white">
              <Link to={service.link}>
                <CardContent className="p-0">
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-br ${service.gradient} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Service badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <div className="text-3xl bg-white/20 rounded-full p-2 backdrop-blur-sm">{service.emoji}</div>
                      {service.isPopular && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {service.isTrending && (
                        <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-xs">
                          📈 Trending
                        </Badge>
                      )}
                      {service.isPremium && (
                        <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold text-xs">
                          👑 Premium
                        </Badge>
                      )}
                      {service.isNew && (
                        <Badge className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white font-bold text-xs">
                          ✨ New
                        </Badge>
                      )}
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-white/25 text-white border-white/40 backdrop-blur-sm font-bold">
                          <Star className="w-4 h-4 mr-1 fill-current text-yellow-300" />
                          {service.rating}⭐
                        </Badge>
                        <div className="text-right">
                          <div className="text-sm opacity-75 line-through">{service.originalPrice}</div>
                          <div className="text-2xl font-bold">{service.price}</div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                      
                      <div className="flex items-center justify-between text-sm mb-3">
                        <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration}
                        </div>
                        <Badge className="bg-red-500 text-white font-bold text-xs">
                          {service.discount}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="border-orange-300 text-orange-700 font-semibold text-xs">
                        {service.category}
                      </Badge>
                      <div className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {service.availability}
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="font-medium">{service.nearbyCount} locations nearby</span>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-0 font-medium text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                      <div className="bg-blue-50 rounded-lg p-2 text-center">
                        <div className="font-bold text-blue-600">{service.bookingsToday}</div>
                        <div className="text-gray-600">Today</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2 text-center">
                        <div className="font-bold text-purple-600">{service.reviews}</div>
                        <div className="text-gray-600">Reviews</div>
                      </div>
                    </div>

                    <Button 
                      className="w-full group-hover:scale-105 transition-transform bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl shadow-lg text-sm"
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Book Now - {service.price}
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Price Guarantee Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
              <defs>
                <pattern id="moneyPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <text x="20" y="25" textAnchor="middle" fontSize="12" fill="currentColor">₹</text>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#moneyPattern)" />
            </svg>
          </div>

          <div className="relative z-10">
            <Badge className="bg-white/20 text-white border-0 px-6 py-3 text-lg font-semibold mb-6">
              <Award className="w-5 h-5 mr-2" />
              Best Price Guarantee
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Transparent INR Pricing</h3>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-95">
              No hidden charges, no surprise fees. What you see is what you pay. 
              If you find a better price elsewhere, we'll match it!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl mb-2">💰</div>
                <div className="font-bold text-lg">No Hidden Fees</div>
                <div className="opacity-90">Transparent pricing</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🛡️</div>
                <div className="font-bold text-lg">Price Protection</div>
                <div className="opacity-90">Best price guaranteed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💳</div>
                <div className="font-bold text-lg">Easy Payment</div>
                <div className="opacity-90">Multiple payment options</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
