import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, User, Phone, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "@/contexts/LocationContext";

const LiveBookingSection = () => {
  const { location } = useLocation();
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [liveBookings, setLiveBookings] = useState(157);

  // Simulate live booking counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBookings(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const quickServices = [
    { name: "Hair Cut", price: "₹200", duration: "30 min", category: "Men's Hair" },
    { name: "Facial", price: "₹500", duration: "60 min", category: "Women's Beauty" },
    { name: "Manicure", price: "₹300", duration: "45 min", category: "Nail Studios" },
    { name: "Makeup", price: "₹800", duration: "90 min", category: "Makeup Artists" }
  ];

  const availableSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const recentBookings = [
    { name: "Rajesh K.", service: "Hair Cut", time: "2 min ago", location: "Delhi" },
    { name: "Priya S.", service: "Facial", time: "5 min ago", location: "Mumbai" },
    { name: "Amit T.", service: "Beard Trim", time: "8 min ago", location: "Bangalore" },
    { name: "Neha R.", service: "Manicure", time: "12 min ago", location: "Pune" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Live Booking Form */}
          <div>
            <div className="text-center lg:text-left mb-8">
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 px-6 py-3 text-lg font-semibold mb-6">
                <Calendar className="w-5 h-5 mr-2" />
                Live Booking System
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Book Your Appointment in 60 Seconds
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Real-time availability, instant confirmation, and transparent pricing. 
                Join <span className="font-bold text-purple-600">{liveBookings}+ people</span> who booked today!
              </p>
            </div>

            {/* Booking Form */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-2xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Service
                    </label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger className="border-2 border-purple-200 focus:border-purple-400 rounded-xl">
                        <SelectValue placeholder="Choose your service" />
                      </SelectTrigger>
                      <SelectContent>
                        {quickServices.map((service, index) => (
                          <SelectItem key={index} value={service.name}>
                            <div className="flex items-center justify-between w-full">
                              <span>{service.name}</span>
                              <div className="ml-4 text-sm text-gray-500">
                                {service.price} • {service.duration}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="flex items-center bg-gray-50 border-2 border-purple-200 rounded-xl p-3">
                      <MapPin className="w-5 h-5 text-purple-500 mr-3" />
                      <span className="font-medium text-gray-700">
                        {location?.city || "Select Location"}
                      </span>
                      <Badge className="ml-auto bg-green-100 text-green-800">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Available
                      </Badge>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="border-2 border-purple-200 focus:border-purple-400 rounded-xl"
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.slice(0, 6).map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedTime === slot ? "default" : "outline"}
                          size="sm"
                          className={`rounded-lg border-2 ${
                            selectedTime === slot 
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-purple-400" 
                              : "border-purple-200 hover:border-purple-400"
                          }`}
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                        <Input
                          placeholder="Enter your name"
                          className="pl-10 border-2 border-purple-200 focus:border-purple-400 rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                        <Input
                          placeholder="Your phone number"
                          className="pl-10 border-2 border-purple-200 focus:border-purple-400 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  {selectedService && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{selectedService}</div>
                          <div className="text-sm text-gray-600">
                            {quickServices.find(s => s.name === selectedService)?.duration}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {quickServices.find(s => s.name === selectedService)?.price}
                          </div>
                          <div className="text-sm text-gray-600">No hidden charges</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Book Button */}
                  <Button 
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg text-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment Instantly
                  </Button>

                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      Instant Confirmation
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 text-blue-500 mr-1" />
                      Secure Payment
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Live Activity & Stats */}
          <div className="space-y-8">
            {/* Live Booking Counter */}
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="text-6xl font-bold mb-4">{liveBookings.toLocaleString()}</div>
                <div className="text-xl font-semibold mb-2">Bookings Today</div>
                <div className="text-purple-100">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-2 animate-pulse"></span>
                  Live booking activity
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {recentBookings.map((booking, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                          {booking.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{booking.name}</div>
                          <div className="text-sm text-gray-600">{booking.service} • {booking.location}</div>
                        </div>
                      </div>
                      <div className="text-sm text-purple-600 font-medium">{booking.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">⚡</div>
                  <div className="font-bold text-gray-900">Instant Booking</div>
                  <div className="text-sm text-gray-600 mt-1">Get confirmed in seconds</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🛡️</div>
                  <div className="font-bold text-gray-900">Secure & Safe</div>
                  <div className="text-sm text-gray-600 mt-1">Protected payments</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveBookingSection;
