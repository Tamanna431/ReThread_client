import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Link from 'next/link';
import ImpactChart from '@/components/ImpactChart';
import {
  Leaf, ShoppingBag, Heart, Zap, Shield, Globe,
  ArrowRight, TrendingUp, Users, Award, CheckCircle
} from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-oat">
      <Navbar />

      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: Features / Why Choose Us */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4">
              Why Choose ReThread?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sustainable fashion that doesn't compromise on style or quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="w-8 h-8" />,
                title: 'Eco-Friendly',
                desc: 'Reduce waste and carbon footprint with every purchase',
                color: 'from-green-500 to-emerald-600'
              },
              {
                icon: <ShoppingBag className="w-8 h-8" />,
                title: 'Curated Quality',
                desc: 'Handpicked premium pre-loved fashion items',
                color: 'from-terracotta to-terracotta-dark'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Verified Sellers',
                desc: 'Trusted community with verified authentication',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'AI-Powered',
                desc: 'Smart recommendations and fair pricing',
                color: 'from-purple-500 to-purple-600'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group bg-oat rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-forest mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Categories */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-forest to-forest-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover sustainable fashion across all categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Men', count: '1,200+ items', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=500&fit=crop' },
              { name: 'Women', count: '2,500+ items', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop' },
              { name: 'Accessories', count: '800+ items', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop' },
              { name: 'Shoes', count: '950+ items', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop' }
            ].map((category, idx) => (
              <Link
                href={`/explore?category=${category.name}`}
                key={idx}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-heading text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{category.count}</p>
                  <div className="flex items-center gap-2 text-terracotta font-semibold group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section className="py-20 md:py-28 bg-oat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start your sustainable fashion journey in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Browse & Discover',
                desc: 'Explore thousands of curated pre-loved fashion items with AI-powered recommendations',
                icon: <ShoppingBag className="w-6 h-6" />
              },
              {
                step: '02',
                title: 'Make Sustainable Choice',
                desc: 'Choose quality over quantity. Each purchase saves water and reduces CO2 emissions',
                icon: <Heart className="w-6 h-6" />
              },
              {
                step: '03',
                title: 'List Your Items',
                desc: 'Sell your pre-loved items with AI-assisted pricing and reach eco-conscious buyers',
                icon: <Leaf className="w-6 h-6" />
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                  <div className="text-6xl font-bold text-terracotta/20 mb-4">{item.step}</div>
                  <div className="bg-gradient-to-br from-terracotta to-terracotta-dark w-12 h-12 rounded-lg flex items-center justify-center text-white mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-forest mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-terracotta" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Statistics / Impact */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-terracotta to-terracotta-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Our Environmental Impact
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Together, we're making fashion sustainable one item at a time
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Droplets className="w-8 h-8" />, value: '2.5M+', label: 'Liters of Water Saved', sub: 'Equivalent to 10,000 showers' },
              { icon: <Wind className="w-8 h-8" />, value: '150K', label: 'KG CO₂ Reduced', sub: 'Like planting 7,500 trees' },
              { icon: <Users className="w-8 h-8" />, value: '10K+', label: 'Active Users', sub: 'Sustainable fashion lovers' },
              { icon: <ShoppingBag className="w-8 h-8" />, value: '25K+', label: 'Items Listed', sub: 'Pre-loved fashion finds' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex justify-center mb-4 text-white">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-white/80">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5.5: Detailed Impact Charts (Recharts) */}
      <section className="py-20 md:py-28 bg-oat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4">
              Detailed Environmental Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track our community's progress in making fashion sustainable
            </p>
          </div>

          <ImpactChart />
        </div>
      </section>

      {/* Section 6: Testimonial */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real people making a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Sustainable Fashion Lover',
                text: 'ReThread has completely changed how I shop. The AI recommendations are spot-on, and I love knowing my purchases are helping the environment!',
                rating: 5
              },
              {
                name: 'Michael Chen',
                role: 'Vintage Collector',
                text: 'Finally, a platform that understands sustainable fashion! The quality of items is amazing, and the eco-impact tracking motivates me to buy more.',
                rating: 5
              },
              {
                name: 'Emma Williams',
                role: 'Eco-Conscious Shopper',
                text: 'I saved over $500 this year while reducing my carbon footprint. The AI pricing tool helped me sell my old clothes at fair prices too!',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-oat rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-terracotta to-terracotta-dark rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-forest">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="py-20 md:py-28 bg-oat">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about sustainable fashion
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How does buying pre-loved fashion help the environment?',
                a: 'Each pre-loved item saves approximately 2,500 liters of water and 5kg of CO2 emissions compared to buying new. By extending the life of clothing, we reduce textile waste in landfills.'
              },
              {
                q: 'How do I ensure the quality of items?',
                a: 'All sellers are verified, and items are categorized by condition (New, Like New, Good, Fair). Our AI-powered quality checks and detailed descriptions ensure you know exactly what you\'re getting.'
              },
              {
                q: 'Can I sell my own pre-loved items?',
                a: 'Absolutely! Our AI Auto-Fill feature makes listing items super easy. Just enter a title, and our AI will suggest pricing, category, and tags automatically.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and digital wallets. All transactions are secure and encrypted.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-forest mb-3 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: CTA / Newsletter */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-forest via-[#1A3626] to-[#0F2418] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Join the Sustainable Fashion Movement
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Get exclusive deals, styling tips, and be part of a community that cares about our planet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-terracotta/30"
            />
            <button className="bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-dark hover:to-terracotta px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-terracotta/30 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-400">
            Join 10,000+ eco-conscious fashion lovers. No spam, unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBag className="w-8 h-8 text-terracotta" />
                <span className="font-heading text-2xl font-bold">ReThread</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Making fashion sustainable and sustainability fashionable. Join us in creating a better future for our planet.
              </p>
              <div className="flex gap-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-terracotta transition-colors">
                    <span className="sr-only">{social}</span>
                    <Globe className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/explore" className="hover:text-terracotta transition">Explore Items</Link></li>
                <li><Link href="/items/add" className="hover:text-terracotta transition">Sell Items</Link></li>
                <li><Link href="/about" className="hover:text-terracotta transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-terracotta transition">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/faq" className="hover:text-terracotta transition">FAQ</Link></li>
                <li><Link href="/privacy" className="hover:text-terracotta transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-terracotta transition">Terms of Service</Link></li>
                <li><Link href="/help" className="hover:text-terracotta transition">Help Center</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 ReThread. All rights reserved. Made with  for the planet.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Helper component for testimonials
function Star({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
}

// Icons needed
function Droplets({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
}

function Wind({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}