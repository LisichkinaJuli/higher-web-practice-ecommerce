import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../ui';
export function CabinetSidebar() {
  const location = useLocation();
  const isOrdersActive = location.pathname.startsWith('/profile/orders');
  const isProfileActive = location.pathname.startsWith('/profile') && !isOrdersActive;
  const isCartActive = location.pathname.startsWith('/cart');
  return (
    <nav aria-label="Навигация личного кабинета" className="cabinet-sidebar">
      <Link to="/profile" className="cabinet-sidebar__route-link">
        <Button variant="tab" fullWidth align="left" active={isProfileActive}>
          Мой профиль
        </Button>
      </Link>
      <Link to="/profile/orders" className="cabinet-sidebar__route-link">
        <Button variant="tab" fullWidth align="left" active={isOrdersActive}>
          История заказов
        </Button>
      </Link>
      <Link to="/cart" className="cabinet-sidebar__route-link">
        <Button variant="tab" fullWidth align="left" active={isCartActive}>
          Корзина
        </Button>
      </Link>
    </nav>
  );
}