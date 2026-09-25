import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../api/baseApi';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setCategory, setSubcategory } from '../../../app/store/filterSlice';
import { Button } from '../../ui';
export function Breadcrumbs() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isCatalogPage = location.pathname === '/catalog';
  const isProductPage = location.pathname.includes('/catalog/') && !!id;
  const { data: product } = useGetProductByIdQuery(id ?? '', {
    skip: !isProductPage
  });
  const { category: storeCategory, subcategory: storeSubcategory } = useAppSelector((state) => state.filters);
  if (!isCatalogPage && !isProductPage) {
    return null;
  }
  const category = isProductPage
    ? product?.characteristics?.['категория']
    : storeCategory;
  const subcategory = isProductPage
    ? product?.characteristics?.['подкатегория']
    : storeSubcategory;
  if (!category && !isProductPage) {
    return null;
  }
  const handleResetAll = () => {
    dispatch(setCategory(null));
    dispatch(setSubcategory(null));
    if (isProductPage) {
      navigate('/catalog');
    }
  };
  const handleBackToCategory = () => {
    if (category) {
      dispatch(setCategory(category));
      dispatch(setSubcategory(null));
      if (isProductPage) {
        navigate('/catalog');
      }
    }
  };
  return (
    <nav className="breadcrumbs" aria-label="Навигация">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          {category ? (
            <Button
              variant="text"
              onClick={handleResetAll}
              className="breadcrumbs__link"
            >
              УСЫ
            </Button>
          ) : (
            <span className="breadcrumbs__text-node">УСЫ</span>
          )}
        </li>
        {category && (
          <>
            <span className="breadcrumbs__separator" aria-hidden="true">/</span>
            <li className="breadcrumbs__item">
              {subcategory ? (
                <Button
                  variant="text"
                  onClick={handleBackToCategory}
                  className="breadcrumbs__link"
                >
                  {category}
                </Button>
              ) : (
                <span className="breadcrumbs__text-node">{category}</span>
              )}
            </li>
          </>
        )}
        {subcategory && (
          <>
            <span className="breadcrumbs__separator" aria-hidden="true">/</span>
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__text-node">{subcategory}</span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}