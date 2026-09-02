/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  ShoppingCart,
  Zap,
  Plus,
  Minus,
  Check,
  Heart,
  Share2,
  MapPin,
  Flame,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    activeModal,
    setActiveModal,
    addToCart,
    toggleWishlist,
    isInWishlist,
    products,
    showToast,
  } = useStore();

  if (activeModal !== 'product-detail' || !selectedProduct) return null;

  const [activeImage, setActiveImage] = useState<string>(selectedProduct.imageUrl);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    selectedProduct.variants && selectedProduct.variants.length > 0
      ? selectedProduct.variants[0].id
      : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);

  const selectedVariant = selectedProduct.variants?.find((v) => v.id === selectedVariantId);
  const price = selectedVariant ? selectedVariant.price : selectedProduct.price;
  const salePrice = selectedVariant ? selectedVariant.salePrice : selectedProduct.salePrice;
  const stock = selectedVariant ? selectedVariant.stockQuantity : selectedProduct.stockQuantity;

  const discountPercent = salePrice
    ? Math.round(((price - salePrice) / price) * 100)
    : 0;

  const isFavorite = isInWishlist(selectedProduct.id);

  const handleAddToCart = (openDrawer = false) => {
    addToCart(selectedProduct, selectedVariantId, quantity, openDrawer);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedVariantId, quantity, false);
    setActiveModal('checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: selectedProduct.nameBn,
          text: `দ্রুত বাজার বিডি থেকে অর্ডার করুন ${selectedProduct.nameBn}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('প্রোডাক্ট লিংক কপি করা হয়েছে!', 'success');
    }
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.categoryId === selectedProduct.categoryId && p.id !== selectedProduct.id && p.isActive)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setActiveModal(null);
            setSelectedProduct(null);
          }}
          id="btn-close-product-detail"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-100/90 hover:bg-stone-200 text-stone-700 transition-all shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left: Gallery Column */}
          <div className="p-6 sm:p-8 bg-stone-50/70 border-b md:border-b-0 md:border-r border-stone-200 flex flex-col justify-between">
            <div>
              {/* Main Active Image with Zoom framing */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-stone-200/80 shadow-sm mb-4">
                <img
                  src={activeImage}
                  alt={selectedProduct.nameBn}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/600x400/e2e8f0/475569?text=${encodeURIComponent(selectedProduct.nameBn)}`;
                  }}
                />
                {discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-md">
                    -{discountPercent}% ছাড়
                  </span>
                )}
                {selectedProduct.isFlashSale && (
                  <span className="absolute bottom-3 left-3 bg-amber-500 text-stone-950 font-bold text-[11px] px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>আজকের মেগা ডিল</span>
                  </span>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {selectedProduct.galleryImages && selectedProduct.galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {selectedProduct.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImage === img
                          ? 'border-emerald-600 ring-2 ring-emerald-500/20'
                          : 'border-stone-200 hover:border-emerald-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://placehold.co/600x400/e2e8f0/475569?text=Thumbnail`;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Authenticity & Guarantee Highlights */}
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-2 text-emerald-900">
              <div className="flex items-center gap-2 font-bold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{selectedProduct.purityGuarantee || '১০০% ভেজালমুক্ত খাঁটি পণ্যের নিশ্চয়তা'}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ঢাকা সিটিতে ২৪ ঘণ্টায় ও সারাদেশে ৪৮-৭২ ঘণ্টায় ক্যাশ অন ডেলিভারি</span>
              </div>
            </div>
          </div>

          {/* Right: Info & Purchase Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header Badges & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(selectedProduct.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-stone-800">
                    {selectedProduct.rating}
                  </span>
                  <span className="text-xs text-stone-400">
                    ({selectedProduct.reviewCount} টি রিভিউ)
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`p-2 rounded-full border transition-all ${
                      isFavorite
                        ? 'bg-rose-50 border-rose-200 text-rose-500'
                        : 'border-stone-200 text-stone-500 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full border border-stone-200 text-stone-500 hover:text-stone-800"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title & Brand */}
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug mb-1">
                {selectedProduct.nameBn}
              </h2>
              <p className="text-xs text-stone-500 font-medium mb-3">
                {selectedProduct.nameEn} • ব্র‍্যান্ড: <span className="font-bold text-stone-700">{selectedProduct.brand}</span>
              </p>

              {/* Origin badge if exists */}
              {selectedProduct.origin && (
                <div className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 px-2.5 py-1 rounded-lg text-xs font-semibold mb-4">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>উৎস: {selectedProduct.origin}</span>
                </div>
              )}

              {/* Pricing Display */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 mb-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-800 tracking-tight">
                    ৳{salePrice ?? price}
                  </span>
                  {salePrice && (
                    <span className="text-sm sm:text-base text-stone-400 line-through font-medium">
                      ৳{price}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                      আপনি সাশ্রয় করছেন ৳{price - salePrice!}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-xs">
                  <span className="text-stone-500">স্টক স্ট্যাটাস:</span>
                  {stock > 0 ? (
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> স্টকে আছে ({stock} {selectedProduct.unit})
                    </span>
                  ) : (
                    <span className="font-bold text-red-600">স্টক শেষ</span>
                  )}
                </div>
              </div>

              {/* Variants Selector */}
              {selectedProduct.variants && selectedProduct.variants.length > 1 && (
                <div className="mb-5">
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    প্যাকেজের সাইজ বা ওজন নির্বাচন করুন:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          selectedVariantId === v.id
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 text-emerald-950 font-bold'
                            : 'bg-white border-stone-200 hover:border-stone-300 text-stone-700'
                        }`}
                      >
                        <div className="text-xs">{v.name}</div>
                        <div className="text-xs font-bold text-emerald-700 mt-0.5">
                          ৳{v.salePrice ?? v.price}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold text-stone-700">পরিমাণ:</span>
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-stone-600 hover:bg-stone-100 disabled:opacity-40 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => Math.min(stock, prev + 1))}
                    disabled={quantity >= stock}
                    className="p-2 text-stone-600 hover:bg-stone-100 disabled:opacity-40 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-stone-500">
                  মোট: <strong>৳{(salePrice ?? price) * quantity}</strong>
                </span>
              </div>

              {/* Description & Details */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">
                  পণ্যের বিবরণ ও বৈশিষ্ট্য:
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line bg-stone-50/70 p-3.5 rounded-xl border border-stone-100">
                  {selectedProduct.descriptionBn}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-stone-200">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleAddToCart(true)}
                  disabled={stock <= 0}
                  id="modal-add-to-cart-btn"
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    justAdded
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-600 shadow-sm'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>যুক্ত হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>কার্টে যোগ করুন</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={stock <= 0}
                  id="modal-buy-now-btn"
                  className="py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>সরাসরি অর্ডার করুন</span>
                </button>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-stone-500">
                  🔒 ১০০% নিরাপদ চেকআউট • কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
