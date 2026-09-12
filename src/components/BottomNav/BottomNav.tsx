/**
 * Компонент нижней мобильной навигации.
 * Автоматически скрывается на десктопных экранах (md:hidden) и закрепляется снизу (fixed) на мобильных.
 */
import { NavLink } from 'react-router-dom';
export function BottomNav() {
  /**
   * Функция генерации динамических классов для NavLink с поддержкой БЭМ-модификатора активности.
   * @param isActive - флаг активности текущего роута, предоставляемый react-router-dom
   */
  const linkClassName = ({ isActive }: { isActive: boolean }) => `
    bottom-nav__link flex flex-col items-center justify-center text-[10px] sm:text-xs transition-all gap-0.5
    ${isActive ? 'bottom-nav__link_active text-accent-primary font-semibold' : 'text-neutral-secondary hover:text-accent-primary'}
  `;
  return (
    <nav className="bottom-nav md:hidden fixed bottom-0 left-0 right-0 h-15 bg-bg-secondary border-t border-bg-shadows flex justify-around items-center z-50 transition-colors shadow-lg">
      <NavLink to="/" className={linkClassName}>
        <span className="text-xl">🏠</span>
        <span>Главная</span>
      </NavLink>
      <NavLink to="/catalog" className={linkClassName}>
        <span className="text-xl">☰</span>
        <span>Товары</span>
      </NavLink>
      <NavLink to="/profile" className={linkClassName}>
        <span className="text-xl">👤</span>
        <span>Профиль</span>
      </NavLink>
      <NavLink to="/cart" className={linkClassName}>
        <span className="text-xl">🛍</span>
        <span>Корзина</span>
      </NavLink>
    </nav>
  );
}