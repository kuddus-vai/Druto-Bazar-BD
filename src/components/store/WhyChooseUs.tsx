/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Award, HeartHandshake, Check } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      title: '১০০% খাঁটি ও বিশুদ্ধ পণ্য',
      desc: 'কোনো ভেজাল, কৃত্রিম রং বা প্রিজারভেটিভ নেই। সম্পূর্ণ নিজস্ব তত্ত্বাবধানে বাছাইকৃত প্রাকৃতিক খাদ্যদ্রব্য।',
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
      title: 'দ্রুততম সুপার ডেলিভারি',
      desc: 'ঢাকা সিটিতে ২৪ ঘণ্টায় এবং ঢাকার বাইরে সারাদেশে ৪৮ থেকে ৭২ ঘণ্টার মধ্যে নিরাপদ হোম ডেলিভারি।',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'নিরাপদ ক্যাশ অন ডেলিভারি',
      desc: 'ডেলিভারিম্যানের সামনে পণ্য চেক করে শতভাগ সন্তুষ্ট হয়ে মূল্য পরিশোধের শতভাগ নিশ্চয়তা।',
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-emerald-600" />,
      title: 'সহজ ও ঝামেলামুক্ত রিটার্ন',
      desc: 'পণ্যের মান বা প্যাকেজিংয়ে কোনো সমস্যা পেলে কোনো প্রশ্ন ছাড়াই ইনস্ট্যান্ট পরিবর্তন বা রিফান্ড।',
    },
  ];

  return (
    <section className="py-16 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <HeartHandshake className="w-4 h-4 text-emerald-700" />
            <span>আমাদের অঙ্গীকার</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            কেন আপনি দ্রুত বাজার বিডি বেছে নেবেন?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            আমরা শুধু পণ্য বিক্রি করি না, প্রতিটি পরিবারের সুস্বাস্থ্য ও আস্থা বজায় রাখাই আমাদের মূল লক্ষ্য।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <Check className="w-4 h-4" />
                <span>প্রমাণিত গুণমান</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
