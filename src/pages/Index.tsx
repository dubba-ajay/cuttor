import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryHeroSlider from "@/components/features/CategoryHeroSlider";
// removed ServiceCategories for modern layout
import TopRatedHeroStores from "@/components/features/TopRatedHeroStores";
import MensStoresModern from "@/components/features/MensStoresModern";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// removed HomeAvailabilityPackages for modern layout

const Index = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    const allowHome = (location.state as any)?.allowHome;
    if (!allowHome) {
      if (role === "owner") {
        navigate("/store-owner-dashboard", { replace: true });
      } else if (role === "freelancer") {
        navigate("/freelancer-dashboard", { replace: true });
      }
    }
  }, [role, navigate, location.state]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 space-y-10">
        <CategoryHeroSlider category="mens-hair" showTabs={false} />
        <TopRatedHeroStores />
        <MensStoresModern category="all" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
