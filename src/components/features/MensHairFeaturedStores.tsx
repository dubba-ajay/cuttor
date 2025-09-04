import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Clock, Phone, Calendar, Heart, Award, Verified, Camera, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from "@/contexts/LocationContext";

const MensHairFeaturedStores = () => {
  const { location } = useLocation();
  const [favorites, setFavorites] = useState<number[]>([]);

  const featuredStores = [
    {
      id: 1,
      name: "Elite Men's Grooming Studio",
      category: "Premium Barbershop",
      rating: 4.9,
      reviews: 1234,
      distance: "0.5 km",
      address: "Connaught Place, Central Delhi",
      phone: "+91 98765 43210",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      priceRange: "₹₹₹",
      isVerified: true,
      isTopRated: true,
      specialties: ["Premium Cuts", "Beard Styling", "Hot Towel Service", "Hair Treatments"],
      nextAvailable: "Today 2:30 PM",
      portfolio: [
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      ],
      services: [
        { name: "Premium Hair Cut", price: "₹450", duration: "45 min", popular: true },
        { name: "Beard Styling", price: "₹300", duration: "30 min", popular: true },
        { name: "Hot Towel Shave", price: "₹350", duration: "40 min", popular: false },
        { name: "Complete Grooming", price: "₹750", duration: "75 min", popular: true }
      ],
      staff: [
        { name: "Rajesh Kumar", role: "Master Barber", experience: "8 years", rating: 4.9 },
        { name: "Suresh Patel", role: "Senior Stylist", experience: "6 years", rating: 4.8 }
      ],
      openHours: "9:00 AM - 9:00 PM",
      amenities: ["AC", "WiFi", "Parking", "Card Payment"],
      description: "Luxury men's grooming destination with master barbers and premium products"
    },
    {
      id: 2,
      name: "Classic Barbershop",
      category: "Traditional Barbering",
      rating: 4.8,
      reviews: 892,
      distance: "0.8 km",
      address: "Khan Market, South Delhi",
      phone: "+91 98765 43211",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      priceRange: "₹₹",
      isVerified: true,
      isTopRated: false,
      specialties: ["Traditional Cuts", "Straight Razor", "Classic Styling", "Mustache Grooming"],
      nextAvailable: "Today 4:00 PM",
      portfolio: [
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      ],
      services: [
        { name: "Classic Hair Cut", price: "₹250", duration: "30 min", popular: true },
        { name: "Beard Trim", price: "₹200", duration: "25 min", popular: true },
        { name: "Straight Razor Shave", price: "₹300", duration: "35 min", popular: false },
        { name: "Traditional Package", price: "₹500", duration: "60 min", popular: true }
      ],
      staff: [
        { name: "Mohan Singh", role: "Master Barber", experience: "15 years", rating: 4.9 },
        { name: "Vikram Sharma", role: "Traditional Barber", experience: "10 years", rating: 4.7 }
      ],
      openHours: "8:00 AM - 8:00 PM",
      amenities: ["AC", "Traditional Chair", "Cash/Card", "Walk-ins"],
      description: "Authentic barbershop experience with traditional techniques and master craftsmen"
    },
    {
      id: 3,
      name: "Modern Men's Salon",
      category: "Contemporary Styling",
      rating: 4.9,
      reviews: 756,
      distance: "1.2 km",
      address: "Select City Walk, Saket",
      phone: "+91 98765 43212",
      image: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      priceRange: "₹₹₹",
      isVerified: true,
      isTopRated: true,
      specialties: ["Designer Cuts", "Hair Color", "Styling", "Hair Treatments"],
      nextAvailable: "Tomorrow 10:00 AM",
      portfolio: [
        "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1603710436935-be9abba47a5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      ],
      services: [
        { name: "Designer Hair Cut", price: "₹600", duration: "50 min", popular: true },
        { name: "Hair Styling", price: "₹400", duration: "35 min", popular: true },
        { name: "Hair Color", price: "₹800", duration: "90 min", popular: false },
        { name: "Luxury Package", price: "₹1200", duration: "90 min", popular: true }
      ],
      staff: [
        { name: "Arjun Kapoor", role: "Creative Director", experience: "12 years", rating: 4.9 },
        { name: "Rohit Verma", role: "Senior Stylist", experience: "7 years", rating: 4.8 }
      ],
      openHours: "10:00 AM - 10:00 PM",
      amenities: ["AC", "WiFi", "Valet Parking", "Premium Products"],
      description: "Contemporary styling hub with latest trends and techniques for modern gentlemen"
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
          <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            Featured Men's Grooming Stores
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top-Rated Barbershops & Salons
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the best men's grooming professionals 
            {location && <span> in <span className="font-semibold text-blue-600">{location.city}</span></span>}
            with verified reviews and transparent pricing
          </p>
        </div>

        {/* Featured Stores Grid */}
        <div className="space-y-8">
          {featuredStores.map((store, index) => (
            <Card key={store.id} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Left: Image & Portfolio */}
                  <div className="relative">
                    <div className="relative h-80 lg:h-full overflow-hidden">
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {store.isVerified && (
                          <Badge className="bg-blue-500 text-white font-semibold">
                            <Verified className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {store.isTopRated && (
                          <Badge className="bg-orange-500 text-white font-semibold">
                            <Award className="w-3 h-3 mr-1" />
                            Top Rated
                          </Badge>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(store.id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      >
                        <Heart 
                          className={`w-5 h-5 ${
                            favorites.includes(store.id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </button>

                      {/* Portfolio Preview */}
                      <div className="absolute bottom-4 left-4 flex space-x-2">
                        {store.portfolio.slice(0, 3).map((img, idx) => (
                          <div key={idx} className="w-12 h-12 rounded-lg border-2 border-white overflow-hidden">
                            <img src={img} alt="Portfolio" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        <div className="w-12 h-12 rounded-lg border-2 border-white bg-black/50 flex items-center justify-center">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute bottom-4 right-4 bg-white rounded-lg px-3 py-2 shadow-lg">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-current text-yellow-400" />
                          <span className="font-bold text-gray-900">{store.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Store Info & Services */}
                  <div className="p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{store.name}</h3>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-blue-600">{store.priceRange}</div>
                          <div className="text-xs text-gray-500">Price range</div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{store.category}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{store.address}</span>
                        </div>
                        <span>•</span>
                        <span>{store.distance}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        <span className="font-semibold">{store.rating}</span>
                        <span className="text-gray-500">({store.reviews} reviews)</span>
                      </div>
                    </div>

                    {/* Popular Services */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Popular Services:</h4>
                      <div className="space-y-3">
                        {store.services.filter(s => s.popular).map((service, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <span className="font-medium text-gray-900">{service.name}</span>
                              <div className="text-sm text-gray-600">{service.duration}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-blue-600">{service.price}</div>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white mt-1">
                                Book
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {store.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="border-blue-200 text-blue-700">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Amenities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {store.amenities.map((amenity, idx) => (
                          <Badge key={idx} className="bg-green-100 text-green-800 border-0">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Staff & Booking */}
                  <div className="p-6 lg:p-8 bg-blue-50 border-l border-blue-100">
                    {/* Availability */}
                    <div className="mb-6 p-4 bg-white rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-gray-900">Next Available:</span>
                        </div>
                        <span className="font-bold text-green-700">{store.nextAvailable}</span>
                      </div>
                      <div className="text-sm text-gray-600">{store.openHours}</div>
                    </div>

                    {/* Expert Staff */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Expert Staff
                      </h4>
                      <div className="space-y-3">
                        {store.staff.map((member, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={`/api/placeholder/40/40`} />
                              <AvatarFallback className="bg-blue-600 text-white font-bold">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-600">{member.role} • {member.experience}</div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 fill-current text-yellow-400" />
                                <span className="text-xs font-medium">{member.rating}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Link to={`/salon/${store.id}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">
                          <Calendar className="w-5 h-5 mr-2" />
                          Book Appointment
                        </Button>
                      </Link>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl">
            View All Men's Grooming Stores in {location?.city || "Delhi"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MensHairFeaturedStores;
