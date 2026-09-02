/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Heart,
  Truck,
  SlidersHorizontal,
  X,
  Phone,
  LayoutDashboard,
  Store,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Navbar: React.FC = () => {
  const {
    cartTotalCount,
    wishlist,
    searchQuery,
    setSearchQuery,
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    currentView,
    setCurrentView,
    setActiveModal,
    products,
    setSelectedProduct,
  } = useStore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter autocomplete suggestions based on query
  const searchSuggestions = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.isActive &&
            (p.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setCurrentView('store');
                setSelectedCategoryId('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              id="brand-logo-btn"
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                  দ্রুত বাজার <span className="text-emerald-600">বিডি</span>
                </span>
                <span className="text-[11px] sm:text-xs text-stone-700 font-medium tracking-wide mt-1">
                  Drutho Bazar BD • আপনার প্রয়োজন আমরা বুঝি
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar with live autocomplete */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl relative">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="খাঁটি সরিষার তেল, মধু, গাওয়া ঘি, চাল, মসলা খুঁজুন..."
                id="main-search-input"
                className="w-full bg-stone-100/90 text-stone-900 placeholder:text-stone-400 pl-11 pr-10 py-2.5 rounded-full border border-stone-300 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2 bg-stone-50 border-b border-stone-100 flex items-center justify-between text-xs text-stone-500 px-3">
                  <span>অনুসন্ধানের ফলাফল ({searchSuggestions.length})</span>
                  <span className="text-emerald-600 font-medium">ক্লিক করে বিস্তারিত দেখুন</span>
                </div>
                <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                  {searchSuggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product);
                        setActiveModal('product-detail');
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left p-3 flex items-center gap-3 hover:bg-emerald-50/60 transition-colors group cursor-pointer"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.nameBn}
                        className="w-12 h-12 object-cover rounded-lg border border-stone-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-stone-800 group-hover:text-emerald-700 truncate">
                          {product.nameBn}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-emerald-700">
                            ৳{product.salePrice ?? product.price}
                          </span>
                          {product.salePrice && (
                            <span className="text-[11px] text-stone-400 line-through">
                              ৳{product.price}
                            </span>
                          )}
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                            {product.unit}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Switch: Storefront <-> Admin */}
            <button
              onClick={() => {
                const nextView = currentView === 'admin' ? 'store' : 'admin';
                setCurrentView(nextView);
              }}
              id="btn-toggle-admin-view"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
              }`}
              title="অ্যাডমিন কন্ট্রোল প্যানেল"
            >
              {currentView === 'admin' ? (
                <>
                  <Store className="w-3.5 h-3.5" />
                  <span>স্টোরফ্রন্ট</span>
                </>
              ) : (
                <>
                  <LayoutDashboard className="w-3.5 h-3.5 text-emerald-700" />
                  <span>অ্যাডমিন প্যানেল</span>
                </>
              )}
            </button>

            {/* Order Tracking Button */}
            <button
              onClick={() => setActiveModal('order-tracker')}
              id="btn-nav-order-tracker"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 border border-stone-200 transition-all cursor-pointer"
              title="আপনার অর্ডারের বর্তমান অবস্থা দেখুন"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden lg:inline">অর্ডার ট্র্যাকিং</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                setSelectedCategoryId('all');
                setCurrentView('store');
                // Scroll to products and highlight
              }}
              id="btn-nav-wishlist"
              className="relative p-2.5 rounded-xl hover:bg-stone-100 text-stone-600 transition-colors"
              title="পছন্দের পণ্যের তালিকা"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setActiveModal('cart')}
              id="btn-nav-cart"
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 sm:px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-emerald-700/20 transition-all transform active:scale-95 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-stone-900 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-emerald-700">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold">কার্ট</span>
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্য খুঁজুন (যেমন: তেল, মধু, ঘি)..."
              id="mobile-search-input"
              className="w-full bg-stone-100 text-stone-900 placeholder:text-stone-400 pl-10 pr-9 py-2 rounded-xl border border-stone-200 text-xs focus:bg-white focus:outline-none focus:border-emerald-600"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Strip on Storefront View */}
        {currentView === 'store' && (
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 border-t border-stone-100 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategoryId('all')}
              id="nav-cat-all"
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategoryId === 'all'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              সকল পণ্য
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                id={`nav-cat-${cat.slug}`}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategoryId === cat.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                {cat.nameBn}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
