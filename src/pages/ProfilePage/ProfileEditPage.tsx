import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CabinetSidebar } from "../../components/layout/CabinetSidebar/CabinetSidebar";
import { Button, Input } from "../../components/ui";
import { useUpdateProfileMutation } from "../../api/authApi";
import type { User } from "../../types/user";

import userAvatarUrl from "../../assets/User.svg";

function CameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export function ProfileEditPage() {
  const navigate = useNavigate();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

  const [user, setUser] = useState<Partial<User>>(() => {
    const saved = localStorage.getItem("quant_user");
    if (saved) {
      try {
        return JSON.parse(saved) as User;
      } catch {
        console.error("Ошибка чтения quant_user");
      }
    }
    return {
      id: "",
      firstName: "Ярополк",
      lastName: "Иванов",
      email: "ivanov@yandex.ru",
    };
  });

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [globalError, setGlobalError] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (name === "firstName") setFirstNameError("");
    if (name === "lastName") setLastNameError("");
    if (name === "email") setEmailError("");
    setGlobalError("");
  };

  const validateForm = (): boolean => {
    let isValid = true;
    if (!user.firstName?.trim()) {
      setFirstNameError("Введите имя");
      isValid = false;
    }
    if (!user.lastName?.trim()) {
      setLastNameError("Введите фамилию");
      isValid = false;
    }
    if (!user.email?.trim()) {
      setEmailError("Введите email");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      setEmailError("Некорректный формат email");
      isValid = false;
    }
    return isValid;
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !user.id) return;

    try {
      const updatedUser = await updateProfile({
        id: user.id,
        changes: {
          firstName: user.firstName?.trim() || "",
          lastName: user.lastName?.trim() || "",
          email: user.email?.trim() || "",
        },
      }).unwrap();

      localStorage.setItem("quant_user", JSON.stringify(updatedUser));

      navigate("/profile");
    } catch (err) {
      console.error("Ошибка сохранения профиля:", err);
      setGlobalError("Не удалось сохранить изменения. Попробуйте позже.");
    }
  };

  return (
    <div className="profile-page">
      <CabinetSidebar />

      <section className="profile-page__content">
        <h1 className="profile-page__mobile-title">Мой профиль</h1>

        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="profile-edit-form"
        >
          {/* Аватар с наложенной кнопкой загрузки фото */}
          <div className="profile-edit-form__avatar-section">
            <div className="profile-edit-form__avatar-container">
              <img
                src={userAvatarUrl}
                alt="Аватар пользователя"
                className="profile-edit-form__avatar"
              />
              <button
                type="button"
                className="profile-edit-form__upload-btn"
                aria-label="Сменить аватар"
              >
                <CameraIcon className="profile-edit-form__camera-icon" />
              </button>
            </div>
          </div>

          {globalError && (
            <div className="profile-edit-form__global-error">{globalError}</div>
          )}

          {/* Сетка инпутов формы */}
          <div className="profile-edit-form__fields">
            <Input
              label="Имя:"
              name="firstName"
              value={user.firstName || ""}
              error={firstNameError}
              disabled={isSaving}
              onChange={handleInputChange}
              className="profile-edit-form__input-name"
            />

            <Input
              label="Фамилия:"
              name="lastName"
              value={user.lastName || ""}
              error={lastNameError}
              disabled={isSaving}
              onChange={handleInputChange}
              className="profile-edit-form__input-lastname"
            />

            <Input
              label="Email:"
              name="email"
              type="email"
              value={user.email || ""}
              error={emailError}
              disabled={isSaving}
              onChange={handleInputChange}
              className="profile-edit-form__input-email"
            />
          </div>

          {/* Группа управления кнопками */}
          <div className="profile-edit-form__actions">
            <Button
              variant="default"
              colorVariant="secondary"
              disabled={isSaving}
              onClick={() => navigate("/profile")}
              className="profile-edit-form__btn-cancel"
            >
              Отменить
            </Button>

            <Button
              type="submit"
              variant="default"
              colorVariant="primary"
              disabled={isSaving}
              className="profile-edit-form__btn-submit"
            >
              {isSaving ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
