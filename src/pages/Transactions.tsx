import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";

const data = [
  { id: "ORD1001", amount: 1200, status: "success", method: "UPI", date: "2025-09-01" },
  { id: "ORD1002", amount: 799, status: "failed", method: "Card", date: "2025-09-02" },
  { id: "ORD1003", amount: 499, status: "pending", method: "Wallet", date: "2025-09-03" },
  { id: "ORD1004", amount: 2199, status: "success", method: "Net Banking", date: "2025-09-03" },
];

type Status = "all" | "success" | "failed" | "pending";

export default function Transactions() {
  const [filter, setFilter] = useState<Status>("all");
  const list = useMemo(() => filter === "all" ? data : data.filter(d => d.status === filter), [filter]);
  const statusBadge = (s: string) => s === 'success' ? 'bg-green-100 text-green-700' : s === 'failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800';
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <h1 className="text-3xl font-bold mb-4">My Payments</h1>

          <Tabs value={filter} onValueChange={(v) => setFilter(v as Status)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="success">Success</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            <TabsContent value={filter} className="mt-4" />
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {list.map(tx => (
              <div key={tx.id} className="rounded-xl bg-white shadow-soft border p-5 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="text-2xl font-bold">₹{tx.amount.toLocaleString('en-IN')}</div>
                  <Badge className={statusBadge(tx.status)} variant="secondary">{tx.status.toUpperCase()}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">Method: {tx.method}</div>
                <div className="text-sm text-muted-foreground">Date: {tx.date}</div>
                <div className="text-xs">Order ID: <span className="font-medium">{tx.id}</span></div>
              </div>
            ))}
          </div>

          <div className="text-xs text-center text-muted-foreground mt-8">🔒 Your payment data is safe and secure.</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
