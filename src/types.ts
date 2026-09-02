/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  UNPAID = 'pending',
}

export enum PaymentMethod {
  CASH_ON_DELIVERY = 'cod',
  BKASH = 'bkash',
  NAGAD = 'nagad',
  ROCKET = 'rocket',
}

export enum CouponType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
  FREE_DELIVERY = 'free_delivery',
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "500g", "1kg", "2kg", "5L", "250ml"
  sku: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  isActive: boolean;
}

export interface Product {
  id: string;
  categoryId: string;
  nameBn: string;
  nameEn: string;
  slug: string;
  descriptionBn: string;
  descriptionEn?: string;
  sku?: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  lowStockThreshold?: number;
  unit: string; // e.g. "কেজি", "লিটার", "গ্রাম", "প্যাক"
  brand: string;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  flashSaleEndsAt?: string;
  isActive: boolean;
  imageUrl: string;
  galleryImages?: string[];
  variants?: ProductVariant[];
  rating: number;
  reviewCount: number;
  tags?: string[];
  origin?: string; // e.g. "সুন্দরবন", "পাবনা", "যশোর", "সিলেট"
  purityGuarantee?: string; // e.g. "১০০% কাঠের ঘানি ভাঙা", "প্রাকৃতিক চাক থেকে সংগৃহীত"
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
  descriptionBn?: string;
  imageUrl: string;
  iconName?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export interface OrderItemSnapshot {
  productId: string;
  variantId?: string;
  productNameBn: string;
  productNameEn?: string;
  productImage?: string;
  sku?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  unit?: string;
  variantName?: string;
}

export interface DeliveryAddress {
  streetAddress?: string;
  city?: string;
  zoneId?: string;
  postalCode?: string;
  recipientName?: string;
  phone?: string;
  altPhone?: string;
  division?: string;
  district?: string;
  area?: string;
  addressLine?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod | string;
  transactionId?: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode?: string;
  customerName: string;
  customerPhone: string;
  address: DeliveryAddress;
  items: OrderItemSnapshot[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType?: 'percentage' | 'fixed' | 'free_delivery';
  discountValue?: number;
  type?: 'percentage' | 'fixed' | 'free_delivery';
  value?: number;
  minOrderAmount?: number;
  minimumOrder?: number;
  maximumDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  startsAt?: string;
  expiresAt?: string;
  isActive: boolean;
  descriptionBn: string;
}

export interface Banner {
  id: string;
  titleBn: string;
  subtitleBn: string;
  badgeBn?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  ctaTextBn: string;
  ctaUrl?: string;
  sortOrder?: number;
  isActive: boolean;
  backgroundColor?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userPhoneMasked?: string;
  rating: number;
  commentBn: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: string;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  variantId?: string;
  type: string;
  quantity: number;
  referenceType?: string;
  referenceId?: string;
  note: string;
  createdAt: string;
}

export interface DeliveryZone {
  id: string;
  nameBn: string;
  nameEn: string;
  deliveryFee?: number;
  fee?: number;
  estimatedDelivery?: string;
  estimatedDaysBn?: string;
  isActive?: boolean;
  districts?: string[];
}

export interface PricingCalculationResult {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  isFreeDelivery: boolean;
  couponApplied?: Coupon;
  couponError?: string;
}

export interface TestCaseResult {
  suiteName: string;
  testName: string;
  passed: boolean;
  durationMs: number;
  errorMessage?: string;
  assertionsCount: number;
}
