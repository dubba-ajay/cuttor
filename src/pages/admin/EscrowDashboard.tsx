import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { usePayments } from "@/contexts/PaymentContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EscrowDashboard() {
  const { escrows, payouts, refunds, releaseEscrow, refundEscrow } = usePayments();
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8 space-y-6">
          <h1 className="text-3xl font-bold">Escrow & Payout Dashboard</h1>
          <Tabs defaultValue="escrow">
            <TabsList>
              <TabsTrigger value="escrow">Pending Payouts</TabsTrigger>
              <TabsTrigger value="payouts">Completed Payouts</TabsTrigger>
              <TabsTrigger value="refunds">Refunds</TabsTrigger>
            </TabsList>
            <TabsContent value="escrow">
              <Card>
                <CardHeader><CardTitle>Escrow Held</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {escrows.length === 0 && <div className="text-sm text-muted-foreground">No records</div>}
                  {escrows.map(e => (
                    <div key={e.id} className="grid grid-cols-2 md:grid-cols-7 gap-2 text-sm border-b py-2 items-center">
                      <div>Booking: <span className="font-medium">{e.bookingId}</span></div>
                      <div>Store: {e.storeId}</div>
                      <div>Amount: ₹{e.amount.toLocaleString('en-IN')}</div>
                      <div>Tax: ₹{e.tax.toLocaleString('en-IN')}</div>
                      <div>Status: <span className="font-medium">{e.status}</span></div>
                      <div>Date: {new Date(e.createdAt).toLocaleString()}</div>
                      <div className="flex gap-2 justify-end">
                        {e.status === 'pending' && (
                          <>
                            <Button size="sm" onClick={() => { try { releaseEscrow(e.bookingId); alert('Payouts released'); } catch (err:any) { alert(err.message||'Failed to release'); } }}>Release</Button>
                            <Button size="sm" variant="outline" onClick={() => { const amtStr = prompt('Refund amount (₹)', String(e.amount)); const amt = Math.max(0, Math.min(e.amount, Number(amtStr)||0)); const reason = prompt('Reason (optional)')||undefined; if (!amt) return; try { refundEscrow(e.bookingId, amt, reason); alert('Refund recorded'); } catch (err:any) { alert(err.message||'Refund failed'); } }}>Refund</Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payouts">
              <Card>
                <CardHeader><CardTitle>Released Payouts</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {payouts.length === 0 && <div className="text-sm text-muted-foreground">No records</div>}
                  {payouts.map(p => (
                    <div key={p.id} className="grid grid-cols-2 md:grid-cols-6 gap-2 text-sm border-b py-2">
                      <div>Booking: <span className="font-medium">{p.bookingId}</span></div>
                      <div>Payee: {p.payee}</div>
                      <div>Amount: ₹{p.amount.toLocaleString('en-IN')}</div>
                      <div>Date: {new Date(p.date).toLocaleString()}</div>
                      <div className="md:col-span-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="refunds">
              <Card>
                <CardHeader><CardTitle>Refunds</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {refunds.length === 0 && <div className="text-sm text-muted-foreground">No records</div>}
                  {refunds.map(r => (
                    <div key={r.id} className="grid grid-cols-2 md:grid-cols-6 gap-2 text-sm border-b py-2">
                      <div>Booking: <span className="font-medium">{r.bookingId}</span></div>
                      <div>Amount: ₹{r.amount.toLocaleString('en-IN')}</div>
                      <div>Date: {new Date(r.date).toLocaleString()}</div>
                      <div className="md:col-span-3">Reason: {r.reason || '-'}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
