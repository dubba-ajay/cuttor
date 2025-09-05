import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocationProvider } from "@/contexts/LocationContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { RequireAuth, RequireRole } from "@/components/auth/RequireAuth";
import { MarketplaceProvider } from "@/contexts/MarketplaceContext";
import { PaymentProvider } from "@/contexts/PaymentContext";
import Index from "./pages/Index";
import MensHair from "./pages/MensHair";
import WomensBeauty from "./pages/WomensBeauty";
import NailStudios from "./pages/NailStudios";
import MakeupArtists from "./pages/MakeupArtists";
import AllStoresPage from "./pages/AllStores";
import SalonDetail from "./pages/SalonDetail";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import Transactions from "./pages/Transactions";
import AdminTransactions from "./pages/AdminTransactions";
import Subscription from "./pages/Subscription";
import RefundStatus from "./pages/RefundStatus";
import AdminPaymentSettings from "./pages/admin/PaymentSettings";
import EscrowDashboard from "./pages/admin/EscrowDashboard";
import Nearby from "./pages/Nearby";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocationProvider>
        <AuthProvider>
          <MarketplaceProvider>
            <PaymentProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mens-hair" element={<MensHair />} />
            <Route path="/salon/:id" element={<SalonDetail />} />
            <Route path="/womens-beauty" element={<WomensBeauty />} />
            <Route path="/womens-beauty/salon/:id" element={<SalonDetail />} />
            <Route path="/nail-studios" element={<NailStudios />} />
            <Route path="/nail-studios/salon/:id" element={<SalonDetail />} />
            <Route path="/makeup-artists" element={<MakeupArtists />} />
            <Route path="/makeup-artists/salon/:id" element={<SalonDetail />} />
            <Route path="/all-stores" element={<AllStoresPage />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/nearby" element={<Nearby />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failed" element={<PaymentFailed />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/admin/transactions" element={<RequireRole role="owner"><AdminTransactions /></RequireRole>} />
            <Route path="/admin/payment-settings" element={<RequireRole role="owner"><AdminPaymentSettings /></RequireRole>} />
            <Route path="/admin/escrow" element={<RequireRole role="owner"><EscrowDashboard /></RequireRole>} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/refund-status" element={<RefundStatus />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user-dashboard" element={<RequireAuth><UserDashboard /></RequireAuth>} />
            <Route path="/store-owner-dashboard" element={<RequireRole role="owner"><StoreOwnerDashboard /></RequireRole>} />
            <Route path="/freelancer-dashboard" element={<RequireRole role="freelancer"><FreelancerDashboard /></RequireRole>} />
            <Route path="/worker-dashboard" element={<RequireAuth><WorkerDashboard /></RequireAuth>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
            </PaymentProvider>
            </MarketplaceProvider>
          </AuthProvider>
      </LocationProvider>
  </QueryClientProvider>
);

export default App;
