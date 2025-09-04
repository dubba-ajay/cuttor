import { createContext, useContext, useMemo, useState } from "react";

export type Role = "guest" | "freelancer" | "owner";

export type Job = {
  id: string;
  storeId: string;
  storeName: string;
  title: string;
  location: string;
  date: string; // ISO date
  startTime: string; // HH:mm
  hours: number;
  rate: number; // per hour
  homeService: boolean;
  status: "open" | "applied" | "assigned" | "in_progress" | "completed" | "paid";
  freelancerId?: string;
};

export type Earning = {
  id: string;
  jobId: string;
  date: string; // ISO date
  amount: number;
  status: "pending" | "paid";
};

export type Booking = {
  id: string;
  storeId: string;
  storeName: string;
  date: string; // ISO date
  price: number;
};

const uid = () => Math.random().toString(36).slice(2, 9);

const todayISO = () => new Date().toISOString().slice(0,10);

export type MarketplaceState = {
  role: Role;
  setRole: (r: Role) => void;
  freelancerId: string; // simulated current freelancer id
  ownerStoreId: string; // simulated current owner's store id
  jobs: Job[];
  bookings: Booking[];
  earnings: Earning[];
  // derived
  openJobs: Job[];
  myJobs: Job[];
  todaysEarnings: number;
  todaysRevenue: number;
  bookingsToday: number;
  // actions (freelancer)
  applyToJob: (jobId: string) => void;
  startJob: (jobId: string) => void;
  completeJob: (jobId: string) => void;
  requestPayout: (jobId: string) => void;
  // actions (owner)
  postJob: (partial: Omit<Job, "id" | "status">) => void;
  markBooking: (price: number) => void;
};

const MarketplaceContext = createContext<MarketplaceState | null>(null);

export const useMarketplace = () => {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) throw new Error("useMarketplace must be used within MarketplaceProvider");
  return ctx;
};

const seedJobs: Job[] = [
  {
    id: uid(), storeId: "s1", storeName: "Elite Men's Grooming", title: "Barber - Haircut & Beard",
    location: "Connaught Place", date: todayISO(), startTime: "11:00", hours: 4, rate: 300,
    homeService: false, status: "open",
  },
  {
    id: uid(), storeId: "s2", storeName: "Glamour Hair & Beauty", title: "Hair Stylist",
    location: "Bandra", date: todayISO(), startTime: "15:00", hours: 5, rate: 350,
    homeService: true, status: "open",
  },
  {
    id: uid(), storeId: "s3", storeName: "Nail Couture", title: "Nail Tech (Gel)",
    location: "Indiranagar", date: todayISO(), startTime: "12:00", hours: 3, rate: 280,
    homeService: false, status: "open",
  },
];

const seedBookings: Booking[] = [
  { id: uid(), storeId: "s1", storeName: "Elite Men's Grooming", date: todayISO(), price: 499 },
  { id: uid(), storeId: "s1", storeName: "Elite Men's Grooming", date: todayISO(), price: 699 },
  { id: uid(), storeId: "s2", storeName: "Glamour Hair & Beauty", date: todayISO(), price: 899 },
];

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("guest");
  const [jobs, setJobs] = useState<Job[]>(seedJobs);
  const [bookings, setBookings] = useState<Booking[]>(seedBookings);
  const [earnings, setEarnings] = useState<Earning[]>([]);

  // Simulated current ids
  const freelancerId = "freelancer-1";
  const ownerStoreId = "s1";

  const openJobs = useMemo(() => jobs.filter(j => j.status === "open"), [jobs]);
  const myJobs = useMemo(() => jobs.filter(j => j.freelancerId === freelancerId || j.status === "applied" || j.status === "assigned" || j.status === "in_progress" || j.status === "completed" || j.status === "paid").filter(j => j.freelancerId === freelancerId), [jobs]);

  const todaysEarnings = useMemo(() => earnings.filter(e => e.date === todayISO()).reduce((s, e) => s + e.amount, 0), [earnings]);
  const todaysRevenue = useMemo(() => bookings.filter(b => b.date === todayISO()).reduce((s, b) => s + b.price, 0), [bookings]);
  const bookingsToday = useMemo(() => bookings.filter(b => b.date === todayISO()).length, [bookings]);

  const applyToJob = (jobId: string) => {
    setJobs(prev => prev.map(j => j.id === jobId && j.status === "open" ? { ...j, status: "assigned", freelancerId } : j));
  };
  const startJob = (jobId: string) => {
    setJobs(prev => prev.map(j => j.id === jobId && j.freelancerId === freelancerId ? { ...j, status: "in_progress" } : j));
  };
  const completeJob = (jobId: string) => {
    setJobs(prev => prev.map(j => j.id === jobId && j.freelancerId === freelancerId ? { ...j, status: "completed" } : j));
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      const amount = job.rate * job.hours;
      setEarnings(prev => [...prev, { id: uid(), jobId: job.id, date: todayISO(), amount, status: "pending" }]);
    }
  };
  const requestPayout = (jobId: string) => {
    setJobs(prev => prev.map(j => j.id === jobId && j.freelancerId === freelancerId ? { ...j, status: "paid" } : j));
    setEarnings(prev => prev.map(e => e.jobId === jobId ? { ...e, status: "paid" } : e));
  };

  const postJob: MarketplaceState["postJob"] = (partial) => {
    setJobs(prev => [{ ...partial, id: uid(), status: "open" }, ...prev]);
  };

  const markBooking: MarketplaceState["markBooking"] = (price) => {
    setBookings(prev => [{ id: uid(), storeId: ownerStoreId, storeName: "Elite Men's Grooming", date: todayISO(), price }, ...prev]);
  };

  const value: MarketplaceState = {
    role, setRole, freelancerId, ownerStoreId,
    jobs, bookings, earnings,
    openJobs, myJobs, todaysEarnings, todaysRevenue, bookingsToday,
    applyToJob, startJob, completeJob, requestPayout,
    postJob, markBooking,
  };

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}
