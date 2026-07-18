import Link from 'next/link';
import { ArrowRight, ShoppingBag, Heart, Leaf, Recycle, Users, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-terracotta via-white to-forest py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-forest rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-terracotta rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-forest/10 text-forest px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Leaf className="w-4 h-4" />
              <span>Sustainable Fashion Marketplace</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-forest mb-6 leading-tight">
              SUSTAINABLE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-terracotta-dark">
                FASHION
              </span><br />
              MARKET
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Fashion that cares for <span className="text-forest font-semibold">people</span> and the <span className="text-forest font-semibold">planet</span>
            </p>

            {/* Feature Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: <Leaf className="w-6 h-6" />, label: 'Eco-Friendly Materials' },
                { icon: <Recycle className="w-6 h-6" />, label: 'Ethical Production' },
                { icon: <Users className="w-6 h-6" />, label: 'Fair Labor Practices' },
                { icon: <Globe className="w-6 h-6" />, label: 'Lower Environmental Impact' }
              ].map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-terracotta mb-2">{feature.icon}</div>
                  <p className="text-xs text-gray-600 text-center font-medium">{feature.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="/explore"
                className="group bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-dark hover:to-terracotta text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-terracotta/30 flex items-center justify-center gap-3 transform hover:-translate-y-1"
              >
                <ShoppingBag className="w-5 h-5" />
                Explore Items
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/items/add"
                className="group bg-forest hover:bg-forest-light text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                <Heart className="w-5 h-5" />
                Start Selling
              </Link>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="bg-white border-2 border-forest/20 text-forest px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                CHOOSE CONSCIOUS. WEAR CHANGE.
              </div>
              <div className="bg-forest text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2">
                SUSTAINABLE IS STYLISH
              </div>
            </div>
          </div>

          {/* Right: Image/Visual */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative bg-gradient-to-br from-forest/10 to-terracotta/10 rounded-3xl p-8 md:p-12">
              {/* Clothing Rack Visual */}
              <div className="relative">
                {/* Hanging Clothes */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-16 h-24 md:w-20 md:h-32 rounded-t-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                          style={{
                            backgroundColor: ['#1A3626', '#E07A5F', '#F9F6F0', '#2D5A3D', '#F09B85'][i - 1],
                            marginLeft: i > 1 ? '-1rem' : '0'
                          }}
                        ></div>
                      ))}
                    </div>
                    {/* Hanger */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-8 border-4 border-gray-700 rounded-t-full"></div>
                  </div>
                </div>

                {/* Folded Clothes Stack */}
                <div className="flex justify-center mb-8">
                  <div className="space-y-2">
                    {[
                      { color: 'bg-forest', width: 'w-48' },
                      { color: 'bg-oat', width: 'w-44' },
                      { color: 'bg-terracotta/30', width: 'w-40' },
                      { color: 'bg-forest-light', width: 'w-36' }
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`${item.width} h-12 ${item.color} rounded-lg shadow-md mx-auto`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Tote Bag */}
                <div className="absolute top-20 right-4 md:right-8 bg-white p-4 rounded-lg shadow-xl border-2 border-forest/20 transform rotate-6 hover:rotate-0 transition-transform">
                  <Leaf className="w-8 h-8 text-forest mx-auto mb-2" />
                  <p className="text-xs font-bold text-forest text-center">SLOW FASHION<br />BETTER FUTURE</p>
                </div>

                {/* Tags */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                  <p className="text-xs font-semibold text-forest">ORGANIC<br />COTTON</p>
                </div>
                <div className="absolute bottom-4 right-4 bg-forest p-3 rounded-lg shadow-lg">
                  <p className="text-xs font-bold text-white">SUSTAINABLE<br />IS STYLISH</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-terracotta/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-forest/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Leaf className="w-8 h-8" />, value: '2,500L', label: 'Water Saved Per Item', color: 'from-green-500 to-emerald-600' },
            { icon: <ShoppingBag className="w-8 h-8" />, value: '5,000+', label: 'Items Listed', color: 'from-terracotta to-terracotta-dark' },
            { icon: <Heart className="w-8 h-8" />, value: '10,000+', label: 'Happy Users', color: 'from-blue-500 to-blue-600' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all text-center group">
              <div className={`bg-gradient-to-br ${stat.color} w-16 h-16 rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-forest mb-2">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}