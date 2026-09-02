/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export interface FilterOptions {
  searchQuery?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  onlyInStock?: boolean;
  onlyFlashSale?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

/**
 * Normalizes text for insensitive Bengali and English search matching
 */
export function normalizeSearchString(text: string): string {
  return text.trim().toLowerCase();
}

/**
 * Searches and filters products according to criteria
 */
export function filterProducts(products: Product[], options: FilterOptions): Product[] {
  return products.filter((p) => {
    // 1. Active status check
    if (!p.isActive) return false;

    // 2. Category filter
    if (options.categoryId && options.categoryId !== 'all' && p.categoryId !== options.categoryId) {
      return false;
    }

    // 3. Flash sale filter
    if (options.onlyFlashSale && !p.isFlashSale) {
      return false;
    }

    // 4. In stock filter
    if (options.onlyInStock && p.stockQuantity <= 0) {
      return false;
    }

    // 5. Price bounds
    const effectivePrice = p.salePrice ?? p.price;
    if (options.minPrice !== undefined && effectivePrice < options.minPrice) {
      return false;
    }
    if (options.maxPrice !== undefined && effectivePrice > options.maxPrice) {
      return false;
    }

    // 6. Search query matching across Bengali name, English name, SKU, Brand, Tags, and Origin
    if (options.searchQuery && options.searchQuery.trim()) {
      const q = normalizeSearchString(options.searchQuery);
      const nameBn = normalizeSearchString(p.nameBn);
      const nameEn = normalizeSearchString(p.nameEn);
      const sku = normalizeSearchString(p.sku);
      const brand = normalizeSearchString(p.brand);
      const origin = normalizeSearchString(p.origin || '');
      const tags = (p.tags || []).map((t) => normalizeSearchString(t));

      const match =
        nameBn.includes(q) ||
        nameEn.includes(q) ||
        sku.includes(q) ||
        brand.includes(q) ||
        origin.includes(q) ||
        tags.some((t) => t.includes(q));

      if (!match) return false;
    }

    return true;
  }).sort((a, b) => {
    const priceA = a.salePrice ?? a.price;
    const priceB = b.salePrice ?? b.price;

    switch (options.sortBy) {
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'featured':
      default:
        if (a.isFeatured === b.isFeatured) {
          return b.rating - a.rating;
        }
        return a.isFeatured ? -1 : 1;
    }
  });
}
