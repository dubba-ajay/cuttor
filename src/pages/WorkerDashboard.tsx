import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

const WorkerDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 container mx-auto px-4 lg:px-6 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Worker Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card><CardContent className="p-6">Schedule</CardContent></Card>
          <Card><CardContent className="p-6">Assigned bookings</CardContent></Card>
          <Card><CardContent className="p-6">Performance</CardContent></Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WorkerDashboard;
