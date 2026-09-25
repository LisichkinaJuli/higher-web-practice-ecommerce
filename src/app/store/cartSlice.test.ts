import { describe, it, expect, beforeEach } from '@jest/globals';
import cartReducer, {
  addItem,
  removeFromCart,
  changeQuantity,
  clearCart,
  selectCartItems,
  selectCartTotalCount,
  selectCartTotalPrice
} from './cartSlice';
import type { Product } from '../../types/product';
import type { RootState } from './store';

const mockProduct1: Product = {
  id: 'p-1',
  name: 'Инженер',
  price: 2500,
  inStock: true,
  images: ['img1.png'],
  description: 'Описание 1',
  ratingCount: 5,
  createdAt: '2026-01-01',
  characteristics: { категория: 'Мужские' },
  rating: 4.5
};

const mockProduct2: Product = {
  id: 'p-2',
  name: 'Председатель',
  price: 5000,
  inStock: true,
  images: ['img2.png'],
  description: 'Описание 2',
  ratingCount: 10,
  createdAt: '2026-01-02',
  characteristics: { категория: 'Мужские' },
  rating: 4.8
};

describe('cartSlice reducer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return the initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({ items: [] });
  });

  it('should handle addItem to empty cart', () => {
    const prevState = { items: [] };
    const nextState = cartReducer(prevState, addItem({ product: mockProduct1, quantity: 2 }));
    
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].product.id).toBe('p-1');
    expect(nextState.items[0].quantity).toBe(2);
  });

  it('should handle addItem to existing item', () => {
    const prevState = { items: [{ product: mockProduct1, quantity: 1 }] };
    const nextState = cartReducer(prevState, addItem({ product: mockProduct1, quantity: 3 }));
    
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].quantity).toBe(4);
  });

  it('should handle removeFromCart', () => {
    const prevState = {
      items: [
        { product: mockProduct1, quantity: 2 },
        { product: mockProduct2, quantity: 1 }
      ]
    };
    const nextState = cartReducer(prevState, removeFromCart('p-1'));
    
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].product.id).toBe('p-2');
  });

  it('should handle changeQuantity', () => {
    const prevState = { items: [{ product: mockProduct1, quantity: 2 }] };
    const nextState = cartReducer(prevState, changeQuantity({ productId: 'p-1', quantity: 5 }));
    
    expect(nextState.items[0].quantity).toBe(5);
  });

  it('should handle clearCart', () => {
    const prevState = { items: [{ product: mockProduct1, quantity: 2 }] };
    const nextState = cartReducer(prevState, clearCart());
    
    expect(nextState.items).toEqual([]);
  });
});

describe('cartSlice selectors', () => {
  const mockState = {
    cart: {
      items: [
        { product: mockProduct1, quantity: 2 },
        { product: mockProduct2, quantity: 1 }
      ]
    }
  } as unknown as RootState;

  it('should select cart items', () => {
    expect(selectCartItems(mockState)).toHaveLength(2);
  });

  it('should correctly calculate total count', () => {
    expect(selectCartTotalCount(mockState)).toBe(3);
  });

  it('should correctly calculate total price', () => {
    expect(selectCartTotalPrice(mockState)).toBe(10000);
  });
});
