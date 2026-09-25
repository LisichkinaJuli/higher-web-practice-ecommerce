import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  setCategory,
  setSubcategory,
  toggleStyle,
  setDensity,
  setCurliness,
  toggleRequiresWax,
  toggleBoostsCharisma,
  setPriceBounds,
  resetAll
} from '../../../app/store/filterSlice';
import {
  getCategoriesTree,
  getUniqueDensityOptions,
  getUniqueCurlinessOptions
} from '../../../utils/filterProducts';
import { CategoryButton, Checkbox, RadioGroup, Switch, Input } from '../../../components/ui';
import type { Product } from '../../../types/product';
interface SidebarDesktopProps {
  products: Product[];
}
export const SidebarDesktop = ({ products }: SidebarDesktopProps) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const {
    category: currentCategory,
    subcategory: currentSubcategory,
    styles: selectedStyles,
    density: currentDensity,
    curliness: currentCurliness,
    requiresWax,
    boostsCharisma,
    priceFrom,
    priceTo
  } = filters;
  const categoriesTree = getCategoriesTree(products);
  const categories = Object.keys(categoriesTree);
  const availableSubcategories = currentCategory ? categoriesTree[currentCategory] || [] : [];
  const uniqueStyles = Array.from(
    new Set(products.map((p) => p.characteristics.стиль).filter(Boolean))
  ) as string[];
  const densityOptions = getUniqueDensityOptions(products);
  const curlinessOptions = getUniqueCurlinessOptions(products);
  const handleResetCategory = () => {
    dispatch(setCategory(null));
  };
  const handleCategorySelect = (cat: string) => {
    dispatch(setCategory(cat));
  };
  const handleSubcategorySelect = (subcat: string) => {
    if (currentSubcategory === subcat) {
      dispatch(setSubcategory(null));
    } else {
      dispatch(setSubcategory(subcat));
    }
  };
  return (
    <aside className="sidebar-desktop">
      <div className="sidebar-desktop__section">
        {currentCategory === null ? (
          <h3 className="text-base-b">Категория</h3>
        ) : (
          <button className="button-all-categories" onClick={handleResetCategory}>
            Все категории
          </button>
        )}
        <div className="sidebar-desktop__categories-list">
          {currentCategory === null ? (
            categories.map((cat) => (
              <CategoryButton
                key={cat}
                isActive={false}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </CategoryButton>
            ))
          ) : (
            <>
              <h3 className="text-base-b">{currentCategory}</h3>
              {availableSubcategories.length > 0 && (
                <div className="sidebar-desktop__subcategories-list">
                  {availableSubcategories.map((subcat) => (
                    <CategoryButton
                      key={subcat}
                      isActive={currentSubcategory === subcat}
                      onClick={() => handleSubcategorySelect(subcat)}
                    >
                      {subcat}
                    </CategoryButton>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="sidebar-desktop__section">
        <h3 className="text-base-b">Стиль</h3>
        <div className="sidebar-desktop__categories-list">
          {uniqueStyles.map((styleName) => (
            <Checkbox
              key={styleName}
              checked={selectedStyles.includes(styleName)}
              onCheckedChange={() => dispatch(toggleStyle(styleName))}
            >
              {styleName}
            </Checkbox>
          ))}
        </div>
      </div>
      <div className="sidebar-desktop__section">
        <h3 className="text-base-b">Густота</h3>
        <RadioGroup
          name="density"
          value={currentDensity}
          options={densityOptions}
          onValueChange={(val) => dispatch(setDensity(val))}
        />
      </div>
      <div className="sidebar-desktop__section">
        <h3 className="text-base-b">Закрученность</h3>
        <RadioGroup
          name="curliness"
          value={currentCurliness}
          options={curlinessOptions}
          onValueChange={(val) => dispatch(setCurliness(val))}
        />
      </div>
      <div className="sidebar-desktop__section">
        <h3 className="text-base-b">Фильтр</h3>
        <div className="sidebar-desktop__categories-list">
          <Switch
            checked={requiresWax}
            onCheckedChange={() => dispatch(toggleRequiresWax())}
          >
            требует укладки воском
          </Switch>
          <Switch
            checked={boostsCharisma}
            onCheckedChange={() => dispatch(toggleBoostsCharisma())}
          >
            повышает харизму
          </Switch>
        </div>
      </div>
      <div className="sidebar-desktop__section">
        <h3 className="text-base-b">Цена</h3>
        <div className="sidebar-desktop__price-row">
          <Input
            type="number"
            value={priceFrom === 0 ? '' : priceFrom.toString()}
            onChange={(e) => dispatch(setPriceBounds({ from: e.target.value === '' ? 0 : Number(e.target.value) }))}
            placeholder="10"
          />
          <Input
            type="number"
            value={priceTo === 999999 ? '' : priceTo.toString()}
            onChange={(e) => dispatch(setPriceBounds({ to: e.target.value === '' ? 999999 : Number(e.target.value) }))}
            placeholder="1000"
          />
        </div>
      </div>
      <button
        className="sidebar-desktop__clear-btn"
        onClick={() => dispatch(resetAll())}
      >
        Очистить фильтры
      </button>
    </aside>
  );
};