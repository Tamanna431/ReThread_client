import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-oat">
      <Navbar />
      <Hero />
      
      {/* More sections will come here */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest mb-4">
            More Sections Coming Soon
          </h2>
          <p className="text-gray-600">
            We're building an amazing sustainable fashion marketplace!
          </p>
        </div>
      </section>
    </main>
  );
}