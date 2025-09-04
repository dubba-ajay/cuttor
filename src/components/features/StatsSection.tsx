import { useState, useEffect } from "react";
import { Users, MapPin, Calendar, TrendingUp, Clock, Star, Shield, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StatsSection = () => {
  const [counters, setCounters] = useState({
    bookings: 0,
    customers: 0,
    cities: 0,
    professionals: 0
  });

  const finalStats = {
    bookings: 125000,
    customers: 100000,
    cities: 500,
    professionals: 5000
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => ({
        bookings: Math.min(prev.bookings + Math.ceil(finalStats.bookings / steps), finalStats.bookings),
        customers: Math.min(prev.customers + Math.ceil(finalStats.customers / steps), finalStats.customers),
        cities: Math.min(prev.cities + Math.ceil(finalStats.cities / steps), finalStats.cities),
        professionals: Math.min(prev.professionals + Math.ceil(finalStats.professionals / steps), finalStats.professionals)
      }));
    }, interval);

    setTimeout(() => clearInterval(timer), duration);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: Calendar,
      value: `${(counters.bookings / 1000).toFixed(0)}k+`,
      label: "Total Bookings",
      subtitle: "This Month",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      icon: Users,
      value: `${(counters.customers / 1000).toFixed(0)}k+`,
      label: "Happy Customers",
      subtitle: "Verified Reviews",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      icon: MapPin,
      value: `${counters.cities}+`,
      label: "Cities Covered",
      subtitle: "Across India",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      icon: Award,
      value: `${(counters.professionals / 1000).toFixed(1)}k+`,
      label: "Expert Professionals",
      subtitle: "Verified & Trained",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  const liveStats = [
    { label: "Average Rating", value: "4.8⭐", icon: Star, trend: "+0.2" },
    { label: "Response Time", value: "< 30 sec", icon: Clock, trend: "-5 sec" },
    { label: "Success Rate", value: "99.5%", icon: Shield, trend: "+0.3%" },
    { label: "Growth Rate", value: "85%", icon: TrendingUp, trend: "+12%" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-6 py-3 text-lg font-semibold mb-6">
            <TrendingUp className="w-5 h-5 mr-2" />
            Live Platform Statistics
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Trusted by Millions Across India
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real-time data showing our impact in transforming the beauty and grooming industry with 
            transparent pricing and verified professionals.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8 text-center relative">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 ${stat.textColor}`} />
                </div>
                
                {/* Value */}
                <div className="relative z-10">
                  <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</h3>
                  <p className="text-sm text-gray-600">{stat.subtitle}</p>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-12 h-12 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className={`w-full h-full bg-gradient-to-br ${stat.color} rounded-full`}></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Performance Metrics */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 border-0 px-4 py-2 font-semibold mb-4">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
                Live Performance Metrics
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Real-Time Platform Health</h3>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Monitoring our platform's performance to ensure the best experience for our users
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {liveStats.map((metric, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className="w-8 h-8 text-white" />
                    <Badge className="bg-green-500/20 text-green-300 border-0 text-xs">
                      {metric.trend}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-sm text-gray-300">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-gray-700">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-gray-700">ISO Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-600" />
              <span className="font-semibold text-gray-700">Verified Reviews</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-purple-600" />
              <span className="font-semibold text-gray-700">Trusted Platform</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
