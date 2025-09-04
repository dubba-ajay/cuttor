import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Clock, Award, Verified, ArrowRight, Navigation, Filter, Calendar, Phone, Search as SearchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useLocation } from "@/contexts/LocationContext";

const LocationBasedStores = () => {
  const { location, requestLocation, isLoading } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [searchTerm, setSearchTerm] = useState("");

  // Generate dynamic stores based on location
  const generateStores = (city: string) => {
    const baseStores = [
      {
        id: 101,
        name: "Elite Men's Grooming",
        category: "mens-hair",
        categoryLabel: "Men's Hair",
        rating: 4.9,
        reviews: 2450,
        distance: "0.5 km",
        address: `Sector 15, ${city}`,
        priceRange: "₹₹",
        specialties: ["Premium Cuts", "Beard Styling"],
        isTopRated: true,
        isVerified: true,
        link: `/salon/101`,
        startingPrice: "₹200",
        emoji: "💈",
        openNow: true,
        nextSlot: "2:30 PM",
        phoneBooking: "+91-9876543210",
        offers: ["20% off first visit", "Free hair wash"]
      },
      {
        id: 201,
        name: "Elegance Beauty Studio",
        category: "womens-beauty",
        categoryLabel: "Women's Beauty",
        rating: 4.9,
        reviews: 3120,
        distance: "0.8 km",
        address: `Civil Lines, ${city}`,
        priceRange: "₹₹₹",
        specialties: ["Hair Styling", "Facials"],
        isTopRated: true,
        isVerified: true,
        link: `/womens-beauty/salon/201`,
        startingPrice: "₹300",
        emoji: "💄",
        openNow: true,
        nextSlot: "3:00 PM",
        phoneBooking: "+91-9876543211",
        offers: ["Bridal package discount", "Free consultation"]
      },
      {
        id: 301,
        name: "Nail Art Studio",
        category: "nail-studios",
        categoryLabel: "Nail Studios",
        rating: 4.8,
        reviews: 2340,
        distance: "1.2 km",
        address: `Main Market, ${city}`,
        priceRange: "₹₹",
        specialties: ["Nail Art", "Gel Extensions"],
        isTopRated: true,
        isVerified: true,
        link: `/nail-studios/salon/301`,
        startingPrice: "₹150",
        emoji: "💅",
        openNow: false,
        nextSlot: "Tomorrow 10:00 AM",
        phoneBooking: "+91-9876543212",
        offers: ["Buy 2 get 1 free", "Student discount 15%"]
      },
      {
        id: 401,
        name: "Glamour Makeup Studio",
        category: "makeup-artists",
        categoryLabel: "Makeup Artists",
        rating: 4.9,
        reviews: 2980,
        distance: "0.7 km",
        address: `Fashion Street, ${city}`,
        priceRange: "₹₹₹",
        specialties: ["Bridal Makeup", "Events"],
        isTopRated: true,
        isVerified: true,
        link: `/makeup-artists/salon/401`,
        startingPrice: "₹500",
        emoji: "���",
        openNow: true,
        nextSlot: "4:00 PM",
        phoneBooking: "+91-9876543213",
        offers: ["Wedding package 30% off", "Free trial makeup"]
      },
      {
        id: 102,
        name: "Classic Barbershop",
        category: "mens-hair",
        categoryLabel: "Men's Hair",
        rating: 4.7,
        reviews: 1890,
        distance: "1.5 km",
        address: `Old City, ${city}`,
        priceRange: "₹",
        specialties: ["Traditional Cuts", "Shaves"],
        isVerified: true,
        link: `/salon/102`,
        startingPrice: "₹150",
        emoji: "✂️",
        openNow: true,
        nextSlot: "Available now",
        phoneBooking: "+91-9876543214",
        offers: ["Senior citizen discount", "Quick service"]
      },
      {
        id: 202,
        name: "Divine Beauty Lounge",
        category: "womens-beauty",
        categoryLabel: "Women's Beauty",
        rating: 4.8,
        reviews: 1890,
        distance: "2.2 km",
        address: `Commercial Complex, ${city}`,
        priceRange: "₹₹₹",
        specialties: ["Luxury Treatments", "Wellness"],
        isVerified: true,
        link: `/womens-beauty/salon/202`,
        startingPrice: "₹400",
        emoji: "🌸",
        openNow: true,
        nextSlot: "5:30 PM",
        phoneBooking: "+91-9876543215",
        offers: ["Spa package deal", "Membership benefits"]
      }
    ];

    return baseStores.map(store => ({
      ...store,
      address: store.address.replace("${city}", city || "Your City")
    }));
  };

  const stores = generateStores(location?.city || "Delhi");

  const matchesQuery = (store: any) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return (
      store.name.toLowerCase().includes(q) ||
      store.address.toLowerCase().includes(q) ||
      store.categoryLabel.toLowerCase().includes(q) ||
      store.specialties.some((s: string) => s.toLowerCase().includes(q))
    );
  };

  const filteredStores = stores
    .filter(matchesQuery)
    .filter(store => selectedCategory === "all" || store.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "rating": return b.rating - a.rating;
        case "distance": return parseFloat(a.distance) - parseFloat(b.distance);
        case "price": return a.startingPrice.localeCompare(b.startingPrice);
        default: return 0;
      }
    });

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "mens-hair": return "bg-orange-100 text-orange-700 border-orange-300";
      case "womens-beauty": return "bg-pink-100 text-pink-700 border-pink-300";
      case "nail-studios": return "bg-purple-100 text-purple-700 border-purple-300";
      case "makeup-artists": return "bg-green-100 text-green-700 border-green-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg">
              <MapPin className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Nearby Beauty &amp; Grooming Stores
          </h2>
          {location ? (
            <p className="text-xl text-gray-700 max-w-xl mx-auto mb-8">
              Top-rated professionals in <span className="font-bold text-blue-600">{location.city}</span> with 
              real-time availability and transparent INR pricing
            </p>
          ) : (
            <div className="max-w-xl mx-auto mb-8">
              <p className="text-xl text-gray-700 mb-4">
                Find the best beauty and grooming services near you
              </p>
              <Button 
                onClick={requestLocation}
                disabled={isLoading}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold"
              >
                <Navigation className="w-5 h-5 mr-2" />
                {isLoading ? "Finding Your Location..." : "Find Stores Near Me"}
              </Button>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-6 w-full">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e)=> setSearchTerm(e.target.value)}
              placeholder="Search stores, services, or areas..."
              className="pl-9"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 max-w-2xl mx-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 border-2 border-blue-200 focus:border-blue-400 rounded-xl">
              <Filter className="w-4 h-4 mr-2 text-blue-500" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="mens-hair">Men's Hair</SelectItem>
              <SelectItem value="womens-beauty">Women's Beauty</SelectItem>
              <SelectItem value="nail-studios">Nail Studios</SelectItem>
              <SelectItem value="makeup-artists">Makeup Artists</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48 border-2 border-blue-200 focus:border-blue-400 rounded-xl">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="distance">Nearest First</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location Stats */}
        {location && (
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-12 border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">{filteredStores.length}</div>
                <div className="text-sm text-gray-600">Stores Found</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">{filteredStores.filter(s => s.openNow).length}</div>
                <div className="text-sm text-gray-600">Open Now</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">₹{Math.min(...filteredStores.map(s => parseInt(s.startingPrice.replace('₹', ''))))}</div>
                <div className="text-sm text-gray-600">Starting From</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">{(filteredStores.reduce((acc, s) => acc + s.rating, 0) / filteredStores.length).toFixed(1)}⭐</div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
            </div>
          </div>
        )}

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <Card key={store.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full border-2 border-blue-200 hover:border-blue-400 bg-white">
              <CardContent className="p-0">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className={`${store.openNow ? 'bg-green-500' : 'bg-red-500'} text-white border-0 font-bold`}>
                      <div className={`w-2 h-2 ${store.openNow ? 'bg-green-300' : 'bg-red-300'} rounded-full mr-2 animate-pulse`}></div>
                      {store.openNow ? 'Open Now' : 'Closed'}
                    </Badge>
                  </div>

                  {/* Store Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{store.emoji}</span>
                    <div>
                      <h3 className="text-xl font-bold">{store.name}</h3>
                      <div className="flex items-center gap-2 text-sm opacity-90">
                        <span className="font-semibold text-yellow-300">{store.priceRange}</span>
                        <span>•</span>
                        <span>{store.distance}</span>
                        {store.isVerified && (
                          <>
                            <span>•</span>
                            <Verified className="w-4 h-4 text-blue-400" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold text-sm border-0">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {store.rating}⭐
                      </Badge>
                      {store.isTopRated && (
                        <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white text-sm border-0 font-bold">
                          <Award className="w-3 h-3 mr-1" />
                          Top Rated
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm opacity-90">{store.reviews.toLocaleString('en-IN')} reviews</span>
                  </div>
                </div>
                
                {/* Body */}
                <div className="p-6">
                  {/* Category */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant="outline" 
                      className={`text-sm font-semibold ${getCategoryColor(store.category)}`}
                    >
                      {store.categoryLabel}
                    </Badge>
                    <div className="text-lg font-bold text-green-600">
                      Starting {store.startingPrice}
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-center mb-4 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">{store.address}</span>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center mb-4 text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-green-500" />
                    <span className="font-medium">Next slot: {store.nextSlot}</span>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {store.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 font-medium text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Offers */}
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-900 mb-2">Special Offers:</div>
                    <div className="space-y-1">
                      {store.offers.slice(0, 2).map((offer, index) => (
                        <div key={index} className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                          🎉 {offer}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link to={store.link}>
                      <Button 
                        size="sm"
                        className="w-full text-sm group-hover:scale-105 transition-transform bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold border-0 rounded-xl"
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        View Store
                      </Button>
                    </Link>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="w-full text-sm border-2 border-blue-300 text-blue-600 hover:bg-blue-50 font-semibold rounded-xl"
                      onClick={() => window.open(`tel:${store.phoneBooking}`, '_self')}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg border-0">
            <MapPin className="w-5 h-5 mr-2" />
            View All Stores in {location?.city || "Your Area"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LocationBasedStores;
