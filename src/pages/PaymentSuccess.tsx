import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ConfettiBg() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
      <div className="w-full h-full" style={{
        backgroundImage: "repeating-radial-gradient(circle at 20% 30%, #22c55e 0 2px, transparent 3px 40px), repeating-radial-gradient(circle at 80% 40%, #3b82f6 0 2px, transparent 3px 50px), repeating-radial-gradient(circle at 40% 80%, #f59e0b 0 2px, transparent 3px 60px)",
        backgroundSize: "auto",
      }} />
    </div>
  );
}

import { getApiBase } from "@/lib/api";

export default function PaymentSuccess() {
  const usr = (history.state as any)?.usr || {};
  const txn = { id: (usr.orderId || ("TXN" + Math.random().toString(36).slice(2,8).toUpperCase())), amount: (usr.total ?? 0), method: (usr.gateway ?? 'razorpay'), date: new Date().toLocaleString(), split: usr.split, status: usr.status || 'created' };
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <Header />
      <main className="pt-16">
        <ConfettiBg />
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <div className="mx-auto max-w-md text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
            <p className="text-muted-foreground">Your order has been placed successfully.</p>

            <Card>
              <CardHeader><CardTitle>Transaction Details</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Transaction ID</span><span className="font-medium">{txn.id}</span></div>
                <div className="flex justify-between"><span>Amount Paid</span><span className="font-medium">₹{txn.amount.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>Payment Method</span><span className="font-medium">{txn.method}</span></div>
                <div className="flex justify-between"><span>Status</span><span className="font-medium capitalize">{txn.status}</span></div>
                <div className="flex justify-between"><span>Date</span><span className="font-medium">{txn.date}</span></div>
              </CardContent>
            </Card>

            {txn.split && (
              <Card>
                <CardHeader><CardTitle>Split Breakdown</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-1">
                  <div className="flex justify-between"><span>Store</span><span className="font-medium">₹{Math.round((txn.split.rule.storePct/100)*(txn.amount || 0)).toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>Freelancer</span><span className="font-medium">₹{Math.round((txn.split.rule.freelancerPct/100)*(txn.amount || 0)).toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>Platform</span><span className="font-medium">₹{Math.max(0, (txn.amount || 0) - Math.round((txn.split.rule.storePct/100)*(txn.amount || 0)) - Math.round((txn.split.rule.freelancerPct/100)*(txn.amount || 0))).toLocaleString('en-IN')}</span></div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-2 justify-center">
              <Button className="rounded-xl">Go to Dashboard</Button>
              {usr.paymentId && (
                <a href={`${getApiBase()}/invoice?paymentId=${usr.paymentId}`} target="_blank" rel="noopener" className="inline-flex items-center px-4 py-2 rounded-xl border">Download Invoice</a>
              )}
            </div>
            <div className="text-xs text-muted-foreground">Need help? Contact Support</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
