import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Logo } from "../ui/Logo";
import { SearchIcon, ProfileIcon } from "../ui/Icons";

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
          className="header__catalog-btn max-md:hidden shrink-0"
        >
          Каталог
        </Button>

        {/* Поиск */}
        <Input
          type="text"
          placeholder="Искать"
          className="header__search-input max-md:max-w-full"
          icon={<SearchIcon className="w-5 h-5" />} // Иконка примет правильный цвет из темы
          onIconClick={() => console.log("Ищем усы...")}
        />

        {/* Элемент блока авторизации и профиля: скрыт на мобильных */}
        <div className="header__user-actions flex items-center gap-5 max-md:hidden">
          <Link
            to="/profile"
            className="header__profile-link group flex flex-col items-center text-neutral-secondary hover:text-accent-primary transition-colors gap-0.5"
          >
            {/* Иконка профиля: плавно подсвечивается через системный токен accent-primary при наведении на группу */}
            <ProfileIcon className="w-5 h-5 text-neutral-secondary group-hover:text-accent-primary transition-colors" />

            {/* Текст подписи имени профиля по БЭМ */}
            <span className="header__profile-name text-xs font-normal tracking-wide whitespace-nowrap">
              Имя профиля
            </span>
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
