import { Shield, Star, Users, Award, CheckCircle, Clock, CreditCard, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BooksyTrustSection = () => {
  const trustFeatures = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All providers are background-checked and verified",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Star,
      title: "Real Reviews",
      description: "Authentic reviews from verified customers only",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Your payment information is always protected",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Clock,
      title: "Instant Confirmation",
      description: "Get booking confirmation within seconds",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const stats = [
    { value: "1M+", label: "Happy customers", subtext: "booking monthly" },
    { value: "50k+", label: "Verified professionals", subtext: "across India" },
    { value: "4.8★", label: "Average rating", subtext: "from real reviews" },
    { value: "99.9%", label: "Uptime guarantee", subtext: "always available" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      text: "Amazing experience! Found the perfect salon near my office and the booking was so easy.",
      rating: 5,
      service: "Hair Styling"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi", 
      text: "Great platform! Love how I can see real reviews and book instantly. Very reliable.",
      rating: 5,
      service: "Hair Cut"
    },
    {
      name: "Anita Patel",
      location: "Bangalore",
      text: "The quality of service providers is excellent. Transparent pricing and no hidden charges.",
      rating: 5,
      service: "Facial"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-700 px-4 py-2 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Trusted by millions
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your safety and satisfaction is our priority
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've built the most trusted platform for beauty and wellness bookings 
            with industry-leading safety measures and quality standards.
          </p>
        </div>

        {/* Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFeatures.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${feature.bgColor} flex items-center justify-center`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Trusted by millions across India</h3>
            <p className="text-xl opacity-90">Join the largest community of beauty and wellness enthusiasts</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm opacity-75">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Testimonials */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What our customers say</h3>
            <p className="text-xl text-gray-600">Real experiences from real customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                    </div>
                    <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                      {testimonial.service}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-semibold text-gray-900">ISO 27001 Certified</div>
                <div className="text-sm text-gray-600">Data security standards</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Phone className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-semibold text-gray-900">24/7 Support</div>
                <div className="text-sm text-gray-600">Always here to help</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Award className="w-6 h-6 text-purple-600" />
              <div>
                <div className="font-semibold text-gray-900">Industry Leader</div>
                <div className="text-sm text-gray-600">Trusted platform in India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksyTrustSection;
