/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartItem, Coupon, DeliveryZone, PricingCalculationResult } from '../types';

export const FREE_DELIVERY_THRESHOLD = 1500; // Free delivery for orders ৳1500 or above

/**
 * Calculates item price based on active variant or base product
 */
export function getItemEffectiveUnitPrice(item: CartItem): number {
  if (item.selectedVariant) {
    return item.selectedVariant.salePrice ?? item.selectedVariant.price;
  }
  return item.product.salePrice ?? item.product.price;
}

/**
 * Authoritative pricing calculation engine.
 * Never trust pricing from untrusted client payloads.
 */
export function calculateOrderPricing(
  items: CartItem[],
  zone: DeliveryZone | null,
  coupon?: Coupon | null
): PricingCalculationResult {
  // 1. Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = getItemEffectiveUnitPrice(item);
    const qty = Math.max(1, Math.floor(item.quantity || 1));
    return sum + unitPrice * qty;
  }, 0);

  // 2. Determine base delivery fee (supports both zone.deliveryFee and zone.fee)
  const baseDeliveryFee = zone ? (zone.deliveryFee ?? zone.fee ?? 60) : 60;
  let isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD && subtotal > 0;

  // 3. Process coupon if provided
  let discount = 0;
  let couponApplied: Coupon | undefined = undefined;
  let couponError: string | undefined = undefined;

  if (coupon && coupon.isActive) {
    const now = new Date();
    const expiry = coupon.expiresAt ? new Date(coupon.expiresAt) : null;
    const start = coupon.startsAt ? new Date(coupon.startsAt) : null;
    const minSpend = coupon.minOrderAmount ?? coupon.minimumOrder ?? 0;
    const couponType = coupon.discountType ?? coupon.type ?? 'percentage';
    const couponVal = coupon.discountValue ?? coupon.value ?? 0;

    if (expiry && now > expiry) {
      couponError = 'কুপনের মেয়াদ শেষ হয়ে গেছে।';
    } else if (start && now < start) {
      couponError = 'কুপনটি এখনো শুরু হয়নি।';
    } else if (subtotal < minSpend) {
      couponError = `এই কুপনটি ব্যবহার করতে ন্যূনতম ৳${minSpend} টাকার অর্ডার প্রয়োজন।`;
    } else {
      couponApplied = coupon;
      if (couponType === 'percentage') {
        const calculatedDiscount = Math.round((subtotal * couponVal) / 100);
        discount = coupon.maximumDiscount
          ? Math.min(calculatedDiscount, coupon.maximumDiscount)
          : calculatedDiscount;
      } else if (couponType === 'fixed') {
        discount = Math.min(couponVal, subtotal);
      } else if (couponType === 'free_delivery') {
        isFreeDelivery = true;
      }
    }
  } else if (coupon && !coupon.isActive) {
    couponError = 'কুপনটি বর্তমানে সক্রিয় নেই।';
  }

  const effectiveDeliveryFee = isFreeDelivery || subtotal === 0 ? 0 : baseDeliveryFee;
  const total = Math.max(0, subtotal - discount + effectiveDeliveryFee);

  return {
    subtotal,
    discount,
    deliveryFee: effectiveDeliveryFee,
    total,
    isFreeDelivery,
    couponApplied,
    couponError,
  };
}
