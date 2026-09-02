/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Search,
  Package,
  CheckCircle2,
  Truck,
  Clock,
  AlertCircle,
  MapPin,
  FileText,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types';

export const OrderTracker: React.FC = () => {
  const { activeModal, setActiveModal, orders } = useStore();
  const [searchPhone, setSearchPhone] = useState('');
  const [searchResult, setSearchResult] = useState<typeof orders | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (activeModal !== 'order-tracker') return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPhone.trim()) return;

    const matchedOrders = orders.filter(
      (o) => o.customerPhone.includes(searchPhone) || o.orderNumber.includes(searchPhone)
    );
    
    // Sort by newest first
    matchedOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setSearchResult(matchedOrders);
    setHasSearched(true);
  };

  const getStatusDetails = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return {
          icon: <Clock className="w-5 h-5 text-amber-500" />,
          color: 'text-amber-600 bg-amber-50 border-amber-200',
          title: 'অপেক্ষমান (Pending)',
          desc: 'আপনার অর্ডারটি গ্রহণ করা হয়েছে। শীঘ্রই কল করে কনফার্ম করা হবে।',
        };
      case OrderStatus.CONFIRMED:
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
          title: 'নিশ্চিত (Confirmed)',
          desc: 'আপনার অর্ডারটি কনফার্ম হয়েছে। প্যাকেজিং চলছে।',
        };
      case OrderStatus.PROCESSING:
        return {
          icon: <Package className="w-5 h-5 text-blue-500" />,
          color: 'text-blue-700 bg-blue-50 border-blue-200',
          title: 'প্রসেসিং (Processing)',
          desc: 'পণ্য প্যাকেট করা হচ্ছে। শীঘ্রই কুরিয়ারে দেওয়া হবে।',
        };
      case OrderStatus.SHIPPED:
        return {
          icon: <Truck className="w-5 h-5 text-purple-500" />,
          color: 'text-purple-700 bg-purple-50 border-purple-200',
          title: 'পথে রয়েছে (Shipped)',
          desc: 'আপনার অর্ডারটি কুরিয়ারে হস্তান্তর করা হয়েছে।',
        };
      case OrderStatus.DELIVERED:
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          color: 'text-emerald-800 bg-emerald-100 border-emerald-300',
          title: 'ডেলিভারি সম্পন্ন (Delivered)',
          desc: 'অর্ডারটি সফলভাবে ডেলিভারি করা হয়েছে। ধন্যবাদ!',
        };
      case OrderStatus.CANCELLED:
        return {
          icon: <X className="w-5 h-5 text-red-500" />,
          color: 'text-red-700 bg-red-50 border-red-200',
          title: 'বাতিল (Cancelled)',
          desc: 'অর্ডারটি বাতিল করা হয়েছে। প্রয়োজনে যোগাযোগ করুন।',
        };
      default:
        return {
          icon: <AlertCircle className="w-5 h-5 text-stone-500" />,
          color: 'text-stone-700 bg-stone-50 border-stone-200',
          title: 'অজানা',
          desc: 'স্ট্যাটাস জানা যায়নি',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 my-auto animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-stone-100">
          <div>
            <h2 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
              <Truck className="w-6 h-6 text-emerald-600" />
              <span>লাইভ অর্ডার ট্র্যাকিং</span>
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              আপনার মোবাইল নম্বর বা অর্ডার আইডি দিয়ে বর্তমান অবস্থা জানুন
            </p>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <form onSubmit={handleSearch} className="relative mb-6">
            <input
              type="text"
              required
              placeholder="মোবাইল নম্বর বা অর্ডার আইডি লিখুন..."
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-900 px-4 py-3.5 pr-12 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-emerald-700 text-white px-4 rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors"
            >
              ট্র্যাক করুন
            </button>
          </form>

          {hasSearched && (
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              {searchResult && searchResult.length > 0 ? (
                searchResult.map((order) => {
                  const status = getStatusDetails(order.status);
                  
                  return (
                    <div key={order.id} className="border border-stone-200 rounded-2xl p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-stone-900 text-sm">
                              {order.orderNumber}
                            </span>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${status.color}`}>
                              {status.title}
                            </span>
                          </div>
                          <span className="text-xs text-stone-500 mt-1 block">
                            অর্ডারের তারিখ: {new Date(order.createdAt).toLocaleDateString('bn-BD', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        
                        <div className="text-right">
                          <span className="text-sm font-bold text-emerald-800 block">
                            মোট: ৳{order.total}
                          </span>
                          <span className="text-[10px] text-stone-500">
                            ({order.items.length} টি আইটেম)
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 flex items-start gap-4">
                        <div className="mt-0.5">{status.icon}</div>
                        <div>
                          <h4 className="font-bold text-stone-800 text-sm mb-1">{status.title}</h4>
                          <p className="text-xs text-stone-600 leading-relaxed">{status.desc}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <h5 className="font-bold text-stone-700 mb-2 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            ডেলিভারি ঠিকানা
                          </h5>
                          <p className="text-stone-600 leading-snug">
                            {order.customerName}<br/>
                            {order.customerPhone}<br/>
                            {order.address.streetAddress}, {order.address.city}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-bold text-stone-700 mb-2 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            অর্ডার সারসংক্ষেপ
                          </h5>
                          <ul className="space-y-1.5 text-stone-600">
                            {order.items.map(item => (
                              <li key={item.productId} className="flex justify-between">
                                <span className="truncate max-w-[140px]" title={item.productNameBn}>
                                  {item.quantity}x {item.productNameBn}
                                </span>
                                <span className="font-medium text-stone-800">৳{item.totalPrice}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="w-8 h-8 text-stone-300" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-1">কোনো অর্ডার পাওয়া যায়নি</h3>
                  <p className="text-xs text-stone-500">
                    অনুগ্রহ করে সঠিক মোবাইল নম্বর বা অর্ডার আইডি দিয়ে পুনরায় চেষ্টা করুন।
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
