/**
 * Компонент верхней шапки сайта (БЭМ-блок 'header').
 * На мобильных экранах (md) автоматически скрывает логотип и действия пользователя,
 * расширяя поисковую строку на 100% ширины экрана.
 */
import { Link } from "react-router-dom";
export function Header() {
  return (
    <header className="header bg-bg-secondary border-b border-bg-shadows py-3 sticky top-0 z-50 transition-colors">
      <div className="header__container max-w-container mx-auto px-4 flex items-center gap-4">
        {/* Логотипа: скрыт на мобильных (max-md:hidden) */}
        <Link
          to="/"
          className="header__logo text-2xl font-bold text-neutral-primary max-md:hidden"
        >
          <span className="text-accent-primary">Q</span>uant
        </Link>
        {/* Кнопка открытия каталога: скрыта на мобильных (max-md:hidden) */}
        <button className="header__catalog-btn max-md:hidden bg-accent-primary hover:bg-accent-secondary text-white font-medium py-2 px-5 rounded-md transition-colors cursor-pointer">
          Каталог
        </button>
        {/* Поисковая строки */} 
        <div className="header__search grow max-w-125 max-md:max-w-full relative">
          <input
            type="text"
            placeholder="Искать"
            className="header__search-input w-full py-2 pl-4 pr-10 border border-bg-shadows focus:border-accent-primary rounded-md outline-none bg-bg-primary text-neutral-primary transition-all text-sm placeholder:text-neutral-disable"
          />
          <button className="header__search-btn absolute right-3 top-1/2 -translate-y-1/2 text-neutral-secondary cursor-pointer hover:text-accent-primary transition-colors">
            🔍
          </button>
        </div>

        <div className="header__user-actions flex items-center gap-5 max-md:hidden">
          <Link
            to="/profile"
            className="header__profile-link flex flex-col items-center text-xs text-neutral-secondary hover:text-accent-primary transition-colors"
          >
            <span className="text-lg">👤</span>
            <span>Профиль</span>
          </Link>
          <button className="header__auth-btn bg-accent-primary hover:bg-accent-secondary text-white text-sm font-bold py-2 px-5 rounded-md transition-colors cursor-pointer">
            Зарегистрироваться
          </button>
        </div>
      </div>
    </header>
  );
}
