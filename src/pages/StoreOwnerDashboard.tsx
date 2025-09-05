import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePayments } from "@/contexts/PaymentContext";

function useLocalStorage<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : initial; } catch { return initial; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(val)); }, [key, val]);
  return [val, setVal] as const;
}

const COMMISSION_RATE = 0.1; // 10%

type Staff = { id: string; name: string; role: string; type: "employee" | "freelancer"; status: "active" | "inactive" };
type Service = { id: string; name: string; duration: number; price: number; enabled: boolean };
type Offer = { id: string; type: "discount" | "membership" | "loyalty"; name: string; value: string; active: boolean };
type Review = { id: string; author: string; rating: number; text?: string; date: string };
type OwnerAppt = { id: string; date: string; time: string; customer: string; service: string; status: "pending" | "accepted" | "rejected" | "rescheduled" };

const StoreOwnerDashboard = () => {
  const { role, setRole, ownerStoreId, jobs, bookings, earnings } = useMarketplace();
  const { link, approveFreelancer } = usePayments();

  const [profile, setProfile] = useLocalStorage("storeProfile", {
    name: "Elite Men's Grooming",
    logoUrl: "",
    description: "Premium salon for grooming and styling.",
    address: "Connaught Place, New Delhi",
    timings: "Mon-Sun • 9:00 AM - 9:00 PM",
  });
  const [services, setServices] = useLocalStorage<Service[]>("storeServices", [
    { id: "svc1", name: "Haircut", duration: 30, price: 399, enabled: true },
    { id: "svc2", name: "Beard Trim", duration: 20, price: 199, enabled: true },
    { id: "svc3", name: "Hair Color (Basic)", duration: 60, price: 999, enabled: true },
  ]);
  const [staff, setStaff] = useLocalStorage<Staff[]>("storeStaff", [
    { id: "st1", name: "Anita", role: "Hair Stylist", type: "employee", status: "active" },
    { id: "st2", name: "Rahul", role: "Barber", type: "freelancer", status: "active" },
  ]);
  const [offers, setOffers] = useLocalStorage<Offer[]>("storeOffers", [
    { id: "of1", type: "discount", name: "Festive 10% OFF", value: "10%", active: true },
  ]);
  const [reviews] = useLocalStorage<Review[]>("storeReviews", [
    { id: "rv1", author: "Aarav", rating: 5, text: "Great service!", date: new Date().toISOString().slice(0,10) },
    { id: "rv2", author: "Priya", rating: 4, text: "Loved the haircut.", date: new Date().toISOString().slice(0,10) },
  ]);
  const [appointments, setAppointments] = useLocalStorage<OwnerAppt[]>("storeAppointments", [
    { id: "a1", date: new Date().toISOString().slice(0,10), time: "10:00 AM", customer: "Rohit", service: "Haircut", status: "pending" },
    { id: "a2", date: new Date().toISOString().slice(0,10), time: "11:30 AM", customer: "Neha", service: "Hair Color (Basic)", status: "accepted" },
  ]);
  const [settings, setSettings] = useLocalStorage("storeSettings", {
    holidays: [] as string[],
    slotDuration: 30,
    notifyBookings: true,
    notifyCancellations: true,
  });

  const today = new Date().toISOString().slice(0,10);
  const revenueToday = useMemo(() => bookings.filter(b => b.storeId === ownerStoreId && b.date === today).reduce((s,b)=>s+b.price,0), [bookings, ownerStoreId, today]);
  const bookingsCountToday = useMemo(() => bookings.filter(b => b.storeId === ownerStoreId && b.date === today).length, [bookings, ownerStoreId, today]);

  const costToday = useMemo(() => {
    return earnings
      .filter(e => e.date === today)
      .filter(e => { const job = jobs.find(j => j.id === e.jobId); return job && job.storeId === ownerStoreId; })
      .reduce((s,e)=>s+e.amount,0);
  }, [earnings, jobs, ownerStoreId, today]);

  const profitToday = Math.max(0, revenueToday - costToday);

  const last7 = useMemo(() => {
    const days: { date: string; revenue: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0,10);
      const revenue = bookings.filter(b => b.storeId === ownerStoreId && b.date === key).reduce((s, b) => s + b.price, 0);
      days.push({ date: key.slice(5), revenue });
    }
    return days;
  }, [bookings, ownerStoreId]);

  const [reschedOpen, setReschedOpen] = useState<null | OwnerAppt>(null);
  const [newStaffOpen, setNewStaffOpen] = useState(false);
  const [newOfferOpen, setNewOfferOpen] = useState(false);

  const location = useLocation();
  const initialTab = ((location.state as any)?.tab as string) || "overview";
  const [tab, setTab] = useState<string>(initialTab);
  useEffect(() => {
    const t = (location.state as any)?.tab as string | undefined;
    if (t) setTab(t);
  }, [location.state]);
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#111827]">
      <Header />
      <main className="pt-16 container mx-auto px-4 lg:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Store Owner Dashboard</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="hidden sm:inline">Role:</span> <Badge>{role}</Badge>
            <div className="flex items-center gap-1">
              <span className="text-xs">Guest</span>
              <input type="checkbox" className="toggle toggle-sm" checked={role==='owner'} onChange={()=> setRole(role==='owner'?'customer':'owner')} />
              <span className="text-xs">Owner</span>
            </div>
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex gap-2 bg-transparent p-0 overflow-x-auto whitespace-nowrap -mx-4 px-4">
            <TabsTrigger value="overview" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Overview</TabsTrigger>
            <TabsTrigger value="profile" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Store Profile</TabsTrigger>
            <TabsTrigger value="services" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Services & Pricing</TabsTrigger>
            <TabsTrigger value="staff" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Staff</TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Bookings</TabsTrigger>
            <TabsTrigger value="earnings" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Earnings & Payouts</TabsTrigger>
            <TabsTrigger value="offers" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Local Offers</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Reviews</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Today's Revenue</CardTitle></CardHeader><CardContent className="text-2xl font-bold">₹{revenueToday.toLocaleString('en-IN')}</CardContent></Card>
              <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Today's Profit</CardTitle></CardHeader><CardContent className="text-2xl font-bold">₹{profitToday.toLocaleString('en-IN')}</CardContent></Card>
              <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Bookings Today</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{bookingsCountToday}</CardContent></Card>
              <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active Staff</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{staff.filter(s=>s.status==='active').length}</CardContent></Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Last 7 days revenue</CardTitle></CardHeader>
                <CardContent>
                  <ChartContainer config={{ revenue: { label: "Revenue", color: "hsl(var(--primary))" } }} className="h-64 w-full">
                    <BarChart data={last7}>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4,4,0,0]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Top Services (today)</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader><TableRow><TableHead>Service</TableHead><TableHead className="text-right">Count</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {services.slice(0,4).map(s => (
                        <TableRow key={s.id}><TableCell>{s.name}</TableCell><TableCell className="text-right">{Math.floor(Math.random()*5)+1}</TableCell></TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader><CardTitle>Store Profile</CardTitle></CardHeader>
              <CardContent className="grid gap-4 md:max-w-2xl">
                <div className="grid gap-2"><Label>Store Name</Label><Input value={profile.name} onChange={(e)=> setProfile({ ...profile, name: e.target.value })} /></div>
                <div className="grid gap-2"><Label>Logo URL</Label><Input value={profile.logoUrl} onChange={(e)=> setProfile({ ...profile, logoUrl: e.target.value })} /></div>
                <div className="grid gap-2"><Label>Description</Label><Textarea value={profile.description} onChange={(e)=> setProfile({ ...profile, description: e.target.value })} /></div>
                <div className="grid gap-2"><Label>Address</Label><Input value={profile.address} onChange={(e)=> setProfile({ ...profile, address: e.target.value })} /></div>
                <div className="grid gap-2"><Label>Timings</Label><Input value={profile.timings} onChange={(e)=> setProfile({ ...profile, timings: e.target.value })} /></div>
                <div className="text-sm text-muted-foreground">Changes saved locally. Connect a backend to persist.</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader><CardTitle>Services & Pricing</CardTitle></CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Enabled</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map(s => (
                      <TableRow key={s.id}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>
                          <Input type="number" className="w-24" value={s.duration} onChange={(e)=> setServices(services.map(x => x.id===s.id ? { ...x, duration: parseInt(e.target.value)||0 } : x))} />
                        </TableCell>
                        <TableCell>
                          <Input type="number" className="w-28" value={s.price} onChange={(e)=> setServices(services.map(x => x.id===s.id ? { ...x, price: parseInt(e.target.value)||0 } : x))} />
                        </TableCell>
                        <TableCell>
                          <Switch checked={s.enabled} onCheckedChange={(v)=> setServices(services.map(x => x.id===s.id ? { ...x, enabled: v } : x))} />
                        </TableCell>
                        <TableCell className="text-right"><Button variant="destructive" size="sm" onClick={()=> setServices(services.filter(x => x.id !== s.id))}>Remove</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <Input id="newSvcName" placeholder="Service name" />
                  <Input id="newSvcDur" type="number" placeholder="Duration (min)" />
                  <Input id="newSvcPrice" type="number" placeholder="Price (₹)" />
                  <Button onClick={()=>{
                    const name = (document.getElementById('newSvcName') as HTMLInputElement | null)?.value.trim();
                    const dur = parseInt((document.getElementById('newSvcDur') as HTMLInputElement | null)?.value||'0')||0;
                    const price = parseInt((document.getElementById('newSvcPrice') as HTMLInputElement | null)?.value||'0')||0;
                    if (!name || !dur || !price) { alert('Fill all service fields'); return; }
                    setServices([{ id: Math.random().toString(36).slice(2), name, duration: dur, price, enabled: true }, ...services]);
                  }}>Add Service</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff">
            <Card className="mb-4">
              <CardHeader><CardTitle>Freelancer Linking Requests</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(link).filter(([fid, l]) => l.storeId === ownerStoreId).length === 0 && (
                  <div className="text-sm text-muted-foreground">No requests for your store.</div>
                )}
                {Object.entries(link).filter(([fid, l]) => l.storeId === ownerStoreId).map(([fid, l]) => (
                  <div key={fid} className="flex items-center justify-between border rounded-lg p-2 text-sm">
                    <div>
                      <div className="font-medium">Freelancer: {fid}</div>
                      <div className="text-xs text-muted-foreground">Status: {l.approved ? 'Approved' : 'Pending'}</div>
                    </div>
                    <div className="flex gap-2">
                      {!l.approved && (<Button size="sm" onClick={() => approveFreelancer(fid, true)}>Approve</Button>)}
                      {l.approved && (<Button size="sm" variant="outline" onClick={() => approveFreelancer(fid, false)}>Revoke</Button>)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">Staff Management</div>
              <Button onClick={()=> setNewStaffOpen(true)} className="rounded-full"><span className="mr-1">＋</span>Staff</Button>
            </div>
            <Card className="mt-3">
              <CardHeader><CardTitle>Team</CardTitle></CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff.map(s => (
                      <TableRow key={s.id}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.role}</TableCell>
                        <TableCell className="capitalize">{s.type}</TableCell>
                        <TableCell className="capitalize">{s.status}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" variant="outline" onClick={()=> setStaff(staff.map(x => x.id===s.id? { ...x, status: x.status==='active'?'inactive':'active' } : x))}>{s.status==='active'?'Deactivate':'Activate'}</Button>
                          <Button size="sm" variant="destructive" onClick={()=> setStaff(staff.filter(x => x.id !== s.id))}>Remove</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader><CardTitle>Bookings Management</CardTitle></CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map(a => (
                      <TableRow key={a.id}>
                        <TableCell>{a.date}</TableCell>
                        <TableCell>{a.time}</TableCell>
                        <TableCell>{a.customer}</TableCell>
                        <TableCell>{a.service}</TableCell>
                        <TableCell className="capitalize">{a.status}</TableCell>
                        <TableCell className="text-right space-x-2">
                          {a.status === 'pending' && <Button size="sm" onClick={()=> setAppointments(appointments.map(x => x.id===a.id? { ...x, status:'accepted' } : x))}>Accept</Button>}
                          {a.status !== 'rejected' && <Button size="sm" variant="outline" onClick={()=> setReschedOpen(a)}>Reschedule</Button>}
                          <Button size="sm" variant="destructive" onClick={()=> setAppointments(appointments.map(x => x.id===a.id? { ...x, status:'rejected' } : x))}>Reject</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader><CardTitle>Earnings & Payouts</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <Card><CardHeader className="pb-1"><CardTitle className="text-xs text-muted-foreground">Gross Sales (7d)</CardTitle></CardHeader><CardContent className="text-xl font-bold">₹{last7.reduce((s,d)=>s+d.revenue,0).toLocaleString('en-IN')}</CardContent></Card>
                  <Card><CardHeader className="pb-1"><CardTitle className="text-xs text-muted-foreground">Commission ({(COMMISSION_RATE*100).toFixed(0)}%)</CardTitle></CardHeader><CardContent className="text-xl font-bold">₹{Math.round(last7.reduce((s,d)=>s+d.revenue,0)*COMMISSION_RATE).toLocaleString('en-IN')}</CardContent></Card>
                  <Card><CardHeader className="pb-1"><CardTitle className="text-xs text-muted-foreground">Net Receivable</CardTitle></CardHeader><CardContent className="text-xl font-bold">₹{Math.round(last7.reduce((s,d)=>s+d.revenue,0)*(1-COMMISSION_RATE)).toLocaleString('en-IN')}</CardContent></Card>
                  <Card><CardHeader className="pb-1"><CardTitle className="text-xs text-muted-foreground">Pending Payouts</CardTitle></CardHeader><CardContent className="text-xl font-bold">₹{earnings.filter(e=>e.status==='pending').reduce((s,e)=>s+e.amount,0).toLocaleString('en-IN')}</CardContent></Card>
                </div>
                <div className="text-sm text-muted-foreground">Commission is illustrative. Connect payments to reconcile actuals.</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">Local Offers</div>
              <Button onClick={()=> setNewOfferOpen(true)} className="rounded-full"><span className="mr-1">＋</span>Offer</Button>
            </div>
            <Card className="mt-3">
              <CardHeader><CardTitle>Active & Scheduled</CardTitle></CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {offers.map(o => (
                      <TableRow key={o.id}>
                        <TableCell className="capitalize">{o.type}</TableCell>
                        <TableCell>{o.name}</TableCell>
                        <TableCell>{o.value}</TableCell>
                        <TableCell>{o.active ? <Badge>Active</Badge> : <Badge variant="secondary">Paused</Badge>}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" variant="outline" onClick={()=> setOffers(offers.map(x => x.id===o.id? { ...x, active: !x.active } : x))}>{o.active? 'Pause':'Activate'}</Button>
                          <Button size="sm" variant="destructive" onClick={()=> setOffers(offers.filter(x => x.id !== o.id))}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader><CardTitle>Reviews & Ratings</CardTitle></CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Review</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviews.map(r => (
                      <TableRow key={r.id}>
                        <TableCell>{r.date}</TableCell>
                        <TableCell>{r.author}</TableCell>
                        <TableCell>{r.rating} / 5</TableCell>
                        <TableCell>{r.text || ''}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Store Holidays</CardTitle></CardHeader>
                <CardContent className="overflow-x-auto">
                  <div className="flex gap-2 items-end">
                    <div className="grid gap-1 w-full md:max-w-xs">
                      <Label>Add Holiday</Label>
                      <Input type="date" id="holidayDate" />
                    </div>
                    <Button onClick={()=>{
                      const d = (document.getElementById('holidayDate') as HTMLInputElement | null)?.value;
                      if (!d) return; if (settings.holidays.includes(d)) return;
                      setSettings({ ...settings, holidays: [...settings.holidays, d] });
                    }}>Add</Button>
                  </div>
                  <Table className="mt-4">
                    <TableHeader><TableRow><TableHead>Date</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {settings.holidays.map(h => (
                        <TableRow key={h}>
                          <TableCell>{h}</TableCell>
                          <TableCell className="text-right"><Button size="sm" variant="destructive" onClick={()=> setSettings({ ...settings, holidays: settings.holidays.filter(x => x !== h) })}>Remove</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Service Slots & Notifications</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2 md:max-w-xs">
                    <Label>Default Slot Duration (min)</Label>
                    <Input type="number" value={settings.slotDuration} onChange={(e)=> setSettings({ ...settings, slotDuration: parseInt(e.target.value)||15 })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Booking Notifications</div>
                      <div className="text-sm text-muted-foreground">Notify on new bookings</div>
                    </div>
                    <Switch checked={settings.notifyBookings} onCheckedChange={(v)=> setSettings({ ...settings, notifyBookings: v })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Cancellation Alerts</div>
                      <div className="text-sm text-muted-foreground">Notify on cancellations</div>
                    </div>
                    <Switch checked={settings.notifyCancellations} onCheckedChange={(v)=> setSettings({ ...settings, notifyCancellations: v })} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
      <MobileBottomNav />

      <Dialog open={!!reschedOpen} onOpenChange={(v)=>{ if(!v) setReschedOpen(null); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reschedule Booking</DialogTitle></DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="grid gap-1"><Label>Date</Label><Input type="date" id="resDate" defaultValue={reschedOpen?.date} /></div>
            <div className="grid gap-1"><Label>Time</Label><Input id="resTime" placeholder="e.g., 02:30 PM" defaultValue={reschedOpen?.time} /></div>
            <div className="grid gap-1"><Label>Service</Label><Input id="resSvc" defaultValue={reschedOpen?.service} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={()=> setReschedOpen(null)}>Cancel</Button>
            <Button onClick={()=>{
              const date = (document.getElementById('resDate') as HTMLInputElement | null)?.value || reschedOpen?.date || '';
              const time = (document.getElementById('resTime') as HTMLInputElement | null)?.value || reschedOpen?.time || '';
              const service = (document.getElementById('resSvc') as HTMLInputElement | null)?.value || reschedOpen?.service || '';
              if (!reschedOpen) return;
              setAppointments(appointments.map(a => a.id === reschedOpen.id ? { ...a, date, time, service, status: 'rescheduled' } : a));
              setReschedOpen(null);
            }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={newStaffOpen} onOpenChange={setNewStaffOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Staff</DialogTitle></DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="grid gap-1"><Label>Name</Label><Input id="stName" placeholder="Full name" /></div>
            <div className="grid gap-1"><Label>Role</Label><Input id="stRole" placeholder="e.g., Hair Stylist" /></div>
            <div className="grid gap-1"><Label>Type</Label>
              <Select defaultValue="employee">
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1"><Label>Status</Label>
              <Select defaultValue="active">
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={()=> setNewStaffOpen(false)}>Cancel</Button>
            <Button onClick={()=>{
              const name = (document.getElementById('stName') as HTMLInputElement | null)?.value.trim() || '';
              const role = (document.getElementById('stRole') as HTMLInputElement | null)?.value.trim() || '';
              const type = (document.querySelector('[data-state="open"] [data-radix-select-collection-item][data-selected]') as HTMLElement | null)?.textContent?.toLowerCase() as Staff['type'] | undefined;
              const status = 'active' as Staff['status'];
              if (!name || !role) { alert('Fill all fields'); return; }
              setStaff([{ id: Math.random().toString(36).slice(2), name, role, type: type||'employee', status }, ...staff]);
              setNewStaffOpen(false);
            }}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={newOfferOpen} onOpenChange={setNewOfferOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Offer</DialogTitle></DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="grid gap-1"><Label>Type</Label>
              <Select defaultValue="discount">
                <SelectTrigger><SelectValue placeholder="Offer type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Discount</SelectItem>
                  <SelectItem value="membership">Membership</SelectItem>
                  <SelectItem value="loyalty">Loyalty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1"><Label>Name</Label><Input id="ofName" placeholder="Title" /></div>
            <div className="grid gap-1"><Label>Value</Label><Input id="ofValue" placeholder="e.g., 10% / ₹200" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={()=> setNewOfferOpen(false)}>Cancel</Button>
            <Button onClick={()=>{
              const name = (document.getElementById('ofName') as HTMLInputElement | null)?.value.trim() || '';
              const value = (document.getElementById('ofValue') as HTMLInputElement | null)?.value.trim() || '';
              const typeEl = document.querySelector('[data-state="open"] [data-radix-select-collection-item][data-selected]') as HTMLElement | null;
              const typeText = typeEl?.textContent?.toLowerCase() as Offer['type'] | undefined;
              if (!name || !value) { alert('Fill all fields'); return; }
              setOffers([{ id: Math.random().toString(36).slice(2), type: typeText||'discount', name, value, active: true }, ...offers]);
              setNewOfferOpen(false);
            }}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoreOwnerDashboard;
