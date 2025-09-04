import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Star, TrendingUp, Users, Zap, Play, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";

const AdvancedHeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeService, setActiveService] = useState(0);
  const { location, requestLocation, isLoading } = useLocation();

  const services = [
    { name: "Hair Cut", category: "Men's Hair", price: "₹200", icon: "💈", time: "30 min" },
    { name: "Facial", category: "Women's Beauty", price: "₹500", icon: "✨", time: "60 min" },
    { name: "Manicure", category: "Nail Studios", price: "₹300", icon: "💅", time: "45 min" },
    { name: "Bridal Makeup", category: "Makeup Artists", price: "₹2500", icon: "👰", time: "120 min" }
  ];

  const stats = [
    { value: "1L+", label: "Happy Customers", icon: Users, color: "text-blue-600" },
    { value: "5000+", label: "Expert Professionals", icon: Award, color: "text-green-600" },
    { value: "500+", label: "Cities Covered", icon: MapPin, color: "text-purple-600" },
    { value: "4.8", label: "Average Rating", icon: Star, color: "text-yellow-600" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl transform translate-x-32 translate-y-32"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Indian Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <defs>
            <pattern id="indianPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="50" cy="50" r="15" fill="currentColor"/>
              <path d="M20 50 L80 50 M50 20 L50 80" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#indianPattern)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-2 text-sm font-semibold">
                <TrendingUp className="w-4 h-4 mr-2" />
                #1 Beauty Platform in India
              </Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
                <Shield className="w-4 h-4 mr-1" />
                Verified Professionals
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  Beauty &amp; Grooming
                </span>
                <br />
                <span className="text-gray-900">Made Simple</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                Book instantly from <span className="font-bold text-orange-600">5000+ verified professionals</span> across India. 
                Quality services at transparent <span className="font-bold text-green-600">INR pricing</span>.
              </p>
            </div>

            {/* Location Display */}
            {location && (
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-orange-200 shadow-lg">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Your Location</p>
                  <p className="font-semibold text-lg text-gray-900">{location.city}, India</p>
                </div>
                <Badge className="bg-green-100 text-green-800 ml-auto">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Available
                </Badge>
              </div>
            )}

            {/* Search Bar */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-orange-200">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-6 h-6" />
                  <Input
                    placeholder="Search for services, salons, or professionals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg border-0 bg-transparent focus:ring-0 focus:outline-none"
                  />
                </div>
                {!location ? (
                  <Button 
                    onClick={requestLocation}
                    disabled={isLoading}
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    {isLoading ? "Finding..." : "Find Nearby"}
                  </Button>
                ) : (
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Now
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Content - Service Showcase */}
          <div className="relative">
            <div className="relative z-10">
              {/* Floating Service Cards */}
              <div className="grid grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <Card 
                    key={index}
                    className={`transform transition-all duration-500 cursor-pointer ${
                      activeService === index 
                        ? 'scale-110 shadow-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white' 
                        : 'hover:scale-105 bg-white/90 backdrop-blur-sm shadow-xl border-orange-200'
                    }`}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      transform: `translateY(${index % 2 === 0 ? '0' : '20px'})`
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{service.icon}</div>
                      <h3 className={`font-bold text-lg mb-2 ${activeService === index ? 'text-white' : 'text-gray-900'}`}>
                        {service.name}
                      </h3>
                      <p className={`text-sm mb-3 ${activeService === index ? 'text-orange-100' : 'text-gray-600'}`}>
                        {service.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className={`${activeService === index ? 'bg-white/20 text-white' : 'bg-green-100 text-green-800'}`}>
                          {service.price}
                        </Badge>
                        <span className={`text-sm ${activeService === index ? 'text-orange-100' : 'text-gray-500'}`}>
                          {service.time}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-80 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-60 animate-bounce"></div>
              
              {/* Rating Bubble */}
              <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                <Card className="bg-white shadow-2xl border-0 p-4">
                  <CardContent className="p-0 text-center">
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">4.8</div>
                    <div className="text-sm text-gray-600">Based on 50k+ reviews</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedHeroSection;
