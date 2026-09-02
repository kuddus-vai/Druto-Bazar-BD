/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  AlertCircle,
  Phone,
  MapPin,
  User,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethod, DeliveryZone } from '../../types';
import { calculateOrderPricing } from '../../services/pricing.service';
import { validateBangladeshiPhone } from '../../services/order.service';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    activeModal,
    setActiveModal,
    deliveryZones,
    selectedDeliveryZone,
    setSelectedDeliveryZone,
    appliedCoupon,
    processCheckout,
    showToast,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('ঢাকা');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH_ON_DELIVERY);
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  if (activeModal !== 'checkout') return null;

  const pricing = calculateOrderPricing(cart, selectedDeliveryZone, appliedCoupon);

  const handlePhoneBlur = () => {
    if (!customerPhone.trim()) {
      setPhoneError('');
      return;
    }
    const val = validateBangladeshiPhone(customerPhone);
    if (!val.isValid) {
      setPhoneError(val.message || 'ভুল মোবাইল নম্বর');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      showToast('আপনার কার্ট খালি!', 'error');
      return;
    }

    if (!customerName.trim()) {
      showToast('অনুগ্রহ করে আপনার নাম প্রদান করুন', 'error');
      return;
    }

    const phoneValidation = validateBangladeshiPhone(customerPhone);
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.message || '১১ ডিজিটের সঠিক মোবাইল নম্বর দিন');
      showToast(phoneValidation.message || '১১ ডিজিটের সঠিক মোবাইল নম্বর দিন', 'error');
      return;
    }

    if (!streetAddress.trim()) {
      showToast('অনুগ্রহ করে সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন', 'error');
      return;
    }

    if (
      paymentMethod !== PaymentMethod.CASH_ON_DELIVERY &&
      !transactionId.trim()
    ) {
      showToast('অনুগ্রহ করে বিকাশ/নগদ এর ট্রানজেকশন আইডি (TrxID) প্রদান করুন', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = processCheckout(
        customerName.trim(),
        customerPhone.trim(),
        {
          streetAddress: streetAddress.trim(),
          city: city.trim(),
          zoneId: selectedDeliveryZone.id,
          postalCode: '1219',
        },
        paymentMethod,
        transactionId.trim() || undefined,
        orderNotes.trim() || undefined
      );

      setIsSubmitting(false);

      if (!result.success) {
        showToast(result.errorMessage || 'অর্ডার সম্পন্ন হতে পারেনি', 'error');
      }
    } catch (err) {
      setIsSubmitting(false);
      showToast('অর্ডার প্রসেসিংয়ে একটি অপ্রত্যাশিত সমস্যা হয়েছে', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-stone-900 leading-tight">
                অর্ডার নিশ্চিতকরণ (চেকআউট)
              </h2>
              <p className="text-xs text-stone-500">
                তথ্য পূরণ করে নিচের "অর্ডার কনফার্ম করুন" বাটনে ক্লিক করুন
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            id="btn-close-checkout"
            className="p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Customer Info (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Customer Contact */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-700" />
                  <span>আপনার ব্যক্তিগত তথ্য</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মোঃ কামরুল হাসান"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      id="checkout-name"
                      className="w-full bg-stone-50 text-stone-900 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      মোবাইল নম্বর (১১ ডিজিট) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="যেমন: 01806578737"
                        value={customerPhone}
                        onChange={(e) => {
                          setCustomerPhone(e.target.value);
                          if (phoneError) setPhoneError('');
                        }}
                        onBlur={handlePhoneBlur}
                        id="checkout-phone"
                        className={`w-full bg-stone-50 text-stone-900 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:bg-white focus:outline-none ${
                          phoneError
                            ? 'border-red-500 focus:border-red-600 bg-red-50/30'
                            : 'border-stone-300 focus:border-emerald-600'
                        }`}
                      />
                      <Phone className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                    {phoneError && (
                      <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{phoneError}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery Zone Selector */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>ডেলিভারি এলাকা নির্বাচন করুন <span className="text-red-500">*</span></span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {deliveryZones.map((zone) => {
                    const isSelected = selectedDeliveryZone.id === zone.id;
                    return (
                      <button
                        type="button"
                        key={zone.id}
                        onClick={() => setSelectedDeliveryZone(zone)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 text-emerald-950 shadow-xs'
                            : 'bg-stone-50 border-stone-200 hover:border-stone-300 text-stone-700'
                        }`}
                      >
                        <div className="font-bold text-xs">{zone.nameBn}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">{zone.estimatedDelivery}</div>
                        <div className="text-xs font-extrabold text-emerald-700 mt-1">
                          {pricing.isFreeDelivery ? 'ফ্রি ডেলিভারি' : `৳${zone.deliveryFee}`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Address Details */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  সম্পূর্ণ ঠিকানা (বাসা নম্বর, রোড, এলাকা) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="যেমন: বাড়ি # ১২, রোড # ৪, ব্লক # সি, বনশ্রী, ঢাকা"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  id="checkout-address"
                  className="w-full bg-stone-50 text-stone-900 border border-stone-300 rounded-xl p-3 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Special Note */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  অর্ডারের বিশেষ নির্দেশনা (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  placeholder="যেমন: বিকেল ৫টার পর ডেলিভারি দেবেন"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-stone-50 text-stone-900 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-emerald-700" />
                  <span>পেমেন্ট পদ্ধতি নির্বাচন করুন</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  {[
                    { id: PaymentMethod.CASH_ON_DELIVERY, label: 'ক্যাশ অন ডেলিভারি', icon: '💵' },
                    { id: PaymentMethod.BKASH, label: 'বিকাশ (bKash)', icon: '📱' },
                    { id: PaymentMethod.NAGAD, label: 'নগদ (Nagad)', icon: '🟠' },
                    { id: PaymentMethod.ROCKET, label: 'রকেট (Rocket)', icon: '🟣' },
                  ].map((method) => {
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-700 text-white font-bold border-emerald-700 shadow-sm'
                            : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                        }`}
                      >
                        <div className="text-lg">{method.icon}</div>
                        <div className="text-xs mt-1 leading-tight">{method.label}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Mobile Banking Instructions if selected */}
                {paymentMethod !== PaymentMethod.CASH_ON_DELIVERY && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2 text-stone-800">
                    <p className="font-bold text-amber-900">
                      💡 {paymentMethod === PaymentMethod.BKASH ? 'বিকাশ' : paymentMethod === PaymentMethod.NAGAD ? 'নগদ' : 'রকেট'} সেন্ড মানি বা পেমেন্ট নির্দেশনা:
                    </p>
                    <p>
                      অনুগ্রহ করে আমাদের অফিশিয়াল নাম্বারে (<strong>01806-578737</strong>) মোট <strong>৳{pricing.total}</strong> টাকা সেন্ড মানি করুন। তারপর ট্রানজেকশন আইডি (TrxID) নিচের বক্সে দিন।
                    </p>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">
                        ট্রানজেকশন আইডি (TrxID) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: 9J76KLM12"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary Sidebar (5 cols) */}
            <div className="lg:col-span-5 bg-stone-50 p-5 sm:p-6 rounded-3xl border border-stone-200 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-emerald-700" />
                    <span>অর্ডারের সারাংশ</span>
                  </span>
                  <span className="text-xs text-stone-500 font-normal">
                    {cart.length} টি পণ্য
                  </span>
                </h3>

                {/* Compact Item Preview */}
                <div className="max-h-48 overflow-y-auto divide-y divide-stone-200/80 mb-4 pr-1">
                  {cart.map((item) => (
                    <div key={`${item.productId}-${item.variantId || 'base'}`} className="py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.nameBn}
                          className="w-8 h-8 rounded-lg object-cover border border-stone-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="truncate">
                          <span className="font-semibold text-stone-800 block truncate">
                            {item.product.nameBn}
                          </span>
                          <span className="text-[10px] text-stone-500">
                            {item.quantity} x ৳{item.unitPrice}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-stone-900 shrink-0">
                        ৳{item.quantity * item.unitPrice}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculation Breakdown */}
                <div className="space-y-2 text-xs text-stone-600 border-t border-stone-200 pt-3">
                  <div className="flex justify-between">
                    <span>পণ্যের মোট দাম:</span>
                    <span className="font-bold text-stone-900">৳{pricing.subtotal}</span>
                  </div>

                  {pricing.discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>কুপন ছাড় ({appliedCoupon?.code}):</span>
                      <span>-৳{pricing.discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>ডেলিভারি চার্জ:</span>
                    <span>
                      {pricing.isFreeDelivery ? (
                        <strong className="text-emerald-700 font-bold">ফ্রি (৳০)</strong>
                      ) : (
                        <strong className="text-stone-900">৳{pricing.deliveryFee}</strong>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-black text-stone-900 border-t border-stone-300 pt-2">
                    <span>সর্বমোট বিল:</span>
                    <span className="text-emerald-800 text-xl">৳{pricing.total}</span>
                  </div>
                </div>

                {/* Trust Guarantee note */}
                <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>১০০% খাঁটি পণ্য ও নিরাপদ সার্ভিস</span>
                  </div>
                  <p className="text-stone-600">
                    ডেলিভারি পাওয়ার পর পণ্য দেখে মূল্য পরিশোধ করার নিশ্চয়তা।
                  </p>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="btn-confirm-order-submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-700/30 text-sm transition-all transform active:scale-98 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>অর্ডার প্রসেস হচ্ছে...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                      <span>অর্ডার সম্পন্ন করুন (৳{pricing.total})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
