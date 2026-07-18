'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { 
  Eye, Trash2, Edit, Package, AlertCircle, 
  CheckCircle, Loader2, Search, Filter 
} from 'lucide-react';
import Link from 'next/link';

export default function ManageItemsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // Fetch seller's items
  const { data, isLoading, error } = useQuery({
    queryKey: ['sellerItems'],
    queryFn: () => itemAPI.getSellerItems(),
  });

  const items = data?.data?.items || [];

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (itemId: string) => itemAPI.delete(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sellerItems'] });
      setDeleteConfirm(null);
    },
    onError: (err: any) => {
      console.error('Delete error:', err);
    },
  });

  // Filter items
  const filteredItems = items.filter((item: any) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? item.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (itemId: string) => {
    if (deleteConfirm === itemId) {
      deleteMutation.mutate(itemId);
    } else {
      setDeleteConfirm(itemId);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-oat">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-forest mb-2">
            Manage Your Items
          </h1>
          <p className="text-gray-600">
            View, edit, and manage your listed fashion items
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-forest to-forest-light p-3 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-2xl font-bold text-forest">{items.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-terracotta to-terracotta-dark p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Listings</p>
                <p className="text-2xl font-bold text-forest">{items.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-2xl font-bold text-forest">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your items..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Categories</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Accessories">Accessories</option>
                <option value="Shoes">Shoes</option>
              </select>
            </div>
            <Link
              href="/items/add"
              className="bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-dark hover:to-terracotta text-white px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Edit className="w-5 h-5" />
              Add New Item
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Loader2 className="w-12 h-12 text-terracotta animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading your items...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>Failed to load items. Please try again.</span>
          </div>
        )}

        {/* Items Grid */}
        {!isLoading && !error && (
          <>
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-forest mb-2">
                  {items.length === 0 ? 'No Items Yet' : 'No Items Found'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {items.length === 0 
                    ? 'Start by adding your first pre-loved fashion item!' 
                    : 'Try adjusting your search or filters.'}
                </p>
                {items.length === 0 && (
                  <Link
                    href="/items/add"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-terracotta to-terracotta-dark text-white px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
                  >
                    <Edit className="w-5 h-5" />
                    Add Your First Item
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item: any) => (
                  <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={item.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-forest text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {item.condition}
                      </div>
                      <div className="absolute top-3 right-3 bg-terracotta text-white text-xs font-semibold px-3 py-1 rounded-full">
                        ${item.price}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span className="bg-oat px-2 py-1 rounded">{item.category}</span>
                        <span>•</span>
                        <span>Size: {item.size}</span>
                      </div>

                      <h3 className="font-heading text-lg font-bold text-forest mb-2 line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.shortDesc}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t border-gray-100">
                        <Link
                          href={`/items/${item._id}`}
                          className="flex-1 bg-forest hover:bg-forest-light text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
                            deleteConfirm === item._id
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                          {deleteConfirm === item._id ? 'Confirm?' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}