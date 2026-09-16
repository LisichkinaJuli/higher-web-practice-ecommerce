import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button/Button";
import { SearchForm } from "./SearchForm";
import logoFullUrl from "../../../assets/Logo-Full.svg";
import userIconUrl from "../../../assets/User.svg";

/**
 * Адаптивный компонент верхней панели навигации.
 */
export function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-transparent border-b border-transparent md:bg-white md:border-bg-shadows sticky top-0 z-50 md:shadow-sm transition-colors">
      <div className="mx-auto max-w-360 flex items-center justify-between gap-4 px-4 md:px-6 py-3">
        {/* Левый кластер (Скрывается на мобильных) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <Link
            to="/"
            aria-label="Quant — на главную"
            className="block transition-transform active:scale-95"
          >
            <img src={logoFullUrl} alt="Quant Логотип" className="h-9 w-auto" />
          </Link>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate("/")}
            className="px-5 py-2"
          >
            Каталог
          </Button>
        </div>

        <SearchForm />
        
        {/* Правый кластер (Скрывается на мобильных) */}
        <nav className="hidden md:flex items-center gap-4 md:gap-6 shrink-0">
          <Link
            to="/login"
            className="text-neutral-secondary hover:text-accent-primary flex items-center gap-2 transition-colors group py-1"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-bg-shadows flex items-center justify-center bg-bg-page group-hover:border-accent-primary transition-colors">
              <img
                src={userIconUrl}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6 text-neutral-secondary group-hover:text-accent-primary"
              />
            </div>
            <span className="text-xs md:text-sm font-medium text-neutral-primary hidden lg:inline">
              Имя профиля
            </span>
          </Link>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate("/register")}
            className="text-xs md:text-sm px-4 py-2"
          >
            Зарегистрироваться
          </Button>
        </nav>
      </div>
    </header>
  );
}
