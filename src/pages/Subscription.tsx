import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const plans = [
  { name: 'Basic', price: { monthly: 199, yearly: 1990 }, features: ['1 User', 'Standard Support', 'Basic Analytics'] },
  { name: 'Pro', price: { monthly: 499, yearly: 4990 }, features: ['5 Users', 'Priority Support', 'Advanced Analytics'] },
  { name: 'Premium', price: { monthly: 999, yearly: 9990 }, features: ['Unlimited Users', '24/7 Support', 'All Features'] },
];

export default function Subscription() {
  const [yearly, setYearly] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Choose Your Plan</h1>
            <div className="flex items-center gap-2 text-sm">
              <span>Monthly</span>
              <input type="checkbox" checked={yearly} onChange={() => setYearly(v => !v)} />
              <span>Yearly</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.name} className={`rounded-2xl border shadow-soft p-6 ${p.name==='Pro' ? 'ring-2 ring-blue-500' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-semibold">{p.name}</div>
                  {p.name==='Pro' && <div className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600">Recommended</div>}
                </div>
                <div className="text-4xl font-bold my-3">₹{(yearly ? p.price.yearly : p.price.monthly).toLocaleString('en-IN')}<span className="text-base text-muted-foreground font-normal">/{yearly ? 'yr' : 'mo'}</span></div>
                <ul className="space-y-2 text-sm mb-6 list-disc pl-5">
                  {p.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">Subscribe Now</Button>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-2xl">
            <h2 className="text-xl font-semibold mb-2">Payment Options</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {['UPI','Card','Wallet','Net Banking'].map(x => <div key={x} className="border rounded-lg px-4 py-3 text-center">{x}</div>)}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
