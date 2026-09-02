/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InventoryMovement, Order, Product } from '../types';

/**
 * Creates inventory audit logs for an order sale
 */
export function createOrderInventoryMovements(order: Order): InventoryMovement[] {
  return order.items.map((item) => ({
    id: `inv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    productId: item.productId,
    productName: item.productNameBn,
    variantId: item.variantId,
    type: 'order_sale',
    quantity: -item.quantity,
    referenceType: 'order',
    referenceId: order.orderNumber,
    note: `অর্ডার ${order.orderNumber} এর জন্য বিক্রয়`,
    createdAt: new Date().toISOString(),
  }));
}

/**
 * Applies inventory decrement to products list
 */
export function applyOrderStockDecrement(products: Product[], order: Order): Product[] {
  return products.map((prod) => {
    const orderedItems = order.items.filter((item) => item.productId === prod.id);
    if (orderedItems.length === 0) return prod;

    let updatedProd = { ...prod };

    for (const ordItem of orderedItems) {
      if (ordItem.variantId && updatedProd.variants) {
        updatedProd.variants = updatedProd.variants.map((v) => {
          if (v.id === ordItem.variantId) {
            return {
              ...v,
              stockQuantity: Math.max(0, v.stockQuantity - ordItem.quantity),
            };
          }
          return v;
        });
      }
      // Deduct from overall base stock
      updatedProd.stockQuantity = Math.max(0, updatedProd.stockQuantity - ordItem.quantity);
    }

    return updatedProd;
  });
}
