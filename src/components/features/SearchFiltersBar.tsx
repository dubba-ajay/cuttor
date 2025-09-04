import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, MapPin, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const serviceToRoute: Record<string, string> = {
  "mens-hair": "/mens-hair",
  "womens-beauty": "/womens-beauty",
  "nail-studios": "/nail-studios",
  "makeup-artists": "/makeup-artists",
};

const times = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

export default function SearchFiltersBar({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [service, setService] = useState("mens-hair");
  const [city, setCity] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("any");
  const [price, setPrice] = useState("all");

  const apply = () => {
    const route = serviceToRoute[service] || "/";
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    const formatLocal = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (date) params.set("date", formatLocal(date));
    if (time && time !== "any") params.set("time", time);
    if (price && price !== "all") params.set("price", price);
    params.set("service", service);
    navigate(`${route}?${params.toString()}`);
  };

  return (
    <div className={`w-full ${compact ? '' : 'bg-white border rounded-xl p-4'}`}>
      <div className={`grid grid-cols-1 md:grid-cols-5 gap-2`}>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger className="h-12">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mens-hair">Men's Hair</SelectItem>
            <SelectItem value="womens-beauty">Women's Beauty</SelectItem>
            <SelectItem value="nail-studios">Nail Studios</SelectItem>
            <SelectItem value="makeup-artists">Makeup Artists</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="City or area" value={city} onChange={(e) => setCity(e.target.value)} className="pl-9 h-12" />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-12 justify-start">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date ? date.toDateString() : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-2 space-y-2">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              <div className="flex justify-end">
                <Button size="sm" variant="outline" onClick={() => setDate(new Date())}>Today</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Select value={time} onValueChange={setTime}>
          <SelectTrigger className="h-12">
            <Clock className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Any time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any time</SelectItem>
            {times.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={price} onValueChange={setPrice}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="₹">₹ Budget</SelectItem>
            <SelectItem value="₹₹">₹₹ Moderate</SelectItem>
            <SelectItem value="₹₹₹">₹₹₹ Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {!compact && (
        <div className="mt-3 flex justify-end">
          <Button className="h-10" onClick={apply}>Apply Filters</Button>
        </div>
      )}
    </div>
  );
}
