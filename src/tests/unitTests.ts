/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartItem, Coupon, DeliveryZone, Order, Product, OrderStatus, PaymentStatus, PaymentMethod } from '../types';
import { calculateOrderPricing, getItemEffectiveUnitPrice, FREE_DELIVERY_THRESHOLD } from '../services/pricing.service';
import { createOrderSnapshot, isValidBangladeshiPhone, validateBangladeshiPhone, generateOrderNumber } from '../services/order.service';
import { createOrderInventoryMovements, applyOrderStockDecrement } from '../services/inventory.service';
import { filterProducts } from '../services/search.service';

export interface AssertionDetail {
  message: string;
  details?: string;
}

export interface SuiteResult {
  suiteName: string;
  description: string;
  passed: boolean;
  durationMs: number;
  assertions: AssertionDetail[];
}

export interface FullTestReport {
  suites: SuiteResult[];
  totalSuites: number;
  passedSuites: number;
  totalAssertions: number;
  passedAssertions: number;
  failedAssertions: number;
  durationMs: number;
}

const mockProduct: Product = {
  id: 'test-prod-1',
  categoryId: 'cat-oil',
  nameBn: 'খাঁটি সরিষার তেল',
  nameEn: 'Pure Mustard Oil',
  slug: 'pure-mustard-oil',
  descriptionBn: 'কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল।',
  sku: 'TEST-OIL-01',
  price: 400,
  salePrice: 350,
  stockQuantity: 20,
  unit: '১ লিটার',
  brand: 'Drutho Bazar BD',
  isFeatured: true,
  isActive: true,
  imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
  rating: 4.8,
  reviewCount: 10,
  createdAt: '2026-08-01T00:00:00Z',
  updatedAt: '2026-08-01T00:00:00Z',
};

const mockZone: DeliveryZone = {
  id: 'zone-dhaka-city',
  nameBn: 'ঢাকা সিটির ভেতরে',
  nameEn: 'Inside Dhaka City',
  deliveryFee: 60,
  fee: 60,
  estimatedDelivery: '২৪ ঘণ্টার মধ্যে',
  isActive: true,
  districts: ['ঢাকা'],
};

