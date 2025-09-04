import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { usePayments } from "@/contexts/PaymentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function AdminPaymentSettings() {
  const { settings, setSettings, hasRazorpayEnv, hasStripeEnv } = usePayments();
  const [business, setBusiness] = useState(settings.business);
  const [split, setSplit] = useState(settings.defaultSplit);

  const sum = split.storePct + split.freelancerPct + split.platformPct;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8 space-y-6">
          <h1 className="text-3xl font-bold">Payment & Split Management</h1>

          <Card>
            <CardHeader><CardTitle>Payment Gateway</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Label>Gateway</Label>
                <select className="border rounded px-3 py-2" value={settings.gateway} onChange={e => setSettings({ gateway: e.target.value as any })}>
                  <option value="razorpay">Razorpay Route (INR)</option>
                  <option value="stripe">Stripe Connect (Global)</option>
                </select>
                <Label>Mode</Label>
                <select className="border rounded px-3 py-2" value={settings.mode} onChange={e => setSettings({ mode: e.target.value as any })}>
                  <option value="sandbox">Sandbox</option>
                  <option value="live">Live</option>
                </select>
                <div className={`text-xs px-2 py-1 rounded ${hasRazorpayEnv ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>Razorpay env: {hasRazorpayEnv ? 'configured' : 'missing'}</div>
                <div className={`text-xs px-2 py-1 rounded ${hasStripeEnv ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'}`}>Stripe env: {hasStripeEnv ? 'configured' : 'optional'}</div>
              </div>
              <div className="text-xs text-muted-foreground">Secrets must be provided via environment variables: VITE_RAZORPAY_KEY_ID, VITE_RAZORPAY_KEY_SECRET, VITE_RAZORPAY_WEBHOOK_SECRET.</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>GST & Business Info</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Business Name</Label>
                <Input value={business.businessName} onChange={(e)=> setBusiness({ ...business, businessName: e.target.value })} />
              </div>
              <div>
                <Label>GSTIN (optional)</Label>
                <Input value={business.gstin || ''} onChange={(e)=> setBusiness({ ...business, gstin: e.target.value })} />
              </div>
              <div>
                <Label>PAN Number</Label>
                <Input value={business.pan} onChange={(e)=> setBusiness({ ...business, pan: e.target.value })} />
              </div>
              <div>
                <Label>Default Tax %</Label>
                <Input type="number" value={business.defaultTaxPct} onChange={(e)=> setBusiness({ ...business, defaultTaxPct: Number(e.target.value) })} />
              </div>
              <div className="md:col-span-2">
                <Button onClick={()=> setSettings({ business })}>Save Business Info</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Default Split Configuration</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <Label>Store %</Label>
                <Input type="number" value={split.storePct} onChange={(e)=> setSplit({ ...split, storePct: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Freelancer %</Label>
                <Input type="number" value={split.freelancerPct} onChange={(e)=> setSplit({ ...split, freelancerPct: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Platform %</Label>
                <Input type="number" value={split.platformPct} onChange={(e)=> setSplit({ ...split, platformPct: Number(e.target.value) })} />
              </div>
              <div className="text-sm">Total: <span className={`${sum===100? 'text-green-600':'text-red-600'} font-semibold`}>{sum}%</span></div>
              <div className="md:col-span-4 flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={settings.escrowReleaseOnCompletion} onChange={(e)=> setSettings({ escrowReleaseOnCompletion: e.target.checked })} /> Escrow Release after Completion</label>
                <Button disabled={sum!==100} onClick={()=> setSettings({ defaultSplit: split })}>Save Split</Button>
              </div>
              <div className="text-xs text-muted-foreground md:col-span-4">You can override per-service split on the booking screen.</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Freelancer & Store Linking</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>All freelancers must belong to a store. Store Owner must approve before payouts are enabled.</div>
              <div className="text-xs text-muted-foreground">Manage links on the Store Owner and Freelancer dashboards.</div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
