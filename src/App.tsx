/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { WhatsAppButton } from './components/layout/WhatsAppButton';
import { ToastContainer } from './components/layout/ToastContainer';
import { HeroBanner } from './components/store/HeroBanner';
import { CategoryGrid } from './components/store/CategoryGrid';
import { FlashSale } from './components/store/FlashSale';
import { ProductGrid } from './components/store/ProductGrid';
import { PromoCollectionBanner } from './components/store/PromoCollectionBanner';
import { WhyChooseUs } from './components/store/WhyChooseUs';
import { CustomerReviews } from './components/store/CustomerReviews';
import { ProductDetailModal } from './components/store/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderSuccessModal } from './components/checkout/OrderSuccessModal';
import { OrderTracker } from './components/account/OrderTracker';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { TestRunnerModal } from './components/testing/TestRunnerModal';

const MainLayout: React.FC = () => {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col antialiased selection:bg-emerald-200 selection:text-emerald-950 font-sans">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Primary Sticky Navbar */}
      <Navbar />

      {/* Main Content Area based on current view */}
      <main className="flex-1">
        {currentView === 'store' ? (
          <>
            {/* Carousel Hero with Bengali Marketing Badges */}
            <HeroBanner />

            {/* Visual Category Navigation Grid */}
            <CategoryGrid />

            {/* Live Flash Sale with Countdown Timer */}
            <FlashSale />

            {/* Primary Product Catalog with Dynamic Filters */}
            <ProductGrid />

            {/* Rich Editorial Promo Collection Banners */}
            <PromoCollectionBanner />

            {/* Authenticity & Service Commitments */}
            <div id="why-us">
              <WhyChooseUs />
            </div>

            {/* Real Verified Customer Reviews & Feedback Form */}
            <CustomerReviews />
          </>
        ) : (
          /* Full Admin Control Hub */
          <AdminDashboard />
        )}
      </main>

      {/* Comprehensive Company Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav />

      {/* Floating Instant WhatsApp & Call Button */}
      <WhatsAppButton />

      {/* Floating Notification Toasts */}
      <ToastContainer />

      {/* Interactive Modal Layers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrderTracker />
      <TestRunnerModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
