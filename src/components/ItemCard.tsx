import Link from 'next/link';
import { Calendar, Tag, Star } from 'lucide-react';

interface ItemCardProps {
  item: {
    _id: string;
    title: string;
    shortDesc: string;
    price: number;
    category: string;
    condition: string;
    size: string;
    images: string[];
    rating?: number;
    createdAt: string;
    waterSavedLiters?: number;
  };
}

export default function ItemCard({ item }: ItemCardProps) {
  const defaultImage = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop';
  const imageUrl = item.images?.[0] || defaultImage;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-forest text-white text-xs font-semibold px-3 py-1 rounded-full">
          {item.condition}
        </div>
        {item.waterSavedLiters && (
          <div className="absolute top-3 right-3 bg-terracotta text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <span>💧</span>
            <span>{item.waterSavedLiters}L saved</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <Tag className="w-3 h-3" />
          <span>{item.category}</span>
          <span className="mx-2">•</span>
          <Calendar className="w-3 h-3" />
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-forest mb-2 line-clamp-1">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {item.shortDesc}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-gray-700">
              {item.rating?.toFixed(1) || '4.5'}
            </span>
          </div>
          <span className="text-sm text-gray-500">Size: {item.size}</span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-terracotta">
            ${item.price}
          </span>
          <Link
            href={`/items/${item._id}`}
            className="bg-forest hover:bg-forest-light text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}