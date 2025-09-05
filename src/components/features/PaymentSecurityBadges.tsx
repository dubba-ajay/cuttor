import { Shield, Zap, RefreshCw } from "lucide-react";

export default function PaymentSecurityBadges() {
  const items = [
    { icon: Shield, title: "Secure Payments", desc: "PCI-DSS compliant processing with advanced encryption." },
    { icon: Zap, title: "Instant Confirmation", desc: "Real-time payment status and order updates." },
    { icon: RefreshCw, title: "Easy Refunds", desc: "5-7 days refund guarantee on failed transactions." },
  ];
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 lg:px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border bg-white shadow-soft p-5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-green-50 text-green-600"><Icon className="w-5 h-5" /></div>
              <div>
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-muted-foreground">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
