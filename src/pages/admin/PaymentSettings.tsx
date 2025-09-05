import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { usePayments } from "@/contexts/PaymentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

function DbCommissionRules() {
  const [adminKey, setAdminKey] = useState<string>(() => {
    try { return localStorage.getItem('adminKey') || ''; } catch { return ''; }
  });
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({ scopeType: 'global', scopeId: '', storePct: 80, freelancerPct: 10, platformPct: 10, priority: 0, active: true });
  const apiBase = (import.meta as any).env?.VITE_API_BASE || '/.netlify/functions';
  const headers = (k?: string) => k ? { 'x-admin-key': k } : {};
  const load = async () => {
    const res = await fetch(`${apiBase}/adminRules`, { headers: headers(adminKey) as any });
    if (!res.ok) throw new Error(await res.text());
    setList(await res.json());
  };
  useEffect(() => { if (adminKey) { try { localStorage.setItem('adminKey', adminKey); } catch {} } }, [adminKey]);
  useEffect(() => { if (adminKey) load().catch(()=>{}); }, [adminKey]);
  const create = async () => {
    const res = await fetch(`${apiBase}/adminRules`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(headers(adminKey) as any) }, body: JSON.stringify({ ...form, scopeId: form.scopeId || null }) });
    if (!res.ok) { alert(await res.text()); return; }
    setForm({ scopeType: 'global', scopeId: '', storePct: 80, freelancerPct: 10, platformPct: 10, priority: 0, active: true });
    await load();
  };
  const toggle = async (id: string, active: boolean) => {
    const row = list.find(r => r.id === id);
    const res = await fetch(`${apiBase}/adminRules`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...(headers(adminKey) as any) }, body: JSON.stringify({ ...row, active }) });
    if (!res.ok) { alert(await res.text()); return; }
    await load();
  };
  const del = async (id: string) => {
    const res = await fetch(`${apiBase}/adminRules?id=${id}`, { method: 'DELETE', headers: headers(adminKey) as any });
    if (!res.ok) { alert(await res.text()); return; }
    await load();
  };
  return (
    <Card>
      <CardHeader><CardTitle>Commission Rules (Database)</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-end gap-2">
          <div className="grid gap-1"><Label>Admin API Key</Label><Input type="password" value={adminKey} onChange={e=> setAdminKey(e.target.value)} placeholder="Enter admin key" /></div>
          <Button onClick={load} disabled={!adminKey}>Load</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 items-end">
          <div className="grid gap-1">
            <Label>Scope</Label>
            <select className="border rounded px-3 py-2" value={form.scopeType} onChange={e=> setForm({ ...form, scopeType: e.target.value as any })}>
              <option value="global">Global</option>
              <option value="store">Store</option>
              <option value="service">Service</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>
          <div className="grid gap-1"><Label>Scope ID</Label><Input value={form.scopeId} onChange={e=> setForm({ ...form, scopeId: e.target.value })} placeholder="optional" /></div>
          <div className="grid gap-1"><Label>Store %</Label><Input type="number" value={form.storePct} onChange={e=> setForm({ ...form, storePct: Number(e.target.value) })} /></div>
          <div className="grid gap-1"><Label>Freelancer %</Label><Input type="number" value={form.freelancerPct} onChange={e=> setForm({ ...form, freelancerPct: Number(e.target.value) })} /></div>
          <div className="grid gap-1"><Label>Platform %</Label><Input type="number" value={form.platformPct} onChange={e=> setForm({ ...form, platformPct: Number(e.target.value) })} /></div>
          <div className="grid gap-1"><Label>Priority</Label><Input type="number" value={form.priority} onChange={e=> setForm({ ...form, priority: Number(e.target.value) })} /></div>
          <div className="grid gap-1 md:col-span-6"><Button onClick={create} disabled={!adminKey}>Add Rule</Button></div>
        </div>
        <div className="border rounded">
          <div className="grid grid-cols-6 gap-2 p-2 text-xs font-medium text-muted-foreground">
            <div>Scope</div><div>Scope ID</div><div>Store%</div><div>Free%</div><div>Plat%</div><div>Actions</div>
          </div>
          {list.map((r) => (
            <div key={r.id} className="grid grid-cols-6 gap-2 p-2 text-sm items-center border-t">
              <div>{r.scopeType}</div>
              <div>{r.scopeId || '-'}</div>
              <div>{r.storePct}</div>
              <div>{r.freelancerPct}</div>
              <div>{r.platformPct}</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={()=> toggle(r.id, !r.active)}>{r.active? 'Disable':'Enable'}</Button>
                <Button size="sm" variant="destructive" onClick={()=> del(r.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PerServiceSplitEditor() {
  const { settings, setSettings } = usePayments();
  const [rows, setRows] = useState(Object.entries(settings.perServiceSplit).map(([serviceId, rule]) => ({ serviceId, ...rule })));
  const addRow = () => setRows(prev => ([...prev, { serviceId: "", storePct: 0, freelancerPct: 0, platformPct: 0 }]));
  const updateRow = (i: number, next: Partial<{ serviceId: string; storePct: number; freelancerPct: number; platformPct: number }>) => {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, ...next } : r));
  };
  const removeRow = (i: number) => setRows(prev => prev.filter((_, idx) => idx !== i));
  const save = () => {
    const map: Record<string, { storePct: number; freelancerPct: number; platformPct: number }> = {};
    for (const r of rows) {
      const sum = Math.round(r.storePct + r.freelancerPct + r.platformPct);
      if (!r.serviceId) throw new Error("Service ID is required");
      if (sum !== 100) throw new Error(`Split for ${r.serviceId} must total 100%`);
      map[r.serviceId] = { storePct: r.storePct, freelancerPct: r.freelancerPct, platformPct: r.platformPct };
    }
    setSettings({ perServiceSplit: map });
    alert("Per-service splits saved");
  };
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-5 gap-2 text-xs font-medium text-muted-foreground">
        <div>Service ID</div>
        <div>Store %</div>
        <div>Freelancer %</div>
        <div>Platform %</div>
        <div></div>
      </div>
      {rows.map((r, i) => {
        const sum = Math.round(r.storePct + r.freelancerPct + r.platformPct);
        return (
          <div key={i} className="grid grid-cols-5 gap-2 items-center">
            <Input value={r.serviceId} onChange={(e)=> updateRow(i, { serviceId: e.target.value })} placeholder="e.g., svc1" />
            <Input type="number" value={r.storePct} onChange={(e)=> updateRow(i, { storePct: Number(e.target.value) })} />
            <Input type="number" value={r.freelancerPct} onChange={(e)=> updateRow(i, { freelancerPct: Number(e.target.value) })} />
            <Input type="number" value={r.platformPct} onChange={(e)=> updateRow(i, { platformPct: Number(e.target.value) })} />
            <div className={`text-xs ${sum===100?'text-green-600':'text-red-600'}`}>{sum}% <button className="ml-2 text-red-600" onClick={()=> removeRow(i)}>Remove</button></div>
          </div>
        );
      })}
      <div className="flex gap-2">
        <Button variant="outline" onClick={addRow}>Add Service</Button>
        <Button onClick={save}>Save Overrides</Button>
      </div>
    </div>
  );
}

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
            <CardHeader><CardTitle>Per-service Split Overrides</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">Define service-specific splits. These override the default split when a booking references the matching service ID.</div>
              <PerServiceSplitEditor />
            </CardContent>
          </Card>

          <DbCommissionRules />

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
