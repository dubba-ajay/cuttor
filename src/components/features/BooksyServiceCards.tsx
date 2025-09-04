import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Star, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "@/contexts/LocationContext";

const categories = [
  {
    id: "mens-hair",
    title: "Men's Hair & Grooming",
    description: "Haircuts, beard styling, and grooming services",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    priceRange: "₹200 - ₹800",
    avgDuration: "30-60 min",
    rating: 4.8,
    providers: 1200,
    link: "/mens-hair",
    isPopular: true,
    services: ["Hair Cut", "Beard Trim", "Shave", "Hair Wash"],
    bookings: "25k+ this month"
  },
  {
    id: "womens-beauty",
    title: "Women's Hair & Beauty",
    description: "Hair styling, facials, and beauty treatments",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    priceRange: "₹400 - ₹2500",
    avgDuration: "45-180 min",
    rating: 4.9,
    providers: 1800,
    link: "/womens-beauty",
    isTrending: true,
    services: ["Hair Styling", "Facials", "Makeup", "Hair Color"],
    bookings: "41k+ this month"
  },
  {
    id: "nail-services",
    title: "Nail Services",
    description: "Manicures, pedicures, and nail art",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    priceRange: "₹300 - ₹900",
    avgDuration: "30-90 min",
    rating: 4.7,
    providers: 600,
    link: "/nail-studios",
    services: ["Manicure", "Pedicure", "Nail Art", "Gel Polish"],
    bookings: "18k+ this month"
  },
  {
    id: "makeup-artists",
    title: "Makeup Artists",
    description: "Professional makeup for events and occasions",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    priceRange: "₹800 - ₹3500",
    avgDuration: "60-180 min",
    rating: 4.9,
    providers: 400,
    link: "/makeup-artists",
    isPremium: true,
    services: ["Bridal Makeup", "Party Makeup", "Photoshoot", "Events"],
    bookings: "9.8k+ this month"
  }
];

const BooksyServiceCards = () => {
  const { location } = useLocation();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header - Booksy style clean typography */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Browse services by category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover thousands of top-rated beauty and wellness professionals 
            {location && (
              <span> in <span className="font-semibold text-purple-600">{location.city}</span></span>
            )}
          </p>
        </div>

        {/* Service Cards Grid - Booksy's clean card design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Card key={category.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Special Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {category.isPopular && (
                        <Badge className="bg-orange-500 text-white font-semibold">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {category.isTrending && (
                        <Badge className="bg-green-500 text-white font-semibold">
                          📈 Trending
                        </Badge>
                      )}
                      {category.isPremium && (
                        <Badge className="bg-purple-500 text-white font-semibold">
                          👑 Premium
                        </Badge>
                      )}
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="w-5 h-5 fill-current text-yellow-400" />
                        <span className="font-semibold">{category.rating}</span>
                        <span className="text-sm opacity-90">({category.providers} providers)</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>

                    {/* Stats - Booksy style info cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-purple-600">{category.priceRange}</div>
                        <div className="text-sm text-gray-600">Price range</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-purple-600">{category.avgDuration}</div>
                        <div className="text-sm text-gray-600">Duration</div>
                      </div>
                    </div>

                    {/* Popular Services */}
                    <div className="mb-6">
                      <div className="text-sm font-semibold text-gray-700 mb-3">Popular services:</div>
                      <div className="flex flex-wrap gap-2">
                        {category.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-700">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{category.providers} providers</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{category.bookings}</span>
                      </div>
                    </div>

                    {/* Action Button - Booksy's prominent CTA */}
                    <Link to={category.link} className="block">
                      <Button 
                        size="lg" 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition-colors"
                      >
                        <span className="flex items-center justify-center">
                          Book {category.title.split(' ')[0]} Service
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

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Browse all services
          </p>
          <Button variant="outline" size="lg" className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl">
            <MapPin className="w-5 h-5 mr-2" />
            View all services near me
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BooksyServiceCards;
