export interface ValidationResult {
  isValid: boolean;
  error: string;
}

export const validateEmail = (value: string): ValidationResult => {
  const trimmed = value.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Поле обязательно для заполнения' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Введите корректный email' };
  }
  return { isValid: true, error: '' };
};

export const validatePassword = (value: string): ValidationResult => {
  if (!value) {
    return { isValid: false, error: 'Поле обязательно для заполнения' };
  }
  if (value.length < 6) {
    return { isValid: false, error: 'Пароль должен быть не менее 6 символов' };
  }
  return { isValid: true, error: '' };
};

export const validatePhone = (value: string): ValidationResult => {
  const trimmed = value.trim();
  if (trimmed === '+7' || !trimmed) {
    return { isValid: false, error: 'Введите номер телефона' };
  }
  const phoneRegex = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
  const cleanPhone = trimmed.replace(/\D/g, '');
  if (cleanPhone.length < 11) {
    return { isValid: false, error: 'Номер телефона слишком короткий' };
  }
  if (!phoneRegex.test(trimmed) && !/^\+7\d{10}$/.test(cleanPhone)) {
    return { isValid: false, error: 'Введите номер в формате +7XXXXXXXXXX или +7 (XXX) XXX-XX-XX' };
  }
  return { isValid: true, error: '' };
};