export function runAllTests(): FullTestReport {
  const tStart = performance.now();
  const suites: SuiteResult[] = [];
  let totalAssertions = 0;
  let passedAssertions = 0;
  let failedAssertions = 0;

  function assert(condition: boolean, msg: string, details?: string, list?: AssertionDetail[]) {
    totalAssertions++;
    if (condition) {
      passedAssertions++;
      list?.push({ message: msg, details });
    } else {
      failedAssertions++;
      list?.push({ message: `FAIL: ${msg}`, details: details ? `Error details: ${details}` : 'Assertion condition evaluated to false' });
      throw new Error(`Assertion failed: ${msg}`);
    }
  }

  // Suite 1: Pricing & Calculation Engine
  {
    const sStart = performance.now();
    const assertions: AssertionDetail[] = [];
    let suitePassed = true;

    try {
      const cart: CartItem[] = [
        {
          productId: mockProduct.id,
          product: mockProduct,
          quantity: 2,
          unitPrice: 350,
        },
      ];
      const pricing = calculateOrderPricing(cart, mockZone, null);
      assert(pricing.subtotal === 700, 'Subtotal calculation (2 x ৳350 = ৳700)', `Calculated subtotal: ৳${pricing.subtotal}`, assertions);
      assert(pricing.deliveryFee === 60, 'Delivery fee applied correctly for Dhaka City (৳60)', `Delivery fee: ৳${pricing.deliveryFee}`, assertions);
      assert(pricing.total === 760, 'Total bill calculation (৳700 + ৳60 = ৳760)', `Calculated total: ৳${pricing.total}`, assertions);

      // Percentage Coupon with Cap
      const coupon: Coupon = {
        id: 'c1',
        code: 'TEST20',
        discountType: 'percentage',
        discountValue: 20,
        type: 'percentage',
        value: 20,
        minOrderAmount: 500,
        minimumOrder: 500,
        maximumDiscount: 100,
        usedCount: 0,
        isActive: true,
        descriptionBn: '20% discount up to ৳100',
      };
      const pricingWithCoupon = calculateOrderPricing(cart, mockZone, coupon);
      assert(pricingWithCoupon.discount === 100, 'Coupon maximum discount cap enforced (৳140 capped at ৳100)', `Calculated discount: ৳${pricingWithCoupon.discount}`, assertions);
      assert(pricingWithCoupon.total === 660, 'Total calculated accurately with discount (৳700 - ৳100 + ৳60 = ৳660)', `Final total: ৳${pricingWithCoupon.total}`, assertions);

      // Free shipping threshold
      const bulkCart: CartItem[] = [
        {
          productId: mockProduct.id,
          product: mockProduct,
          quantity: 5, // 5 * 350 = 1750 (>= 1500)
          unitPrice: 350,
        },
      ];
      const freeShipPricing = calculateOrderPricing(bulkCart, mockZone, null);
      assert(freeShipPricing.isFreeDelivery === true, 'Free delivery triggered when subtotal >= ৳1500', `Subtotal: ৳${freeShipPricing.subtotal}`, assertions);
      assert(freeShipPricing.deliveryFee === 0, 'Delivery fee waived to ৳0 for free shipping', `Fee: ৳${freeShipPricing.deliveryFee}`, assertions);
    } catch (e) {
      suitePassed = false;
    }

    suites.push({
      suiteName: '১. প্রাইসিং ও ডিসকাউন্ট ক্যালকুলেশন ইঞ্জিন',
      description: 'সাবটোটাল, কুপন ছাড়, ক্যাপ লিমিট ও ফ্রি ডেলিভারি ভ্যালিডেশন',
      passed: suitePassed,
      durationMs: +(performance.now() - sStart).toFixed(2),
      assertions,
    });
  }

  // Suite 2: Bangladeshi Phone & Order Validation
  {
    const sStart = performance.now();
    const assertions: AssertionDetail[] = [];
    let suitePassed = true;

    try {
      assert(isValidBangladeshiPhone('01806578737') === true, 'Standard 11-digit mobile 01806578737 passes validation', undefined, assertions);
      assert(isValidBangladeshiPhone('01994-228779') === true, 'Dashed Bangladeshi mobile number passes validation', undefined, assertions);
      assert(isValidBangladeshiPhone('+8801711223344') === true, '+880 International prefix passes validation', undefined, assertions);
      assert(isValidBangladeshiPhone('01234567890') === false, 'Invalid telecom operator prefix 012 is rejected', undefined, assertions);
      assert(isValidBangladeshiPhone('12345') === false, 'Short number string (< 11 digits) is rejected', undefined, assertions);

      const ordNumber = generateOrderNumber();
      assert(ordNumber.startsWith('ORD-'), 'Audit-safe order number generated with ORD- prefix', `Generated Order ID: ${ordNumber}`, assertions);
    } catch (e) {
      suitePassed = false;
    }

    suites.push({
      suiteName: '২. ফোন নম্বর ও অর্ডার ফরম্যাট ভ্যালিডেশন',
      description: '১১ ডিজিটের মোবাইল নম্বর ও অর্ডার নম্বর জেনারেটর',
      passed: suitePassed,
      durationMs: +(performance.now() - sStart).toFixed(2),
      assertions,
    });
  }

  // Suite 3: Order Snapshot & Stock Exhaustion Guard
  {
    const sStart = performance.now();
    const assertions: AssertionDetail[] = [];
    let suitePassed = true;

    try {
      const overStockCart: CartItem[] = [
        {
          productId: mockProduct.id,
          product: mockProduct,
          quantity: 50, // exceeds available stock 20
          unitPrice: 350,
        },
      ];

      const failedOrderResult = createOrderSnapshot({
        items: overStockCart,
        customerName: 'সাকিব আল হাসান',
        customerPhone: '01806578737',
        address: { streetAddress: 'বাড়ি ১২, ব্লক সি, বনশ্রী', city: 'ঢাকা' },
        deliveryZone: mockZone,
        paymentMethod: PaymentMethod.CASH_ON_DELIVERY,
        availableProducts: [mockProduct],
      });

      assert(failedOrderResult.success === false, 'Detects and rejects order exceeding available stock', failedOrderResult.errorMessage, assertions);

      const validOrderResult = createOrderSnapshot({
        items: [
          {
            productId: mockProduct.id,
            product: mockProduct,
            quantity: 2,
            unitPrice: 350,
          },
        ],
        customerName: 'মুশফিকুর রহিম',
        customerPhone: '01806578737',
        address: { streetAddress: 'রোড ৪, সেকশন ২, মিরপুর', city: 'ঢাকা' },
        deliveryZone: mockZone,
        paymentMethod: PaymentMethod.BKASH,
        transactionId: 'TXN998877',
        availableProducts: [mockProduct],
      });

      assert(validOrderResult.success === true, 'Successfully creates immutable Order Snapshot with verified stock', `Order #${validOrderResult.order?.orderNumber}`, assertions);
      assert(validOrderResult.order?.items[0].productNameBn === mockProduct.nameBn, 'Snapshot immutably retains localized product title', undefined, assertions);
      assert(validOrderResult.order?.paymentStatus === PaymentStatus.PAID, 'Bkash with Transaction ID marked as Paid', undefined, assertions);
    } catch (e) {
      suitePassed = false;
    }

    suites.push({
      suiteName: '৩. অর্ডার স্ন্যাপশট ও স্টক গার্ড ইঞ্জিন',
      description: 'অতিরিক্ত অর্ডার প্রতিরোধ ও ইমিউটেবল স্ন্যাপশট অডিট',
      passed: suitePassed,
      durationMs: +(performance.now() - sStart).toFixed(2),
      assertions,
    });
  }

  // Suite 4: Inventory Movement Ledger & Stock Decrement
  {
    const sStart = performance.now();
    const assertions: AssertionDetail[] = [];
    let suitePassed = true;

    try {
      const sampleOrder: Order = {
        id: 'ord-audit-1',
        orderNumber: 'ORD-20260901-1111',
        status: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.UNPAID,
        paymentMethod: PaymentMethod.CASH_ON_DELIVERY,
        subtotal: 700,
        discount: 0,
        deliveryFee: 60,
        total: 760,
        customerName: 'টেস্ট গ্রাহক',
        customerPhone: '01806578737',
        address: { streetAddress: 'বনশ্রী, ঢাকা', city: 'ঢাকা' },
        items: [
          {
            productId: mockProduct.id,
            productNameBn: mockProduct.nameBn,
            quantity: 3,
            unitPrice: 350,
            totalPrice: 1050,
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const movements = createOrderInventoryMovements(sampleOrder);
      assert(movements.length === 1, 'Generates 1 audit movement record for order item', undefined, assertions);
      assert(movements[0].quantity === -3, 'Recorded movement quantity is exactly -3', `Movement delta: ${movements[0].quantity}`, assertions);

      const updatedProds = applyOrderStockDecrement([mockProduct], sampleOrder);
      assert(updatedProds[0].stockQuantity === 17, 'Product stock correctly decremented from 20 to 17', `New Stock: ${updatedProds[0].stockQuantity}`, assertions);
    } catch (e) {
      suitePassed = false;
    }

    suites.push({
      suiteName: '৪. ইনভেন্টরি মুভমেন্ট অডিট ও স্টক লেজার',
      description: 'অর্ডারের সাথে সাথে স্টক সমন্বয় ও অডিট হিস্টোরি',
      passed: suitePassed,
      durationMs: +(performance.now() - sStart).toFixed(2),
      assertions,
    });
  }

  // Suite 5: Search & Multilingual Matching Engine
  {
    const sStart = performance.now();
    const assertions: AssertionDetail[] = [];
    let suitePassed = true;

    try {
      const list: Product[] = [
        mockProduct,
        {
          ...mockProduct,
          id: 'prod-honey',
          nameBn: 'সুন্দরবনের প্রাকৃতিক মধু',
          nameEn: 'Sundarbans Raw Natural Honey',
          slug: 'sundarbans-honey',
          brand: 'Drutho Natural',
          price: 900,
          salePrice: 800,
        },
      ];

      const searchBn = filterProducts(list, { searchQuery: 'সরিষা' });
      assert(searchBn.length === 1 && searchBn[0].id === 'test-prod-1', 'Bengali search for "সরিষা" successfully matches Pure Mustard Oil', undefined, assertions);

      const searchEn = filterProducts(list, { searchQuery: 'Honey' });
      assert(searchEn.length === 1 && searchEn[0].id === 'prod-honey', 'English search for "Honey" successfully matches Raw Honey', undefined, assertions);

      const sortedByPrice = filterProducts(list, { sortBy: 'price-asc' });
      assert(sortedByPrice[0].id === 'test-prod-1', 'Sorting by price-asc orders lowest price (৳350) first', undefined, assertions);
    } catch (e) {
      suitePassed = false;
    }

    suites.push({
      suiteName: '৫. বাংলা ও ইংরেজি সার্চ ও ফিল্টারিং ইঞ্জিন',
      description: 'দ্বিভাষিক সার্চ, ক্যাটাগরি ফিল্টার ও প্রাইস সর্টিং অ্যালগরিদম',
      passed: suitePassed,
      durationMs: +(performance.now() - sStart).toFixed(2),
      assertions,
    });
  }

  const passedSuites = suites.filter((s) => s.passed).length;
  const durationMs = +(performance.now() - tStart).toFixed(2);

  return {
    suites,
    totalSuites: suites.length,
    passedSuites,
    totalAssertions,
    passedAssertions,
    failedAssertions,
    durationMs,
  };
}

export const runAllUnitTests = runAllTests;
