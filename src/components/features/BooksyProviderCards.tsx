import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Clock, Heart, Calendar, Award, Verified, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from "@/contexts/LocationContext";

const BooksyProviderCards = () => {
  const { location } = useLocation();
  const [favorites, setFavorites] = useState<number[]>([]);

  const providers = [
    {
      id: 1,
      name: "Elite Beauty Salon",
      category: "Hair & Beauty",
      rating: 4.9,
      reviews: 1234,
      distance: "0.5 km",
      address: "Connaught Place, Delhi",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      priceRange: "₹₹",
      isVerified: true,
      isTopRated: true,
      specialties: ["Hair Styling", "Facial", "Makeup"],
      nextAvailable: "Today 2:30 PM",
      portfolio: [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      ],
      services: [
        { name: "Hair Cut & Style", price: "₹600", duration: "60 min" },
        { name: "Deep Cleansing Facial", price: "₹800", duration: "75 min" },
        { name: "Bridal Makeup", price: "₹2500", duration: "120 min" }
      ],
      link: "/salon/1"
    },
    {
      id: 2,
      name: "Gentleman's Barber Studio",
      category: "Men's Grooming",
      rating: 4.8,
      reviews: 892,
      distance: "0.8 km",
      address: "Khan Market, Delhi",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      priceRange: "₹",
      isVerified: true,
      isTopRated: false,
      specialties: ["Classic Cuts", "Beard Styling", "Hot Towel Shave"],
      nextAvailable: "Today 4:00 PM",
      portfolio: [
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      ],
      services: [
        { name: "Premium Hair Cut", price: "₹350", duration: "45 min" },
        { name: "Beard Trim & Style", price: "₹250", duration: "30 min" },
        { name: "Classic Shave", price: "₹200", duration: "30 min" }
      ],
      link: "/salon/2"
    },
    {
      id: 3,
      name: "Glamour Nail Studio",
      category: "Nail Services",
      rating: 4.7,
      reviews: 567,
      distance: "1.2 km",
      address: "Lajpat Nagar, Delhi",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      priceRange: "₹₹",
      isVerified: true,
      isTopRated: false,
      specialties: ["Nail Art", "Gel Extensions", "Pedicure"],
      nextAvailable: "Tomorrow 10:00 AM",
      portfolio: [
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1610992015626-7b94b3a8e76e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      ],
      services: [
        { name: "Gel Manicure", price: "₹500", duration: "60 min" },
        { name: "Classic Pedicure", price: "₹600", duration: "75 min" },
        { name: "Nail Art Design", price: "₹300", duration: "45 min" }
      ],
      link: "/salon/3"
    },
    {
      id: 4,
      name: "Radiance Makeup Studio",
      category: "Makeup Artists",
      rating: 4.9,
      reviews: 743,
      distance: "0.9 km",
      address: "Karol Bagh, Delhi",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      priceRange: "₹₹₹",
      isVerified: true,
      isTopRated: true,
      specialties: ["Bridal Makeup", "Party Look", "Photoshoot"],
      nextAvailable: "Today 6:00 PM",
      portfolio: [
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1594736797933-d0401ba942fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      ],
      services: [
        { name: "Bridal Makeup Package", price: "₹2800", duration: "150 min" },
        { name: "Party Makeup", price: "₹1200", duration: "90 min" },
        { name: "Engagement Makeup", price: "₹1500", duration: "105 min" }
      ],
      link: "/salon/4"
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top-rated professionals near you
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover verified beauty and wellness professionals with real reviews
            {location && (
              <span> in <span className="font-semibold text-purple-600">{location.city}</span></span>
            )}
          </p>
        </div>

        {/* Provider Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {providers.map((provider) => (
            <Card key={provider.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
              <CardContent className="p-0">
                {/* Header Image with Portfolio Preview */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {provider.isVerified && (
                      <Badge className="bg-blue-500 text-white font-semibold">
                        <Verified className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {provider.isTopRated && (
                      <Badge className="bg-orange-500 text-white font-semibold">
                        <Award className="w-3 h-3 mr-1" />
                        Top Rated
                      </Badge>
                    )}
                  </div>

                  {/* Heart Icon */}
                  <button
                    onClick={() => toggleFavorite(provider.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        favorites.includes(provider.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>

                  {/* Portfolio Preview */}
                  <div className="absolute bottom-4 right-4 flex space-x-1">
                    {provider.portfolio.slice(0, 3).map((img, index) => (
                      <div key={index} className="w-8 h-8 rounded border-2 border-white overflow-hidden">
                        <img src={img} alt="Portfolio" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {provider.portfolio.length > 3 && (
                      <div className="w-8 h-8 rounded border-2 border-white bg-black/50 flex items-center justify-center">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Rating Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-1 shadow-lg">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="font-bold text-gray-900">{provider.rating}</span>
                      <span className="text-sm text-gray-600">({provider.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{provider.name}</h3>
                      <p className="text-gray-600">{provider.category}</p>
                      <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.address}</span>
                        <span>•</span>
                        <span>{provider.distance}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-purple-600">{provider.priceRange}</div>
                      <div className="text-xs text-gray-500">Price range</div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {provider.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-700">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Popular Services */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-700 mb-3">Popular services:</div>
                    <div className="space-y-2">
                      {provider.services.slice(0, 2).map((service, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div>
                            <span className="font-medium text-gray-900">{service.name}</span>
                            <span className="text-gray-500 ml-2">• {service.duration}</span>
                          </div>
                          <span className="font-semibold text-purple-600">{service.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center justify-between mb-6 bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Next available:</span>
                    </div>
                    <span className="text-sm font-bold text-green-800">{provider.nextAvailable}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 rounded-xl">
                      View Profile
                    </Button>
                    <Link to={provider.link}>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl">
            Load more providers
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Showing 4 of 247 providers in {location?.city || "your area"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BooksyProviderCards;
