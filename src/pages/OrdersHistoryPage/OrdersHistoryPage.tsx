import { useState } from "react";
import { Link } from "react-router-dom";
const formatPrice = (price: number) => `${price.toLocaleString("ru-RU")} ₽`;
interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}
interface Order {
  id: string;
  number: string;
  createdAt: string;
  statusText?: string;
  deliveryMethodText?: string;
  paymentMethodText?: string;
  paymentMethod?: string;
  deliveryMethod?: string;
  totalPrice: number;
  items: OrderItem[];
}
const initialMockOrders: Order[] = [
  {
    id: "order-32",
    number: "№ 0032",
    createdAt: "2026-02-01T12:00:00.000Z",
    statusText: "Получен",
    deliveryMethodText: "в пункте выдачи",
    paymentMethodText: "Оплачено картой",
    totalPrice: 15000,
    items: [
      { productId: "p-imp-1", name: "Император", price: 15000, quantity: 1 }
    ]
  },
  {
    id: "order-31",
    number: "№ 0031",
    createdAt: "2025-02-01T12:00:00.000Z",
    statusText: "Получен",
    deliveryMethodText: "в пункте выдачи",
    paymentMethodText: "Оплачено картой",
    totalPrice: 4080,
    items: [
      { productId: "p-brush", name: "Щёточка", price: 590, quantity: 1 },
      { productId: "p-imp-2", name: "Император", price: 3490, quantity: 1 }
    ]
  }
];
function OrderCard({ order }: { order: Order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = new Date(order.createdAt).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).replace(" г.", "");
  const status = order.statusText || "Получен";
  const deliveryInfo = order.deliveryMethodText || (order.deliveryMethod === "courier" ? "курьером" : "в пункте выдачи");
  const paymentInfo = order.paymentMethodText || (order.paymentMethod === "card_online" ? "Оплачено картой" : "Наличными при получении");
  return (
    <div className="success-card" style={{ marginBottom: "16px", background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "#1A1A1A" }}>от {formattedDate}</span>
            <span style={{ fontSize: "16px", color: "#666" }}>{order.number}</span>
          </div>
          <div style={{ marginTop: "6px", fontSize: "14px" }}>
            <span className="success-card__text_bold" style={{ color: "#00B2A9", marginRight: "6px" }}>
              {status}
            </span>
            <span className="success-card__text_muted" style={{ color: "#666" }}>{deliveryInfo}</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "22px", fontWeight: "bold", color: "#1A1A1A" }}>
            {formatPrice(order.totalPrice)}
          </div>
          <div style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>
            {paymentInfo}
          </div>
        </div>
      </div>
      {isExpanded && (
        <>
          <div className="success-card__divider" style={{ margin: "16px 0", borderTop: "1px solid #EAEAEA" }} />
          <div className="success-card__products-list" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {order.items.map((item, idx) => (
              <div key={item.productId + idx} className="success-product-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div className="success-product-item__img-stub" style={{ width: "48px", height: "48px", background: "#F5F5F5", borderRadius: "6px" }} />
                  <div className="success-product-item__info">
                    <Link to={`/catalog/${item.productId}`} className="success-product-item__name" style={{ textDecoration: "none", color: "inherit", fontWeight: 500 }}>
                      {item.name}
                    </Link>
                    <span className="success-product-item__param md:hidden" style={{ display: "block", fontSize: "12px", color: "#999", marginTop: "2px" }}>Параметр 1</span>
                  </div>
                </div>
                <div className="success-product-item__meta" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span className="success-product-item__price" style={{ fontWeight: "bold" }}>{formatPrice(item.price)}</span>
                  <span className="success-product-item__qty text-muted hidden md:inline" style={{ color: "#999", fontSize: "14px" }}>
                    {item.quantity} шт.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="success-card__divider" style={{ margin: "16px 0", borderTop: "1px solid #EAEAEA" }} />
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: "none",
            border: "none",
            color: "#0052FF",
            fontSize: "15px",
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          {isExpanded ? "Свернуть товары ↑" : "Показать товары в заказе ↓"}
        </button>
      </div>
    </div>
  );
}
const getSavedOrders = (): Order[] => {
  const savedOrdersRaw = localStorage.getItem("quant_orders_history");
  if (!savedOrdersRaw) return initialMockOrders;
  try {
    const saved = JSON.parse(savedOrdersRaw) as Order[];
    return [...saved, ...initialMockOrders];
  } catch {
    return initialMockOrders;
  }
};
export function OrdersHistoryPage() {
  const orders = getSavedOrders();
  return (
    <div className="orders-history-container" style={{ width: "100%" }}>
      <h1 className="success-page__title" style={{ textAlign: "left", marginBottom: "24px", fontSize: "28px", color: "#1A1A1A", fontWeight: "bold" }}>
        История заказов
      </h1>
      <div className="orders-history__list">
        {orders.length === 0 ? (
          <p style={{ color: "#666" }}>У вас пока нет заказов.</p>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}