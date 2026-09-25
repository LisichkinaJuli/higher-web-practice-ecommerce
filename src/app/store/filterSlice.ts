import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  searchQuery: string;
  category: string | null;
  subcategory: string | null;
  styles: string[];
  density: string | null;
  curliness: string | null;
  requiresWax: boolean;
  boostsCharisma: boolean;
  priceFrom: number;
  priceTo: number;
  sortBy: 'price-asc' | 'price-desc' | null;
  viewMode: 'grid' | 'list' | null;
}

const initialState: FilterState = {
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
  viewMode: null,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
      state.subcategory = null; 
      state.styles = [];
    },
    setSubcategory: (state, action: PayloadAction<string | null>) => {
      state.subcategory = action.payload;
    },
    toggleStyle: (state, action: PayloadAction<string>) => {
      const style = action.payload;
      if (state.styles.includes(style)) {
        state.styles = state.styles.filter((s) => s !== style);
      } else {
        state.styles.push(style);
      }
    },
    setDensity: (state, action: PayloadAction<string | null>) => {
      state.density = action.payload;
    },
    setCurliness: (state, action: PayloadAction<string | null>) => {
      state.curliness = action.payload;
    },
    setPriceBounds: (state, action: PayloadAction<{ from?: number; to?: number }>) => {
      if (action.payload.from !== undefined) state.priceFrom = action.payload.from;
      if (action.payload.to !== undefined) state.priceTo = action.payload.to;
    },
    toggleRequiresWax: (state) => {
      state.requiresWax = !state.requiresWax;
    },
    toggleBoostsCharisma: (state) => {
      state.boostsCharisma = !state.boostsCharisma;
    },
    setSortBy: (state, action: PayloadAction<'price-asc' | 'price-desc' | null>) => {
      state.sortBy = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list' | null>) => {
      state.viewMode = action.payload;
    },
    resetFilters: (state) => {
      return {
        ...initialState,
        searchQuery: state.searchQuery,
        category: state.category,
        subcategory: state.subcategory,
      };
    },
    resetAll: () => initialState,
  },
});

export const {
  setSearchQuery,
  setCategory,
  setSubcategory,
  toggleStyle,
  setDensity,
  setCurliness,
  setPriceBounds,
  toggleRequiresWax,
  toggleBoostsCharisma,
  setSortBy,
  setViewMode,
  resetFilters,
  resetAll,
} = filterSlice.actions;

export default filterSlice.reducer;
