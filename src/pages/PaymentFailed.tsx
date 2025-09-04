import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentFailed() {
  const info = { amount: 1799, method: "UPI", date: new Date().toLocaleString(), error: "Bank declined the transaction." };
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <div className="mx-auto max-w-md text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto animate-pulse">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </div>
            <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>
            <p className="text-muted-foreground">Something went wrong. Please try again.</p>

            <Card>
              <CardHeader><CardTitle>Attempt Details</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Amount</span><span className="font-medium">₹{info.amount.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>Method</span><span className="font-medium">{info.method}</span></div>
                <div className="flex justify-between"><span>Date</span><span className="font-medium">{info.date}</span></div>
                <div className="flex justify-between"><span>Error</span><span className="font-medium">{info.error}</span></div>
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-center">
              <Button className="rounded-xl">Retry Payment</Button>
              <Button variant="secondary" className="rounded-xl">Go Back to Checkout</Button>
            </div>
            <div className="text-xs text-muted-foreground">If money is deducted, it will be auto-refunded within 5-7 days.</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
