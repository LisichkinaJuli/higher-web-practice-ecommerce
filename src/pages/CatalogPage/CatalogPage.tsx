import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../api/baseApi';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setSortBy,
  setViewMode,
  toggleStyle,
  setDensity,
  setCurliness,
  toggleRequiresWax,
  toggleBoostsCharisma,
  setSearchQuery
} from '../../app/store/filterSlice';
import { filterProducts, getUniqueDensityOptions, getUniqueCurlinessOptions } from '../../utils/filterProducts';
import { MobileCategories } from './components/MobileCategories';
import { MobileFilters } from './components/MobileFilters';
import { ProductGrid } from './components/ProductGrid';
import { SidebarDesktop } from './components/SidebarDesktop';
import { Select, type SelectOption, ActiveTag, Pagination } from '../../components/ui';
import filterIcon from '../../assets/Filter.svg';
export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: products, isLoading, error } = useGetProductsQuery();
  const filters = useAppSelector((state) => state.filters);
  const {
    category: currentCategory,
    subcategory: currentSubcategory,
    sortBy: currentSortBy,
    viewMode: currentViewMode,
    styles: selectedStyles,
    density: currentDensity,
    curliness: currentCurliness,
    requiresWax,
    boostsCharisma: isCharismaActive
  } = filters;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [prevFilters, setPrevFilters] = useState(filters);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isCategoriesViewActive = searchParams.get('view') === 'categories';
  const urlSearchValue = searchParams.get('search') ?? '';
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearchValue);
  if (urlSearchValue !== prevUrlSearch) {
    setPrevUrlSearch(urlSearchValue);
    setCurrentPage(1);
  }
  if (filters !== prevFilters) {
    setPrevFilters(filters);
    setCurrentPage(1);
  }
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);
  useEffect(() => {
    dispatch(setSearchQuery(urlSearchValue));
  }, [urlSearchValue, dispatch]);
  const sortOptions: SelectOption<'price-asc' | 'price-desc'>[] = [
    { value: 'price-asc', label: 'Сначала дешёвые' },
    { value: 'price-desc', label: 'Сначала дорогие' },
  ];
  const viewOptions: SelectOption<'grid' | 'list'>[] = [
    { value: 'grid', label: 'Плитка' },
    { value: 'list', label: 'Список' },
  ];
  if (isLoading) return <div className="catalog-page__loading">Загрузка данных...</div>;
  if (error) return <div className="catalog-page__error">Ошибка при получении данных с сервера</div>;
  if (!products || products.length === 0) return <div className="catalog-page__empty">Товары отсутствуют</div>;
  const uniqueDensities = getUniqueDensityOptions(products);
  const uniqueCurliness = getUniqueCurlinessOptions(products);
  const allAvailableStyles = Array.from(new Set(products.map((p) => p.characteristics.стиль).filter(Boolean))) as string[];
  const { paginatedProducts, totalPages } = filterProducts(products, filters, currentPage);
  const hasActiveTags = selectedStyles.length > 0 || currentDensity || currentCurliness || requiresWax || isCharismaActive;
  const handleCategoriesComplete = () => {
    searchParams.delete('view');
    setSearchParams(searchParams);
  };
  if (isMobile && isMobileFiltersOpen) {
    return (
      <MobileFilters
        onClose={() => setIsMobileFiltersOpen(false)}
        uniqueDensities={uniqueDensities}
        uniqueCurliness={uniqueCurliness}
        allAvailableStyles={allAvailableStyles}
      />
    );
  }
  return (
    <div className="catalog-page">
      {isMobile && isCategoriesViewActive ? (
        <MobileCategories
          products={products}
          onComplete={handleCategoriesComplete}
        />
      ) : (
        <div className="catalog-page__layout">
          {!isMobile && (
            <aside className="catalog-page__aside">
              <SidebarDesktop products={products} />
            </aside>
          )}
          <main className="catalog-page__main">
            <div className="catalog-page__header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', width: '100%', marginBottom: '24px' }}>
              <h1 className="catalog-page__title">
                {currentSubcategory || currentCategory || 'УСЫ'}
              </h1>
              <div className="catalog-page__selects-group hidden lg:flex items-center gap-3">
                <Select
                  options={sortOptions}
                  value={currentSortBy}
                  onChange={(val) => dispatch(setSortBy(val))}
                  placeholder="Сортировка"
                />
                <Select
                  options={viewOptions}
                  value={currentViewMode}
                  onChange={(val) => dispatch(setViewMode(val))}
                  placeholder="Отображение"
                />
              </div>
              <button
                type="button"
                className="catalog-page__mobile-filter-btn lg:hidden flex items-center justify-center p-1 bg-transparent border-none cursor-pointer outline-none transition-transform active:scale-95"
                onClick={() => setIsMobileFiltersOpen(true)}
                aria-label="Открыть фильтры"
              >
                <img
                  src={filterIcon}
                  alt="Фильтры"
                  style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                />
              </button>
            </div>
            {hasActiveTags && (
              <div className="active-tags-list">
                {selectedStyles.map((style) => (
                  <ActiveTag key={style} onRemove={() => dispatch(toggleStyle(style))}>
                    {`Стиль: ${style}`}
                  </ActiveTag>
                ))}
                {currentDensity && (
                  <ActiveTag onRemove={() => dispatch(setDensity(null))}>
                    {`Густота: ${currentDensity}`}
                  </ActiveTag>
                )}
                {currentCurliness && (
                  <ActiveTag onRemove={() => dispatch(setCurliness(null))}>
                    {`Закрученность: ${currentCurliness}`}
                  </ActiveTag>
                )}
                {requiresWax && (
                  <ActiveTag onRemove={() => dispatch(toggleRequiresWax())}>
                    Требует воск
                  </ActiveTag>
                )}
                {isCharismaActive && (
                  <ActiveTag onRemove={() => dispatch(toggleBoostsCharisma())}>
                    Повышает харизму
                  </ActiveTag>
                )}
              </div>
            )}
            <ProductGrid products={paginatedProducts} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </main>
        </div>
      )}
    </div>
  );
};