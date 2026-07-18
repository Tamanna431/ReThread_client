import Link from 'next/link';
import { ArrowRight, Leaf, ShoppingBag, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-forest text-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            Fashion That Cares for{' '}
            <span className="text-terracotta">Our Planet</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Buy and sell pre-loved fashion sustainably. Reduce waste, save resources,
            and look amazing while doing it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/explore"
              className="bg-terracotta hover:bg-terracotta-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Explore Items
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/items/add"
              className="bg-white hover:bg-gray-100 text-forest px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              Start Selling
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="bg-forest-light p-6 rounded-lg">
              <Leaf className="w-10 h-10 text-terracotta mx-auto mb-3" />
              <h3 className="text-3xl font-bold mb-2">2,500L</h3>
              <p className="text-gray-300">Water Saved Per Item</p>
            </div>
            <div className="bg-forest-light p-6 rounded-lg">
              <ShoppingBag className="w-10 h-10 text-terracotta mx-auto mb-3" />
              <h3 className="text-3xl font-bold mb-2">5,000+</h3>
              <p className="text-gray-300">Items Listed</p>
            </div>
            <div className="bg-forest-light p-6 rounded-lg">
              <Heart className="w-10 h-10 text-terracotta mx-auto mb-3" />
              <h3 className="text-3xl font-bold mb-2">10,000+</h3>
              <p className="text-gray-300">Happy Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}