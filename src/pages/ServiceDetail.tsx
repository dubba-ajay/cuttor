import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clock, ArrowLeft } from "lucide-react";

type Service = {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
};

const servicesCatalog: Record<number, Service> = {
  1: { id: 1, name: "Men’s Haircut", description: "Includes consultation, trimming and styling.", price: "₹500", duration: "30 min" },
  2: { id: 2, name: "Beard Grooming", description: "Beard trim and shape with hot towel.", price: "₹299", duration: "20 min" },
  3: { id: 3, name: "Facial Treatment", description: "Deep cleansing and skin rejuvenation.", price: "₹1499", duration: "60 min" },
  4: { id: 4, name: "Hair Color", description: "Professional hair coloring with premium products.", price: "₹1999", duration: "90 min" },
  5: { id: 5, name: "Bridal Makeup", description: "Bridal makeup trial/session with premium products.", price: "₹4999", duration: "120 min" },
};

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
];

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesCatalog[Number(id || 0)];

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <Link to={"/"} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Link>

          {!service ? (
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold">Service not found</h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <h1 className="text-3xl font-bold">{service.name}</h1>
                <p className="text-muted-foreground">{service.description}</p>
                <div className="flex items-center gap-3">
                  <Badge className="text-base font-semibold">{service.price}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" /> {service.duration}
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        const today = new Date();
                        const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                        return d < t;
                      }}
                      className="rounded-md border"
                    />
                    <div className="flex justify-end"><Button size="sm" variant="outline" onClick={() => setSelectedDate(new Date())}>Today</Button></div>
                    {selectedDate && (
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`p-2 text-sm border rounded transition-all ${selectedTime === t ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <aside className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Book this Service</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{service.name}</div>
                        <div className="text-sm text-muted-foreground">{service.duration}</div>
                      </div>
                      <div className="font-bold">{service.price}</div>
                    </div>
                    <Button disabled={!selectedDate || !selectedTime} className="w-full">Book Your Service Now</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>People also booked</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <Link to="/service/2" className="block hover:underline">Beard Grooming — ₹299</Link>
                    <Link to="/service/3" className="block hover:underline">Facial Treatment — ₹1499</Link>
                  </CardContent>
                </Card>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
