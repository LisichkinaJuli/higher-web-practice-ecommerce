import { useState, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCartItems, selectCartTotalPrice, selectCartTotalCount, clearCart, type CartItem } from '../../app/store/cartSlice';
import { Button } from '../../components/ui';
import type { User } from '../../types/user';

import { PaymentBlock } from './components/PaymentBlock';
import { DeliveryBlock } from './components/DeliveryBlock';
import { RecipientBlock } from './components/RecipientBlock';

interface ProductWithImages {
  id: string;
  name: string;
  price: number;
  images?: string[];
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const totalCount = useAppSelector(selectCartTotalCount);

  const [user] = useState<Partial<User>>(() => {
    const saved = localStorage.getItem('quant_user');
    return saved ? JSON.parse(saved) : { firstName: 'Имя', lastName: 'Фамилия', email: 'Email@yanex.ru' };
  });

  const [paymentMethod, setPaymentMethod] = useState<'card_online' | 'cash'>('card_online');
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'pickup_point'>('courier');
  const [city, setCity] = useState<'msk' | 'spb'>('msk');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('+7');
  const [comment, setComment] = useState('');
  const [activePickupIndex, setActivePickupIndex] = useState(0);

  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');

  const formatItemsWord = (count: number) => {
    if (count % 10 === 1 && count % 100 !== 11) return `${count} товар`;
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return `${count} товара`;
    return `${count} товаров`;
  };

  const handleOrderSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setPhoneError('');
    setAddressError('');

    let isValid = true;
    if (phone.trim() === '+7' || phone.trim().length < 11) {
      setPhoneError('Введите номер телефона');
      isValid = false;
    }
    if (deliveryMethod === 'courier' && !address.trim()) {
      setAddressError('Введите адрес доставки');
      isValid = false;
    }

    if (!isValid || cartItems.length === 0) return;

    const finalAddress = deliveryMethod === 'courier' 
      ? address 
      : (city === 'spb' ? "Санкт-Петербург, Невский проспект 20" : "Москва, Арбат 12");

    const newOrder = {
      id: crypto.randomUUID(),
      number: `ЗАКАЗ-${Math.floor(1000000000000 + Math.random() * 9000000000000)}`,
      userId: user.id || null,
      status: 'paid',
      items: cartItems.map((item: CartItem) => {
        let finalQuantity = 1;
        if ('count' in item && typeof (item as unknown as { count: number }).count === 'number') {
          finalQuantity = (item as unknown as { count: number }).count;
        } else if ('quantity' in item && typeof (item as unknown as { quantity: number }).quantity === 'number') {
          finalQuantity = (item as unknown as { quantity: number }).quantity;
        }

        const productWithImgs = item.product as ProductWithImages;
        const hasImages = Array.isArray(productWithImgs.images) && productWithImgs.images.length > 0;

        return {
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: finalQuantity,
          image: hasImages ? productWithImgs.images?.[0] : ""
        };
      }),
      totalPrice,
      paymentMethod,
      deliveryMethod,
      address: finalAddress,
      customer: {
        firstName: user.firstName || 'Покупатель',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: phone.trim()
      },
      createdAt: new Date().toISOString()
    };

    const existingOrdersRaw = localStorage.getItem("quant_orders_history");
    let existingOrders = [];
    try {
      existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
    } catch {
      existingOrders = [];
    }
    localStorage.setItem("quant_orders_history", JSON.stringify([newOrder, ...existingOrders]));

    dispatch(clearCart());
    
    navigate('/checkout/success', { 
      state: { order: newOrder },
      replace: true 
    });
  };

  return (
    <div className="checkout-page">
      <form onSubmit={handleOrderSubmit} noValidate className="checkout-page__layout">
        
        <div className="checkout-page__form-blocks">
          <PaymentBlock method={paymentMethod} onChange={setPaymentMethod} />
          
          <DeliveryBlock 
            method={deliveryMethod} onMethodChange={setDeliveryMethod}
            city={city} onCityChange={setCity}
            address={address} onAddressChange={(val) => { setAddress(val); setAddressError(''); }}
            addressError={addressError}
            pickupIndex={activePickupIndex} onPickupIndexChange={setActivePickupIndex}
          />
          
          <RecipientBlock 
            user={user} phone={phone} 
            onPhoneChange={(val) => { setPhone(val); setPhoneError(''); }}
            phoneError={phoneError} comment={comment} onCommentChange={setComment}
          />
        </div>

        <aside className="checkout-summary">
          <div className="checkout-summary__card">
            <div className="checkout-summary__rows">
              <div className="checkout-summary__line"><span className="checkout-summary__label">Ваш заказ</span><span className="checkout-summary__value">{formatItemsWord(totalCount)}</span></div>
              <div className="checkout-summary__line"><span className="checkout-summary__label">Сумма заказа</span><span className="checkout-summary__value">{totalPrice.toLocaleString('ru-RU')} ₽</span></div>
              <div className="checkout-summary__line"><span className="checkout-summary__label">Стоимость доставки</span><span className="checkout-summary__value checkout-summary__value_color_success">бесплатно</span></div>
              <div className="checkout-summary__divider" />
              <div className="checkout-summary__line checkout-summary__line_type_total"><span className="checkout-summary__label_bold">Итого</span><span className="checkout-summary__price-total">{totalPrice.toLocaleString('ru-RU')} ₽</span></div>
            </div>
            <Button type="submit" variant="default" colorVariant="primary" fullWidth className="checkout-summary__submit-btn">Оплатить</Button>
          </div>
          <div className="checkout-summary__decor hidden lg:block" />
        </aside>

      </form>
    </div>
  );
}
