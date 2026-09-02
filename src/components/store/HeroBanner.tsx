/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Truck, Award, Sparkles, PhoneCall } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeroBanner: React.FC = () => {
  const { banners, setSelectedCategoryId } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeBanners = banners.filter((b) => b.isActive);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;

  const current = activeBanners[currentSlide];

  return (
    <div className="relative overflow-hidden bg-stone-900 text-white">
      {/* Main Slide Carousel */}
      <div className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] flex items-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={current.imageUrl}
            alt={current.titleBn}
            className="w-full h-full block object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-900/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
          <div className="max-w-2xl">
            {current.badgeBn && (
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4 animate-pulse-subtle">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{current.badgeBn}</span>
              </div>
            )}

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm mb-4">
              {current.titleBn}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed mb-6 sm:mb-8">
              {current.subtitleBn}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#products-section"
                id="hero-cta-btn"
                className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base cursor-pointer"
              >
                {current.ctaTextBn}
              </a>

              <a
                href="tel:01806578737"
                id="hero-call-btn"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-semibold px-5 py-3.5 rounded-xl border border-white/20 transition-all text-sm cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>ফোন করুন: ০১৮০৬-৫৭৮৭৩৭</span>
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        {activeBanners.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 sm:bottom-auto sm:inset-y-0 flex items-center justify-between px-4 pointer-events-none">
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1))
              }
              id="hero-prev-btn"
              className="pointer-events-auto p-2.5 rounded-full bg-black/40 hover:bg-emerald-600 text-white backdrop-blur-sm transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % activeBanners.length)
              }
              id="hero-next-btn"
              className="pointer-events-auto p-2.5 rounded-full bg-black/40 hover:bg-emerald-600 text-white backdrop-blur-sm transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Slide Dots Indicator */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-6 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Trust Feature Bar Under Hero */}
      <div className="bg-emerald-950/90 border-t border-emerald-800/60 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-emerald-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-800/80 rounded-lg text-emerald-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white">১০০% খাঁটি পণ্য</h4>
              <p className="text-[11px] text-emerald-300/80">কাঠের ঘানি ও নিজস্ব তত্ত্বাবধানে প্রস্তুত</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-800/80 rounded-lg text-emerald-300">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white">দ্রুততম ডেলিভারি</h4>
              <p className="text-[11px] text-emerald-300/80">ঢাকা সিটিতে ২৪ ঘণ্টায় হোম ডেলিভারি</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-800/80 rounded-lg text-emerald-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white">ক্যাশ অন ডেলিভারি</h4>
              <p className="text-[11px] text-emerald-300/80">পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-800/80 rounded-lg text-emerald-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white">পাইকারি ও খুচরা</h4>
              <p className="text-[11px] text-emerald-300/80">সুলভ মূল্যে সেরা মানের নিশ্চয়তা</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
