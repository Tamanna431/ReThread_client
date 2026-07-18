'use client';

import { useQuery } from '@tanstack/react-query';
import { aiAPI } from '@/lib/api';
import ItemCard from './ItemCard';
import SkeletonCard from './SkeletonCard';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIRecommendationsProps {
  currentItemId: string;
}

export default function AIRecommendations({ currentItemId }: AIRecommendationsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['ai-recommendations', currentItemId],
    queryFn: () => aiAPI.getRecommendations(currentItemId),
    enabled: !!currentItemId,
  });

  const recommendations = data?.data?.recommendations || [];

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-oat to-white rounded-2xl shadow-lg p-8 md:p-10 border border-terracotta/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-terracotta/10 p-2 rounded-lg animate-pulse">
            <Sparkles className="w-6 h-6 text-terracotta" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-forest">
            AI Stylist Recommendations
          </h2>
        </div>
        <p className="text-gray-600 mb-8 text-sm">
          Our AI is analyzing your style preferences and curating perfect matches...
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (error || recommendations.length === 0) {
    return null; // Don't show section if no recommendations
  }

  return (
    <div className="bg-gradient-to-br from-oat via-white to-oat rounded-2xl shadow-xl p-8 md:p-10 border border-terracotta/20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-terracotta/5 to-forest/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-gradient-to-r from-terracotta to-terracotta-dark p-2.5 rounded-xl shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-forest">
              AI Stylist Picks For You
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Handpicked with intelligent style matching
            </p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-8 text-base leading-relaxed max-w-3xl">
          Our AI analyzed your current selection and handpicked these items with specific styling reasons. 
          Each recommendation is based on compatibility, style coherence, and sustainable fashion principles.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recommendations.map((item: any, index: number) => (
            <div 
              key={item._id} 
              className="group relative"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <ItemCard item={item} />
              
              {/* AI Reasoning Badge */}
              <div className="mt-4 bg-gradient-to-r from-terracotta/10 to-forest/10 border-l-4 border-terracotta p-4 rounded-r-xl backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="bg-terracotta p-1.5 rounded-full flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-terracotta uppercase tracking-wide mb-1">
                      Why this matches:
                    </p>
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      "{item.aiReasoning || 'Perfect complement to your style!'}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-3">
            Want more personalized recommendations?
          </p>
          <button className="bg-white border-2 border-forest text-forest hover:bg-forest hover:text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
            Explore More Items
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}