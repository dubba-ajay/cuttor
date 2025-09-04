import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PaymentSecurityBadges from "@/components/features/PaymentSecurityBadges";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function ProgressBar() {
  const steps = ["Cart", "Checkout", "Payment", "Done"];
  const active = 2; // Payment
  return (
    <div className="flex items-center gap-2 text-sm">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded ${i <= active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}>{s}</span>
          {i < steps.length - 1 && <span className="w-6 h-[2px] bg-gray-200" />}
        </div>
      ))}
    </div>
  );
}

import useCheckout from "@/hooks/useCheckout";

export default function Checkout() {
  useCheckout();
  const item = {
    id: 1,
    name: "Premium Haircut Package",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    price: 799,
    qty: 1,
  };
  const tax = Math.round(item.price * 0.18);
  const total = item.price * item.qty + tax;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-900" />
              <h1 className="text-2xl font-bold">Checkout</h1>
            </div>
            <ProgressBar />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-muted-foreground">Qty: {item.qty}</div>
                    </div>
                    <div className="font-semibold">₹{item.price.toLocaleString("en-IN")}</div>
                  </div>
                  <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span>Subtotal</span><span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between"><span>Tax (18%)</span><span>₹{tax.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between text-base font-bold"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upi" className="w-full">
                    <TabsList className="grid grid-cols-3 lg:grid-cols-5">
                      <TabsTrigger value="upi">UPI</TabsTrigger>
                      <TabsTrigger value="card">Card</TabsTrigger>
                      <TabsTrigger value="wallet">Wallet</TabsTrigger>
                      <TabsTrigger value="netbank">Net Banking</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upi" className="space-y-3 pt-4">
                      <label className="text-sm font-medium">UPI ID</label>
                      <input className="w-full border rounded px-3 py-2" placeholder="name@upi" />
                      <Button className="w-full">Verify & Pay</Button>
                    </TabsContent>

                    <TabsContent value="card" className="space-y-3 pt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium">Card Number</label>
                          <input className="w-full border rounded px-3 py-2" placeholder="4111 1111 1111 1111" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Name on Card</label>
                          <input className="w-full border rounded px-3 py-2" placeholder="Full Name" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Expiry</label>
                          <input className="w-full border rounded px-3 py-2" placeholder="MM/YY" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">CVV</label>
                          <input className="w-full border rounded px-3 py-2" placeholder="123" />
                        </div>
                      </div>
                      <Button className="w-full">Pay ₹{total.toLocaleString("en-IN")}</Button>
                    </TabsContent>

                    <TabsContent value="wallet" className="space-y-3 pt-4">
                      <div className="flex gap-2 flex-wrap">
                        {['Paytm','PhonePe','Amazon Pay','Mobikwik'].map(w => <Badge key={w} className="cursor-pointer">{w}</Badge>)}
                      </div>
                      <Button className="w-full">Proceed with Wallet</Button>
                    </TabsContent>

                    <TabsContent value="netbank" className="space-y-3 pt-4">
                      <select className="w-full border rounded px-3 py-2">
                        {['HDFC Bank','ICICI Bank','SBI','Axis Bank','Kotak'].map(b => <option key={b}>{b}</option>)}
                      </select>
                      <Button className="w-full">Pay via Net Banking</Button>
                    </TabsContent>

                    <TabsContent value="paypal" className="space-y-3 pt-4">
                      <Button className="w-full">Continue to PayPal</Button>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 space-y-2">
                    <Button onClick={() => {
                      // Simulate creating escrow and success redirect
                      try {
                        const evt = new CustomEvent('checkout:create');
                        window.dispatchEvent(evt);
                      } catch {}
                    }} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-base py-6">Proceed to Pay</Button>
                    <div className="text-xs text-center text-muted-foreground">🔒 100% Secure Payments</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <PaymentSecurityBadges />
      </main>
      <Footer />
    </div>
  );
}
