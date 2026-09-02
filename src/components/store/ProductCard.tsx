/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Check, Sparkles, Eye, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
  isFlashHighlight?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isFlashHighlight }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    setActiveModal,
  } = useStore();

  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0].id : undefined
  );
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const selectedVariant = product.variants?.find((v) => v.id === selectedVariantId);
  const currentPrice = selectedVariant
    ? selectedVariant.price
    : product.price;
  const currentSalePrice = selectedVariant
    ? selectedVariant.salePrice
    : product.salePrice;

  const discountPercent = currentSalePrice
    ? Math.round(((currentPrice - currentSalePrice) / currentPrice) * 100)
    : 0;

  const isFavorite = isInWishlist(product.id);
  const stock = selectedVariant ? selectedVariant.stockQuantity : product.stockQuantity;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariantId, 1, false);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  const handleQuickView = () => {
    setSelectedProduct(product);
    setActiveModal('product-detail');
  };

  return (
    <div
      onClick={handleQuickView}
      id={`product-card-${product.slug}`}
      className={`group relative bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
        isFlashHighlight
          ? 'border-amber-200 hover:border-amber-400 shadow-md ring-1 ring-amber-400/20'
          : 'border-stone-200/90 hover:border-emerald-300'
      }`}
    >
      {/* Top Media & Badges */}
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.imageUrl}
          alt={product.nameBn}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/600x400/e2e8f0/475569?text=${encodeURIComponent(product.nameBn)}`;
          }}
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-[11px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
            <span>-{discountPercent}%</span>
            <span className="hidden sm:inline">ছাড়</span>
          </div>
        )}

        {/* Purity Badge */}
        {product.purityGuarantee && (
          <div className="absolute bottom-2.5 left-2.5 bg-emerald-900/85 backdrop-blur-md text-emerald-100 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span className="truncate max-w-[120px]">{product.purityGuarantee}</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          id={`wishlist-btn-${product.id}`}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorite
              ? 'bg-rose-50 text-rose-500 shadow-md scale-110'
              : 'bg-white/80 hover:bg-white text-stone-500 hover:text-rose-500 shadow-sm'
          }`}
          title="পছন্দের তালিকায় যুক্ত করুন"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-stone-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            <span>বিস্তারিত দেখুন</span>
          </span>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Origin */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-stone-800 text-xs">{product.rating}</span>
              <span className="text-stone-400 text-[11px]">({product.reviewCount})</span>
            </div>
            {product.origin && (
              <span className="text-[11px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-medium truncate max-w-[100px]">
                {product.origin}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-stone-900 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.nameBn}
          </h3>

          {/* Variants Selector Pills (if variants exist) */}
          {product.variants && product.variants.length > 1 && (
            <div
              className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 scrollbar-none"
              onClick={(e) => e.stopPropagation()}
            >
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantId(v.id)}
                  className={`text-[11px] px-2 py-0.5 rounded-md font-medium whitespace-nowrap transition-all ${
                    selectedVariantId === v.id
                      ? 'bg-emerald-700 text-white font-bold shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-emerald-800 tracking-tight">
                ৳{currentSalePrice ?? currentPrice}
              </span>
              {currentSalePrice && (
                <span className="text-xs text-stone-400 line-through font-normal">
                  ৳{currentPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-500 font-medium">
              {selectedVariant ? selectedVariant.name : product.unit}
            </span>
          </div>

          {/* Add To Cart / Direct Button */}
          <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
            id={`btn-add-cart-${product.id}`}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
              stock <= 0
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : isAddedRecently
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-95'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">যুক্ত হয়েছে</span>
              </>
            ) : stock <= 0 ? (
              <span>স্টক শেষ</span>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>অর্ডার</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
