export default function Home() {
  return (
    <main className="min-h-screen bg-oat">
      {/* Hero Section */}
      <div className="bg-forest text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to ReThread
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Sustainable Fashion Marketplace
          </p>
          <button className="bg-terracotta hover:bg-terracotta-dark text-white px-8 py-3 rounded-lg font-semibold transition">
            Explore Now
          </button>
        </div>
      </div>

      {/* Test Section */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-forest mb-4">
            Color Test
          </h2>
          <div className="flex gap-4">
            <div className="w-32 h-32 bg-forest rounded-lg"></div>
            <div className="w-32 h-32 bg-terracotta rounded-lg"></div>
            <div className="w-32 h-32 bg-oat border border-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </main>
  );
}