import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Award, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Delhi",
    service: "Hair Cut & Beard Styling",
    rating: 5,
    review: "Amazing service! The barber was very skilled and the salon was super clean. Loved the transparent pricing - no hidden charges. Will definitely come back!",
    price: "₹350",
    image: "👨‍💼",
    date: "2 days ago",
    verified: true
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Mumbai",
    service: "Bridal Makeup",
    rating: 5,
    review: "Exceptional work for my wedding! The makeup artist was professional and made me look stunning. The booking process was so easy and the price was very reasonable.",
    price: "₹2500",
    image: "👰",
    date: "1 week ago",
    verified: true
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Bangalore",
    service: "Facial Treatment",
    rating: 5,
    review: "Best facial I've ever had! The staff was knowledgeable about skin types and recommended the perfect treatment. Great value for money.",
    price: "₹800",
    image: "👨‍💻",
    date: "3 days ago",
    verified: true
  },
  {
    id: 4,
    name: "Neha Singh",
    location: "Pune",
    service: "Manicure & Pedicure",
    rating: 5,
    review: "Loved the nail art! Very hygienic place and friendly staff. The online booking saved me so much time. Highly recommended!",
    price: "₹600",
    image: "👩‍🎨",
    date: "5 days ago",
    verified: true
  },
  {
    id: 5,
    name: "Rohit Verma",
    location: "Hyderabad",
    service: "Hair Color",
    rating: 5,
    review: "Perfect hair color job! The stylist understood exactly what I wanted. Great experience from booking to service completion.",
    price: "₹1200",
    image: "👨‍🎤",
    date: "1 week ago",
    verified: true
  },
  {
    id: 6,
    name: "Kavya Reddy",
    location: "Chennai",
    service: "Hair Styling",
    rating: 5,
    review: "Gorgeous hairstyle for my friend's wedding! The salon had a great ambiance and the service was top-notch. Worth every rupee!",
    price: "₹900",
    image: "👩‍🦰",
    date: "4 days ago",
    verified: true
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-red-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-xl">
              <Quote className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Real reviews from real customers across India. Join thousands of happy customers 
            who trust us for their beauty and grooming needs.
          </p>

          {/* Trust Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center space-x-3 bg-white/80 rounded-2xl px-6 py-4 shadow-lg border border-indigo-200">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600">4.9⭐</div>
                <div className="text-sm font-medium text-gray-600">Average Rating</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 rounded-2xl px-6 py-4 shadow-lg border border-purple-200">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">50k+</div>
                <div className="text-sm font-medium text-gray-600">Reviews</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 rounded-2xl px-6 py-4 shadow-lg border border-pink-200">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">98%</div>
                <div className="text-sm font-medium text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-2xl border-2 border-indigo-200 hover:bg-indigo-50 text-indigo-600"
            size="sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-2xl border-2 border-indigo-200 hover:bg-indigo-50 text-indigo-600"
            size="sm"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-16">
            {getVisibleTestimonials().map((testimonial, index) => (
              <Card 
                key={testimonial.id}
                className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm overflow-hidden ${
                  index === 1 ? 'lg:scale-110 lg:shadow-2xl' : 'lg:scale-95'
                }`}
              >
                <CardContent className="p-8 relative">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-20">
                    <Quote className="w-12 h-12 text-indigo-600" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    "{testimonial.review}"
                  </p>

                  {/* Service & Price */}
                  <div className="flex items-center justify-between mb-6 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.service}</div>
                      <div className="text-sm text-gray-600">{testimonial.date}</div>
                    </div>
                    <div className="text-xl font-bold text-green-600">{testimonial.price}</div>
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{testimonial.image}</div>
                      <div>
                        <div className="font-bold text-gray-900 flex items-center">
                          {testimonial.name}
                          {testimonial.verified && (
                            <Badge className="ml-2 bg-green-100 text-green-800 border-0 text-xs">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">{testimonial.location}</div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Border */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 scale-125" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                <defs>
                  <pattern id="testimonialPattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M15 25 L35 25 M25 15 L25 35" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#testimonialPattern)" />
              </svg>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Excellence?</h3>
              <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
                Join thousands of satisfied customers and book your appointment today. 
                Experience the best beauty and grooming services at transparent prices.
              </p>
              <Button 
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-50 font-bold px-8 py-4 rounded-xl shadow-lg text-lg"
              >
                Book Your Appointment Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
