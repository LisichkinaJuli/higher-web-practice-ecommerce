import { Button } from '../../../components/ui';

type PaymentMethod = 'card_online' | 'cash';

interface PaymentBlockProps {
  method: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

export function PaymentBlock({ method, onChange }: PaymentBlockProps) {
  return (
    <fieldset className="checkout-block">
      <legend className="checkout-block__title">Способ оплаты</legend>
      <div className="checkout-block__tabs-grid">
        <Button
          type="button"
          variant="tab"
          active={method === 'card_online'}
          onClick={() => onChange('card_online')}
          className="checkout-block__tab-btn"
        >
          Карта *43 54
        </Button>
        <Button
          type="button"
          variant="tab"
          active={false}
          onClick={() => alert('Привязка новых карт будет доступна позже')}
          className="checkout-block__tab-btn checkout-block__tab-btn_type_add"
        >
          Новая карта +
        </Button>
        <Button
          type="button"
          variant="tab"
          active={method === 'cash'}
          onClick={() => onChange('cash')}
          className="checkout-block__tab-btn"
        >
          Наличными при получении
        </Button>
      </div>
    </fieldset>
  );
}
