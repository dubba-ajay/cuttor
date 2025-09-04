import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

const rows = [
  { user: "U001", order: "ORD1001", amount: 1200, status: "Success", method: "UPI", date: "2025-09-01" },
  { user: "U002", order: "ORD1002", amount: 799, status: "Failed", method: "Card", date: "2025-09-02" },
  { user: "U003", order: "ORD1003", amount: 499, status: "Pending", method: "Wallet", date: "2025-09-03" },
  { user: "U004", order: "ORD1004", amount: 2199, status: "Success", method: "Net Banking", date: "2025-09-03" },
];

const methodChart = [
  { name: 'UPI', value: 1 },
  { name: 'Card', value: 1 },
  { name: 'Wallet', value: 1 },
  { name: 'Net Banking', value: 1 },
];
const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6'];

export default function AdminTransactions() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <aside className="md:col-span-2 lg:col-span-1 space-y-2">
              <div className="font-semibold text-sm">Navigation</div>
              <nav className="space-y-2 text-sm">
                {['Dashboard','Users','Payments','Settings'].map(x => (
                  <div key={x} className={`px-3 py-2 rounded-lg ${x==='Payments' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}>{x}</div>
                ))}
              </nav>
            </aside>

            <section className="md:col-span-4 lg:col-span-5 space-y-6">
              <Card>
                <CardHeader><CardTitle>Payments Overview</CardTitle></CardHeader>
                <CardContent className="h-64">
                  <ChartContainer className="h-full">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={methodChart} dataKey="value" nameKey="name" outerRadius={80} label>
                          {methodChart.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Transactions</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <input type="date" className="border rounded px-3 py-2" />
                    <input type="date" className="border rounded px-3 py-2" />
                    <Tabs defaultValue="All">
                      <TabsList>
                        {['All','Success','Failed','Pending'].map(s => <TabsTrigger key={s} value={s}>{s}</TabsTrigger>)}
                      </TabsList>
                      <TabsContent value="All" />
                      <TabsContent value="Success" />
                      <TabsContent value="Failed" />
                      <TabsContent value="Pending" />
                    </Tabs>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User ID</TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rows.map(r => (
                          <TableRow key={r.order}>
                            <TableCell>{r.user}</TableCell>
                            <TableCell>{r.order}</TableCell>
                            <TableCell className="text-right">₹{r.amount.toLocaleString('en-IN')}</TableCell>
                            <TableCell>{r.status}</TableCell>
                            <TableCell>{r.method}</TableCell>
                            <TableCell>{r.date}</TableCell>
                            <TableCell><button className="text-blue-600 hover:underline">View</button></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
