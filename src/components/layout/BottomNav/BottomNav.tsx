import { NavLink, useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { resetAll } from '../../../app/store/filterSlice';
import homeIconUrl from '../../../assets/Home.svg';
import catalogIconUrl from '../../../assets/Catalog.svg';
import bagIconUrlUrl from '../../../assets/Shopping_bag.svg';
import userIconUrl from '../../../assets/User.svg';
const getLinkClasses = (isButtonActive: boolean): string => {
  return `bottom-nav__link ${isButtonActive ? 'bottom-nav__link_active' : ''}`.trim();
};
export function BottomNav() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cartCount = 0;
  const currentView = searchParams.get('view');
  const isHomeActive = window.location.pathname === '/catalog' && currentView !== 'categories';
  const isCatalogActive = window.location.pathname === '/catalog' && currentView === 'categories';
  const handleHomeClick = () => {
    dispatch(resetAll());
    navigate('/catalog', { replace: true });
  };
  return (
    <nav className="bottom-nav">
      <button
        type="button"
        onClick={handleHomeClick}
        className={getLinkClasses(isHomeActive)}
        style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        <img src={homeIconUrl} alt="" className="icon-m" />
        <span>Главная</span>
      </button>
      {}
      <NavLink to="/catalog?view=categories" className={getLinkClasses(isCatalogActive)}>
        <img src={catalogIconUrl} alt="" className="icon-m" />
        <span>Товары</span>
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => getLinkClasses(isActive)}
      >
        <img src={userIconUrl} alt="" className="icon-m" />
        <span>Профиль</span>
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) => getLinkClasses(isActive)}
      >
        <span className="bottom-nav__bag-wrapper">
          <img src={bagIconUrlUrl} alt="" className="icon-m" />
          {cartCount > 0 && (
            <span className="bottom-nav__cart-count">
              {cartCount}
            </span>
          )}
        </span>
        <span>Корзина</span>
      </NavLink>
    </nav>
  );
}