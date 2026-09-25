import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../../api/baseApi";
import { useGetRatingsByProductQuery } from "../../../api/ratingsApi";
import { Button, Rating } from "../../../components/ui";
import type { Product } from "../../../types/product";
import ArrowIcon from "../../../assets/Arrow.svg?react";
import ShoppingBagIcon from "../../../assets/Shopping_bag.svg?react";
import HeartIcon from "../../../assets/Heart.svg?react";

interface ProductCardDetailProps {
  product: Product;
}

const ProductCardDetail = ({ product }: ProductCardDetailProps) => {
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [];

  const handlePrevImage = () => {
    setActiveImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const hasRating = typeof product.rating === "number" && product.rating > 0;
  const displayRating = hasRating ? product.rating.toFixed(1) : "0.0";
  const ratingCount =
    typeof product.ratingCount === "number" ? product.ratingCount : 0;

  return (
    <div className="product-page__layout">
      <section className="product-page__gallery">
        <div className="product-page__main-img-wrapper">
          {images.length > 1 && (
            <Button
              variant="text"
              onClick={handlePrevImage}
              className="product-page__nav-arrow product-page__nav-arrow_dir_left"
              aria-label="Предыдущее изображение"
            >
              <ArrowIcon className="icon-m" />
            </Button>
          )}

          {images.length > 0 && (
            <img
              src={images[activeImgIndex]}
              alt={product.name}
              className="product-page__main-img"
            />
          )}

          {images.length > 1 && (
            <Button
              variant="text"
              onClick={handleNextImage}
              className="product-page__nav-arrow product-page__nav-arrow_dir_right"
              aria-label="Следующее изображение"
            >
              <ArrowIcon className="icon-m rotate-180" />
            </Button>
          )}
        </div>

        {images.length > 1 && (
          <div className="product-page__thumbs">
            {images.map((imgUrl, idx) => {
              const thumbClasses = [
                "product-page__thumb-btn",
                idx === activeImgIndex
                  ? "product-page__thumb-btn_state_active"
                  : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <Button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={thumbClasses}
                  aria-label={`Открыть изображение ${idx + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt=""
                    className="product-page__thumb-img"
                  />
                </Button>
              );
            })}
          </div>
        )}
      </section>

      <section className="product-page__info">
        <div className="product-page__title-row">
          <h1 className="product-page__title">{product.name}</h1>
          <div className="product-page__rating">
            <div className="product-page__rating-top">
              <Rating value={hasRating ? 1 : 0} count={1} size="l" disabled />
              <span>{displayRating}</span>
            </div>
            <span className="product-page__reviews-count">
              {ratingCount} оценок
            </span>
          </div>
        </div>

        <div className="product-page__price-row">
          <div className="product-page__price">
            {product.price.toLocaleString()} ₽
          </div>
          <span className="product-page__stock-status product-page__stock-status_position_top">
            {product.inStock ? "Есть в наличии" : "Нет в наличии"}
          </span>
        </div>

        <div className="product-page__actions">
          <div className="product-page__actions-row">
            <Button
              variant="default"
              colorVariant="primary"
              className="product-page__buy-btn"
              aria-label="Добавить усы в корзину"
            >
              <ShoppingBagIcon className="icon-m" />
            </Button>

            <Button
              variant="text"
              colorVariant="primary"
              className="product-page__favorite-btn"
              aria-label="Добавить в избранное"
            >
              <HeartIcon className="icon-m" />
            </Button>
          </div>

          <span className="product-page__stock-status product-page__stock-status_position_bottom">
            {product.inStock ? "Есть в наличии" : "Нет в наличии"}
          </span>
        </div>

        <h3 className="product-page__section-title">Описание</h3>
        <p className="product-page__description">{product.description}</p>

        <h3 className="product-page__section-title">О товаре</h3>
        <div className="product-page__specs-table">
          {Object.entries(product.characteristics).map(([key, val]) => (
            <div key={key} className="product-page__specs-row">
              <span className="product-page__specs-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
              <span className="product-page__specs-value">{val || "—"}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="product-page__mobile-sticky-action">
        <Button
          variant="default"
          colorVariant="primary"
          className="product-page__mobile-buy-btn"
          aria-label="Добавить усы в корзину"
        >
          <ShoppingBagIcon className="icon-m" />
        </Button>
      </div>
    </div>
  );
};

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useGetProductsQuery();
  const { data: reviews, isLoading: isReviewsLoading } =
    useGetRatingsByProductQuery(id ?? "", { skip: !id });

  const [userRating, setUserRating] = useState<number>(0);

  if (isProductsLoading || isReviewsLoading)
    return (
      <div className="catalog-page__loading">
        Загрузка информации о товаре...
      </div>
    );
  if (productsError || !products)
    return (
      <div className="catalog-page__error">
        Не удалось загрузить данные усов
      </div>
    );

  const product = products.find((p) => p.id === id);
  if (!product)
    return (
      <div className="catalog-page__empty">Товар не найден в каталоге</div>
    );

  const reviewList = reviews ?? [];

  const formatReviewDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="product-page">
      <ProductCardDetail product={product} />

      <div className="rating-comments-block">
        <div className="rating-comments-block__input-zone">
          <h3 className="rating-comments-block__input-title">Оцените усы</h3>
          <Rating
            value={userRating}
            onChange={(val) => setUserRating(val)}
            size="m"
          />
          <Button
            variant="default"
            colorVariant="secondary"
            className="rating-comments-block__submit-btn"
          >
            Оценить
          </Button>
        </div>

        {reviewList.length > 0 && (
          <div className="rating-comments-block__list">
            {reviewList.map((review) => (
              <div key={review.id} className="rating-comments-block__row">
                <div className="rating-comments-block__author-meta">
                  <Rating value={review.rating} size="s" disabled />
                  <span className="rating-comments-block__score">
                    {review.rating.toFixed(1)}
                  </span>
                  <span className="rating-comments-block__author-name">
                    {review.userName}
                  </span>
                </div>
                <span className="rating-comments-block__date">
                  {formatReviewDate(review.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
