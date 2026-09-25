import type { Product } from '../types/product';
import type { FilterState } from '../app/store/filterSlice';

export interface FilterResult {
  paginatedProducts: Product[];
  totalPages: number;
}

export const filterProducts = (
  products: Product[], 
  filters: FilterState, 
  currentPage: number, 
  itemsPerPage: number = 12
): FilterResult => {
  const filtered = products.filter((product) => {
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase().trim();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDesc = product.description.toLowerCase().includes(query);
      if (!matchesName && !matchesDesc) {
        return false;
      }
    }

    if (filters.category) {
      if ((product.characteristics.категория || '') !== filters.category) {
        return false;
      }
    }

    if (filters.subcategory) {
      if ((product.characteristics.подкатегория || '') !== filters.subcategory) {
        return false;
      }
    }

    if (filters.styles.length > 0) {
      const productStyle = product.characteristics.стиль || '';
      if (!filters.styles.includes(productStyle)) {
        return false;
      }
    }

    if (filters.density) {
      if ((product.characteristics.густота || '') !== filters.density) {
        return false;
      }
    }

    if (filters.curliness) {
      if ((product.characteristics.закрученность || '') !== filters.curliness) {
        return false;
      }
    }

    if (filters.requiresWax) {
      const productNeedsWax = product.description.toLowerCase().includes('воск') || 
                             (product.characteristics.закрученность || '') === 'Высокая';
      if (!productNeedsWax) {
        return false;
      }
    }

    if (filters.boostsCharisma) {
      const charismaValue = parseInt(product.characteristics.харизма || '0', 10) || 0;
      if (charismaValue < 4) {
        return false;
      }
    }

    if (product.price < filters.priceFrom || product.price > filters.priceTo) {
      return false;
    }

    return true;
  });

  if (filters.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filtered.slice(startIndex, startIndex + itemsPerPage);

  return {
    paginatedProducts,
    totalPages
  };
};

export const getCategoriesTree = (products: Product[]): Record<string, string[]> => {
  const tree: Record<string, string[]> = {};
  
  products.forEach((product) => {
    const cat = product.characteristics.категория || '';
    const subcat = product.characteristics.подкатегория || '';
    
    if (cat) {
      if (!tree[cat]) {
        tree[cat] = [];
      }
      if (subcat && !tree[cat].includes(subcat)) {
        tree[cat].push(subcat);
      }
    }
  });
  
  return tree;
};

export const getUniqueDensityOptions = (products: Product[]) => {
  const densities = Array.from(
    new Set(products.map((p) => p.characteristics.густота).filter(Boolean))
  ) as string[];
  
  return densities.map((d) => ({ value: d, label: d }));
};

export const getUniqueCurlinessOptions = (products: Product[]) => {
  const curliness = Array.from(
    new Set(products.map((p) => p.characteristics.закрученность).filter(Boolean))
  ) as string[];
  
  return curliness.map((c) => ({ value: c, label: c }));
};
