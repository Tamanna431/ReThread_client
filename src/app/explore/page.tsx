'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { itemAPI } from '@/lib/api';
import ItemCard from '@/components/ItemCard';
import SkeletonCard from '@/components/SkeletonCard';
import FilterSidebar from '@/components/FilterSidebar';
import Navbar from '@/components/Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ExplorePage() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt',
    page: 1,
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      condition: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      page: 1,
    });
  };

  // Fetch items with filters
  const { data, isLoading, error } = useQuery({
    queryKey: ['items', filters],
    queryFn: () =>
      itemAPI.getAll({
        search: filters.search || undefined,
        category: filters.category || undefined,
        condition: filters.condition || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        sortBy: filters.sortBy,
        page: filters.page,
        limit: 12,
      }),
  });

  const items = data?.data?.items || [];
  const pagination = data?.data?.pagination || { page: 1, pages: 1, total: 0 };

  return (
    <div className="min-h-screen bg-oat">
      <Navbar />

      {/* Header */}
      <div className="bg-forest text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Explore Sustainable Fashion
          </h1>
          <p className="text-xl text-gray-300">
            Discover pre-loved items that are good for you and the planet
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              totalResults={pagination.total}
            />
          </div>

          {/* Items Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
                <p className="font-semibold">Error loading items</p>
                <p className="text-sm mt-1">Please try again later</p>
              </div>
            ) : items.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">No items found matching your criteria</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-terracotta hover:bg-terracotta-dark text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item: any) => (
                    <ItemCard key={item._id} item={item} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-4">
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
                      disabled={filters.page === 1}
                      className="flex items-center gap-2 bg-white border border-gray-300 hover:border-terracotta px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                    </button>

                    <div className="flex gap-2">
                      {Array.from({ length: pagination.pages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setFilters((prev) => ({ ...prev, page: i + 1 }))}
                          className={`w-10 h-10 rounded-lg font-semibold transition ${
                            filters.page === i + 1
                              ? 'bg-terracotta text-white'
                              : 'bg-white border border-gray-300 hover:border-terracotta text-gray-700'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
                      disabled={filters.page === pagination.pages}
                      className="flex items-center gap-2 bg-white border border-gray-300 hover:border-terracotta px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}