import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui';
import { SearchForm } from './SearchForm';
import LogoFullIcon from '../../assets/Logo-Full.svg?react';
import UserIcon from '../../assets/User.svg?react';
import type { User } from '../../types/user';

export function Header() {
  const navigate = useNavigate();

  const savedUserString = localStorage.getItem('quant_user');
  let currentUser: Partial<User> | null = null;

  if (savedUserString) {
    try {
      currentUser = JSON.parse(savedUserString) as User;
    } catch {
      console.error('Ошибка чтения пользователя в шапке');
    }
  }

  const isAuth = !!currentUser;

  const handleLogout = () => {
    localStorage.removeItem('quant_user');
    navigate('/catalog');
  };

  return (
    <header className="header">
      <div className="header__container container">
        
        <div className="header__left-cluster">
          <Link
            to="/"
            aria-label="Quant — на главную"
            className="header__logo-link"
          >
            <LogoFullIcon className="header__logo-svg" />
          </Link>

          <Button
            variant="default"
            colorVariant="primary"
            onClick={() => navigate("/")}
            className="header__catalog-btn"
          >
            Каталог
          </Button>
        </div>

        <SearchForm />
        
        <nav className="header__right-cluster">
          <Link
            to={isAuth ? "/profile" : "/login"}
            className="header__profile-link"
          >
            <div className="header__profile-avatar-wrapper">
              <UserIcon className="header__profile-avatar-icon" />
            </div>
            <span className="header__profile-name">
              {isAuth ? `${currentUser?.firstName} ${currentUser?.lastName}` : 'Войти'}
            </span>
          </Link>
          {isAuth ? (
            <Button
              variant="default"
              colorVariant="secondary"
              onClick={handleLogout}
              className="header__logout-btn"
            >
              Выйти
            </Button>
          ) : (
            <Button
              variant="default"
              colorVariant="primary"
              onClick={() => navigate("/register")}
              className="header__register-btn"
            >
              Зарегистрироваться
            </Button>
          )}
        </nav>

      </div>
    </header>
  );
}
