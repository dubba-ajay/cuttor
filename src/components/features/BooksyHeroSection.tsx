import { useState } from "react";
import { Search, MapPin, Calendar, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "@/contexts/LocationContext";

const BooksyHeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { location, requestLocation, isLoading } = useLocation();

  return (
    <section className="relative bg-white">
      {/* Main Hero Content */}
      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content - Booksy style clean typography */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-50 text-green-700 border-green-200 px-4 py-2 text-sm font-medium">
                <Star className="w-4 h-4 mr-2 fill-current" />
                Rated 4.8/5 by 100k+ customers
              </Badge>
            </div>

            {/* Main Heading - Booksy's clean approach */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Book beauty &amp;<br />
                <span className="text-purple-600">wellness services</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Discover and book appointments at top-rated salons and spas across India. 
                Transparent pricing, instant confirmation.
              </p>
            </div>

            {/* Location Display - Booksy style */}
            {location && (
              <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-3 border">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Your location</p>
                  <p className="font-semibold text-gray-900">{location.city}, India</p>
                </div>
                <Badge className="bg-green-100 text-green-700 ml-auto">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Available
                </Badge>
              </div>
            )}

            {/* Search Bar - Booksy's prominent search */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-2 shadow-lg hover:border-purple-300 transition-colors">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search for services, salons, or treatments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg border-0 focus:ring-0 focus:outline-none bg-transparent"
                  />
                </div>
                {!location ? (
                  <Button 
                    onClick={requestLocation}
                    disabled={isLoading}
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl whitespace-nowrap"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    {isLoading ? "Finding..." : "Near me"}
                  </Button>
                ) : (
                  <Button 
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl whitespace-nowrap"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Stats - Booksy style */}
            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>1M+ appointments booked</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>500+ cities across India</span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image with Service Preview Cards */}
          <div className="relative">
            {/* Main Hero Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Beauty salon"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-5 h-5 fill-current text-yellow-400" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-sm opacity-90">(1,234 reviews)</span>
                </div>
                <h3 className="text-xl font-bold">Elite Beauty Salon</h3>
                <p className="text-sm opacity-90">Connaught Place, Delhi</p>
              </div>
            </div>

            {/* Floating Service Cards - Booksy style */}
            <div className="absolute -right-4 top-8 bg-white rounded-2xl shadow-xl p-4 border max-w-xs">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">💇‍♀️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Hair Styling</h4>
                  <p className="text-sm text-gray-600">Starting from ₹400</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-sm font-semibold">4.8</span>
                  <span className="text-sm text-gray-500">(156)</span>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Book now
                </Button>
              </div>
            </div>

            <div className="absolute -left-4 bottom-16 bg-white rounded-2xl shadow-xl p-4 border max-w-xs">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">💆‍♀️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Facial Treatment</h4>
                  <p className="text-sm text-gray-600">Starting from ₹600</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-sm font-semibold">4.9</span>
                  <span className="text-sm text-gray-500">(89)</span>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Book now
                </Button>
              </div>
            </div>

            {/* Booking Stats Floating Card */}
            <div className="absolute top-16 left-8 bg-white rounded-xl shadow-lg p-3 border">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">47</div>
                <div className="text-xs text-gray-600">bookings today</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Services Quick Access - Booksy style */}
      <div className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular services near you</h2>
            <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
              View all
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: "💇‍♀️", name: "Hair Cut", price: "₹200+" },
              { icon: "💆‍♀️", name: "Facial", price: "₹500+" },
              { icon: "💅", name: "Manicure", price: "₹300+" },
              { icon: "💄", name: "Makeup", price: "₹800+" },
              { icon: "🧔", name: "Beard Trim", price: "₹150+" },
              { icon: "💇‍♂️", name: "Hair Color", price: "₹1000+" }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-shadow cursor-pointer border">
                <div className="text-3xl mb-2">{service.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksyHeroSection;
