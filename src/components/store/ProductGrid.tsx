/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { filterProducts } from '../../services/search.service';
import { SlidersHorizontal, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    products,
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  } = useStore();

  const currentCategory = categories.find((c) => c.id === selectedCategoryId);

  const filteredProducts = filterProducts(products, {
    searchQuery,
    categoryId: selectedCategoryId,
    sortBy,
  });

  return (
    <section id="products-section" className="py-12 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>আমাদের পণ্য সম্ভার</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {searchQuery
                ? `"${searchQuery}" এর অনুসন্ধানের ফলাফল`
                : currentCategory
                ? currentCategory.nameBn
                : 'সকল প্রিমিয়াম পণ্য'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {filteredProducts.length} টি পণ্য পাওয়া গেছে
            </p>
          </div>

          {/* Sort Controls & Clear Search */}
          <div className="flex items-center gap-3 flex-wrap">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl font-semibold border border-amber-300 hover:bg-amber-200 transition-colors"
              >
                <span>সার্চ মুছুন: "{searchQuery}"</span>
                <span className="font-bold">✕</span>
              </button>
            )}

            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <span className="text-xs font-semibold text-stone-600">বাছাই:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                id="sort-by-select"
                className="text-xs font-bold text-stone-800 bg-transparent focus:outline-none cursor-pointer pr-2"
              >
                <option value="featured">জনপ্রিয় / ফিচার্ড</option>
                <option value="price-asc">দাম: কম থেকে বেশি</option>
                <option value="price-desc">দাম: বেশি থেকে কম</option>
                <option value="rating">সেরা রেটিং</option>
                <option value="newest">নতুন সংযোজন</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm mt-8 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-800">কোনো পণ্য পাওয়া যায়নি</h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-2 mb-6">
              আপনার অনুসন্ধানের সাথে মিলে এমন কোনো পণ্য খুঁজে পাওয়া যায়নি। অনুগ্রহ করে অন্য নাম দিয়ে খুঁজুন।
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryId('all');
              }}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>সকল পণ্য দেখুন</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
