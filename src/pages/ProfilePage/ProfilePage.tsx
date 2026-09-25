import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CabinetSidebar } from '../../components/layout/CabinetSidebar/CabinetSidebar';
import { Button, Checkbox, Select, type SelectOption } from '../../components/ui';
import type { User } from '../../types/user';

import userAvatarUrl from '../../assets/User.svg';

type LanguageValue = 'ru' | 'en';

const languageOptions: SelectOption<LanguageValue>[] = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
];

export function ProfilePage() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState<LanguageValue>('ru');
  const [notifyByEmail, setNotifyByEmail] = useState<boolean>(false);
  const [user] = useState<Partial<User>>(() => {
    const saved = localStorage.getItem('quant_user');
    if (saved) {
      try {
        return JSON.parse(saved) as User;
      } catch {
        console.error('Ошибка парсинга quant_user из localStorage');
      }
    }
    return { 
      firstName: 'Ярополк', 
      lastName: 'Иванов', 
      email: 'ivanov@yandex.ru' 
    };
  });

  return (
    <div className="profile-page">
      <CabinetSidebar />

      <section className="profile-page__content">
        <h1 className="profile-page__mobile-title">
          Мой профиль
        </h1>

        <div className="profile-page__user-card">
          <div className="profile-page__user-info">
            <div className="profile-page__avatar-wrapper">
              <img src={userAvatarUrl} alt="" className="profile-page__avatar-icon" />
            </div>
            <div className="profile-page__meta">
              <span className="profile-page__name">
                {user.firstName} {user.lastName}
              </span>
              <span className="profile-page__email">
                {user.email}
              </span>
            </div>
          </div>

          <Button
            variant="default"
            colorVariant="secondary"
            onClick={() => navigate('/profile/edit')}
            className="profile-page__edit-btn"
          >
            Редактировать
          </Button>
        </div>

        <div className="profile-page__settings-zone">
          <div className="profile-page__controls-column">
            <div className="profile-page__control-group">
              <span className="profile-page__label">
                Язык:
              </span>
              <Select<LanguageValue>
                options={languageOptions}
                value={language}
                onChange={(val) => setLanguage(val)}
                className="profile-page__select"
              />
            </div>

            <Checkbox
              id="notify-orders"
              checked={notifyByEmail}
              onCheckedChange={(checked) => setNotifyByEmail(!!checked)}
              className="profile-page__checkbox"
            >
              Уведомлять об изменении статуса заказов по email
            </Checkbox>

            <Link
              to="/profile/orders"
              className="profile-page__mobile-orders-link"
            >
              История заказов
            </Link>
          </div>

          
        </div>

      </section>
    </div>
  );
}
