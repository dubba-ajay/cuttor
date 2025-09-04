import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RefundStatus() {
  const refund = { id: 'RFD-9988', txn: 'TXN123456', amount: 799, method: 'UPI', status: 'Processing' };
  const step = refund.status === 'Pending' ? 1 : refund.status === 'Processing' ? 2 : 3;
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <h1 className="text-3xl font-bold mb-6">Refund Status</h1>
          <Card className="max-w-2xl">
            <CardHeader><CardTitle>Details</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Refund ID</span><span className="font-medium">{refund.id}</span></div>
              <div className="flex justify-between"><span>Transaction ID</span><span className="font-medium">{refund.txn}</span></div>
              <div className="flex justify-between"><span>Amount</span><span className="font-medium">₹{refund.amount.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span>Method</span><span className="font-medium">{refund.method}</span></div>
              <div className="flex justify-between"><span>Status</span><span className="font-medium">{refund.status}</span></div>
              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Progress</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Refund Initiated','Processing','Completed'].map((s, i) => (
                    <div key={s} className={`px-3 py-2 rounded-lg text-center ${i+1 <= step ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{s}</div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6"><Button className="rounded-xl">Back to Transactions</Button></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
