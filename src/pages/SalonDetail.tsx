import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useParams, Link } from "react-router-dom";
import { allStores } from "@/components/features/AllStores";
import { Badge } from "@/components/ui/badge";
import BookingModal from "@/components/features/BookingModal";
import salonImg1 from "@/assets/salon-1.jpg";
import salonImg2 from "@/assets/salon-2.jpg";
import salonImg3 from "@/assets/salon-3.jpg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Star, ArrowLeft, Clock, Verified, Award } from "lucide-react";

const categoryLabel = (c: string) => {
  switch (c) {
    case "mens-hair": return "Men's Hair";
    case "womens-beauty": return "Women's Beauty";
    case "nail-studios": return "Nail Studios";
    case "makeup-artists": return "Makeup Artists";
    default: return "Salon";
  }
};

const SalonDetail = () => {
  const { id } = useParams();
  const store = allStores.find(s => s.id === Number(id));

  const [selectedService, setSelectedService] = useState<{ id: number; name: string; price: string; duration: string; homeVisit: boolean; salonVisit: boolean } | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const servicesByCategory: Record<string, { id: number; name: string; price: string; duration: string; homeVisit: boolean; salonVisit: boolean }[]> = {
    "mens-hair": [
      { id: 1, name: "Men’s Haircut", price: "₹500", duration: "30 min", homeVisit: true, salonVisit: true },
      { id: 2, name: "Beard Grooming", price: "₹299", duration: "20 min", homeVisit: true, salonVisit: true },
      { id: 3, name: "Facial Treatment", price: "₹1499", duration: "60 min", homeVisit: true, salonVisit: true },
      { id: 4, name: "Hair Color", price: "₹1999", duration: "90 min", homeVisit: true, salonVisit: true },
    ],
    "womens-beauty": [
      { id: 11, name: "Haircut & Styling", price: "₹799", duration: "45 min", homeVisit: false, salonVisit: true },
      { id: 12, name: "Facial Treatment", price: "₹1499", duration: "60 min", homeVisit: true, salonVisit: true },
      { id: 13, name: "Color & Highlights", price: "₹2499", duration: "120 min", homeVisit: false, salonVisit: true },
      { id: 14, name: "Waxing (Full)", price: "₹699", duration: "40 min", homeVisit: true, salonVisit: true },
      { id: 15, name: "Bridal Makeup Trial", price: "₹2999", duration: "90 min", homeVisit: true, salonVisit: true },
    ],
    "nail-studios": [
      { id: 21, name: "Classic Manicure", price: "₹399", duration: "30 min", homeVisit: false, salonVisit: true },
      { id: 22, name: "Gel Manicure", price: "₹599", duration: "45 min", homeVisit: false, salonVisit: true },
      { id: 23, name: "Pedicure", price: "₹499", duration: "45 min", homeVisit: false, salonVisit: true },
      { id: 24, name: "Nail Extensions", price: "₹1499", duration: "90 min", homeVisit: false, salonVisit: true },
      { id: 25, name: "Nail Art (per set)", price: "₹699", duration: "45 min", homeVisit: false, salonVisit: true },
    ],
    "makeup-artists": [
      { id: 31, name: "Party Makeup", price: "₹1999", duration: "90 min", homeVisit: true, salonVisit: true },
      { id: 32, name: "Bridal Makeup", price: "₹4999", duration: "120 min", homeVisit: true, salonVisit: true },
      { id: 33, name: "Hairstyling", price: "₹799", duration: "45 min", homeVisit: true, salonVisit: true },
      { id: 34, name: "Saree Draping", price: "₹499", duration: "30 min", homeVisit: true, salonVisit: true },
    ],
  };
  const categoryServices = servicesByCategory[store?.category || "mens-hair"] || servicesByCategory["mens-hair"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <Link to={"/all-stores"} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to stores
          </Link>

          {!store ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold mb-2">Store not found</h2>
              <p className="text-muted-foreground">The requested store does not exist.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-white/20 text-white border-0">{categoryLabel(store.category)}</Badge>
                      {store.isTopRated && (
                        <Badge className="bg-yellow-400 text-black border-0"><Award className="w-3 h-3 mr-1" />Top Rated</Badge>
                      )}
                      {store.isVerified && (
                        <Badge className="bg-blue-500 text-white border-0"><Verified className="w-3 h-3 mr-1" />Verified</Badge>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold">{store.name}</h1>
                    <div className="flex items-center gap-3 text-sm opacity-90">
                      <span className="flex items-center"><Star className="w-4 h-4 mr-1 fill-yellow-300 text-yellow-300" />{store.rating} ({store.reviews} reviews)</span>
                      <span>•</span>
                      <span className="font-medium">{store.priceRange}</span>
                      <span>•</span>
                      <span>{store.openHours}</span>
                    </div>
                  </div>
                </div>

                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-3">About</h2>
                    <p className="text-muted-foreground mb-4">{store.description}</p>
                    <h3 className="font-semibold mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {store.specialties.map((s, i) => (
                        <Badge key={i} variant="outline">{s}</Badge>
                      ))}
                    </div>

                    <h3 className="font-semibold mb-2">Services</h3>
                    <div className="divide-y border rounded-lg">
                      {categoryServices.map(svc => (
                        <div key={svc.id} className="p-4 grid grid-cols-[1fr_auto] items-center gap-3">
                          <div className="min-w-0">
                            <div className="font-medium truncate">{svc.name}</div>
                            <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
                              <span>{svc.duration}</span>
                              <span>•</span>
                              <span className="font-semibold">{svc.price}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <Button size="sm"
                              className="h-8 px-3"
                              onClick={() => { setSelectedService(svc); setIsBookingOpen(true); }}
                            >
                              Book Now
                            </Button>
                            <Link to={`/service/${svc.id}`} className="text-xs md:text-sm text-primary underline">Details</Link>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h3 className="font-semibold mt-6 mb-2">Gallery</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <img src={salonImg1} alt="Gallery 1" className="w-full h-24 object-cover rounded" />
                      <img src={salonImg2} alt="Gallery 2" className="w-full h-24 object-cover rounded" />
                      <img src={salonImg3} alt="Gallery 3" className="w-full h-24 object-cover rounded" />
                    </div>

                    <h3 className="font-semibold mt-6 mb-2">Reviews</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded">
                        <div className="flex items-center gap-2 text-yellow-500">⭐⭐⭐⭐⭐ <span className="text-foreground">Excellent service!</span></div>
                        <div className="text-sm text-muted-foreground">Very professional staff.</div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="flex items-center gap-2 text-yellow-500">⭐⭐⭐⭐ <span className="text-foreground">Loved the haircut</span></div>
                        <div className="text-sm text-muted-foreground">Would recommend.</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{store.address}</div>
                    <div className="flex items-center"><Phone className="w-4 h-4 mr-2" />{store.phone}</div>
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2" />{store.openHours}</div>
                    <Button className="w-full">Book an appointment</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      {store && (
        <div className="fixed bottom-4 left-0 right-0 px-4">
          <div className="mx-auto max-w-4xl rounded-xl border bg-white shadow-soft p-3 flex items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground mr-2">{store.name}</span>
              Open today • {store.openHours}
            </div>
            <Button onClick={() => { setSelectedService(categoryServices[0]); setIsBookingOpen(true); }}>Book now</Button>
          </div>
        </div>
      )}
      {store && (
        <BookingModal
          service={selectedService}
          services={categoryServices}
          salon={{ id: store.id, name: store.name, rating: store.rating, distance: store.distance, address: store.address, image: store.image }}
          isOpen={isBookingOpen}
          onClose={() => { setIsBookingOpen(false); setSelectedService(null); }}
        />
      )}
    </div>
  );
};

export default SalonDetail;
