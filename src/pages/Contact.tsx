import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Header />
      <main className="pt-16">
        <section className="container mx-auto px-4 lg:px-6 py-12 space-y-4">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="max-w-2xl">For support or partnership inquiries, email support@bliss.app or call +91-00000-00000.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
