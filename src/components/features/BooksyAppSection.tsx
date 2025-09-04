import { Smartphone, Star, Download, Bell, MapPin, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BooksyAppSection = () => {
  const appFeatures = [
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Book appointments in 3 simple taps"
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Never miss your appointment again"
    },
    {
      icon: MapPin,
      title: "Find Nearby",
      description: "Discover salons and spas around you"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Pay safely through the app"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <defs>
            <pattern id="appPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#appPattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <Badge className="bg-white/20 text-white border-0 px-4 py-2 text-sm font-medium mb-6">
              <Smartphone className="w-4 h-4 mr-2" />
              Available on mobile
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Book on the go with our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400"> mobile app</span>
            </h2>
            
            <p className="text-xl text-purple-100 leading-relaxed mb-8">
              Get instant access to thousands of beauty professionals, 
              exclusive app-only deals, and seamless booking experience 
              right at your fingertips.
            </p>

            {/* App Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{feature.title}</div>
                    <div className="text-sm text-purple-200">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* App Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">4.8★</div>
                <div className="text-sm text-purple-200">App Store</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">1M+</div>
                <div className="text-sm text-purple-200">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">99%</div>
                <div className="text-sm text-purple-200">Satisfaction</div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-4 rounded-xl shadow-lg flex items-center justify-center"
              >
                <div className="mr-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs opacity-75">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </Button>
              
              <Button 
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-4 rounded-xl shadow-lg flex items-center justify-center"
              >
                <div className="mr-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs opacity-75">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Floating Elements */}
            <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-80 animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-60 animate-bounce"></div>
            
            {/* Phone Container */}
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-72 h-[500px] bg-gradient-to-b from-gray-800 to-black rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-full z-10"></div>
                  
                  {/* Screen Content */}
                  <div className="h-full bg-gradient-to-b from-purple-50 to-blue-50 p-4 pt-10">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-xl font-bold text-gray-900">BeautyBook</div>
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white rounded-xl p-3 shadow-sm mb-4 border">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-purple-300 rounded-full"></div>
                        <div className="text-sm text-gray-600">Search services...</div>
                      </div>
                    </div>

                    {/* Service Cards */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-xl p-4 shadow-sm border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <span className="text-lg">💇‍♀️</span>
                            </div>
                            <div>
                              <div className="font-semibold text-sm">Hair Styling</div>
                              <div className="text-xs text-gray-600">Elite Salon • 0.5km</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-purple-600 font-bold text-sm">₹500</div>
                            <div className="text-xs text-green-600">Available</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <span className="text-lg">💆‍♀️</span>
                            </div>
                            <div>
                              <div className="font-semibold text-sm">Facial</div>
                              <div className="text-xs text-gray-600">Glow Studio • 0.8km</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-purple-600 font-bold text-sm">₹700</div>
                            <div className="text-xs text-orange-600">2 slots left</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                              <span className="text-lg">💅</span>
                            </div>
                            <div>
                              <div className="font-semibold text-sm">Manicure</div>
                              <div className="text-xs text-gray-600">Nail Art • 1.2km</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-purple-600 font-bold text-sm">₹400</div>
                            <div className="text-xs text-green-600">Available</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Book Button */}
                    <div className="mt-6">
                      <div className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl py-3 text-center text-sm">
                        Book Appointment
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Callouts */}
              <div className="absolute -left-12 top-1/4 bg-white rounded-xl p-3 shadow-xl border animate-pulse">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-900">4.8★ Rating</span>
                </div>
              </div>

              <div className="absolute -right-12 bottom-1/3 bg-white rounded-xl p-3 shadow-xl border animate-pulse">
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-gray-900">1M+ Downloads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksyAppSection;
