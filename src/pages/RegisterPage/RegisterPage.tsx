import { useState, type SyntheticEvent, type ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input } from '../../components/ui/';
import { useSignUpMutation } from '../../api/authApi';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import runnerImgUrl from '../../assets/runner.png';
import arrowLeftIconUrl from '../../assets/Arrow.svg';
interface CustomErrorData {
  data?: string;
}
export function RegisterPage() {
  const navigate = useNavigate();
  const [signUp, { isLoading: isServerLoading }] = useSignUpMutation();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [globalError, setGlobalError] = useState<string>('');
  const validateForm = (): boolean => {
    let isValid = true;
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setGlobalError('');
    if (!firstName.trim()) {
      setFirstNameError('Введите имя');
      isValid = false;
    }
    if (!lastName.trim()) {
      setLastNameError('Введите фамилию');
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError('Введите email');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Введите корректный email');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Введите пароль');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Минимум 6 символов');
      isValid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError('Повторите пароль');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Пароли не совпадают');
      isValid = false;
    }
    return isValid;
  };
  const handleRegisterSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const newUser = await signUp({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
      }).unwrap();
      localStorage.setItem('quant_user', JSON.stringify(newUser));
      navigate('/profile');
    } catch (error) {
      const err = error as FetchBaseQueryError | SerializedError;
      if (err && 'status' in err) {
        if (err.status === 400 || err.status === 409) {
          setGlobalError('Пользователь с таким email уже существует');
        } else {
          const customData = err.data as CustomErrorData | undefined;
          setGlobalError(customData?.data || 'Ошибка регистрации. Проверьте данные.');
        }
      } else {
        setGlobalError('Не удалось подключиться к серверу. Сессия создана локально.');
        const localBackupUser = {
          id: crypto.randomUUID(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          language: 'ru',
          notifyByEmail: false,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('quant_user', JSON.stringify(localBackupUser));
        navigate('/profile');
      }
    }
  };
  return (
    <section className="register-page relative flex min-h-[calc(100vh-160px)] items-center justify-center py-6 md:py-12 w-full select-none overflow-hidden bg-bg-primary">
      <img
        src={runnerImgUrl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden md:block h-full w-full object-contain opacity-90"
      />
      <div className="relative z-10 w-full max-w-110 px-4 md:px-0">
        <header className="flex md:hidden items-center gap-4 w-full mb-6 pt-2">
          <button
            type="button"
            aria-label="Вернуться на главную страницу"
            onClick={() => navigate('/')}
            className="w-8 h-8 rounded-full border border-bg-shadows bg-white flex items-center justify-center shadow-sm cursor-pointer outline-none"
          >
            <img src={arrowLeftIconUrl} alt="" className="w-4 h-4 text-neutral-primary" />
          </button>
          <h1 className="text-lg font-bold text-neutral-primary tracking-wide">
            Регистрация
          </h1>
        </header>
        <div className="bg-white md:border md:border-bg-shadows rounded-xl md:p-8 md:shadow-md flex flex-col gap-5 w-full">
          <h1 className="text-xl md:text-2xl font-bold text-neutral-primary hidden md:block tracking-wide">
            Регистрация
          </h1>
          {}
          {globalError && (
            <div style={{ color: 'var(--color-accent-danger, #ef4444)', fontSize: 'var(--text-sm)', fontWeight: 500, textAlign: 'center' }}>
              {globalError}
            </div>
          )}
          <form onSubmit={handleRegisterSubmit} noValidate className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              label="Имя"
              placeholder="Ярополк"
              value={firstName}
              error={firstNameError}
              disabled={isServerLoading}
              autoComplete="given-name"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFirstName(e.target.value);
                setFirstNameError('');
              }}
              className="w-full"
            />
            <Input
              type="text"
              label="Фамилия"
              placeholder="Иванов"
              value={lastName}
              error={lastNameError}
              disabled={isServerLoading}
              autoComplete="family-name"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setLastName(e.target.value);
                setLastNameError('');
              }}
              className="w-full"
            />
            <Input
              type="email"
              label="Email"
              placeholder="ivanov@yandex.ru"
              value={email}
              error={emailError}
              disabled={isServerLoading}
              autoComplete="email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              className="w-full"
            />
            <Input
              type="password"
              label="Придумайте пароль"
              placeholder="••••••"
              value={password}
              error={passwordError}
              disabled={isServerLoading}
              autoComplete="new-password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              className="w-full"
            />
            <Input
              type="password"
              label="Повторите пароль"
              placeholder="••••••"
              value={confirmPassword}
              error={confirmPasswordError}
              disabled={isServerLoading}
              autoComplete="new-password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError('');
              }}
              className="w-full"
            />
            <Button
              type="submit"
              variant="default"
              disabled={isServerLoading}
              fullWidth
              className="mt-2 py-3"
            >
              {isServerLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
          </form>
          <p className="text-xs md:text-sm text-neutral-secondary font-medium mt-1 flex flex-col md:flex-row md:items-center gap-1">
            <span>Уже зарегистрированы?</span>
            <Link
              to="/login"
              className="text-accent-primary hover:text-accent-secondary font-bold transition-colors outline-none focus-visible:underline mt-0.5 md:mt-0"
            >
              Войти в аккаунт
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}