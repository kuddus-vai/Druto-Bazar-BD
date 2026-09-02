/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CartItem,
  DeliveryAddress,
  Order,
  OrderItemSnapshot,
  PaymentMethod,
  OrderStatus,
  PaymentStatus,
  Product,
  DeliveryZone,
  Coupon,
} from '../types';
import { calculateOrderPricing } from './pricing.service';

/**
 * Validates Bangladeshi 11-digit phone numbers
 * Accepts formats: 01XXXXXXXXX, +8801XXXXXXXXX, 8801XXXXXXXXX, 01806-578737
 */
export function isValidBangladeshiPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;
  return bdPhoneRegex.test(cleaned);
}

export function validateBangladeshiPhone(phone: string): { isValid: boolean; message?: string } {
  if (!phone || !phone.trim()) {
    return { isValid: false, message: 'মোবাইল নম্বর প্রদান আবশ্যক' };
  }
  const cleaned = phone.replace(/[\s\-()]/g, '');
  if (!/^\+?\d+$/.test(cleaned)) {
    return { isValid: false, message: 'মোবাইল নম্বরে শুধুমাত্র সংখ্যা হতে হবে' };
  }
  if (!isValidBangladeshiPhone(phone)) {
    return { isValid: false, message: 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01806578737)' };
  }
  return { isValid: true };
}

/**
 * Generates an audit-safe order number: ORD-YYYYMMDD-XXXX
 */
export function generateOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${dateStr}-${randomSuffix}`;
}

export interface CreateOrderParams {
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  address: DeliveryAddress;
  deliveryZone: DeliveryZone;
  paymentMethod: PaymentMethod | string;
  transactionId?: string;
  coupon?: Coupon | null;
  notes?: string;
  availableProducts: Product[];
}

export interface CreateOrderResult {
  success: boolean;
  order?: Order;
  errorMessage?: string;
}

/**
 * Validates stock, calculates pricing authoritatively, and produces an immutable Order Snapshot.
 */
export function createOrderSnapshot(params: CreateOrderParams): CreateOrderResult {
  const {
    items,
    customerName,
    customerPhone,
    address,
    deliveryZone,
    paymentMethod,
    transactionId,
    coupon,
    notes,
    availableProducts,
  } = params;

  if (!items || items.length === 0) {
    return { success: false, errorMessage: 'কার্ট খালি! অনুগ্রহ করে পণ্য যুক্ত করুন।' };
  }

  if (!customerName || customerName.trim().length < 2) {
    return { success: false, errorMessage: 'অনুগ্রহ করে সঠিক নাম প্রদান করুন।' };
  }

  const phoneVal = validateBangladeshiPhone(customerPhone);
  if (!phoneVal.isValid) {
    return { success: false, errorMessage: phoneVal.message || '১১ ডিজিটের সঠিক মোবাইল নম্বর দিন।' };
  }

  const addressText = address.streetAddress || address.addressLine || '';
  if (!addressText || addressText.trim().length < 5) {
    return { success: false, errorMessage: 'অনুগ্রহ করে বিস্তারিত ডেলিভারি ঠিকানা প্রদান করুন।' };
  }

  // Stock verification & Snapshot construction
  const itemSnapshots: OrderItemSnapshot[] = [];

  for (const item of items) {
    const product = availableProducts.find((p) => p.id === item.productId);
    if (!product || !product.isActive) {
      return { success: false, errorMessage: `"${item.product.nameBn}" পণ্যটি বর্তমানে পাওয়া যাচ্ছে না।` };
    }

    let unitPrice: number;
    let availableStock: number;
    let sku = product.sku || `SKU-${product.id}`;
    let variantName: string | undefined = undefined;

    if (item.variantId && product.variants) {
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant || !variant.isActive) {
        return { success: false, errorMessage: 'পণ্যটির নির্বাচিত ভ্যারিয়েন্টটি পাওয়া যাচ্ছে না।' };
      }
      unitPrice = variant.salePrice ?? variant.price;
      availableStock = variant.stockQuantity;
      sku = variant.sku;
      variantName = variant.name;
    } else {
      unitPrice = product.salePrice ?? product.price;
      availableStock = product.stockQuantity;
    }

    if (item.quantity > availableStock) {
      return {
        success: false,
        errorMessage: `"${product.nameBn}" এর স্টক শেষ! সর্বোচ্চ ${availableStock} টি অর্ডার করতে পারেন।`,
      };
    }

    itemSnapshots.push({
      productId: product.id,
      variantId: item.variantId,
      productNameBn: product.nameBn,
      productNameEn: product.nameEn,
      sku,
      unitPrice,
      quantity: item.quantity,
      totalPrice: unitPrice * item.quantity,
      productImage: product.imageUrl,
      unit: product.unit,
      variantName,
    });
  }

  // Authoritative pricing
  const pricing = calculateOrderPricing(items, deliveryZone, coupon);

  const isCOD = paymentMethod === PaymentMethod.CASH_ON_DELIVERY || paymentMethod === 'cod';

  const newOrder: Order = {
    id: `ord-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    orderNumber: generateOrderNumber(),
    status: OrderStatus.PENDING,
    paymentStatus: isCOD ? PaymentStatus.UNPAID : (transactionId ? PaymentStatus.PAID : PaymentStatus.UNPAID),
    paymentMethod: paymentMethod as PaymentMethod,
    transactionId: transactionId || undefined,
    subtotal: pricing.subtotal,
    discount: pricing.discount,
    deliveryFee: pricing.deliveryFee,
    total: pricing.total,
    couponCode: pricing.couponApplied?.code,
    customerName: customerName.trim(),
    customerPhone: customerPhone.trim(),
    address: { ...address },
    items: itemSnapshots,
    notes: notes?.trim() || undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return { success: true, order: newOrder };
}
