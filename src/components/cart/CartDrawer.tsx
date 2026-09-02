/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Truck,
  Tag,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { calculateOrderPricing, FREE_DELIVERY_THRESHOLD } from '../../services/pricing.service';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    activeModal,
    setActiveModal,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    selectedDeliveryZone,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);

  if (activeModal !== 'cart') return null;

  const pricing = calculateOrderPricing(cart, selectedDeliveryZone, appliedCoupon);
  const remainingForFreeShipping = Math.max(0, FREE_DELIVERY_THRESHOLD - pricing.subtotal);
  const freeShippingProgress = Math.min(100, Math.round((pricing.subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    if (res.success) {
      setCouponMsg({ text: res.message, error: false });
      setCouponInput('');
    } else {
      setCouponMsg({ text: res.message, error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900">আপনার শপিং কার্ট</h3>
              <span className="text-xs text-stone-500 font-medium">
                {cart.length} টি আইটেম নির্বাচিত
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            id="btn-close-cart-drawer"
            className="p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100 text-xs">
          <div className="flex items-center justify-between font-semibold text-emerald-950 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-700" />
              {pricing.isFreeDelivery ? (
                <span className="text-emerald-700 font-bold">🎉 অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন</span>
              ) : (
                <span>
                  আর মাত্র <strong>৳{remainingForFreeShipping}</strong> টাকার কেনাকাটায় <strong>ফ্রি ডেলিভারি</strong>!
                </span>
              )}
            </span>
            <span className="font-bold text-emerald-800">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-emerald-200/80 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h4 className="text-base font-bold text-stone-800">আপনার কার্ট খালি</h4>
              <p className="text-xs text-stone-500 mt-1 mb-6 max-w-xs">
                খাঁটি সরিষার তেল, প্রাকৃতিক মধু, গাওয়া ঘি কিংবা পছন্দের গ্রোসারি পণ্য কার্টে যোগ করুন।
              </p>
              <button
                onClick={() => setActiveModal(null)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                পণ্য দেখুন &rarr;
              </button>
            </div>
          ) : (
            cart.map((item, idx) => {
              const effectivePrice = item.selectedVariant
                ? item.selectedVariant.salePrice ?? item.selectedVariant.price
                : item.product.salePrice ?? item.product.price;

              const maxStock = item.selectedVariant
                ? item.selectedVariant.stockQuantity
                : item.product.stockQuantity;

              return (
                <div key={`${item.productId}-${item.variantId || 'base'}`} className="py-3 flex gap-3 items-center">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.nameBn}
                    className="w-16 h-16 object-cover rounded-xl border border-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                      {item.product.nameBn}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-xs">
                      <span className="font-bold text-emerald-800">৳{effectivePrice}</span>
                      {item.selectedVariant && (
                        <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                          {item.selectedVariant.name}
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="p-1 text-stone-600 hover:bg-stone-200 transition-colors rounded-l-lg"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.variantId, item.quantity + 1)}
                          disabled={item.quantity >= maxStock}
                          className="p-1 text-stone-600 hover:bg-stone-200 disabled:opacity-30 transition-colors rounded-r-lg"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-stone-700">
                        = ৳{effectivePrice * item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Remove Item */}
                  <button
                    onClick={() => removeFromCart(item.productId, item.variantId)}
                    className="p-2 text-stone-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 cursor-pointer"
                    title="পণ্যটি মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Coupon & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-4">
            {/* Coupon Application Box */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-100/90 border border-emerald-300 p-2.5 rounded-xl text-xs">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold">
                    <Tag className="w-4 h-4 text-emerald-700" />
                    <span>কুপন কোড: {appliedCoupon.code}</span>
                    <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded">
                      প্রয়োগকৃত
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-red-600 text-xs font-bold underline cursor-pointer"
                  >
                    বাতিল
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="কুপন কোড দিন (যেমন: DRUTHO10)"
                    id="coupon-code-input"
                    className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-emerald-600 font-mono"
                  />
                  <button
                    type="submit"
                    id="btn-apply-coupon"
                    className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    প্রয়োগ
                  </button>
                </form>
              )}
              {couponMsg && (
                <p className={`text-[11px] mt-1 font-medium ${couponMsg.error ? 'text-red-600' : 'text-emerald-700'}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
              <div className="flex justify-between">
                <span>পণ্যের মোট মূল্য (Subtotal):</span>
                <span className="font-bold text-stone-900">৳{pricing.subtotal}</span>
              </div>

              {pricing.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>কুপন ছাড় (Discount):</span>
                  <span>-৳{pricing.discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ ({selectedDeliveryZone.nameBn}):</span>
                <span>
                  {pricing.isFreeDelivery ? (
                    <strong className="text-emerald-700">ফ্রি</strong>
                  ) : (
                    <strong className="text-stone-900">৳{pricing.deliveryFee}</strong>
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm sm:text-base font-black text-stone-900 border-t border-stone-200 pt-2">
                <span>সর্বমোট প্রদেয় টাকা:</span>
                <span className="text-emerald-800 text-lg">৳{pricing.total}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => setActiveModal('checkout')}
              id="btn-proceed-checkout"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 text-sm transition-all transform active:scale-98 cursor-pointer"
            >
              <span>অর্ডার কনফার্ম করুন (চেকআউট)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
