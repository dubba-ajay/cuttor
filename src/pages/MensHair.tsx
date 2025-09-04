import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryHeroSlider from "@/components/features/CategoryHeroSlider";
import MensStoresModern from "@/components/features/MensStoresModern";

const MensHair = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 space-y-12">
        <CategoryHeroSlider category="mens-hair" showTabs={false} />
        <MensStoresModern category="mens-hair" />
      </main>
      <Footer />
    </div>
  );
};

export default MensHair;
