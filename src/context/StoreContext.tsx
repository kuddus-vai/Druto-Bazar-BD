/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  Coupon,
  Banner,
  Review,
  DeliveryZone,
  InventoryMovement,
  PaymentMethod,
  DeliveryAddress,
  OrderStatus,
  PaymentStatus,
  ProductVariant,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_BANNERS,
  INITIAL_COUPONS,
  INITIAL_DELIVERY_ZONES,
  INITIAL_REVIEWS,
  INITIAL_ORDERS,
} from '../data/initialData';
import { calculateOrderPricing } from '../services/pricing.service';
import { createOrderSnapshot, CreateOrderResult } from '../services/order.service';
import { createOrderInventoryMovements, applyOrderStockDecrement } from '../services/inventory.service';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextType {
  products: Product[];
  categories: Category[];
  banners: Banner[];
  coupons: Coupon[];
  reviews: Review[];
  orders: Order[];
  deliveryZones: DeliveryZone[];
  inventoryMovements: InventoryMovement[];
  cart: CartItem[];
  wishlist: string[];
  appliedCoupon: Coupon | null;
  selectedDeliveryZone: DeliveryZone;
  searchQuery: string;
  selectedCategoryId: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  currentView: 'store' | 'admin' | 'order-tracker';
  activeModal: string | null;
  selectedProduct: Product | null;
  lastCreatedOrder: Order | null;
  toasts: ToastInfo[];

  // Setters & Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategoryId: (catId: string) => void;
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest') => void;
  setCurrentView: (view: 'store' | 'admin' | 'order-tracker') => void;
  setActiveModal: (modal: string | null) => void;
  setSelectedProduct: (product: Product | null) => void;
  setSelectedDeliveryZone: (zone: DeliveryZone) => void;

  // Cart
  addToCart: (product: Product, variantId?: string, quantity?: number, openDrawer?: boolean) => void;
  updateCartQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  clearCart: () => void;
  cartTotalCount: number;

  // Coupon
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders & Checkout
  processCheckout: (
    customerName: string,
    customerPhone: string,
    address: DeliveryAddress,
    paymentMethod: PaymentMethod,
    transactionId?: string,
    notes?: string
  ) => CreateOrderResult;

  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => void;

  // Admin Actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  updateBanner: (banner: Banner) => void;
  deleteBanner: (bannerId: string) => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  toggleCouponStatus: (couponId: string) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'isApproved'>) => void;
  toggleReviewApproval: (reviewId: string) => void;
  addStockMovement: (
    productId: string,
    quantity: number,
    type: 'restock' | 'adjustment' | 'damage',
    note: string,
    variantId?: string
  ) => void;
  resetToDefaultData: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'db_products_v5',
  CATEGORIES: 'db_categories_v5',
  BANNERS: 'db_banners_v5',
  COUPONS: 'db_coupons_v5',
  REVIEWS: 'db_reviews_v5',
  ORDERS: 'db_orders_v5',
  CART: 'db_cart_v5',
  WISHLIST: 'db_wishlist_v5',
  MOVEMENTS: 'db_movements_v5',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization with localStorage fallback
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BANNERS);
      return saved ? JSON.parse(saved) : INITIAL_BANNERS;
    } catch {
      return INITIAL_BANNERS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [deliveryZones] = useState<DeliveryZone[]>(INITIAL_DELIVERY_ZONES);
  const [selectedDeliveryZone, setSelectedDeliveryZone] = useState<DeliveryZone>(INITIAL_DELIVERY_ZONES[0]);

  const [inventoryMovements, setInventoryMovements] = useState<InventoryMovement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MOVEMENTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [currentView, setCurrentView] = useState<'store' | 'admin' | 'order-tracker'>('store');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Persistent sync effects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(banners));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [banners]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(inventoryMovements));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [inventoryMovements]);

  // Toast notification helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Cart operations
  const addToCart = (
    product: Product,
    variantId?: string,
    quantity = 1,
    openDrawer = false
  ) => {
    let selectedVariant: ProductVariant | undefined = undefined;
    let maxAvailable = product.stockQuantity;
    let unitPrice = product.salePrice ?? product.price;

    if (variantId && product.variants) {
      selectedVariant = product.variants.find((v) => v.id === variantId);
      if (selectedVariant) {
        maxAvailable = selectedVariant.stockQuantity;
        unitPrice = selectedVariant.salePrice ?? selectedVariant.price;
      }
    }

    if (maxAvailable <= 0) {
      showToast('দুঃখিত, এই পণ্যটির স্টক বর্তমানে শেষ!', 'error');
      return;
    }

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.productId === product.id && item.variantId === variantId
      );

      if (existingIdx > -1) {
        const newQty = prev[existingIdx].quantity + quantity;
        if (newQty > maxAvailable) {
          showToast(`সর্বোচ্চ স্টক (${maxAvailable}) অতিক্রম করেছে`, 'error');
          return prev;
        }
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          unitPrice,
        };
        return updated;
      }

      return [
        ...prev,
        {
          productId: product.id,
          variantId,
          product,
          selectedVariant,
          quantity: Math.min(quantity, maxAvailable),
          unitPrice,
        },
      ];
    });

    showToast(`"${product.nameBn}" কার্টে যুক্ত হয়েছে`, 'success');
    if (openDrawer) {
      setActiveModal('cart');
    }
  };

  const updateCartQuantity = (productId: string, variantId: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.variantId === variantId) {
          const maxStock = item.selectedVariant
            ? item.selectedVariant.stockQuantity
            : item.product.stockQuantity;
          const safeQty = Math.min(quantity, maxStock);
          return { ...item, quantity: safeQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.productId === productId && item.variantId === variantId))
    );
    showToast('পণ্যটি কার্ট থেকে সরানো হয়েছে', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Coupon handling
  const applyCouponCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const foundCoupon = coupons.find((c) => c.code.toUpperCase() === cleanCode);

    if (!foundCoupon) {
      showToast('ভুল কুপন কোড! অনুগ্রহ করে সঠিক কোড দিন।', 'error');
      return { success: false, message: 'ভুল কুপন কোড!' };
    }

    const testPricing = calculateOrderPricing(cart, selectedDeliveryZone, foundCoupon);
    if (testPricing.couponError) {
      showToast(testPricing.couponError, 'error');
      return { success: false, message: testPricing.couponError };
    }

    setAppliedCoupon(foundCoupon);
    showToast(`কুপন "${foundCoupon.code}" সফলভাবে যুক্ত হয়েছে!`, 'success');
    return { success: true, message: 'কুপন প্রয়োগ হয়েছে' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('কুপন বাতিল করা হয়েছে', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('পছন্দের তালিকা থেকে সরানো হয়েছে', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('পছন্দের তালিকায় যুক্ত হয়েছে ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Checkout process
  const processCheckout = (
    customerName: string,
    customerPhone: string,
    address: DeliveryAddress,
    paymentMethod: PaymentMethod,
    transactionId?: string,
    notes?: string
  ): CreateOrderResult => {
    const orderResult = createOrderSnapshot({
      items: cart,
      customerName,
      customerPhone,
      address,
      deliveryZone: selectedDeliveryZone,
      paymentMethod,
      transactionId,
      coupon: appliedCoupon,
      notes,
      availableProducts: products,
    });

    if (!orderResult.success || !orderResult.order) {
      showToast(orderResult.errorMessage || 'অর্ডার করতে সমস্যা হয়েছে', 'error');
      return orderResult;
    }

    const newOrder = orderResult.order;

    // 1. Update orders list
    setOrders((prev) => [newOrder, ...prev]);

    // 2. Decrement stock levels
    setProducts((prev) => applyOrderStockDecrement(prev, newOrder));

    // 3. Create inventory movement audit records
    const movements = createOrderInventoryMovements(newOrder);
    setInventoryMovements((prev) => [...movements, ...prev]);

    // 4. Update coupon used count if used
    if (appliedCoupon) {
      setCoupons((prev) =>
        prev.map((c) => (c.id === appliedCoupon.id ? { ...c, usedCount: c.usedCount + 1 } : c))
      );
    }

    // 5. Clear cart and set last created order
    setCart([]);
    setAppliedCoupon(null);
    setLastCreatedOrder(newOrder);
    setActiveModal('order-success');
    showToast(`অর্ডার #${newOrder.orderNumber} সফলভাবে গ্রহণ করা হয়েছে!`, 'success');

    return { success: true, order: newOrder };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o))
    );
    showToast(`অর্ডারের স্ট্যাটাস পরিবর্তন করা হয়েছে: ${status}`, 'info');
  };

  const updatePaymentStatus = (orderId: string, status: PaymentStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: status, updatedAt: new Date().toISOString() } : o))
    );
    showToast(`পেমেন্ট স্ট্যাটাস আপডেট করা হয়েছে: ${status}`, 'info');
  };

  // Product Admin
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`নতুন পণ্য "${newProd.nameBn}" যুক্ত হয়েছে!`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : p))
    );
    showToast(`পণ্য "${updated.nameBn}" আপডেট করা হয়েছে!`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('পণ্যটি মুছে ফেলা হয়েছে', 'info');
  };

  // Categories Admin
  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`ক্যাটাগরি "${newCat.nameBn}" যুক্ত হয়েছে`, 'success');
  };

  const updateCategory = (updated: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast(`ক্যাটাগরি "${updated.nameBn}" আপডেট করা হয়েছে`, 'success');
  };

  // Banners Admin
  const addBanner = (bannerData: Omit<Banner, 'id'>) => {
    const newBanner: Banner = {
      ...bannerData,
      id: `banner-${Date.now()}`,
    };
    setBanners((prev) => [...prev, newBanner]);
    showToast('নতুন ব্যানার যুক্ত হয়েছে', 'success');
  };

  const updateBanner = (updated: Banner) => {
    setBanners((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    showToast('ব্যানার আপডেট হয়েছে', 'success');
  };

  const deleteBanner = (bannerId: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== bannerId));
    showToast('ব্যানার মুছে ফেলা হয়েছে', 'info');
  };

  // Coupons Admin
  const addCoupon = (couponData: Omit<Coupon, 'id'>) => {
    const newCoup: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
    };
    setCoupons((prev) => [...prev, newCoup]);
    showToast(`কুপন "${newCoup.code}" তৈরি হয়েছে`, 'success');
  };

  const toggleCouponStatus = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c))
    );
    showToast('কুপনের সক্রিয়তা পরিবর্তন করা হয়েছে', 'info');
  };

  // Reviews Admin
  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt' | 'isApproved'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isApproved: true, // Auto approved for instant customer feedback
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('আপনার মূল্যবান রিভিউটির জন্য ধন্যবাদ!', 'success');
  };

  const toggleReviewApproval = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, isApproved: !r.isApproved } : r))
    );
  };

  // Inventory movements
  const addStockMovement = (
    productId: string,
    quantity: number,
    type: 'restock' | 'adjustment' | 'damage',
    note: string,
    variantId?: string
  ) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    const newMov: InventoryMovement = {
      id: `inv-${Date.now()}`,
      productId,
      productName: prod.nameBn,
      variantId,
      type,
      quantity,
      note,
      createdAt: new Date().toISOString(),
    };

    setInventoryMovements((prev) => [newMov, ...prev]);

    // Update product stock
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        if (variantId && p.variants) {
          return {
            ...p,
            stockQuantity: Math.max(0, p.stockQuantity + quantity),
            variants: p.variants.map((v) =>
              v.id === variantId ? { ...v, stockQuantity: Math.max(0, v.stockQuantity + quantity) } : v
            ),
          };
        }
        return {
          ...p,
          stockQuantity: Math.max(0, p.stockQuantity + quantity),
        };
      })
    );

    showToast('স্টক আপডেট ও অডিট রেকর্ড সংরক্ষণ করা হয়েছে', 'success');
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setBanners(INITIAL_BANNERS);
    setCoupons(INITIAL_COUPONS);
    setReviews(INITIAL_REVIEWS);
    setOrders(INITIAL_ORDERS);
    setCart([]);
    setWishlist([]);
    setInventoryMovements([]);
    setAppliedCoupon(null);
    showToast('সকল ডেটা সফলভাবে ডিফল্ট অবস্থায় রিসেট করা হয়েছে!', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        banners,
        coupons,
        reviews,
        orders,
        deliveryZones,
        inventoryMovements,
        cart,
        wishlist,
        appliedCoupon,
        selectedDeliveryZone,
        searchQuery,
        selectedCategoryId,
        sortBy,
        currentView,
        activeModal,
        selectedProduct,
        lastCreatedOrder,
        toasts,
        setSearchQuery,
        setSelectedCategoryId,
        setSortBy,
        setCurrentView,
        setActiveModal,
        setSelectedProduct,
        setSelectedDeliveryZone,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        applyCouponCode,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        processCheckout,
        updateOrderStatus,
        updatePaymentStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        addBanner,
        updateBanner,
        deleteBanner,
        addCoupon,
        toggleCouponStatus,
        addReview,
        toggleReviewApproval,
        addStockMovement,
        resetToDefaultData,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
