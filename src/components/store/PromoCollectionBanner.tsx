/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingBag, Sparkles, CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PromoCollectionBanner: React.FC = () => {
  const { setSelectedCategoryId, setActiveModal } = useStore();

  return (
    <section className="py-12 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Mustard Oil & Honey Special Assurance */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-stone-900 text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>স্পেশাল অর্গানিক অফার</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug mb-3">
                ঘরে বসে আসল সরিষার তেল ও সুন্দরবনের মধু
              </h3>
              <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed mb-6">
                কাঠের ঘানিতে ভাঙানো সরিষার ঝাঁঝালো তেল এবং সুন্দরবনের গভীর জঙ্গলের খলিসা ও গরান ফুলের র চাকের মধু নিশ্চিত করে পরিবারের সুস্বাস্থ্য।
              </p>

              <ul className="space-y-2 mb-6 text-xs sm:text-sm text-emerald-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>১০০% রাসায়নিক ও প্রিজারভেটিভমুক্ত বিশুদ্ধ পণ্য</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>সরাসরি কৃষক ও মৌয়ালদের থেকে নিজস্ব কালেকশন</span>
                </li>
              </ul>
            </div>

            <div className="relative z-10 pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategoryId('cat-oil-ghee');
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                তেল ও ঘি সংগ্রহ করুন &rarr;
              </button>

              <a
                href="tel:01806578737"
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/20 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>০১৮০৬-৫৭৮৭৩৭</span>
              </a>
            </div>

            {/* Background Graphic Accents */}
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Card 2: Household & Daily Essentials Wholesale & Retail */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-emerald-950 to-stone-900 text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold mb-4">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>পাইকারি ও খুচরা সুবিধা</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug mb-3">
                নিত্য প্রয়োজনীয় খাদ্য ও প্রসাধন সামগ্রী
              </h3>
              <p className="text-stone-200 text-xs sm:text-sm leading-relaxed mb-6">
                ম্যাজিক হ্যান্ডওয়াশ, প্রিমিয়াম খেজুর, দার্জিলিং চা, ইনস্ট্যান্ট কফি ও চিনিগুড়া চাল সহ দৈনন্দিন সমস্ত গ্রোসারি সবচেয়ে সাশ্রয়ী মূল্যে।
              </p>

              <ul className="space-y-2 mb-6 text-xs sm:text-sm text-stone-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>ঢাকা সিটিতে ২৪ ঘণ্টার মধ্যে দ্রুততম হোম ডেলিভারি</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>পাইকারি মূল্যে বাল্ক অর্ডারের বিশেষ সুবিধা</span>
                </li>
              </ul>
            </div>

            <div className="relative z-10 pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategoryId('cat-spices');
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                গ্রোসারি সম্ভার দেখুন &rarr;
              </button>

              <a
                href="https://wa.me/8801806578737?text=Hello%20Drutho%20Bazar%20BD,%20I%20want%20to%20order%20groceries"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/20 transition-all"
              >
                <span>হোয়াটসঅ্যাপে অর্ডার</span>
              </a>
            </div>

            {/* Background Graphic Accents */}
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
