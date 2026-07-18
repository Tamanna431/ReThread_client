'use client';

import { Search, Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    search: string;
    category: string;
    condition: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  totalResults: number;
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  totalResults,
}: FilterSidebarProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold text-forest flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h2>
        <button
          onClick={onClearFilters}
          className="text-sm text-terracotta hover:text-terracotta-dark font-semibold"
        >
          Clear All
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search items..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent text-sm"
        >
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Accessories">Accessories</option>
          <option value="Shoes">Shoes</option>
        </select>
      </div>

      {/* Condition Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Condition
        </label>
        <select
          value={filters.condition}
          onChange={(e) => onFilterChange('condition', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent text-sm"
        >
          <option value="">All Conditions</option>
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            placeholder="Min"
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent text-sm"
          />
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            placeholder="Max"
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent text-sm"
        >
          <option value="createdAt">Newest First</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing <span className="font-bold text-forest">{totalResults}</span> items
        </p>
      </div>
    </div>
  );
}