import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryHeroSlider from "@/components/features/CategoryHeroSlider";
import MensStoresModern from "@/components/features/MensStoresModern";

const NailStudios = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 space-y-12">
        <CategoryHeroSlider category="nail-studios" showTabs={false} />
        <MensStoresModern category="nail-studios" />
      </main>
      <Footer />
    </div>
  );
};

export default NailStudios;
