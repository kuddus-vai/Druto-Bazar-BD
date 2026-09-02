/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Flame, Clock, ArrowRight, Zap } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';

export const FlashSale: React.FC = () => {
  const { products } = useStore();

  // Flash sale countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter((p) => p.isFlashSale && p.isActive).slice(0, 4);

  if (flashProducts.length === 0) return null;

  return (
    <section id="flash-sale" className="py-12 bg-gradient-to-b from-amber-500/10 via-amber-50/40 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Flash Sale Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0 animate-bounce">
              <Flame className="w-8 h-8 text-red-600 fill-red-600" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>আজকের মেগা ডিল</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                আজকের অফার — স্টক সীমিত!
              </h2>
              <p className="text-emerald-200 text-xs sm:text-sm mt-1">
                সেরা মূল্যে ১০০% খাঁটি পণ্য অর্ডার করুন এখনই
              </p>
            </div>
          </div>

          {/* Countdown timer clock */}
          <div className="flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10">
            <Clock className="w-5 h-5 text-amber-400 hidden sm:inline" />
            <div className="flex items-center gap-1.5 text-center">
              <div className="bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-700/60 min-w-[48px]">
                <span className="text-lg sm:text-xl font-mono font-bold text-amber-400">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="block text-[9px] text-stone-300">ঘণ্টা</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-700/60 min-w-[48px]">
                <span className="text-lg sm:text-xl font-mono font-bold text-amber-400">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="block text-[9px] text-stone-300">মিনিট</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-700/60 min-w-[48px]">
                <span className="text-lg sm:text-xl font-mono font-bold text-amber-400">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="block text-[9px] text-stone-300">সেকেন্ড</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sale Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} isFlashHighlight />
          ))}
        </div>
      </div>
    </section>
  );
};
