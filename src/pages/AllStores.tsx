import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MensStoresModern from "@/components/features/MensStoresModern";

const AllStoresPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16">
        <MensStoresModern category="all" />
      </main>
      <Footer />
    </div>
  );
};

export default AllStoresPage;
