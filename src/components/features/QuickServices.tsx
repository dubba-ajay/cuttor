import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Star, MapPin, Search, Filter, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "@/contexts/LocationContext";

const quickServices = [
  {
    id: 1,
    name: "Express Hair Cut",
    category: "Men's Hair",
    duration: "30 min",
    price: "₹200",
    originalPrice: "₹300",
    rating: 4.8,
    availability: "Available Now",
    nearbyCount: 120,
    link: "/mens-hair",
    gradient: "bg-gradient-to-br from-orange-500 to-red-600",
    emoji: "💈",
    features: ["Walk-in OK", "Quick Service"]
  },
  {
    id: 2,
    name: "Quick Manicure", 
    category: "Nail Studios",
    duration: "45 min",
    price: "₹350",
    originalPrice: "₹500",
    rating: 4.7,
    availability: "Next slot: 2:30 PM",
    nearbyCount: 80,
    link: "/nail-studios",
    gradient: "bg-gradient-to-br from-purple-500 to-violet-600",
    emoji: "💅",
    features: ["Premium Polish", "Hygiene"]
  },
  {
    id: 3,
    name: "Hair Wash & Style",
    category: "Women's Beauty",
    duration: "60 min", 
    price: "₹450",
    originalPrice: "₹600",
    rating: 4.9,
    availability: "Available Now",
    nearbyCount: 150,
    link: "/womens-beauty",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    emoji: "💇‍♀️",
    features: ["Premium Care", "Styling"]
  },
  {
    id: 4,
    name: "Party Makeup",
    category: "Makeup Artists",
    duration: "90 min",
    price: "₹800",
    originalPrice: "₹1200",
    rating: 4.8,
    availability: "Next slot: 4:00 PM",
    nearbyCount: 60,
    link: "/makeup-artists",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    emoji: "✨",
    features: ["Professional", "Long-lasting"]
  },
  {
    id: 5,
    name: "Beard Trim & Style",
    category: "Men's Hair",
    duration: "20 min",
    price: "₹150",
    originalPrice: "₹250",
    rating: 4.6,
    availability: "Available Now",
    nearbyCount: 100,
    link: "/mens-hair",
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
    emoji: "🧔",
    features: ["Expert Styling", "Quick"]
  },
  {
    id: 6,
    name: "Express Pedicure",
    category: "Nail Studios", 
    duration: "40 min",
    price: "₹400",
    originalPrice: "₹550",
    rating: 4.5,
    availability: "Next slot: 3:15 PM",
    nearbyCount: 70,
    link: "/nail-studios",
    gradient: "bg-gradient-to-br from-teal-500 to-cyan-600",
    emoji: "🦶",
    features: ["Relaxing", "Hygienic"]
  }
];

const QuickServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { location, nearbyAreas } = useLocation();

  const filteredServices = quickServices
    .filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(service => categoryFilter === "all" || service.category === categoryFilter);

  const categories = [...new Set(quickServices.map(service => service.category))];

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Quick Services ⚡
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Book instant appointments for popular services
            {location && (
              <span className="block mt-3 text-orange-600 font-semibold">
                <MapPin className="w-5 h-5 inline mr-2" />
                📍 Available in {location.city || "Your Area"}
              </span>
            )}
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-orange-200 focus:border-orange-400 rounded-xl text-lg py-3"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48 border-2 border-orange-200 focus:border-orange-400 rounded-xl">
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
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredServices.map((service) => (
            <Card key={service.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-orange-200 hover:border-orange-400">
              <Link to={service.link}>
                <CardContent className="p-0">
                  {/* Header with Indian gradient */}
                  <div className={`${service.gradient} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    {/* Traditional pattern overlay */}
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-20">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-300">
                        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="3"/>
                        <circle cx="50" cy="50" r="15" fill="currentColor"/>
                      </svg>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-white/25 text-white border-white/40 backdrop-blur-sm font-bold">
                          <Star className="w-4 h-4 mr-1 fill-current text-yellow-300" />
                          {service.rating}⭐
                        </Badge>
                        <div className="text-3xl">{service.emoji}</div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                      <p className="text-lg opacity-90 mb-3 font-medium">{service.category}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{service.price}</div>
                          <div className="text-sm line-through opacity-75">{service.originalPrice}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="border-orange-300 text-orange-700 font-semibold">
                        {service.category}
                      </Badge>
                      <div className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        {service.availability}
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="font-medium">{service.nearbyCount} locations nearby</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.map((feature, index) => (
                        <Badge key={index} className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border-0 font-medium">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      className="w-full group-hover:scale-105 transition-transform bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl shadow-lg"
                      size="lg"
                    >
                      🚀 Book Now
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Indian Cities availability */}
        {nearbyAreas.length > 0 && (
          <div className="text-center bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8 border-2 border-orange-200">
            <h3 className="text-2xl font-bold mb-4 text-orange-800">
              🏙️ Available in these cities:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow"].slice(0, 6).map((city, index) => (
                <Badge key={index} className="bg-gradient-to-r from-orange-400 to-red-400 text-white border-0 font-semibold px-4 py-2 text-sm">
                  📍 {city}
                </Badge>
              ))}
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white border-0 font-semibold px-4 py-2 text-sm">
                +500 more cities
              </Badge>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuickServices;
