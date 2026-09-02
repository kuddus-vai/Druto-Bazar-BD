/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Droplets, Sparkles, UtensilsCrossed, Nut, Coffee, HeartPulse, Cookie, Layers } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Droplets: <Droplets className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5" />,
  Nut: <Nut className="w-5 h-5" />,
  Coffee: <Coffee className="w-5 h-5" />,
  HeartPulse: <HeartPulse className="w-5 h-5" />,
  Cookie: <Cookie className="w-5 h-5" />,
};

export const CategoryGrid: React.FC = () => {
  const { categories, products, selectedCategoryId, setSelectedCategoryId } = useStore();

  const getProductCount = (catId: string) => {
    return products.filter((p) => p.categoryId === catId && p.isActive).length;
  };

  return (
    <section className="py-10 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <Layers className="w-4 h-4" />
              <span>জনপ্রিয় ক্যাটাগরি সমূহ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              পছন্দের পণ্যটি সহজে খুঁজে নিন
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryId('all');
              const el = document.getElementById('products-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            id="btn-all-categories"
            className="mt-3 sm:mt-0 text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            সব ক্যাটাগরি দেখুন &rarr;
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            const count = getProductCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                id={`cat-card-${cat.slug}`}
                className={`group relative flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-stone-50/80 hover:bg-emerald-50/40 border-stone-200 hover:border-emerald-300'
                }`}
              >
                {/* Category Thumbnail */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden mb-3 border border-stone-200/80 shadow-sm relative group-hover:scale-105 transition-transform">
                  <img
                    src={cat.imageUrl}
                    alt={cat.nameBn}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Category Title & Badge */}
                <h3 className="font-bold text-xs sm:text-sm text-stone-800 group-hover:text-emerald-800 leading-snug line-clamp-2">
                  {cat.nameBn}
                </h3>
                <span className="text-[11px] text-stone-500 mt-1 font-medium">
                  {count} টি পণ্য
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
