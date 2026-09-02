/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Grid, Truck, ShoppingBag, LayoutDashboard } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartTotalCount,
    setActiveModal,
    setSelectedCategoryId,
  } = useStore();

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => {
          setCurrentView('store');
          setSelectedCategoryId('all');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-1 p-1 text-[11px] font-medium transition-colors ${
          currentView === 'store' ? 'text-emerald-700 font-bold' : 'text-stone-500'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>হোম</span>
      </button>

      <button
        onClick={() => {
          setCurrentView('store');
          const el = document.getElementById('products-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex flex-col items-center gap-1 p-1 text-[11px] font-medium text-stone-500 hover:text-emerald-700"
      >
        <Grid className="w-5 h-5" />
        <span>ক্যাটাগরি</span>
      </button>

      {/* Cart Center Highlight */}
      <button
        onClick={() => setActiveModal('cart')}
        className="relative -top-4 bg-emerald-700 text-white w-13 h-13 rounded-full flex flex-col items-center justify-center shadow-lg shadow-emerald-700/40 border-4 border-white active:scale-95 transition-transform"
      >
        <ShoppingBag className="w-5 h-5" />
        {cartTotalCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-400 text-stone-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-emerald-800">
            {cartTotalCount}
          </span>
        )}
      </button>

      <button
        onClick={() => setActiveModal('order-tracker')}
        className="flex flex-col items-center gap-1 p-1 text-[11px] font-medium text-stone-500 hover:text-emerald-700"
      >
        <Truck className="w-5 h-5" />
        <span>ট্র্যাকিং</span>
      </button>

      <button
        onClick={() => setCurrentView(currentView === 'admin' ? 'store' : 'admin')}
        className={`flex flex-col items-center gap-1 p-1 text-[11px] font-medium transition-colors ${
          currentView === 'admin' ? 'text-emerald-700 font-bold' : 'text-stone-500'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span>অ্যাডমিন</span>
      </button>
    </nav>
  );
};
