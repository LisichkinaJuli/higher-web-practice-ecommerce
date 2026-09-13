import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Logo } from "../ui/Logo";

/**
 * Компонент верхней шапки сайта.
 * Использует переиспользуемые компоненты из UI-кита (Input, Button).
 * На мобильных экранах (md) скрывает элементы навигации, оптимизируя пространство.
 */
export function Header() {
  return (
    <header className="header w-full bg-bg-secondary border-b border-bg-shadows py-3 sticky top-0 z-50 transition-colors">
      <div className="header__container w-full max-w-300 mx-auto px-4 flex items-center justify-between gap-4">
        {/* Элемент логотипа: скрыт на мобильных (max-md:hidden) */}
        <Logo className="header__logo" />

        {/* Кнопка открытия каталога из UI-кита */}
        <Button
          variant="primary"
          size="md"
          className="header__catalog-btn max-md:hidden"
        >
          Каталог
        </Button>

        {/* Элемент поисковой строки: используем компонент Input из нашего UI-кита */}
        <div className="header__search grow max-w-125 max-md:max-w-full relative">
          <Input
            type="text"
            placeholder="Искать"
            className="header__search-input"
          />
          {/* Иконку лупы оставляем кнопкой-абсолютом поверх инпута */}
          <button className="header__search-btn absolute right-3 top-1/2 -translate-y-1/2 text-neutral-secondary cursor-pointer hover:text-accent-primary transition-colors bg-transparent border-none outline-none">
            🔍
          </button>
        </div>

        {/* Элемент блока авторизации и профиля: скрыт на мобильных */}
        <div className="header__user-actions flex items-center gap-5 max-md:hidden">
          <Link
            to="/profile"
            className="header__profile-link flex flex-col items-center text-xs text-neutral-secondary hover:text-accent-primary transition-colors"
          >
            <span className="text-lg">👤</span>
            <span>Профиль</span>
          </Link>

          {/* Кнопка регистрации */}
          <Button variant="primary" size="md" className="header__auth-btn">
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </header>
  );
}
