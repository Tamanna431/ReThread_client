'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const defaultImage = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop';
  const imageList = images.length > 0 ? images : [defaultImage];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group">
        <img
          src={imageList[selectedIndex]}
          alt={`${title} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Navigation Arrows */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
            >
              <ChevronLeft className="w-5 h-5 text-forest" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
            >
              <ChevronRight className="w-5 h-5 text-forest" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
          {selectedIndex + 1} / {imageList.length}
        </div>
      </div>

      {/* Thumbnails */}
      {imageList.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {imageList.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                selectedIndex === index
                  ? 'border-terracotta ring-2 ring-terracotta/30'
                  : 'border-gray-200 hover:border-forest'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}