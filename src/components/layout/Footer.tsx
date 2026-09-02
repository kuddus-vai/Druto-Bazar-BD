/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  Heart,
  Clock,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { setSelectedCategoryId, setActiveModal, setCurrentView } = useStore();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 sm:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand Info (2 cols width on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                দ্রুত বাজার <span className="text-emerald-400">বিডি</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              দ্রুত বাজার বিডি — পাইকারি ও খুচরা মূল্যে ১০০% খাঁটি কাঠের ঘানির সরিষার তেল, সুন্দরবনের প্রাকৃতিক মধু, গাওয়া ঘি, অর্গানিক মসলা ও নিত্যপ্রয়োজনীয় গ্রোসারি পণ্যের বিশ্বস্ত অনলাইন শপ।
            </p>

            <div className="pt-2 text-xs space-y-2 text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>হাউজ # ৪, ব্লক # সি, বনশ্রী মডেল টাউন, রামপুরা, ঢাকা-১২১৯</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:01806578737" className="hover:text-white transition-colors font-bold font-mono">
                  ০১৮০৬-৫৭৮৭৩৭, ০১৯৯৪-২২৮৭৭৯
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>সকাল ৯:০০ টা হতে রাত ১০:০০ টা (সপ্তাহের ৭ দিন)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Shop Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              পণ্য ক্যাটাগরি
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryId('cat-oil-ghee');
                    setCurrentView('store');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  খাঁটি তেল ও ঘি
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryId('cat-honey');
                    setCurrentView('store');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  সুন্দরবনের প্রাকৃতিক মধু
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryId('cat-spices');
                    setCurrentView('store');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  খাঁটি মসলা ও উপাদান
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryId('cat-nuts-seeds');
                    setCurrentView('store');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  বাদাম ও প্রিমিয়াম বীজ
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryId('cat-beverages');
                    setCurrentView('store');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  চা ও প্রিমিয়াম কফি
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              গ্রাহক সেবা ও নীতি
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveModal('order-tracker')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  লাইভ অর্ডার ট্র্যাকিং
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('test-runner')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  সিস্টেম ভ্যালিডেশন টেস্ট
                </button>
              </li>
              <li>
                <a href="#why-us" className="hover:text-emerald-400 transition-colors">
                  রিটার্ন ও রিফান্ড পলিসি
                </a>
              </li>
              <li>
                <a href="tel:01806578737" className="hover:text-emerald-400 transition-colors">
                  হটলাইনে সরাসরি যোগাযোগ
                </a>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  অ্যাডমিন পোর্টাল
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Payment & Security Assurance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              পেমেন্ট ও কুরিয়ার পার্টনার
            </h4>
            <p className="text-xs text-stone-400 mb-3">
              ক্যাশ অন ডেলিভারি ও বাংলাদেশের সকল মোবাইল ব্যাংকিং সমর্থিত
            </p>

            {/* Payment methods badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="bg-stone-800 text-stone-300 text-[10px] font-bold px-2 py-1 rounded border border-stone-700">
                ক্যাশ অন ডেলিভারি
              </span>
              <span className="bg-pink-900/40 text-pink-300 text-[10px] font-bold px-2 py-1 rounded border border-pink-700/50">
                বিকাশ (bKash)
              </span>
              <span className="bg-orange-900/40 text-orange-300 text-[10px] font-bold px-2 py-1 rounded border border-orange-700/50">
                নগদ (Nagad)
              </span>
              <span className="bg-purple-900/40 text-purple-300 text-[10px] font-bold px-2 py-1 rounded border border-purple-700/50">
                রকেট (Rocket)
              </span>
            </div>

            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>১০০% নিরাপদ ও এনক্রিপ্টেড চেকআউট</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} <strong>দ্রুত বাজার বিডি (Drutho Bazar BD)</strong>. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>প্রস্তুতকৃত: বনশ্রী, ঢাকা</span>
            <span>•</span>
            <span>১০০% খাঁটি পণ্য</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
