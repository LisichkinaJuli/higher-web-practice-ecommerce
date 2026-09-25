import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { Button, Modal } from "../../../components/ui";
import { addToCart, selectCartItems } from "../../../app/store/cartSlice";
import type { Product } from "../../../types/product";
import type { CartItem } from "../../../types";
import shoppingBagIcon from "../../../assets/Shopping_bag.svg";
interface ProductGridProps {
  products: Product[];
}
export const ProductGrid = ({ products }: ProductGridProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const viewMode = useAppSelector((state) => state.filters.viewMode);
  const cartItems = useAppSelector(selectCartItems) as CartItem[];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');
  if (products.length === 0)
    return <div className="catalog-page__empty">Ничего не найдено</div>;
  const gridClasses = [
    "product-grid",
    viewMode === "list" ? "product-grid_layout_list" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const handleAddToCartClick = (product: Product) => {
    dispatch(addToCart(product));
    setAddedProductName(product.name);
    setIsModalOpen(true);
  };
  return (
    <div className={gridClasses}>
      {products.map((product) => {
        const firstImage =
          Array.isArray(product.images) && product.images.length > 0
            ? product.images[0]
            : "";
        const isItemInCart = cartItems.some((item) => item.product.id === product.id);
        return (
          <article key={product.id} className="product-card">
            <Link to={`/catalog/${product.id}`} className="product-card__image-wrapper">
              {firstImage && (
                <img
                  src={firstImage}
                  alt={product.name}
                  className="product-card__image"
                />
              )}
            </Link>
            <Link to={`/catalog/${product.id}`} className="product-card__title">
              {product.name}
            </Link>
            <p className="product-card__price">
              {product.price.toLocaleString("ru-RU")} ₽
            </p>
            {}
            {isItemInCart ? (
              <Button
                variant="default"
                colorVariant="secondary"
                className="product-card__button product-card__button_state_in-cart"
                aria-label="Товар уже в корзине"
                onClick={() => navigate('/cart')}
              >
                В корзине ✓
              </Button>
            ) : (
              <Button
                variant="icon"
                colorVariant="primary"
                className="product-card__button"
                aria-label="Добавить в корзину"
                disabled={!product.inStock}
                onClick={() => handleAddToCartClick(product)}
              >
                <img src={shoppingBagIcon} alt="В корзину" />
              </Button>
            )}
          </article>
        );
      })}
      {}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Товар добавлен в корзину"
        primaryButtonText="Перейти в корзину"
        secondaryButtonText="Продолжить покупки"
        onPrimaryClick={() => navigate('/cart')}
        onSecondaryClick={() => setIsModalOpen(false)}
      >
        Товар «{addedProductName}» успешно добавлен в корзину. Вы можете перейти к оформлению или продолжить выбор товаров.
      </Modal>
    </div>
  );
};