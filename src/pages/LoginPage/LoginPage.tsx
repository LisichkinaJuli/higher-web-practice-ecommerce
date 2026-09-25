import { useState, type SyntheticEvent, type ChangeEvent } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Button, Input } from '../../components/ui';
import { useSignInMutation } from '../../api/authApi';
import runnerImgUrl from '../../assets/runner.png';
import ArrowLeftIcon from '../../assets/Arrow.svg?react';
interface CustomErrorData {
  data?: string;
}
export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [signIn, { isLoading: isServerLoading }] = useSignInMutation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [globalError, setGlobalError] = useState<string>('');
  const redirectPath = searchParams.get('redirect') ?? '/profile';
  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setGlobalError('');
    if (!email.trim()) {
      setEmailError('Введите email или логин');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Введите пароль');
      isValid = false;
    }
    return isValid;
  };
  const handleLoginSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const userData = await signIn({ email: email.trim(), password }).unwrap();
      localStorage.setItem('quant_user', JSON.stringify(userData));
      navigate(redirectPath);
    } catch (error) {
      const err = error as FetchBaseQueryError | SerializedError;
      if (err && 'status' in err) {
        const customData = err.data as CustomErrorData | undefined;
        setGlobalError(customData?.data || 'Неверный email или пароль');
      } else {
        setGlobalError('Ошибка соединения с сервером авторизации');
      }
    }
  };
  return (
    <section className="login-page">
      <img
        src={runnerImgUrl}
        alt=""
        aria-hidden="true"
        className="login-page__bg-decor"
      />
      <div className="login-page__container">
        <header className="login-page__mobile-header">
          <Button
            variant="default"
            colorVariant="primary"
            onClick={() => navigate('/')}
            className="login-page__back-btn"
            aria-label="Вернуться на главную страницу"
          >
            <ArrowLeftIcon className="icon-m" />
          </Button>
          <h1 className="login-page__mobile-title">Вход в аккаунт</h1>
        </header>
        <div className="login-page__card">
          <h1 className="login-page__desktop-title">Вход в аккаунт</h1>
          {globalError && (
            <div style={{ color: 'var(--color-accent-danger, #ef4444)', fontSize: 'var(--text-sm)', fontWeight: 500, textAlign: 'center' }}>
              {globalError}
            </div>
          )}
          <form onSubmit={handleLoginSubmit} noValidate className="login-page__form">
            <Input
              type="text"
              label="Ваш email или логин"
              placeholder="ivanov@yandex.ru"
              value={email}
              error={emailError}
              disabled={isServerLoading}
              autoComplete="username"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
              className="login-page__input"
            />
            <div className="login-page__field-group">
              <Input
                type="password"
                label="Пароль"
                placeholder="*******"
                value={password}
                error={passwordError}
                disabled={isServerLoading}
                autoComplete="current-password"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                className="login-page__input"
              />
              <button type="button" className="login-page__forgot-btn">
                Забыли пароль?
              </button>
            </div>
            <Button
              type="submit"
              variant="default"
              colorVariant="primary"
              disabled={isServerLoading}
              className="login-page__submit-btn"
            >
              {isServerLoading ? 'Вход...' : 'Войти'}
            </Button>
          </form>
          <p className="login-page__footer-text">
            <span>У вас ещё нет аккаунта?</span>
            <Link to="/register" className="login-page__register-link">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}