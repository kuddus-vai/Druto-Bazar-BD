/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, ThumbsUp, Send } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CustomerReviews: React.FC = () => {
  const { reviews, products, addReview, showToast } = useStore();
  const [showAddForm, setShowAddForm] = useState(false);

  const [formState, setFormState] = useState({
    userName: '',
    userPhone: '',
    productId: products[0]?.id || '',
    rating: 5,
    commentBn: '',
  });

  const approvedReviews = reviews.filter((r) => r.isApproved);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.userName.trim() || !formState.commentBn.trim()) {
      showToast('অনুগ্রহ করে নাম এবং আপনার মন্তব্য লিখুন', 'error');
      return;
    }

    const maskedPhone = formState.userPhone
      ? `${formState.userPhone.slice(0, 5)}-***${formState.userPhone.slice(-3)}`
      : undefined;

    addReview({
      productId: formState.productId,
      userName: formState.userName.trim(),
      userPhoneMasked: maskedPhone,
      rating: formState.rating,
      commentBn: formState.commentBn.trim(),
      isVerifiedPurchase: true,
    });

    setFormState({
      userName: '',
      userPhone: '',
      productId: products[0]?.id || '',
      rating: 5,
      commentBn: '',
    });
    setShowAddForm(false);
  };

  return (
    <section className="py-14 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              <span>ক্রেতাদের আসল অভিজ্ঞতা</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              সন্তুষ্ট গ্রাহকদের মতামত ও রিভিউ
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              আমাদের পণ্যের গুণমান ও সার্ভিসের ব্যাপারে ক্রেতাদের সরাসরি মন্তব্য
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            id="btn-write-review"
            className="self-start md:self-auto bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{showAddForm ? 'ফর্ম বন্ধ করুন' : 'আপনার মতামত লিখুন'}</span>
          </button>
        </div>

        {/* Review Submission Form Drawer/Card */}
        {showAddForm && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-10 p-6 bg-emerald-50/60 rounded-3xl border border-emerald-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-700" />
              <span>আপনার মূল্যবান রিভিউ প্রদান করুন</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: তানভীর আহমেদ"
                  value={formState.userName}
                  onChange={(e) => setFormState({ ...formState, userName: e.target.value })}
                  className="w-full bg-white text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">মোবাইল নম্বর (ঐচ্ছিক)</label>
                <input
                  type="tel"
                  placeholder="যেমন: 01806578737"
                  value={formState.userPhone}
                  onChange={(e) => setFormState({ ...formState, userPhone: e.target.value })}
                  className="w-full bg-white text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">কোন পণ্যটি কিনেছেন?</label>
                <select
                  value={formState.productId}
                  onChange={(e) => setFormState({ ...formState, productId: e.target.value })}
                  className="w-full bg-white text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nameBn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rating Stars Selector */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-stone-700 mb-1.5">আপনার রেটিং:</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setFormState({ ...formState, rating: star })}
                    className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= formState.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-stone-700 ml-2">
                  {formState.rating} স্টার
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-stone-700 mb-1">আপনার রিভিউ লিখুন *</label>
              <textarea
                rows={3}
                required
                placeholder="পণ্যের গুণমান, প্যাকেজিং ও সার্ভিসের অভিজ্ঞতা বিস্তারিত লিখুন..."
                value={formState.commentBn}
                onChange={(e) => setFormState({ ...formState, commentBn: e.target.value })}
                className="w-full bg-white text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>রিভিউ জমা দিন</span>
            </button>
          </form>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {approvedReviews.map((rev) => {
            const product = products.find((p) => p.id === rev.productId);

            return (
              <div
                key={rev.id}
                className="bg-stone-50 rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    {rev.isVerifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ভেরিফাইড বায়ার</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-4">
                    "{rev.commentBn}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-stone-900">{rev.userName}</h4>
                    {rev.userPhoneMasked && (
                      <span className="text-[10px] text-stone-400">{rev.userPhoneMasked}</span>
                    )}
                  </div>
                  {product && (
                    <span className="text-[10px] font-medium text-emerald-800 bg-white px-2 py-1 rounded border border-stone-200 truncate max-w-[110px]">
                      {product.nameBn}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
