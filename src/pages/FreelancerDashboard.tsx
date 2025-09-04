import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { usePayments } from "@/contexts/PaymentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { getSupabase, hasSupabaseEnv } from "@/lib/supabase";

function useLocalStorage<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : initial; } catch { return initial; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(val)); }, [key, val]);
  return [val, setVal] as const;
}

const FreelancerDashboard = () => {
  const { signOut } = useAuth();
  const {
    role, setRole,
    openJobs, myJobs, earnings,
    todaysEarnings,
    applyToJob, startJob, completeJob, requestPayout,
    freelancerId,
  } = useMarketplace();
  const { link, linkFreelancer } = usePayments();

  const [profile, setProfile] = useLocalStorage("freelancerProfile", { name: "", role: "Hair Stylist", storeName: "", rating: 0 });
  const [assignedServices] = useLocalStorage("freelancerServices", [
    { id: "svc1", name: "Haircut", duration: 30, price: 299 },
    { id: "svc2", name: "Beard Trim", duration: 20, price: 199 },
    { id: "svc3", name: "Hair Color (Basic)", duration: 60, price: 899 },
  ]);
  const [feedback] = useLocalStorage<{ id: string; client: string; rating: number; text?: string; date: string }[]>("freelancerFeedback", []);
  const [notifications, setNotifications] = useLocalStorage("freelancerNotif", { assignments: true, reschedules: true, cancellations: true });
  const [leaveRequests, setLeaveRequests] = useLocalStorage<{ id: string; from: string; to: string; reason: string; status: "pending" | "approved" | "rejected" }[]>("freelancerLeave", []);

  const pendingAmount = useMemo(() => earnings.filter(e => e.status === "pending").reduce((s, e) => s + e.amount, 0), [earnings]);

  const last7 = useMemo(() => {
    const days: { date: string; amount: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0,10);
      const amt = earnings.filter(e => e.date === key).reduce((s, e) => s + e.amount, 0);
      days.push({ date: key.slice(5), amount: amt });
    }
    return days;
  }, [earnings]);

  const today = new Date();
  const toKey = (d: Date) => d.toISOString().slice(0,10);
  const todayJobs = useMemo(() => myJobs.filter(j => j.date === toKey(today)), [myJobs]);
  const upcomingJobs = useMemo(() => myJobs.filter(j => j.date > toKey(today)), [myJobs]);
  const pastJobs = useMemo(() => myJobs.filter(j => j.date < toKey(today)), [myJobs]);
  const avgRating = useMemo(() => feedback.length ? (feedback.reduce((s,f)=>s+f.rating,0)/feedback.length).toFixed(1) : "—", [feedback]);

  const [reportOpen, setReportOpen] = useState(false);

  const location = useLocation();
  const initialTab = ((location.state as any)?.tab as string) || "appointments";
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
          <h1 className="text-3xl font-bold">Freelancer Profile</h1>
          <div className="text-sm">
            Role: <Badge>{role}</Badge>
            <Button variant="outline" size="sm" className="ml-2" onClick={() => setRole("freelancer")}>Switch to Freelancer</Button>
          </div>
        </div>

        <Card className="rounded-2xl border-0 shadow-[0_12px_30px_rgba(0,0,0,0.07)] bg-white">
          <CardContent className="flex items-center gap-4 py-6">
            <Avatar className="w-20 h-20 ring-2 ring-[#EAB308] shadow-[0_0_0_4px_rgba(234,179,8,0.25)]"><AvatarFallback>{(profile.name?.[0] || "F").toUpperCase()}</AvatarFallback></Avatar>
            <div className="flex-1">
              <div className="text-xl font-semibold">{profile.name || "Your Name"} – {profile.role}</div>
              <div className="text-sm text-muted-foreground">{profile.storeName || "Independent"}</div>
              <div className="text-sm mt-1">Ratings: <span className="font-medium">{avgRating}</span> {feedback.length ? `(${feedback.length})` : ""}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Card><CardHeader className="pb-1"><CardTitle className="text-xs text-muted-foreground">Today Bookings</CardTitle></CardHeader><CardContent className="text-xl font-bold">{todayJobs.length}</CardContent></Card>
              <Card><CardHeader className="pb-1"><CardTitle className="text-xs text-muted-foreground">Upcoming</CardTitle></CardHeader><CardContent className="text-xl font-bold">{upcomingJobs.length}</CardContent></Card>
            </div>
          </CardContent>
        </Card>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
            <TabsTrigger value="appointments" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">My Appointments</TabsTrigger>
            <TabsTrigger value="services" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Services Assigned</TabsTrigger>
            <TabsTrigger value="earnings" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Earnings</TabsTrigger>
            <TabsTrigger value="feedback" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Client Feedback</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Settings</TabsTrigger>
            <TabsTrigger value="help" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Help Center</TabsTrigger>
            <TabsTrigger value="jobs" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">Available Shifts</TabsTrigger>
            <TabsTrigger value="my" className="rounded-full px-4 py-2 bg-gray-100 text-[#0F172A] data-[state=active]:bg-[#EAB308] data-[state=active]:text-white shadow-sm">My Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Today</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{todayJobs.length}</CardContent></Card>
              <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Upcoming</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{upcomingJobs.length}</CardContent></Card>
              <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Past</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{pastJobs.length}</CardContent></Card>
            </div>
            <Card>
              <CardHeader><CardTitle>Schedule (auto-synced)</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Store</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...todayJobs, ...upcomingJobs, ...pastJobs].map(j => (
                      <TableRow key={j.id}>
                        <TableCell>{j.date}</TableCell>
                        <TableCell>{j.startTime} • {j.hours}h</TableCell>
                        <TableCell>{j.storeName}</TableCell>
                        <TableCell>{j.title}</TableCell>
                        <TableCell><Badge>{j.status.replace("_"," ")}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader><CardTitle>Services you can perform</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignedServices.map(s => (
                      <TableRow key={s.id}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.duration} min</TableCell>
                        <TableCell>₹{s.price.toLocaleString('en-IN')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="text-xs text-muted-foreground mt-2">Service timings & prices are defined by the store and are read-only here.</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Card><CardHeader className="pb-1"><CardTitle className="text-xs text-muted-foreground">Today</CardTitle></CardHeader><CardContent className="text-xl font-bold">₹{todaysEarnings.toLocaleString('en-IN')}</CardContent></Card>
              <Card><CardHeader className="pb-1"><CardTitle className="text-xs text-muted-foreground">This Week</CardTitle></CardHeader><CardContent className="text-xl font-bold">₹{last7.reduce((s,d)=>s+d.amount,0).toLocaleString('en-IN')}</CardContent></Card>
              <Card><CardHeader className="pb-1"><CardTitle className="text-xs text-muted-foreground">Pending Payout</CardTitle></CardHeader><CardContent className="text-xl font-bold">₹{pendingAmount.toLocaleString('en-IN')}</CardContent></Card>
              <Card><CardHeader className="pb-1"><CardTitle className="text-xs text-muted-foreground">Paid Total</CardTitle></CardHeader><CardContent className="text-xl font-bold">₹{earnings.filter(e=>e.status==='paid').reduce((s,e)=>s+e.amount,0).toLocaleString('en-IN')}</CardContent></Card>
            </div>
            <Card className="mb-6">
              <CardHeader><CardTitle>Last 7 days</CardTitle></CardHeader>
              <CardContent>
                <ChartContainer config={{ amount: { label: "Earnings", color: "hsl(var(--primary))" } }} className="h-64 w-full">
                  <AreaChart data={last7}>
                    <defs>
                      <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Area dataKey="amount" type="monotone" stroke="hsl(var(--primary))" fill="url(#fill)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Payout history</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {earnings.map(e => (
                      <TableRow key={e.id}>
                        <TableCell>{e.date}</TableCell>
                        <TableCell>₹{e.amount.toLocaleString('en-IN')}</TableCell>
                        <TableCell className="capitalize">{e.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader><CardTitle>Client Feedback</CardTitle></CardHeader>
              <CardContent>
                {feedback.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No feedback yet.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Review</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feedback.map(f => (
                        <TableRow key={f.id}>
                          <TableCell>{f.date}</TableCell>
                          <TableCell>{f.client}</TableCell>
                          <TableCell>{f.rating} / 5</TableCell>
                          <TableCell>{f.text || ""}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Availability (by store)</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">Shift hours are managed by the store admin. You can request leave below.</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-1"><Label>From</Label><Input type="date" id="leaveFrom" /></div>
                    <div className="grid gap-1"><Label>To</Label><Input type="date" id="leaveTo" /></div>
                    </div>
                  <div className="grid gap-1"><Label>Reason</Label><Textarea id="leaveReason" placeholder="e.g., Personal" /></div>
                  <Button onClick={() => {
                    const from = (document.getElementById('leaveFrom') as HTMLInputElement | null)?.value || '';
                    const to = (document.getElementById('leaveTo') as HTMLInputElement | null)?.value || '';
                    const reason = (document.getElementById('leaveReason') as HTMLTextAreaElement | null)?.value || '';
                    if (!from || !to || !reason) { alert('Fill all fields'); return; }
                    setLeaveRequests([{ id: Math.random().toString(36).slice(2), from, to, reason, status: 'pending' }, ...leaveRequests]);
                    alert('Leave request submitted');
                  }}>Request Leave</Button>
                  <div className="mt-4">
                    <div className="font-medium mb-2">Recent Requests</div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leaveRequests.map(r => (
                          <TableRow key={r.id}>
                            <TableCell>{r.from}</TableCell>
                            <TableCell>{r.to}</TableCell>
                            <TableCell>{r.reason}</TableCell>
                            <TableCell className="capitalize">{r.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">New booking assigned</div>
                      <div className="text-sm text-muted-foreground">Get notified when the store assigns you</div>
                    </div>
                    <Switch checked={notifications.assignments} onCheckedChange={(v)=> setNotifications({ ...notifications, assignments: v })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Reschedules</div>
                      <div className="text-sm text-muted-foreground">If timings change</div>
                    </div>
                    <Switch checked={notifications.reschedules} onCheckedChange={(v)=> setNotifications({ ...notifications, reschedules: v })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Cancellations</div>
                      <div className="text-sm text-muted-foreground">Client or store cancellations</div>
                    </div>
                    <Switch checked={notifications.cancellations} onCheckedChange={(v)=> setNotifications({ ...notifications, cancellations: v })} />
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Account</CardTitle></CardHeader>
                <CardContent className="grid gap-4 md:max-w-xl">
                  <div className="grid gap-2">
                    <Label>Name</Label>
                    <Input value={profile.name} onChange={(e)=> setProfile({ ...profile, name: e.target.value })} placeholder="Your name" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Role</Label>
                    <Input value={profile.role} onChange={(e)=> setProfile({ ...profile, role: e.target.value })} placeholder="Role" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Store</Label>
                    <Input value={profile.storeName} onChange={(e)=> setProfile({ ...profile, storeName: e.target.value })} placeholder="Store name" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Region</Label>
                    <Select defaultValue="IN">
                      <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IN">India</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Change Password</Label>
                    <div className="flex gap-2">
                      <Input type="password" placeholder="New password" id="freelancer-newpass" />
                      <Button onClick={async ()=>{
                        const el = document.getElementById('freelancer-newpass') as HTMLInputElement | null;
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
                    <Label>Store Linking</Label>
                    <div className="text-sm text-muted-foreground">Request link to a store to enable payouts. Owner must approve.</div>
                    <div className="flex gap-2 items-end">
                      <div className="grid gap-1 w-full md:max-w-xs">
                        <Label>Store ID</Label>
                        <Input id="freelancer-store-id" placeholder="e.g., s1" />
                      </div>
                      <Button onClick={() => {
                        const storeId = (document.getElementById('freelancer-store-id') as HTMLInputElement | null)?.value.trim();
                        if (!storeId) { alert('Enter Store ID'); return; }
                        linkFreelancer(freelancerId, storeId);
                        alert('Link request sent');
                      }}>Request Link</Button>
                    </div>
                    <div className="text-xs">Current: {link[freelancerId]?.storeId ? `${link[freelancerId]?.storeId} • ${link[freelancerId]?.approved ? 'Approved' : 'Pending'}` : 'Not linked'}</div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" onClick={() => signOut()}>Logout</Button>
                    <Button variant="destructive" onClick={()=> setReportOpen(true)}>Report Problem</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="help">
            <Card>
              <CardHeader><CardTitle>Help Center (Freelancer)</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <section>
                  <h3 className="font-semibold mb-2">Quick Help</h3>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="q1"><AccordionTrigger>How to check my schedule?</AccordionTrigger><AccordionContent>Open My Appointments to view today, upcoming and past bookings. The list auto-syncs with store assignments.</AccordionContent></AccordionItem>
                    <AccordionItem value="q2"><AccordionTrigger>How are my earnings calculated?</AccordionTrigger><AccordionContent>Earnings are based on assigned shifts and store commission rules. See the Earnings tab for breakdown.</AccordionContent></AccordionItem>
                    <AccordionItem value="q3"><AccordionTrigger>What if a client cancels?</AccordionTrigger><AccordionContent>You'll be notified. Follow the store's cancellation policy.</AccordionContent></AccordionItem>
                    <AccordionItem value="q4"><AccordionTrigger>How to update my availability?</AccordionTrigger><AccordionContent>Store manages shifts. Submit a leave request in Settings → Availability.</AccordionContent></AccordionItem>
                  </Accordion>
                </section>
                <section>
                  <h3 className="font-semibold mb-2">Support</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild><a href="mailto:store-admin@example.com">Contact Store Admin</a></Button>
                    <Button variant="outline" asChild><a href="mailto:support@example.com">App Support</a></Button>
                    <Button variant="outline" onClick={()=> setReportOpen(true)}>Report Problem</Button>
                  </div>
                </section>
                <section>
                  <h3 className="font-semibold mb-2">Policies</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Store Policy: work hours, cancellation rules, commission rates.</li>
                    <li>Platform Policy: data usage, account, privacy.</li>
                  </ul>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <Card>
              <CardHeader><CardTitle>Stores needing workers</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>When</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {openJobs.map(j => (
                      <TableRow key={j.id}>
                        <TableCell>{j.storeName}</TableCell>
                        <TableCell>{j.title}</TableCell>
                        <TableCell>{j.date} • {j.startTime}</TableCell>
                        <TableCell>{j.hours}h</TableCell>
                        <TableCell>₹{j.rate}/h</TableCell>
                        <TableCell>{j.homeService ? <Badge>Home Service</Badge> : <Badge variant="secondary">In-Store</Badge>}</TableCell>
                        <TableCell className="text-right"><Button size="sm" onClick={() => applyToJob(j.id)}>Apply</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my">
            <Card>
              <CardHeader><CardTitle>My jobs</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pay</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myJobs.map(j => (
                      <TableRow key={j.id}>
                        <TableCell>{j.storeName}</TableCell>
                        <TableCell>{j.title}</TableCell>
                        <TableCell><Badge>{j.status.replace("_"," ")}</Badge></TableCell>
                        <TableCell>₹{(j.rate*j.hours).toLocaleString('en-IN')}</TableCell>
                        <TableCell className="text-right space-x-2">
                          {j.status === "assigned" && (<Button size="sm" onClick={() => startJob(j.id)}>Start</Button>)}
                          {j.status === "in_progress" && (<Button size="sm" onClick={() => completeJob(j.id)}>Complete</Button>)}
                          {j.status === "completed" && (<Button size="sm" onClick={() => requestPayout(j.id)}>Request Payout</Button>)}
                          {j.status === "paid" && (<Badge variant="secondary">Paid</Badge>)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
      <MobileBottomNav />

      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Report a Problem</DialogTitle></DialogHeader>
          <Textarea placeholder="Describe the issue" className="min-h-32" />
          <DialogFooter><Button onClick={()=> setReportOpen(false)}>Submit</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FreelancerDashboard;
