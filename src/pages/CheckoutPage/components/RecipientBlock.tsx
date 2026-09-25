import { type ChangeEvent } from 'react';
import { Input } from '../../../components/ui';
import type { User } from '../../../types/user';

interface RecipientBlockProps {
  user: Partial<User>;
  phone: string;
  onPhoneChange: (val: string) => void;
  phoneError: string;
  comment: string;
  onCommentChange: (val: string) => void;
}

export function RecipientBlock({
  user,
  phone,
  onPhoneChange,
  phoneError,
  comment,
  onCommentChange,
}: RecipientBlockProps) {
  return (
    <fieldset className="checkout-block">
      <legend className="checkout-block__title">Получатель</legend>
      <div className="checkout-recipient">
        <header className="checkout-recipient__header">
          <span className="checkout-recipient__name">{user.firstName} {user.lastName}</span>
          <span className="checkout-recipient__email">{user.email}</span>
        </header>
        
        <div className="checkout-recipient__fields">
          <Input
            label="Номер телефона *"
            placeholder="+79991234567"
            value={phone}
            error={phoneError}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onPhoneChange(e.target.value)}
            className="checkout-recipient__phone"
          />
          
          <div className="checkout-recipient__comment-group">
            <label className="checkout-block__field-label">Комментарий к заказу</label>
            <textarea
              value={comment}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onCommentChange(e.target.value)}
              className="checkout-recipient__textarea"
              placeholder="Например: позвонить за полчаса до доставки"
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
}
