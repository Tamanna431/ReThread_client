'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft, ShoppingBag, Heart, Leaf } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-oat flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-terracotta/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-forest/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-3xl"></div>

      {/* Floating Icons */}
      <div className="absolute top-32 left-[15%] animate-bounce" style={{ animationDuration: '3s' }}>
        <ShoppingBag className="w-8 h-8 text-terracotta/30" />
      </div>
      <div className="absolute top-48 right-[20%] animate-bounce" style={{ animationDuration: '4s' }}>
        <Heart className="w-6 h-6 text-forest/30" />
      </div>
      <div className="absolute bottom-32 left-[25%] animate-bounce" style={{ animationDuration: '3.5s' }}>
        <Leaf className="w-7 h-7 text-terracotta/30" />
      </div>
      <div className="absolute bottom-48 right-[15%] animate-bounce" style={{ animationDuration: '4.5s' }}>
        <Search className="w-6 h-6 text-forest/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* 404 Number with Gradient */}
        <div className="relative mb-8">
          <h1 className="font-heading text-[12rem] md:text-[16rem] font-bold leading-none bg-gradient-to-br from-forest via-forest-light to-terracotta bg-clip-text text-transparent select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-24 h-24 md:w-32 md:h-32 text-terracotta/20" />
          </div>
        </div>

        {/* Message */}
        <div className="mb-10">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-forest mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            Looks like this page has been lost in the fashion world. 
            Don't worry, there are plenty of amazing items waiting for you!
          </p>
        </div>

        {/* Fun Fact */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-10 border border-terracotta/20 shadow-lg max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="w-5 h-5 text-terracotta" />
            <span className="font-semibold text-forest">Sustainable Tip</span>
          </div>
          <p className="text-sm text-gray-600 italic">
            "While you're here, remember that buying one pre-loved item saves approximately 2,500 liters of water!"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group bg-gradient-to-r from-forest to-forest-light hover:from-forest-light hover:to-forest text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-forest/30 flex items-center gap-3 transform hover:-translate-y-1"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Back to Home
          </Link>

          <Link
            href="/explore"
            className="group bg-white border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-terracotta/30 flex items-center gap-3 transform hover:-translate-y-1"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Explore Items
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group bg-oat hover:bg-gray-200 text-forest px-6 py-4 rounded-xl font-semibold transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Men\'s Fashion', href: '/explore?category=Men' },
              { label: 'Women\'s Fashion', href: '/explore?category=Women' },
              { label: 'Accessories', href: '/explore?category=Accessories' },
              { label: 'Shoes', href: '/explore?category=Shoes' }
            ].map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-sm text-forest hover:text-terracotta font-medium transition-colors border-b border-transparent hover:border-terracotta pb-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-xs text-gray-400">
          Error Code: 404 • Page Not Found • ReThread 2026
        </p>
      </div>
    </div>
  );
}