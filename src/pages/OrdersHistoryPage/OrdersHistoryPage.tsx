import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../api/baseApi";
import { CabinetSidebar } from "../../components/layout/CabinetSidebar/CabinetSidebar";
import { type Order } from '../../types';

const formatPrice = (price: number) => `${price.toLocaleString("ru-RU")} ₽`;

function OrderCard({ order }: { order: Order }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = new Date(order.createdAt)
    .toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .replace(" г.", "");

  const deliveryInfo = order.deliveryMethod === "courier" ? "курьером" : "в пункте выдачи";
  const paymentInfo = order.paymentMethod === "card_online" ? "Оплачено картой" : "Наличными при получении";

  return (
    <div className="orders-history-card">
      <div className="orders-history-card__header">
        <div className="orders-history-card__info-group">
          <div className="orders-history-card__title-row">
            <span className="orders-history-card__date">от {formattedDate}</span>
            <span className="orders-history-card__number">{order.number}</span>
          </div>
          <div className="orders-history-card__status-row">
            <span className="orders-history-card__status">
              Оплачен
            </span>
            <span className="orders-history-card__delivery-type">{deliveryInfo}</span>
          </div>
        </div>
        <div className="orders-history-card__meta-group">
          <div className="orders-history-card__total">
            {formatPrice(order.totalPrice)}
          </div>
          <div className="orders-history-card__payment-method">
            {paymentInfo}
          </div>
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="orders-history-card__divider" />
          <div className="orders-history-card__products-list">
            {order.items.map((item, idx) => (
              <div key={item.productId + idx} className="orders-history-product-item">
                <div className="orders-history-product-item__main">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="orders-history-product-item__img" 
                    />
                  ) : (
                    <div className="orders-history-product-item__img-stub" />
                  )}
                  <div className="orders-history-product-item__info">
                    <Link to={`/catalog/${item.productId}`} className="orders-history-product-item__name">
                      {item.name}
                    </Link>
                    <span className="orders-history-product-item__param md:hidden">Параметр 1</span>
                  </div>
                </div>
                <div className="orders-history-product-item__meta">
                  <span className="orders-history-product-item__price">{formatPrice(item.price)}</span>
                  <span className="orders-history-product-item__qty hidden md:inline">
                    {item.quantity} шт.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="orders-history-card__divider" />
      <div className="orders-history-card__actions">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="orders-history-card__toggle-btn"
        >
          {isExpanded ? "Свернуть товары ↑" : "Показать товары в заказе ↓"}
        </button>
      </div>
    </div>
  );
}

export function OrdersHistoryPage() {
  const savedUser = localStorage.getItem("quant_user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const userId = user?.id || null;

  const { data: orders = [], isLoading } = useGetOrdersQuery(
    { userId },
    { skip: !userId }
  );

  if (!userId) {
    return (
      <div className="orders-history-layout">
        <CabinetSidebar />
        <div className="orders-history-container">
          <h1 className="orders-history-container__title">История заказов</h1>
          <p className="orders-history-container__empty-text">Пожалуйста, авторизуйтесь для просмотра истории заказов.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-history-layout">
      <CabinetSidebar />
      <div className="orders-history-container">
        <h1 className="orders-history-container__title">История заказов</h1>
        <div className="orders-history__list">
          {isLoading ? (
            <p className="orders-history-container__empty-text">Загрузка заказов...</p>
          ) : orders.length === 0 ? (
            <p className="orders-history-container__empty-text">У вас пока нет заказов.</p>
          ) : (
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </div>
    </div>
  );
}
