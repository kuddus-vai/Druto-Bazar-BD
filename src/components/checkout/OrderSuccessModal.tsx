/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  Truck,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const OrderSuccessModal: React.FC = () => {
  const { lastCreatedOrder, activeModal, setActiveModal, setCurrentView } = useStore();

  if (activeModal !== 'order-success' || !lastCreatedOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleTrackOrder = () => {
    setActiveModal('order-tracker');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Drutho Bazar BD, I placed an order with Order ID: ${lastCreatedOrder.orderNumber}. Total amount: ৳${lastCreatedOrder.total}. Customer: ${lastCreatedOrder.customerName}`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-white text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-lg animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            শীঘ্রই আমাদের কাস্টমার সার্ভিস প্রতিনিধি আপনার সাথে যোগাযোগ করে অর্ডার নিশ্চিত করবেন।
          </p>

          <div className="inline-block mt-4 bg-emerald-950/70 border border-emerald-500/40 rounded-xl px-4 py-2">
            <span className="text-xs text-emerald-300">অর্ডার নম্বর (Order ID):</span>
            <span className="block text-base sm:text-lg font-mono font-bold text-amber-300">
              {lastCreatedOrder.orderNumber}
            </span>
          </div>
        </div>

        {/* Invoice / Summary Details */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto print:max-h-none print:overflow-visible">
          {/* Customer & Delivery snapshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
            <div>
              <span className="text-stone-500 font-semibold block mb-1">গ্রাহকের তথ্য:</span>
              <p className="font-bold text-stone-900 text-sm">{lastCreatedOrder.customerName}</p>
              <p className="text-stone-700 font-mono mt-0.5">{lastCreatedOrder.customerPhone}</p>
            </div>
            <div>
              <span className="text-stone-500 font-semibold block mb-1">ডেলিভারি ঠিকানা:</span>
              <p className="text-stone-800 font-medium leading-relaxed">
                {lastCreatedOrder.address.streetAddress}, {lastCreatedOrder.address.city}
              </p>
              <p className="text-emerald-700 font-bold mt-1">
                পদ্ধতি: {lastCreatedOrder.paymentMethod}
              </p>
            </div>
          </div>

          {/* Itemized list */}
          <div>
            <h4 className="text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">
              অর্ডারের পণ্যসমূহ ({lastCreatedOrder.items.length}):
            </h4>
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden">
              {lastCreatedOrder.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between text-xs bg-white">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.productImage}
                      alt={item.productNameBn}
                      className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-bold text-stone-800 block">{item.productNameBn}</span>
                      <span className="text-[11px] text-stone-500">
                        {item.quantity} x ৳{item.unitPrice} {item.variantName ? `(${item.variantName})` : ''}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900">৳{item.totalPrice}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial summary */}
          <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
            <div className="flex justify-between">
              <span>সাবটোটাল:</span>
              <span className="font-semibold text-stone-800">৳{lastCreatedOrder.subtotal}</span>
            </div>
            {lastCreatedOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>ছাড়:</span>
                <span>-৳{lastCreatedOrder.discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>ডেলিভারি ফি:</span>
              <span className="font-semibold text-stone-800">
                {lastCreatedOrder.deliveryFee === 0 ? 'ফ্রি' : `৳${lastCreatedOrder.deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-stone-900 border-t border-stone-200 pt-2">
              <span>সর্বমোট প্রদেয় বিল:</span>
              <span className="text-emerald-800 text-lg">৳{lastCreatedOrder.total}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-5 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="btn-print-invoice"
              className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold px-4 py-2.5 rounded-xl border border-stone-300 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span>রশিদ প্রিন্ট করুন</span>
            </button>

            <a
              href={`https://wa.me/8801806578737?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপ মেসেজ</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTrackOrder}
              id="btn-success-track-order"
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              <span>অর্ডার ট্র্যাক করুন</span>
            </button>

            <button
              onClick={() => {
                setActiveModal(null);
                setCurrentView('store');
              }}
              className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              হোমে ফিরুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
