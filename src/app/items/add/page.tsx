'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { itemAPI, aiAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { Sparkles, Upload, AlertCircle, CheckCircle, Loader2, Tag } from 'lucide-react';

export default function AddItemPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // New states for Agentic AI features
  const [aiReasoning, setAiReasoning] = useState('');
  const [aiTags, setAiTags] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    fullDesc: '',
    price: '',
    category: 'Men',
    condition: 'Good',
    size: '',
    images: '',
  });

  // Check if user is logged in (Protected Route)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleAutoFill = async () => {
    if (!formData.title) {
      setError('Please enter an item title first');
      return;
    }

    setAiLoading(true);
    setError('');
    setAiReasoning('');
    setAiTags([]);

    try {
      // Calling the new Agentic AI endpoint
      const response = await aiAPI.analyzeListing({ 
        title: formData.title, 
        shortDesc: formData.shortDesc || 'Vintage fashion item' 
      });
      
      const data = response.data.data;

      // Update form with AI suggestions
      setFormData(prev => ({
        ...prev,
        category: data.category,
        condition: data.condition,
        price: data.price.toString(),
      }));

      // Set AI reasoning and tags for display
      setAiReasoning(data.pricingReasoning);
      setAiTags(data.aiTags);
      
      setSuccess('AI Appraiser analyzed your item! Check the reasoning below.');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'AI analysis failed. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await itemAPI.create({
        ...formData,
        price: Number(formData.price),
        images: formData.images ? [formData.images] : [],
        aiTags: aiTags, // Save the AI generated tags to database
      });

      setSuccess('Item added successfully! Redirecting...');
      setTimeout(() => {
        router.push('/items/manage');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-oat">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-forest mb-2">
            Add New Item
          </h1>
          <p className="text-gray-600">
            List your pre-loved fashion item and let our AI help you price it perfectly.
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6">
          
          {/* Title with AI Button */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Item Title *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition"
                placeholder="e.g., Vintage Levi's 501 Jeans"
              />
              <button
                type="button"
                onClick={handleAutoFill}
                disabled={aiLoading}
                className="bg-gradient-to-r from-terracotta to-terracotta-dark text-white px-6 py-3 rounded-lg font-semibold transition hover:shadow-lg disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
              >
                {aiLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                {aiLoading ? 'Analyzing...' : 'AI Appraise'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter a title and click "AI Appraise" to get smart pricing and auto-classification.
            </p>
          </div>

          {/* AI Reasoning & Tags Display (Agentic Feature UI) */}
          {aiReasoning && (
            <div className="bg-terracotta/10 border border-terracotta/30 rounded-lg p-5 animate-in fade-in slide-in-from-top-2 duration-300">
              <h4 className="font-heading font-semibold text-terracotta flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5" /> AI Appraiser Analysis
              </h4>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Pricing Reasoning:</p>
                <p className="text-sm text-gray-600 italic bg-white p-3 rounded border border-terracotta/20">
                  "{aiReasoning}"
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Suggested AI Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {aiTags.map((tag, idx) => (
                    <span key={idx} className="bg-forest text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                💡 Tip: You can still manually edit the price, category, and description above before submitting.
              </p>
            </div>
          )}

          {/* Category & Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Accessories">Accessories</option>
                <option value="Shoes">Shoes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Condition *
              </label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition"
              >
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          {/* Size & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Size *
              </label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition"
                placeholder="e.g., M, 32x32, 9"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (USD) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition"
                placeholder="45"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Short Description *
            </label>
            <input
              type="text"
              value={formData.shortDesc}
              onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
              required
              maxLength={200}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition"
              placeholder="Brief description (max 200 characters)"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Description *
            </label>
            <textarea
              value={formData.fullDesc}
              onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition"
              placeholder="Detailed description of the item, including any flaws or unique features..."
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition"
              placeholder="https://example.com/image.jpg"
            />
            {formData.images && (
              <div className="mt-3">
                <img
                  src={formData.images}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-terracotta/30 shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest hover:bg-forest-light text-white py-4 rounded-lg font-semibold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Adding Item...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Add Item to Marketplace
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}