import { describe, it, expect } from '@jest/globals';
import { filterProducts, getCategoriesTree, getUniqueDensityOptions, getUniqueCurlinessOptions } from './filterProducts';
import type { Product } from '../types/product';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Инженер',
    price: 2650,
    inStock: true,
    images: ['img1.png'],
    description: 'Требует воск для укладки',
    ratingCount: 10,
    createdAt: '2026-01-01T00:00:00.000Z',
    characteristics: {
      категория: 'Мужские',
      подкатегория: 'Накладные',
      стиль: 'Классика',
      густота: 'Густые',
      закрученность: 'Прямые',
      харизма: '5'
    },
    rating: 4.5
  },
  {
    id: '2',
    name: 'Председатель',
    price: 5590,
    inStock: true,
    images: ['img2.png'],
    description: 'Описание 2',
    ratingCount: 25,
    createdAt: '2026-01-02T00:00:00.000Z',
    characteristics: {
      категория: 'Мужские',
      подкатегория: 'Клеящиеся',
      стиль: 'Ретро',
      густота: 'Редкие',
      закрученность: 'Завитые',
      харизма: '4'
    },
    rating: 4.8
  },
  {
    id: '3',
    name: 'Щёточка',
    price: 590,
    inStock: false,
    images: ['img3.png'],
    description: 'Описание 3',
    ratingCount: 5,
    createdAt: '2026-01-03T00:00:00.000Z',
    characteristics: {
      категория: 'Уход',
      подкатегория: 'Щетки',
      стиль: 'Современный',
      густота: 'Средние',
      закрученность: 'Прямые',
      харизма: '1'
    },
    rating: 4.0
  }
];

const defaultFilters = {
  searchQuery: '',
  category: null,
  subcategory: null,
  styles: [],
  density: null,
  curliness: null,
  requiresWax: false,
  boostsCharisma: false,
  priceFrom: 0,
  priceTo: 999999,
  sortBy: null,
  viewMode: null
};

describe('filterProducts', () => {
  it('should filter by search query', () => {
    const result = filterProducts(mockProducts, { ...defaultFilters, searchQuery: 'Инженер' }, 1, 10);
    expect(result.paginatedProducts).toHaveLength(1);
    expect(result.paginatedProducts[0].name).toBe('Инженер');
  });

  it('should filter by category', () => {
    const result = filterProducts(mockProducts, { ...defaultFilters, category: 'Мужские' }, 1, 10);
    expect(result.paginatedProducts).toHaveLength(2);
  });

  it('should filter by price range', () => {
    const result = filterProducts(mockProducts, { ...defaultFilters, priceFrom: 1000, priceTo: 3000 }, 1, 10);
    expect(result.paginatedProducts).toHaveLength(1);
    expect(result.paginatedProducts[0].name).toBe('Инженер');
  });

  it('should filter by requiresWax switch', () => {
    const result = filterProducts(mockProducts, { ...defaultFilters, requiresWax: true }, 1, 10);
    expect(result.paginatedProducts).toHaveLength(1);
    expect(result.paginatedProducts[0].name).toBe('Инженер');
  });

  it('should filter by boostsCharisma switch', () => {
    const result = filterProducts(mockProducts, { ...defaultFilters, boostsCharisma: true }, 1, 10);
    expect(result.paginatedProducts).toHaveLength(2);
  });
});

describe('getCategoriesTree', () => {
  it('should correctly build categories and subcategories mapping', () => {
    const tree = getCategoriesTree(mockProducts);
    expect(tree).toHaveProperty('Мужские');
    expect(tree['Мужские']).toContain('Накладные');
    expect(tree['Мужские']).toContain('Клеящиеся');
    expect(tree).toHaveProperty('Уход');
    expect(tree['Уход']).toContain('Щетки');
  });
});

describe('getUniqueDensityOptions', () => {
  it('should return unique options for density', () => {
    const options = getUniqueDensityOptions(mockProducts);
    expect(options).toHaveLength(3);
    expect(options[0].value).toBe('Густые');
    expect(options[1].value).toBe('Редкие');
  });
});

describe('getUniqueCurlinessOptions', () => {
  it('should return unique options for curliness', () => {
    const options = getUniqueCurlinessOptions(mockProducts);
    expect(options).toHaveLength(2);
    expect(options[0].value).toBe('Прямые');
    expect(options[1].value).toBe('Завитые');
  });
});
