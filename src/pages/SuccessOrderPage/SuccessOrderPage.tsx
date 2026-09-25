import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { type Order } from '../../types';
const formatPrice = (price: number) => {
  return `${price.toLocaleString('ru-RU')} ₽`;
};
interface SuccessOrderLocationState {
  order: Order;
}
export function SuccessOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as SuccessOrderLocationState | null;
  if (!state?.order) {
    return (
      <div className="success-page success-page_state_empty">
        <h1 className="success-page__empty-title">Заказ не найден</h1>
        <Button variant="default" onClick={() => navigate('/catalog')}>В каталог</Button>
      </div>
    );
  }
  const { order } = state;
  return (
    <div className="success-page">
      <div className="success-page__container">
        <header className="success-page__header">
          {}
          <h1 className="success-page__title">Спасибо за заказ!</h1>
          <p className="success-page__subtitle">
            Мы уже готовим выбранные усы к отправке!
          </p>
        </header>
        <div className="success-card">
          <div className="success-card__section">
            <h3 className="success-card__section-title">Получатель</h3>
            <div className="success-card__recipient-meta">
              <span className="success-card__text_bold">{order.customer.firstName} {order.customer.lastName}</span>
              <span className="success-card__text_contact">{order.customer.email}</span>
              <span className="success-card__text_contact">{order.customer.phone}</span>
            </div>
            <p className="success-card__note">
              Если в комплекте есть инструкция «как выглядеть уверенно», буду благодарен.
            </p>
          </div>
          <div className="success-card__divider" />
          <div className="success-card__section success-card__section_delivery_grid">
            <div>
              <h3 className="success-card__delivery-title">
                {order.deliveryMethod === 'courier' ? 'Адрес доставки' : 'Пункт выдачи'}
              </h3>
              <p className="success-card__text">
                {order.deliveryMethod === 'courier' && order.deliveryAddress
                  ? `${order.deliveryAddress.city}, ${order.deliveryAddress.street}, д. ${order.deliveryAddress.house}`
                  : 'Адрес пункта выдачи'}
              </p>
            </div>
            <div>
              <h3 className="success-card__delivery-title">Забирать после</h3>
              <p className="success-card__text">
                {order.createdAt ? new Date(order.createdAt).toLocaleDateString('ru-RU') : 'В ближайшие дни'}
              </p>
            </div>
          </div>
          <div className="success-card__divider" />
          <div className="success-card__section">
            <div className="success-card__products-list">
              {order.items.map((item) => (
                <div key={item.productId} className="success-product-item">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="success-product-item__img" />
                  ) : (
                    <div className="success-product-item__img-stub" />
                  )}
                  <div className="success-product-item__info">
                    <span className="success-product-item__name">{item.name}</span>
                    <span className="success-product-item__param">Параметр 1</span>
                  </div>
                  <div className="success-product-item__meta">
                    <span className="success-product-item__price">{formatPrice(item.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="success-card__divider" />
          <div className="success-card__section success-card__section_footer_grid">
            <div className="success-card__summary-cell">
              <h3 className="success-card__footer-title">
                {order.paymentMethod === 'card_online' ? 'Оплачено картой' : 'Оплата наличными'}
              </h3>
              <p className="success-card__card-mask">
                {order.paymentMethod === 'card_online' ? '*43 54' : 'При получении'}
              </p>
            </div>
            <div className="success-card__summary-cell">
              <h3 className="success-card__footer-title">Общая сумма</h3>
              <p className="success-card__price-total">{formatPrice(order.totalPrice)}</p>
            </div>
          </div>
        </div>
        <footer className="success-page__actions">
          {}
          <Button
            variant="default"
            colorVariant="primary"
            onClick={() => window.print()}
            className="success-page__btn-print hidden md:inline-flex"
          >
            Распечатать
          </Button>
          <Button
            variant="default"
            colorVariant="secondary"
            onClick={() => window.print()}
            className="md:hidden"
            fullWidth
          >
            Распечатать заказ
          </Button>
          <div className="success-page__nav-links">
            <button type="button" onClick={() => navigate('/profile/orders')} className="success-page__link hidden md:inline-block">
              Все заказы
            </button>
            <button type="button" onClick={() => navigate('/profile/orders')} className="success-page__link md:hidden">
              История заказов
            </button>
          </div>
          <Button
            variant="default"
            colorVariant="primary"
            onClick={() => navigate('/catalog')}
            className="md:hidden success-page__btn-back"
            fullWidth
          >
            Вернуться к покупкам
          </Button>
        </footer>
      </div>
    </div>
  );
}