import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Pencil, Wallet as WalletIcon, IndianRupee, CreditCard } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { getSupabase, hasSupabaseEnv } from "@/lib/supabase";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getMyBookings, cancelSlot, BookingRecord, bookSlot, listBookedSlots } from "@/lib/availability";

function format(d: Date) {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
];

function useLocalStorage<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : initial; } catch { return initial; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(val)); }, [key, val]);
  return [val, setVal] as const;
}

const UserDashboard = () => {
  const { user, role, signOut } = useAuth();
  const location = useLocation();
  const [tab, setTab] = useState<string>((location.state as any)?.tab || "bookings");
  useEffect(() => {
    const t = (location.state as any)?.tab as string | undefined;
    if (t) setTab(t);
  }, [location.state]);
  const [bookings, setBookings] = useState<BookingRecord[]>(getMyBookings());

  const [profile, setProfile] = useLocalStorage("profile", { displayName: "", phone: "" });
  const [favorites, setFavorites] = useLocalStorage("favorites", { salons: [] as { id: string; name: string }[], stylists: [] as { id: string; name: string }[] });
  const [walletBalance, setWalletBalance] = useLocalStorage<number>("walletBalance", 0);
  const [transactions, setTransactions] = useLocalStorage<{ id: string; type: "debit" | "credit"; amount: number; desc: string; date: string }[]>("transactions", []);
  const [memberships, setMemberships] = useLocalStorage<{ id: string; name: string; expires: string }[]>("memberships", []);
  const [settings, setSettings] = useLocalStorage("settings", { reminders: true, promos: false, receipts: true, language: "en", region: "IN", theme: (localStorage.getItem("theme") || "light") });

  const refresh = () => setBookings(getMyBookings());
  const today = new Date();
  const todays = useMemo(() => bookings.filter(b => new Date(b.date).toDateString() === today.toDateString()), [bookings]);
  const upcoming = useMemo(() => bookings.filter(b => new Date(b.date) >= today), [bookings]);
  const past = useMemo(() => bookings.filter(b => new Date(b.date) < today), [bookings]);

  useEffect(() => {
    if (settings.theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", settings.theme);
  }, [settings.theme]);

  const addMoney = (amount: number) => {
    setWalletBalance(walletBalance + amount);
    setTransactions([{ id: Math.random().toString(36).slice(2), type: "credit", amount, desc: "Wallet Top-up", date: new Date().toISOString() }, ...transactions]);
  };

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const coupons: Record<string, number> = { SAVE50: 50, WELCOME100: 100 };
    const credit = coupons[normalized] || 0;
    if (credit > 0) {
      addMoney(credit);
      alert(`Coupon applied: ₹${credit}`);
    } else {
      alert("Invalid coupon");
    }
  };

  const [editOpen, setEditOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [policy, setPolicy] = useState<null | { title: string; body: string }>(null);
  const [rebookFor, setRebookFor] = useState<null | BookingRecord>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#111827]">
      <Header />
      <main className="pt-16 container mx-auto px-4 lg:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <div className="flex items-center gap-3">
            <Avatar className="ring-2 ring-[#EAB308] shadow-[0_0_0_3px_rgba(234,179,8,0.25)]"><AvatarFallback>{(user?.email?.[0] || profile.displayName?.[0] || "U").toUpperCase()}</AvatarFallback></Avatar>
            <div className="text-sm text-muted-foreground">{profile.displayName || user?.email}</div>
          </div>
        </div>

        <Card className="rounded-2xl border-0 shadow-[0_12px_30px_rgba(0,0,0,0.07)] bg-white">
          <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-4 py-6">
            <Avatar className="w-20 h-20 ring-2 ring-[#EAB308] shadow-[0_0_0_4px_rgba(234,179,8,0.25)]"><AvatarFallback>{(user?.email?.[0] || "U").toUpperCase()}</AvatarFallback></Avatar>
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xl font-semibold">{profile.displayName || "Your Name"}</div>
                  <div className="text-sm text-muted-foreground">{profile.phone || "Add phone"} • {user?.email}</div>
                </div>
                <Button onClick={() => setEditOpen(true)} className="rounded-xl bg-gradient-to-r from-[#EAB308] to-[#1E293B] hover:from-[#f3c336] hover:to-[#0b1625] text-white shadow-md"><Pencil className="w-4 h-4 mr-2"/>Edit Profile</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <button onClick={() => setTab("bookings")} className="p-3 border rounded hover:bg-accent text-left">My Appointments</button>
                <button onClick={() => setTab("favorites")} className="p-3 border rounded hover:bg-accent text-left">Favorites</button>
                <button onClick={() => setTab("payments")} className="p-3 border rounded hover:bg-accent text-left">Payments & Wallet</button>
                <button onClick={() => setTab("memberships")} className="p-3 border rounded hover:bg-accent text-left">Memberships</button>
                <button onClick={() => setTab("settings")} className="p-3 border rounded hover:bg-accent text-left">Settings</button>
                <button onClick={() => setTab("help")} className="p-3 border rounded hover:bg-accent text-left">Help & Support</button>
                <button onClick={() => setTab("feedback")} className="p-3 border rounded hover:bg-accent text-left col-span-2">Feedback / Rate App</button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
            <TabsTrigger value="bookings" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Appointments</TabsTrigger>
            <TabsTrigger value="favorites" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Favorites</TabsTrigger>
            <TabsTrigger value="payments" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Payments & Wallet</TabsTrigger>
            <TabsTrigger value="memberships" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Memberships</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Settings</TabsTrigger>
            <TabsTrigger value="profile" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Profile</TabsTrigger>
            <TabsTrigger value="help" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Help Center</TabsTrigger>
            <TabsTrigger value="feedback" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Today</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{todays.length}</CardContent></Card>
              <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Upcoming</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{upcoming.length}</CardContent></Card>
              <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Past</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{past.length}</CardContent></Card>
            </div>

            <Card>
              <CardHeader><CardTitle>Your bookings</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store</TableHead>
                      <TableHead>Service(s)</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map(b => (
                      <TableRow key={b.id}>
                        <TableCell>{b.salonName}</TableCell>
                        <TableCell>{b.services.join(", ")}</TableCell>
                        <TableCell>{format(new Date(b.date))}</TableCell>
                        <TableCell>{b.time}</TableCell>
                        <TableCell>{b.location === "home" ? "Home" : "Salon"}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" variant="outline" onClick={() => setRebookFor(b)}>Rebook</Button>
                          <Button size="sm" variant="destructive" onClick={async ()=>{ await cancelSlot(b.id); refresh(); }}>Cancel</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Salons</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {favorites.salons.length === 0 && <div className="text-sm text-muted-foreground">No favorite salons yet.</div>}
                  {favorites.salons.map(s => (
                    <div key={s.id} className="flex items-center justify-between border rounded p-2">
                      <div>{s.name}</div>
                      <Button size="sm" variant="outline" onClick={() => setFavorites({ ...favorites, salons: favorites.salons.filter(x => x.id !== s.id) })}>Remove</Button>
                    </div>
                  ))}
                  <Separator />
                  <div className="grid grid-cols-3 gap-2">
                    <Input placeholder="Salon name" onKeyDown={(e:any)=>{
                      if (e.key==='Enter' && e.currentTarget.value.trim()) {
                        setFavorites({ ...favorites, salons: [{ id: Math.random().toString(36).slice(2), name: e.currentTarget.value.trim() }, ...favorites.salons ]});
                        e.currentTarget.value='';
                      }
                    }} />
                    <div className="col-span-2 text-sm text-muted-foreground self-center">Press Enter to add</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Stylists</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {favorites.stylists.length === 0 && <div className="text-sm text-muted-foreground">No favorite stylists yet.</div>}
                  {favorites.stylists.map(s => (
                    <div key={s.id} className="flex items-center justify-between border rounded p-2">
                      <div>{s.name}</div>
                      <Button size="sm" variant="outline" onClick={() => setFavorites({ ...favorites, stylists: favorites.stylists.filter(x => x.id !== s.id) })}>Remove</Button>
                    </div>
                  ))}
                  <Separator />
                  <div className="grid grid-cols-3 gap-2">
                    <Input placeholder="Stylist name" onKeyDown={(e:any)=>{
                      if (e.key==='Enter' && e.currentTarget.value.trim()) {
                        setFavorites({ ...favorites, stylists: [{ id: Math.random().toString(36).slice(2), name: e.currentTarget.value.trim() }, ...favorites.stylists ]});
                        e.currentTarget.value='';
                      }
                    }} />
                    <div className="col-span-2 text-sm text-muted-foreground self-center">Press Enter to add</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 rounded-2xl border-0 shadow-[0_10px_28px_rgba(0,0,0,0.06)]">
                <CardHeader><CardTitle className="flex items-center gap-2"><WalletIcon className="w-5 h-5 text-[#EAB308]"/>Wallet</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-[#EAB308] flex items-center gap-2"><IndianRupee className="w-5 h-5"/> {walletBalance.toLocaleString('en-IN')}</div>
                  <div className="flex gap-2">
                    <Button onClick={() => addMoney(100)} className="rounded-xl bg-gradient-to-r from-[#EAB308] to-[#1E293B] hover:from-[#f3c336] hover:to-[#0b1625] text-white shadow">Add ₹100</Button>
                    <Button variant="outline" onClick={() => addMoney(500)} className="rounded-xl border-[#EAB308] text-[#0F172A] hover:bg-yellow-50">Add ₹500</Button>
                  </div>
                  <div className="grid gap-2">
                    <Label>Coupon / Gift card</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter code" id="coupon" className="rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-[#EAB308]"/>
                      <Button className="rounded-xl bg-gradient-to-r from-[#EAB308] to-[#1E293B] hover:from-[#f3c336] hover:to-[#0b1625] text-white" onClick={() => {
                        const el = document.getElementById('coupon') as HTMLInputElement | null;
                        if (el && el.value) applyCoupon(el.value);
                      }}>Apply</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 rounded-2xl border-0 shadow-[0_10px_28px_rgba(0,0,0,0.06)]">
                <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#EAB308]"/>Payment Methods</CardTitle></CardHeader>
                <CardContent className="grid gap-4 md:max-w-xl">
                  <div className="flex gap-2 mb-2">
                    <span className="px-2 py-1 text-xs rounded-full border border-[#1E293B] text-[#1E293B] bg-white">UPI</span>
                    <span className="px-2 py-1 text-xs rounded-full border border-[#1E293B] text-[#1E293B] bg-white">VISA</span>
                    <span className="px-2 py-1 text-xs rounded-full border border-[#1E293B] text-[#1E293B] bg-white">MasterCard</span>
                  </div>
                  <div className="grid gap-2">
                    <Label>UPI ID</Label>
                    <Input placeholder="name@bank" className="rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-[#EAB308]"/>
                  </div>
                  <div className="grid gap-2">
                    <Label>Card number</Label>
                    <Input placeholder="1234 5678 9012 3456" className="rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-[#EAB308]"/>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                      <Label>Expiry</Label>
                      <Input placeholder="MM/YY" className="rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-[#EAB308]"/>
                    </div>
                    <div className="grid gap-2">
                      <Label>CVV</Label>
                      <Input placeholder="123" className="rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-[#EAB308]"/>
                    </div>
                  </div>
                  <Button className="w-full rounded-xl bg-gradient-to-r from-[#EAB308] to-[#1E293B] hover:from-[#f3c336] hover:to-[#0b1625] text-white shadow">Save payment method</Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader><CardTitle>Transaction History</CardTitle></CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No transactions yet.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map(t => (
                        <TableRow key={t.id}>
                          <TableCell>{format(new Date(t.date))}</TableCell>
                          <TableCell>{t.desc}</TableCell>
                          <TableCell>{t.type === 'debit' ? '-' : '+'}₹{t.amount.toLocaleString('en-IN')}</TableCell>
                          <TableCell className="capitalize">{t.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="memberships">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Active Subscriptions</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {memberships.length === 0 && <div className="text-sm text-muted-foreground">No active memberships.</div>}
                  {memberships.map(m => (
                    <div key={m.id} className="flex items-center justify-between border rounded p-3">
                      <div>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-sm text-muted-foreground">Expires {format(new Date(m.expires))}</div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => setMemberships(memberships.filter(x => x.id !== m.id))}>Cancel</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Buy Packages</CardTitle></CardHeader>
                <CardContent className="grid gap-3">
                  {[{name:"Monthly Grooming", price:499}, {name:"Quarterly Beauty", price:1299}, {name:"Annual Premium", price:3999}].map(pkg => (
                    <div key={pkg.name} className="flex items-center justify-between border rounded p-3">
                      <div>
                        <div className="font-medium">{pkg.name}</div>
                        <div className="text-sm text-muted-foreground">₹{pkg.price.toLocaleString('en-IN')}</div>
                      </div>
                      <Button size="sm" onClick={() => {
                        setMemberships([{ id: Math.random().toString(36).slice(2), name: pkg.name, expires: new Date(Date.now()+30*24*3600*1000).toISOString() }, ...memberships]);
                        setTransactions([{ id: Math.random().toString(36).slice(2), type: "debit", amount: pkg.price, desc: `${pkg.name} purchase`, date: new Date().toISOString() }, ...transactions]);
                        alert("Package purchased successfully");
                      }}>Buy</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Booking reminders</div>
                      <div className="text-sm text-muted-foreground">Get reminders before your appointment</div>
                    </div>
                    <Switch checked={settings.reminders} onCheckedChange={(v)=> setSettings({...settings, reminders: v})} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Promotions</div>
                      <div className="text-sm text-muted-foreground">Exclusive offers and discounts</div>
                    </div>
                    <Switch checked={settings.promos} onCheckedChange={(v)=> setSettings({...settings, promos: v})} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Payment receipts</div>
                      <div className="text-sm text-muted-foreground">Email receipts after payment</div>
                    </div>
                    <Switch checked={settings.receipts} onCheckedChange={(v)=> setSettings({...settings, receipts: v})} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Language & Region</CardTitle></CardHeader>
                <CardContent className="grid gap-4 md:max-w-md">
                  <div className="grid gap-2">
                    <Label>Language</Label>
                    <Select value={settings.language} onValueChange={(v)=> setSettings({...settings, language: v})}>
                      <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                        <SelectItem value="ta">Tamil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Region</Label>
                    <Select value={settings.region} onValueChange={(v)=> setSettings({...settings, region: v})}>
                      <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IN">India</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="AE">UAE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Dark Mode</div>
                      <div className="text-sm text-muted-foreground">Toggle theme</div>
                    </div>
                    <Switch checked={settings.theme === 'dark'} onCheckedChange={(v)=> setSettings({...settings, theme: v ? 'dark' : 'light'})} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Account Role</CardTitle></CardHeader>
                <CardContent className="grid gap-4 md:max-w-md">
                  <div className="grid gap-2">
                    <Label>Role</Label>
                    <Select defaultValue={(role || 'customer') as string}>
                      <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="freelancer">Freelancer</SelectItem>
                        <SelectItem value="owner">Store Owner</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={async ()=>{
                      if (!hasSupabaseEnv) { alert('Connect Supabase first'); return; }
                      try {
                        const supabase = getSupabase();
                        const sel = document.querySelector('[data-state="open"] [data-radix-select-collection-item][data-selected]') as HTMLElement | null;
                        const newRole = (sel?.textContent || 'customer').toLowerCase();
                        await supabase.auth.updateUser({ data: { role: newRole } });
                        if (newRole === 'freelancer') window.location.assign('/freelancer-dashboard');
                        else if (newRole === 'owner') window.location.assign('/store-owner-dashboard');
                        else window.location.assign('/user-dashboard');
                      } catch (e:any) {
                        alert(e.message || 'Failed to update role');
                      }
                    }}>Save Role</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Account Security</CardTitle></CardHeader>
                <CardContent className="grid gap-4 md:max-w-xl">
                  <div className="grid gap-2">
                    <Label>Change Password</Label>
                    <div className="flex gap-2">
                      <Input type="password" placeholder="New password" id="newpass" />
                      <Button onClick={async ()=>{
                        const el = document.getElementById('newpass') as HTMLInputElement | null;
                        const pw = el?.value || '';
                        if (!pw) return;
                        if (!hasSupabaseEnv) { alert('Connect Supabase to enable password change'); return; }
                        try {
                          const supabase = getSupabase();
                          const { error } = await supabase.auth.updateUser({ password: pw });
                          if (error) throw error;
                          alert('Password updated');
                          if (el) el.value='';
                        } catch (e:any) {
                          alert(e.message || 'Failed to update password');
                        }
                      }}>Update</Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Connected Accounts</Label>
                    <div className="flex items-center justify-between border rounded p-3">
                      <div>Google</div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between border rounded p-3">
                      <div>Apple</div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => signOut()}>Logout</Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete Account</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete account?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="text-sm text-muted-foreground">This will sign you out and remove local data. Deleting the actual account requires admin privileges on the backend.</div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={()=>{
                            localStorage.clear();
                            signOut();
                            alert('Account data cleared locally.');
                          }}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
              <CardContent className="grid gap-4 md:max-w-lg">
                <div className="grid gap-2">
                  <Label>Display Name</Label>
                  <Input value={profile.displayName} onChange={(e)=> setProfile({...profile, displayName: e.target.value})} placeholder="Your name" />
                </div>
                <div className="grid gap-2">
                  <Label>Phone</Label>
                  <Input value={profile.phone} onChange={(e)=> setProfile({...profile, phone: e.target.value})} placeholder="Phone number" />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input value={user?.email || ""} readOnly />
                </div>
                <div className="grid gap-2">
                  <Label>Role</Label>
                  <Input value={role || "customer"} readOnly />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help">
            <Card>
              <CardHeader><CardTitle>Help & Support</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <section>
                  <h3 className="font-semibold mb-2">Quick Help - FAQs</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="booking"><AccordionTrigger>Booking</AccordionTrigger><AccordionContent>Choose services, date and time from the booking screen. You can cancel or rebook from your dashboard.</AccordionContent></AccordionItem>
                    <AccordionItem value="payment"><AccordionTrigger>Payment</AccordionTrigger><AccordionContent>We accept UPI and cards. Wallet top-ups are instant.</AccordionContent></AccordionItem>
                    <AccordionItem value="cancellation"><AccordionTrigger>Cancellation</AccordionTrigger><AccordionContent>You can cancel up to 1 hour before your appointment.</AccordionContent></AccordionItem>
                    <AccordionItem value="offers"><AccordionTrigger>Offers</AccordionTrigger><AccordionContent>Apply coupons in Payments & Wallet. Valid codes: SAVE50, WELCOME100.</AccordionContent></AccordionItem>
                  </Accordion>
                </section>
                <section>
                  <h3 className="font-semibold mb-2">How-to Guides</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>How to book an appointment</li>
                    <li>How to manage payment methods</li>
                    <li>How to rebook or cancel</li>
                  </ul>
                </section>
                <section>
                  <h3 className="font-semibold mb-2">Support Options</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={()=> setChatOpen(true)}>Live Chat</Button>
                    <Button variant="outline" asChild><a href="tel:+1800123456">Call Support</a></Button>
                    <Button variant="outline" asChild><a href="mailto:support@example.com">Email / Ticket</a></Button>
                    <Button variant="outline" onClick={()=> setReportOpen(true)}>Report a Problem</Button>
                  </div>
                </section>
                <section>
                  <h3 className="font-semibold mb-2">Policies</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="ghost" onClick={()=> setPolicy({ title: 'Cancellation & Refund Policy', body: 'Cancel up to 1 hour before appointment to receive a full refund to your original payment method or wallet.' })}>Cancellation & Refund</Button>
                    <Button variant="ghost" onClick={()=> setPolicy({ title: 'Terms & Conditions', body: 'Use of this app constitutes acceptance of our terms including booking policies, privacy, and acceptable use.' })}>Terms & Conditions</Button>
                    <Button variant="ghost" onClick={()=> setPolicy({ title: 'Privacy Policy', body: 'We collect minimal data necessary to provide our services. Your data is never sold to third parties.' })}>Privacy Policy</Button>
                  </div>
                </section>
                <section>
                  <h3 className="font-semibold mb-2">Feedback / Rate App</h3>
                  <FeedbackForm onSubmit={(rating, text) => {
                    setTransactions([{ id: Math.random().toString(36).slice(2), type: 'credit', amount: 0, desc: `Feedback submitted (${rating}/5)`, date: new Date().toISOString() }, ...transactions]);
                    alert('Thanks for your feedback!');
                  }} />
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader><CardTitle>Feedback / Rate App</CardTitle></CardHeader>
              <CardContent>
                <FeedbackForm onSubmit={(rating, text) => {
                  setTransactions([{ id: Math.random().toString(36).slice(2), type: 'credit', amount: 0, desc: `Feedback submitted (${rating}/5)`, date: new Date().toISOString() }, ...transactions]);
                  alert('Thanks for your feedback!');
                }} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
      <MobileBottomNav />

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Profile</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-2"><Label>Display Name</Label><Input value={profile.displayName} onChange={(e)=> setProfile({...profile, displayName: e.target.value})} /></div>
            <div className="grid gap-2"><Label>Phone</Label><Input value={profile.phone} onChange={(e)=> setProfile({...profile, phone: e.target.value})} /></div>
          </div>
          <DialogFooter>
            <Button onClick={()=> setEditOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Live Chat</DialogTitle></DialogHeader>
          <div className="h-48 border rounded p-2 overflow-y-auto text-sm text-muted-foreground">Agent will respond shortly...</div>
          <div className="flex gap-2"><Input placeholder="Type your message" /><Button>Send</Button></div>
        </DialogContent>
      </Dialog>

      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Report a Problem</DialogTitle></DialogHeader>
          <Textarea placeholder="Describe the issue" className="min-h-32" />
          <DialogFooter><Button onClick={()=> setReportOpen(false)}>Submit</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!policy} onOpenChange={(v)=>{ if(!v) setPolicy(null); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>{policy?.title}</DialogTitle></DialogHeader>
          <div className="text-sm text-muted-foreground whitespace-pre-line">{policy?.body}</div>
          <DialogFooter><Button onClick={()=> setPolicy(null)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <RebookDialog booking={rebookFor} onClose={() => { setRebookFor(null); refresh(); }} />
    </div>
  );
};

function FeedbackForm({ onSubmit }: { onSubmit: (rating: number, text: string) => void }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  return (
    <div className="space-y-3">
      <div className="flex gap-1">
        {[1,2,3,4,5].map(n => (
          <button key={n} onClick={()=> setRating(n)} className={`w-8 h-8 rounded-full border ${rating>=n? 'bg-yellow-400' : 'bg-background'}`}>{n}</button>
        ))}
      </div>
      <Textarea placeholder="Share your experience" value={text} onChange={(e)=> setText(e.target.value)} />
      <Button onClick={()=> onSubmit(rating, text)}>Submit</Button>
    </div>
  );
}

function RebookDialog({ booking, onClose }: { booking: BookingRecord | null; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | undefined>();
  const [available, setAvailable] = useState<string[]>([]);

  useEffect(() => { setOpen(!!booking); }, [booking]);
  useEffect(() => {
    const refresh = async () => {
      if (!booking || !date) return;
      const base = timeSlots.filter(() => true);
      const booked = await listBookedSlots(booking.salonId, date.toISOString().slice(0,10));
      setAvailable(base.filter(t => !booked.includes(t)));
    };
    refresh();
  }, [booking, date]);

  const confirm = async () => {
    if (!booking || !date || !time) return;
    const key = date.toISOString().slice(0,10);
    await bookSlot({ salonId: booking.salonId, salonName: booking.salonName, date: key, time, location: booking.location, services: booking.services });
    alert("Rebooked successfully");
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v)=>{ setOpen(v); if(!v) onClose(); }}>
      <DialogContent>
        <DialogHeader><DialogTitle>Rebook at {booking?.salonName}</DialogTitle></DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Select Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d)=> { const t = new Date(); const dd = new Date(d.getFullYear(), d.getMonth(), d.getDate()); const tt = new Date(t.getFullYear(), t.getMonth(), t.getDate()); return dd < tt; }}
              className="rounded-md border mt-2"
            />
            <div className="flex justify-end mt-2"><Button size="sm" variant="outline" onClick={()=> setDate(new Date())}>Today</Button></div>
          </div>
          <div>
            <Label>Available Times</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {available.map(t => (
                <button key={t} onClick={()=> setTime(t)} className={`p-2 text-sm border rounded ${time===t? 'bg-primary text-primary-foreground' : 'hover:border-primary'}`}>{t}</button>
              ))}
              {available.length===0 && <div className="text-sm text-muted-foreground col-span-3">No slots available</div>}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={()=> setOpen(false)}>Cancel</Button>
          <Button onClick={confirm} disabled={!date || !time}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UserDashboard;
