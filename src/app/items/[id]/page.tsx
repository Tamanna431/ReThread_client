'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { itemAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';
import ImageGallery from '@/components/ImageGallery';
import ReviewSection from '@/components/ReviewSection';
import AIRecommendations from '@/components/AIRecommendations'; // ✅ Agentic AI Feature
import SkeletonCard from '@/components/SkeletonCard';
import {
  Leaf, Droplets, Wind, Tag, Ruler, Calendar, Star, Heart, 
  Share2, ShoppingCart, MapPin, CheckCircle, ArrowLeft, Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function ItemDetailsPage() {
  const params = useParams();
  const itemId = params.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ['item', itemId],
    queryFn: () => itemAPI.getById(itemId),
    enabled: !!itemId,
  });

  const item = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-oat">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-oat flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h2 className="font-heading text-4xl font-bold text-forest mb-4">Item Not Found</h2>
            <p className="text-gray-600 mb-8">The item you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-dark hover:to-terracotta text-white px-8 py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Explore
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-oat">
      <Navbar />

      {/* Breadcrumb - Premium Look */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-terracotta transition font-medium">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/explore" className="hover:text-terracotta transition font-medium">Explore</Link>
            <span className="text-gray-400">/</span>
            <Link href={`/explore?category=${item.category}`} className="hover:text-terracotta transition font-medium">
              {item.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-forest font-bold truncate">{item.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <ImageGallery images={item.images || []} title={item.title} />
          </div>

          {/* Right: Item Details */}
          <div className="space-y-8">
            {/* Header & Badges */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-gradient-to-r from-forest to-forest-light text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                  {item.condition}
                </span>
                <span className="bg-terracotta/10 text-terracotta text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-terracotta/20">
                  <Tag className="w-3.5 h-3.5" />
                  {item.category}
                </span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4 leading-tight">
                {item.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-forest">{item.rating?.toFixed(1) || '4.8'}</span>
                  <span className="text-gray-400">({item.reviewCount || 0} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-terracotta" />
                  <span>Listed {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Price Block - Premium Gradient Border */}
            <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-terracotta via-forest to-terracotta"></div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold bg-gradient-to-r from-terracotta to-terracotta-dark bg-clip-text text-transparent">
                  ${item.price}
                </span>
                <span className="text-xl text-gray-400 line-through decoration-gray-400/50">
                  ${Math.floor(item.price * 1.4)}
                </span>
                <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-lg border border-green-200">
                  Save {Math.floor(((item.price * 1.4 - item.price) / (item.price * 1.4)) * 100)}%
                </span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-gray-700 text-lg leading-relaxed font-medium">
              {item.shortDesc}
            </p>

            {/* Key Information Grid */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="font-heading text-lg font-bold text-forest mb-5 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-terracotta" />
                Key Information
              </h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-oat/50 hover:bg-oat transition">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-terracotta"><Ruler className="w-5 h-5" /></div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Size</p>
                    <p className="font-bold text-forest">{item.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-oat/50 hover:bg-oat transition">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-terracotta"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Location</p>
                    <p className="font-bold text-forest">Dhaka, BD</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 🌟 Eco-Impact Card (Stunning Gradient) */}
            <div className="relative bg-gradient-to-br from-forest via-[#1A3626] to-[#0F2418] rounded-2xl shadow-xl p-6 text-white overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/20 rounded-full blur-3xl group-hover:bg-terracotta/30 transition duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                    <Leaf className="w-6 h-6 text-terracotta" />
                  </div>
                  <h3 className="font-heading text-xl font-bold">Your Eco-Impact</h3>
                </div>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                  By choosing this pre-loved item, you're actively reducing fashion waste and making a positive impact on our planet!
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/15 transition">
                    <Droplets className="w-8 h-8 text-terracotta mb-3" />
                    <p className="text-3xl font-bold">{item.waterSavedLiters || 1500}L</p>
                    <p className="text-xs text-gray-300 font-medium uppercase tracking-wider mt-1">Water Saved</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/15 transition">
                    <Wind className="w-8 h-8 text-terracotta mb-3" />
                    <p className="text-3xl font-bold">{item.co2SavedGrams || 3000}g</p>
                    <p className="text-xs text-gray-300 font-medium uppercase tracking-wider mt-1">CO₂ Reduced</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex items-center gap-5">
              <div className="w-14 h-14 bg-gradient-to-br from-terracotta to-terracotta-dark rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {item.seller?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Sold by</p>
                <p className="font-bold text-forest text-lg">{item.seller?.name || 'Unknown Seller'}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" /> Verified Seller
                </p>
              </div>
            </div>

            {/* Action Buttons - Premium Gradients */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex-1 bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-dark hover:to-terracotta text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-terracotta/30 flex items-center justify-center gap-3 transform hover:-translate-y-0.5">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="bg-white border-2 border-forest text-forest hover:bg-forest hover:text-white px-6 py-4 rounded-xl font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Wishlist
              </button>
              <button className="bg-white border-2 border-gray-200 text-gray-600 hover:border-terracotta hover:text-terracotta px-6 py-4 rounded-xl font-bold transition-all shadow-sm hover:shadow-md">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="mt-16 bg-white rounded-2xl shadow-md p-8 md:p-10 border border-gray-100">
          <h2 className="font-heading text-2xl font-bold text-forest mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-terracotta rounded-full"></span>
            Full Description
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
            {item.fullDesc}
          </p>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <ReviewSection
            reviews={[]}
            averageRating={item.rating || 4.8}
            totalReviews={item.reviewCount || 0}
            itemId={itemId}
          />
        </div>

        {/* 🤖 AI Recommendations (Agentic Feature) */}
        <div className="mt-16">
          <AIRecommendations currentItemId={itemId} />
        </div>
      </div>
    </div>
  );
}