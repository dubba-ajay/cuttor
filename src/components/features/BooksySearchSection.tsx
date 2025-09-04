import { useState } from "react";
import { Search, Filter, MapPin, Calendar, Clock, Star, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "@/contexts/LocationContext";

const BooksySearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");
  const { location } = useLocation();

  const popularSearches = [
    "Hair cut near me",
    "Facial treatment",
    "Bridal makeup",
    "Manicure and pedicure",
    "Beard trimming",
    "Hair coloring"
  ];

  const services = [
    "Hair Services",
    "Facial Treatments", 
    "Nail Services",
    "Makeup Services",
    "Spa & Wellness",
    "Men's Grooming"
  ];

  const timeSlots = [
    "Morning (9-12 AM)",
    "Afternoon (12-5 PM)", 
    "Evening (5-8 PM)",
    "Night (8-10 PM)"
  ];

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Main Search Bar - Booksy's prominent search design */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-3 shadow-lg hover:border-purple-300 transition-colors mb-6">
            <div className="flex gap-3">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="What service are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-0 focus:ring-0 focus:outline-none bg-transparent"
                />
              </div>

              {/* Location */}
              <div className="relative min-w-[200px]">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder={location?.city || "Enter location"}
                  className="pl-12 pr-4 py-4 text-lg border-0 border-l-2 border-gray-100 focus:ring-0 focus:outline-none bg-transparent rounded-none"
                />
              </div>

              {/* Search Button */}
              <Button 
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl whitespace-nowrap"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>

              {/* Filters Toggle */}
              <Button 
                variant="outline"
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-4 border-gray-300 rounded-xl"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Filters Section - Booksy style expandable filters */}
          {showFilters && (
            <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Service Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="border-gray-300 rounded-xl">
                      <SelectValue placeholder="All services" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All services</SelectItem>
                      {services.map((service) => (
                        <SelectItem key={service} value={service.toLowerCase().replace(' ', '-')}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="pl-10 border-gray-300 rounded-xl"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="border-gray-300 rounded-xl">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anytime">Any time</SelectItem>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="border-gray-300 rounded-xl">
                      <SelectValue placeholder="Any price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any price</SelectItem>
                      <SelectItem value="under-500">Under ₹500</SelectItem>
                      <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                      <SelectItem value="1000-2000">₹1000 - ₹2000</SelectItem>
                      <SelectItem value="above-2000">Above ₹2000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Filters */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <label className="block text-sm font-semibold text-gray-700">Rating</label>
                    <div className="flex space-x-2">
                      {[4, 4.5, 5].map((ratingValue) => (
                        <Button
                          key={ratingValue}
                          variant={rating === ratingValue.toString() ? "default" : "outline"}
                          size="sm"
                          onClick={() => setRating(ratingValue.toString())}
                          className="rounded-full"
                        >
                          <Star className="w-4 h-4 mr-1 fill-current" />
                          {ratingValue}+
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedService("");
                        setSelectedDate("");
                        setSelectedTime("");
                        setPriceRange("");
                        setRating("");
                      }}
                      className="rounded-xl"
                    >
                      Clear all
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                      Apply filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Popular Searches - Booksy style suggestion chips */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular searches</h3>
            <div className="flex flex-wrap gap-3">
              {popularSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors rounded-full border-gray-300"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 bg-purple-50 rounded-2xl p-6 border border-purple-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-600">50,000+</div>
                <div className="text-sm text-gray-600">Verified professionals</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">1M+</div>
                <div className="text-sm text-gray-600">Happy customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">4.8★</div>
                <div className="text-sm text-gray-600">Average rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksySearchSection;
