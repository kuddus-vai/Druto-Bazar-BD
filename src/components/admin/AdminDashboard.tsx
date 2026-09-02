/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  TrendingUp,
  Boxes,
  Tag,
  Image as ImageIcon,
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Clock,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Search,
  CheckCircle2,
  DollarSign,
  ArrowUpRight,
  Eye,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, Order, OrderStatus, PaymentStatus, Coupon, Banner, Review } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const {
    products,
    orders,
    categories,
    coupons,
    banners,
    reviews,
    inventoryMovements,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updatePaymentStatus,
    addCoupon,
    toggleCouponStatus,
    addBanner,
    updateBanner,
    deleteBanner,
    toggleReviewApproval,
    addStockMovement,
    resetToDefaultData,
    setCurrentView,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'inventory' | 'coupons' | 'banners' | 'reviews'>('overview');

  // Product Form Modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    nameBn: '',
    nameEn: '',
    slug: '',
    categoryId: categories[0]?.id || 'cat-oil-ghee',
    brand: 'দ্রুত বাজার প্রিমিয়াম',
    price: 300,
    salePrice: 280,
    unit: '১ কেজি',
    stockQuantity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    descriptionBn: '',
    purityGuarantee: '১০০% খাঁটি পণ্যের নিশ্চয়তা',
    origin: 'বাংলাদেশ',
    isFlashSale: false,
    isFeatured: true,
  });

  // Stock restock modal state
  const [stockModalProd, setStockModalProd] = useState<Product | null>(null);
  const [stockQtyInput, setStockQtyInput] = useState(20);
  const [stockNoteInput, setStockNoteInput] = useState('নিয়মিত রিস্টক');
  const [stockType, setStockType] = useState<'restock' | 'adjustment' | 'damage'>('restock');

  // Coupon form state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(10);
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponMinOrder, setNewCouponMinOrder] = useState(1000);

  // High-level Metrics Calculation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== OrderStatus.CANCELLED ? o.total : 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === OrderStatus.PENDING).length;
  const totalProductsCount = products.length;
  const lowStockProducts = products.filter((p) => p.stockQuantity < 15);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'test@gmail.com' && loginPassword === '12345678') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      showToast('Admin logged in successfully!', 'success');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    showToast('Logged out successfully.', 'info');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] bg-stone-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-bengali">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-emerald-600" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-black text-stone-900">
            এডমিন প্যানেল
          </h2>
          <p className="mt-2 text-center text-sm text-stone-600">
            Please enter your admin credentials
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl shadow-stone-200/50 sm:rounded-2xl sm:px-10 border border-stone-100">
            <form className="space-y-6" onSubmit={handleLogin}>
              {loginError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {loginError}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-bold text-stone-700">Email Address</label>
                <div className="mt-1">
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm placeholder-stone-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700">Password</label>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm placeholder-stone-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                 <button
                   type="button"
                   onClick={() => setCurrentView('store')}
                   className="text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors"
                 >
                   &larr; Back to Store
                 </button>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      nameBn: prod.nameBn,
      nameEn: prod.nameEn,
      slug: prod.slug,
      categoryId: prod.categoryId,
      brand: prod.brand,
      price: prod.price,
      salePrice: prod.salePrice || prod.price,
      unit: prod.unit,
      stockQuantity: prod.stockQuantity,
      imageUrl: prod.imageUrl,
      descriptionBn: prod.descriptionBn,
      purityGuarantee: prod.purityGuarantee || '১০০% খাঁটি পণ্যের নিশ্চয়তা',
      origin: prod.origin || 'বাংলাদেশ',
      isFlashSale: !!prod.isFlashSale,
      isFeatured: !!prod.isFeatured,
    });
    setIsAddingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.nameBn.trim()) {
      showToast('পণ্যের নাম আবশ্যক', 'error');
      return;
    }

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...productForm,
        salePrice: productForm.salePrice < productForm.price ? productForm.salePrice : undefined,
      });
    } else {
      addProduct({
        ...productForm,
        salePrice: productForm.salePrice < productForm.price ? productForm.salePrice : undefined,
        rating: 5.0,
        reviewCount: 0,
        isActive: true,
      });
    }

    setIsAddingProduct(false);
    setEditingProduct(null);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountType: newCouponType,
      discountValue: newCouponDiscount,
      minOrderAmount: newCouponMinOrder,
      isActive: true,
      usedCount: 0,
      descriptionBn: `${newCouponCode} কোডে ${newCouponDiscount}${newCouponType === 'percentage' ? '%' : ' টাকা'} ছাড়`,
    });

    setNewCouponCode('');
  };

  const handleApplyStockMovement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockModalProd) return;

    const actualQty = stockType === 'damage' ? -Math.abs(stockQtyInput) : Math.abs(stockQtyInput);

    addStockMovement(
      stockModalProd.id,
      actualQty,
      stockType,
      stockNoteInput
    );

    setStockModalProd(null);
  };

  return (
    <div className="min-h-screen bg-stone-100/90 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Admin Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <LayoutDashboard className="w-4 h-4 text-emerald-600" />
              <span>এডমিনিস্ট্রেশন ও ম্যানেজমেন্ট হাব</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              দ্রুত বাজার বিডি — অ্যাডমিন কন্ট্রোল প্যানেল
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              পণ্য, অর্ডার, ইনভেন্টরি লেজার ও কুপন ডিসকাউন্ট পরিচালনার ড্যাশবোর্ড
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentView('store')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              স্টোরফ্রন্ট ভিজিট করুন &rarr;
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              লগআউট (Logout)
            </button>
            <button
              onClick={resetToDefaultData}
              className="bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-semibold px-3 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              title="ডিফল্ট ডেমো ডেটায় রিসেট করুন"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>ডেটা রিসেট</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
          {[
            { id: 'overview', label: 'ওভারভিউ ড্যাশবোর্ড', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'products', label: `পণ্য সম্ভার (${products.length})`, icon: <Package className="w-4 h-4" /> },
            { id: 'orders', label: `অর্ডার তালিকা (${orders.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'inventory', label: 'ইনভেন্টরি অডিট লেজার', icon: <Boxes className="w-4 h-4" /> },
            { id: 'coupons', label: `কুপন কোড (${coupons.length})`, icon: <Tag className="w-4 h-4" /> },
            { id: 'banners', label: `ব্যানার স্লাইডার (${banners.length})`, icon: <ImageIcon className="w-4 h-4" /> },
            { id: 'reviews', label: `মডারেশন ও রিভিউ (${reviews.length})`, icon: <MessageSquare className="w-4 h-4" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-500">মোট বিক্রয় রেভিনিউ</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    ৳
                  </div>
                </div>
                <span className="text-2xl font-black text-emerald-800 font-mono">
                  ৳{totalRevenue.toLocaleString('bn-BD')}
                </span>
                <span className="text-[11px] text-emerald-700 mt-1 block">
                  সফল ও প্রসেসিং অর্ডারের সমষ্টি
                </span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-500">মোট অর্ডার সংখ্যা</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <span className="text-2xl font-black text-stone-900 font-mono">
                  {orders.length} টি
                </span>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  {pendingOrdersCount} টি অর্ডার অপেক্ষমান (Pending)
                </span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-500">মোট সক্রিয় পণ্য</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <span className="text-2xl font-black text-stone-900 font-mono">
                  {totalProductsCount} টি
                </span>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  {categories.length} টি সক্রিয় ক্যাটাগরিতে
                </span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-500">লো-স্টক অ্যালার্ট</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                </div>
                <span className="text-2xl font-black text-rose-600 font-mono">
                  {lowStockProducts.length} টি
                </span>
                <span className="text-[11px] text-rose-600 mt-1 block">
                  স্টক ১৫ ইউনিটের নিচে নেমেছে
                </span>
              </div>
            </div>

            {/* Recent Orders table */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-stone-900 text-base">সাম্প্রতিক অর্ডার সমূহ</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  সবগুলো দেখুন &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                    <tr>
                      <th className="p-3">অর্ডার নং</th>
                      <th className="p-3">তারিখ</th>
                      <th className="p-3">গ্রাহক</th>
                      <th className="p-3">মোবাইল</th>
                      <th className="p-3">মোট বিল</th>
                      <th className="p-3">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50/60">
                        <td className="p-3 font-mono font-bold text-emerald-800">{ord.orderNumber}</td>
                        <td className="p-3 text-stone-500">
                          {new Date(ord.createdAt).toLocaleDateString('bn-BD')}
                        </td>
                        <td className="p-3 font-bold text-stone-800">{ord.customerName}</td>
                        <td className="p-3 font-mono">{ord.customerPhone}</td>
                        <td className="p-3 font-bold text-stone-900">৳{ord.total}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              ord.status === OrderStatus.DELIVERED
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === OrderStatus.PENDING
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">পণ্য ক্যাটালগ ও স্টক নিয়ন্ত্রণ</h3>
                <p className="text-xs text-stone-500">
                  নতুন পণ্য সংযোজন, মূল্য পরিবর্তন বা স্টক রিস্টক করুন
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    nameBn: '',
                    nameEn: '',
                    slug: `product-${Date.now()}`,
                    categoryId: categories[0]?.id || 'cat-oil-ghee',
                    brand: 'দ্রুত বাজার প্রিমিয়াম',
                    price: 350,
                    salePrice: 320,
                    unit: '১ কেজি',
                    stockQuantity: 40,
                    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
                    descriptionBn: '১০০% খাঁটি ও বিশুদ্ধ প্রাকৃতিক পণ্য।',
                    purityGuarantee: '১০০% খাঁটি পণ্যের নিশ্চয়তা',
                    origin: 'বাংলাদেশ',
                    isFlashSale: false,
                    isFeatured: true,
                  });
                  setIsAddingProduct(true);
                }}
                id="btn-admin-add-product"
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন পণ্য যোগ করুন</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                  <tr>
                    <th className="p-3">ছবি</th>
                    <th className="p-3">নাম (বাংলা ও ইংরেজি)</th>
                    <th className="p-3">মূল্য ও ছাড়</th>
                    <th className="p-3">বর্তমান স্টক</th>
                    <th className="p-3">ক্যাটাগরি</th>
                    <th className="p-3 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-stone-50/60">
                      <td className="p-3">
                        <img
                          src={prod.imageUrl}
                          alt={prod.nameBn}
                          className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                          referrerPolicy="no-referrer"
                        />
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-stone-900 block">{prod.nameBn}</span>
                        <span className="text-[11px] text-stone-400">{prod.nameEn}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-emerald-800">
                          ৳{prod.salePrice ?? prod.price}
                        </span>
                        {prod.salePrice && (
                          <span className="text-[10px] text-stone-400 line-through ml-1.5">
                            ৳{prod.price}
                          </span>
                        )}
                        <span className="block text-[10px] text-stone-500">{prod.unit}</span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-mono font-bold ${
                            prod.stockQuantity < 15 ? 'text-red-600' : 'text-stone-800'
                          }`}
                        >
                          {prod.stockQuantity}
                        </span>
                        <button
                          onClick={() => {
                            setStockModalProd(prod);
                            setStockQtyInput(25);
                          }}
                          className="ml-2 text-[10px] bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-800 font-semibold px-2 py-0.5 rounded cursor-pointer"
                        >
                          + রিস্টক
                        </button>
                      </td>
                      <td className="p-3 text-stone-600 font-medium">
                        {categories.find((c) => c.id === prod.categoryId)?.nameBn || prod.categoryId}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProduct(prod)}
                          className="p-1.5 text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg cursor-pointer"
                          title="এডিট করুন"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: ORDERS MANAGER */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="text-base font-bold text-stone-900">সকল অর্ডারের লাইভ তালিকা</h3>
              <p className="text-xs text-stone-500">
                গ্রাহকদের অর্ডারের স্ট্যাটাস পরিবর্তন এবং পেমেন্ট ভেরিফিকেশন করুন
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                  <tr>
                    <th className="p-3">অর্ডার আইডি</th>
                    <th className="p-3">গ্রাহক ও মোবাইল</th>
                    <th className="p-3">ঠিকানা</th>
                    <th className="p-3">পণ্যের বিবরণ</th>
                    <th className="p-3">মোট বিল</th>
                    <th className="p-3">পেমেন্ট</th>
                    <th className="p-3">অর্ডার স্ট্যাটাস চেঞ্জার</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-stone-50/60">
                      <td className="p-3 font-mono font-bold text-emerald-800">{ord.orderNumber}</td>
                      <td className="p-3">
                        <span className="font-bold text-stone-900 block">{ord.customerName}</span>
                        <a
                          href={`tel:${ord.customerPhone}`}
                          className="text-[11px] text-emerald-700 font-mono hover:underline"
                        >
                          {ord.customerPhone}
                        </a>
                      </td>
                      <td className="p-3 text-stone-600 max-w-xs truncate">
                        {ord.address.streetAddress}, {ord.address.city}
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-stone-800">
                          {ord.items.length} টি আইটেম
                        </span>
                        <span className="block text-[10px] text-stone-500 truncate max-w-[140px]">
                          {ord.items.map((i) => i.productNameBn).join(', ')}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-stone-900">৳{ord.total}</td>
                      <td className="p-3">
                        <span className="block font-semibold text-stone-700">{ord.paymentMethod}</span>
                        <select
                          value={ord.paymentStatus}
                          onChange={(e) => updatePaymentStatus(ord.id, e.target.value as PaymentStatus)}
                          className={`text-[10px] font-bold rounded px-1.5 py-0.5 border cursor-pointer ${
                            ord.paymentStatus === PaymentStatus.PAID
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value={PaymentStatus.UNPAID}>Unpaid (অপরিশোধিত)</option>
                          <option value={PaymentStatus.PAID}>Paid (পরিশোধিত)</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="text-xs font-bold p-1.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-emerald-600 cursor-pointer"
                        >
                          <option value={OrderStatus.PENDING}>Pending (অপেক্ষমান)</option>
                          <option value={OrderStatus.CONFIRMED}>Confirmed (নিশ্চিত)</option>
                          <option value={OrderStatus.PROCESSING}>Processing (প্রস্তুতি)</option>
                          <option value={OrderStatus.SHIPPED}>Shipped (পথে রয়েছে)</option>
                          <option value={OrderStatus.DELIVERED}>Delivered (সম্পন্ন)</option>
                          <option value={OrderStatus.CANCELLED}>Cancelled (বাতিল)</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: INVENTORY MOVEMENTS LEDGER */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="text-base font-bold text-stone-900">ইনভেন্টরি অডিট ও স্টক মুভমেন্ট লেজার</h3>
              <p className="text-xs text-stone-500">
                প্রতিটি অর্ডারে স্টক হ্রাস, নতুন রিস্টক এবং সমন্বয়ের স্বয়ংক্রিয় লগ
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                  <tr>
                    <th className="p-3">তারিখ ও সময়</th>
                    <th className="p-3">পণ্যের নাম</th>
                    <th className="p-3">মুভমেন্ট টাইপ</th>
                    <th className="p-3">পরিমাণ (Change)</th>
                    <th className="p-3">অডিট নোট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono">
                  {inventoryMovements.length > 0 ? (
                    inventoryMovements.map((mov) => (
                      <tr key={mov.id} className="hover:bg-stone-50/60 font-sans">
                        <td className="p-3 text-stone-500 font-mono text-[11px]">
                          {new Date(mov.createdAt).toLocaleString('bn-BD')}
                        </td>
                        <td className="p-3 font-bold text-stone-900">{mov.productName}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              mov.type === 'order_sale'
                                ? 'bg-amber-100 text-amber-800'
                                : mov.type === 'restock'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {mov.type}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold">
                          <span className={mov.quantity < 0 ? 'text-red-600' : 'text-emerald-700'}>
                            {mov.quantity > 0 ? `+${mov.quantity}` : mov.quantity}
                          </span>
                        </td>
                        <td className="p-3 text-stone-600">{mov.note}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-stone-500">
                        এখনো কোনো ইনভেন্টরি মুভমেন্ট রেকর্ড তৈরি হয়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">কুপন ডিসকাউন্ট কোড সমূহ</h3>
                <p className="text-xs text-stone-500">
                  নির্দিষ্ট কোডে শতকরা বা নির্দিষ্ট টাকার ছাড় তৈরি ও নিয়ন্ত্রণ করুন
                </p>
              </div>
            </div>

            {/* Create Coupon inline form */}
            <form onSubmit={handleCreateCoupon} className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">কুপন কোড *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: EID20"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full bg-white text-xs p-2.5 rounded-xl border border-stone-300 uppercase font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ছাড়ের ধরন</label>
                <select
                  value={newCouponType}
                  onChange={(e: any) => setNewCouponType(e.target.value)}
                  className="w-full bg-white text-xs p-2.5 rounded-xl border border-stone-300"
                >
                  <option value="percentage">শতকরা (%)</option>
                  <option value="fixed">নির্দিষ্ট টাকা (৳)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ছাড়ের পরিমাণ</label>
                <input
                  type="number"
                  required
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                  className="w-full bg-white text-xs p-2.5 rounded-xl border border-stone-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ন্যূনতম অর্ডার (৳)</label>
                <input
                  type="number"
                  value={newCouponMinOrder}
                  onChange={(e) => setNewCouponMinOrder(Number(e.target.value))}
                  className="w-full bg-white text-xs p-2.5 rounded-xl border border-stone-300 font-mono"
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>কুপন যুক্ত করুন</span>
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-emerald-800 bg-white px-2 py-0.5 rounded border border-stone-200">
                        {c.code}
                      </span>
                      <span className="text-xs font-bold text-stone-700">
                        {c.discountValue}{c.discountType === 'percentage' ? '%' : '৳'} ছাড়
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">{c.descriptionBn}</p>
                    <span className="text-[10px] text-stone-400">ব্যবহৃত হয়েছে: {c.usedCount} বার</span>
                  </div>

                  <button
                    onClick={() => toggleCouponStatus(c.id)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                      c.isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-300 text-stone-600'
                    }`}
                  >
                    {c.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: BANNERS */}
        {activeTab === 'banners' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="text-base font-bold text-stone-900">হোমপেজ ব্যানার স্লাইডার</h3>
              <p className="text-xs text-stone-500">
                গ্রাহকদের জন্য আকর্ষণীয় ক্যাম্পেইন ও অফার স্লাইড সাজান
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banners.map((b) => (
                <div key={b.id} className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xs group">
                  <div className="h-44 relative">
                    <img
                      src={b.imageUrl}
                      alt={b.titleBn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end text-white">
                      {b.badgeBn && (
                        <span className="bg-emerald-500 text-stone-950 font-bold text-[10px] px-2 py-0.5 rounded-full w-fit mb-1">
                          {b.badgeBn}
                        </span>
                      )}
                      <h4 className="font-bold text-base leading-tight">{b.titleBn}</h4>
                      <p className="text-xs text-stone-200 line-clamp-1 mt-0.5">{b.subtitleBn}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="text-base font-bold text-stone-900">গ্রাহকদের রিভিউ মডারেশন</h3>
              <p className="text-xs text-stone-500">
                গ্রাহকদের দেওয়া রিভিউ অনুমোদন বা অপসারণ করুন
              </p>
            </div>

            <div className="divide-y divide-stone-100">
              {reviews.map((rev) => (
                <div key={rev.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-stone-900">{rev.userName}</span>
                      <span className="text-amber-500 text-xs">{'★'.repeat(rev.rating)}</span>
                      {rev.isVerifiedPurchase && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                          ভেরিফাইড ক্রেতা
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-700 mt-1 italic">"{rev.commentBn}"</p>
                  </div>

                  <button
                    onClick={() => toggleReviewApproval(rev.id)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      rev.isApproved
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {rev.isApproved ? 'অনুমোদিত' : 'অপেক্ষমান'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Add/Edit Modal */}
        {isAddingProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 my-auto animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <h3 className="font-bold text-base text-stone-900">
                  {editingProduct ? 'পণ্য এডিট করুন' : 'নতুন পণ্য যুক্ত করুন'}
                </h3>
                <button
                  onClick={() => setIsAddingProduct(false)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">পণ্যের নাম (বাংলা) *</label>
                  <input
                    type="text"
                    required
                    value={productForm.nameBn}
                    onChange={(e) => setProductForm({ ...productForm, nameBn: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">রেগুলার মূল্য (৳) *</label>
                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">অফার মূল্য (৳)</label>
                    <input
                      type="number"
                      value={productForm.salePrice}
                      onChange={(e) => setProductForm({ ...productForm, salePrice: Number(e.target.value) })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">স্টক পরিমাণ *</label>
                    <input
                      type="number"
                      required
                      value={productForm.stockQuantity}
                      onChange={(e) => setProductForm({ ...productForm, stockQuantity: Number(e.target.value) })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">প্যাকেজ সাইজ / ইউনিট</label>
                    <input
                      type="text"
                      value={productForm.unit}
                      onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ছবি URL *</label>
                  <input
                    type="url"
                    required
                    value={productForm.imageUrl}
                    onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">বিবরণ</label>
                  <textarea
                    rows={3}
                    value={productForm.descriptionBn}
                    onChange={(e) => setProductForm({ ...productForm, descriptionBn: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isFlashSale}
                      onChange={(e) => setProductForm({ ...productForm, isFlashSale: e.target.checked })}
                      className="rounded text-emerald-600"
                    />
                    <span>আজকের অফার / ফ্ল্যাশ সেল</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-200 text-stone-700"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800"
                  >
                    সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Restock Modal */}
        {stockModalProd && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 my-auto">
              <h3 className="font-bold text-base text-stone-900 mb-1">
                স্টক রিস্টক: {stockModalProd.nameBn}
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                বর্তমান স্টক: <strong>{stockModalProd.stockQuantity}</strong> {stockModalProd.unit}
              </p>

              <form onSubmit={handleApplyStockMovement} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">মুভমেন্টের ধরন</label>
                  <select
                    value={stockType}
                    onChange={(e: any) => setStockType(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-bold"
                  >
                    <option value="restock">নতুন রিস্টক (+ যোগ)</option>
                    <option value="adjustment">স্টক সমন্বয় (+/-)</option>
                    <option value="damage">ক্ষতিগ্রস্ত বা নষ্ট (- বিয়োগ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">পরিমাণ</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={stockQtyInput}
                    onChange={(e) => setStockQtyInput(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">অডিট নোট</label>
                  <input
                    type="text"
                    value={stockNoteInput}
                    onChange={(e) => setStockNoteInput(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setStockModalProd(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-200 text-stone-700"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800"
                  >
                    স্টক আপডেট করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
