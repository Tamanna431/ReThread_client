'use client';

import { useQuery } from '@tanstack/react-query';
import { itemAPI } from '@/lib/api';
import ItemCard from './ItemCard';
import SkeletonCard from './SkeletonCard';

interface RelatedItemsProps {
  currentItemId: string;
  category: string;
}

export default function RelatedItems({ currentItemId, category }: RelatedItemsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['relatedItems', category],
    queryFn: () => itemAPI.getAll({ category, limit: 4 }),
  });

  const relatedItems = data?.data?.items?.filter((item: any) => item._id !== currentItemId) || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="font-heading text-2xl font-bold text-forest mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (relatedItems.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h2 className="font-heading text-2xl font-bold text-forest mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedItems.map((item: any) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}