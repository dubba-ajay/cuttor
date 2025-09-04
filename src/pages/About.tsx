import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Header />
      <main className="pt-16">
        <section className="container mx-auto px-4 lg:px-6 py-12">
          <h1 className="text-3xl font-bold mb-4">About Bliss</h1>
          <p className="text-base leading-7 max-w-3xl">
            Bliss connects customers with vetted salons, makeup artists, nail studios, and freelance professionals. We focus on premium experiences, transparent booking, and reliable service across categories.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
