import { useAppDispatch, useAppSelector } from "../../hooks";
import { useGetProductsQuery } from "../../api/baseApi";
import {
  selectCartItems,
  changeQuantity,
  removeFromCart,
} from "../../app/store/cartSlice";
import { Button } from "../../components/ui";
import { CabinetSidebar } from "../../components/layout/CabinetSidebar/CabinetSidebar";
import { useNavigate } from "react-router-dom";

function TrashIcon({ className = "" }: { className?: string }) {
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
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function CartPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const { data: serverProducts = [], isLoading } = useGetProductsQuery();

  const validatedCartItems = cartItems.map((item) => {
    const freshProduct = serverProducts.find((p) => p.id === item.product.id);
    return {
      ...item,
      product: freshProduct ? freshProduct : item.product,
    };
  });

  const totalPrice = validatedCartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalCount = validatedCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const formatItemsWord = (count: number) => {
    if (count % 10 === 1 && count % 100 !== 11) return `${count} товар`;
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100))
      return `${count} товара`;
    return `${count} товаров`;
  };

  const handleDecrease = (productId: string, currentQty: number) => {
    if (currentQty > 1) {
      dispatch(changeQuantity({ productId, quantity: currentQty - 1 }));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const handleIncrease = (productId: string, currentQty: number) => {
    dispatch(changeQuantity({ productId, quantity: currentQty + 1 }));
  };

  if (isLoading) {
    return (
      <div className="cart-page">
        <CabinetSidebar />
        <div className="cart-page__empty-container">
          <p className="cart-page__empty-text">Загрузка корзины...</p>
        </div>
      </div>
    );
  }

  if (validatedCartItems.length === 0) {
    return (
      <div className="cart-page cart-page_state_empty">
        <CabinetSidebar />
        <div className="cart-page__empty-container">
          <h1 className="cart-page__title">Корзина</h1>
          <p className="cart-page__empty-text">В вашей корзине пока пусто</p>
          <Button
            variant="default"
            colorVariant="primary"
            onClick={() => navigate("/catalog")}
          >
            Перейти в каталог
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <CabinetSidebar />
      <div className="cart-page__layout">
        <main className="cart-page__main">
          <header className="cart-page__header">
            <h1 className="cart-page__title">Корзина</h1>
            <span className="cart-page__count-label lg:hidden">
              {formatItemsWord(totalCount)}
            </span>
          </header>
          <div className="cart-page__list">
            {validatedCartItems.map(({ product, quantity }) => {
              const mainImage =
                Array.isArray(product.images) && product.images.length > 0
                  ? product.images[0]
                  : "";
              return (
                <article key={product.id} className="cart-item">
                  <div className="cart-item__image-container">
                    {mainImage && (
                      <img
                        src={mainImage}
                        alt={product.name}
                        className="cart-item__img"
                      />
                    )}
                  </div>
                  <div className="cart-item__info">
                    <h2 className="cart-item__name">{product.name}</h2>
                    <span className="cart-item__delivery-date lg:hidden">
                      В ближайшие дни
                    </span>
                  </div>
                  <div className="cart-item__counter">
                    <Button
                      variant="default"
                      onClick={() => handleDecrease(product.id, quantity)}
                      className="cart-item__counter-btn"
                      aria-label="Уменьшить количество"
                    >
                      -
                    </Button>
                    <span className="cart-item__counter-value">{quantity}</span>
                    <Button
                      variant="default"
                      onClick={() => handleIncrease(product.id, quantity)}
                      className="cart-item__counter-btn"
                      aria-label="Увеличить количество"
                    >
                      +
                    </Button>
                  </div>
                  <div className="cart-item__price-zone">
                    <p className="cart-item__price">
                      {(product.price * quantity).toLocaleString("ru-RU")} ₽
                    </p>
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(product.id))}
                      className="cart-item__remove-btn"
                      aria-label="Удалить из корзины"
                    >
                      <TrashIcon className="cart-item__trash-icon" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </main>
        <aside className="cart-checkout">
          <div className="cart-checkout__card">
            <h2 className="cart-checkout__title hidden lg:block">
              Ваша корзина
            </h2>
            <div className="cart-checkout__meta-row">
              <span className="cart-checkout__meta-label hidden lg:block">
                сумма заказа
              </span>
              <span className="cart-checkout__count-label hidden lg:block">
                {formatItemsWord(totalCount)}
              </span>
              <span className="cart-checkout__total-label lg:hidden">
                {formatItemsWord(totalCount)}
              </span>
              <p className="cart-checkout__total-price">
                {totalPrice.toLocaleString("ru-RU")} ₽
              </p>
            </div>
            <Button
              type="button"
              variant="default"
              colorVariant="primary"
              fullWidth
              onClick={() => navigate("/checkout")}
              className="cart-checkout__submit-btn"
            >
              Оформить заказ
            </Button>
          </div>
          <div className="cart-checkout__decor hidden lg:block" />
        </aside>
      </div>
    </div>
  );
}
