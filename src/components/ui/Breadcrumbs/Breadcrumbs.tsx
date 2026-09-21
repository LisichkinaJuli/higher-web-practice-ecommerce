import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setCategory, setSubcategory } from "../../../app/store/filterSlice";

export function Breadcrumbs() {
  const dispatch = useAppDispatch();
  const { category, subcategory } = useAppSelector((state) => state.filters);

  if (!category && !subcategory) {
    return null;
  }

  const handleResetAll = () => {
    dispatch(setCategory(null));
  };

  const handleBackToCategory = () => {
    dispatch(setSubcategory(null));
  };

  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      <ul className="breadcrumbs__list">
        
        <li className="breadcrumbs__item">
          <button 
            type="button" 
            onClick={handleResetAll} 
            className="breadcrumbs__link bg-transparent border-none p-0 cursor-pointer outline-none"
          >
            УСЫ
          </button>
        </li>

        {category && (
          <>
            <span className="breadcrumbs__separator" aria-hidden="true">/</span>
            <li className="breadcrumbs__item">
              {subcategory ? (
                <button
                  type="button"
                  onClick={handleBackToCategory}
                  className="breadcrumbs__link bg-transparent border-none p-0 cursor-pointer outline-none"
                >
                  {category}
                </button>
              ) : (
                <span>{category}</span>
              )}
            </li>
          </>
        )}

        {subcategory && (
          <>
            <span className="breadcrumbs__separator" aria-hidden="true">/</span>
            <li className="breadcrumbs__item">
              <span>{subcategory}</span>
            </li>
          </>
        )}

      </ul>
    </nav>
  );
}
