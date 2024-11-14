'use client';

import { useCart } from '@/pages/api/CartContext';
import { useState } from 'react';
import classes from './Cart.module.css';
import close from '../../../../public/images/header/close.svg';
import Image from 'next/image';
import plus from '../../../../public/images/products/plus.svg';
import cross from '../../../../public/images/header/delete.svg';

const Cart = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, incrementOrderId, orderId } = useCart();

  const handleCheckout = async () => {
    // Форматируем ID заказа, например, #0001
    const formattedOrderId = `#${String(orderId).padStart(4, '0')}`;

    // Формируем детали заказа
    const orderDetails = cart.map(item => `${item.name} x ${item.quantity}`).join('\n');
    const message = `Новый заказ ${formattedOrderId}:\n\n${orderDetails}\n\nИтого: ${formattedTotalPrice} ₽`;

    try {
      // Отправка сообщения в Telegram
      await fetch(`https://api.telegram.org/bot7691565934:AAEzqQkxS2Sj_Bc2HEuf8HcRG7rfms5Yq4g/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: '-4504998660',
          text: message,
        }),
      });

      // Инкрементируем ID заказа для следующего заказа
      incrementOrderId();

      // Закрываем и очищаем корзину
      clearCart();
      onClose();
    } catch (error) {
      console.error('Ошибка отправки в Telegram:', error);
      alert('Не удалось отправить заказ.');
    }
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const formattedTotalPrice = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div className={classes.wrapper}>
      <div className={classes.close}>
        <Image src={close} width={22} height={22} onClick={onClose} alt='закрыть' />
      </div>
      {cart.length === 0 ? (
        <p className={classes.empty}>Ваша корзина пуста</p>
      ) : (
        <div className={classes.cartItems}>
          <div className={classes.quantity}>{totalQuantity} товар(ов) в корзине</div>
          <div className={classes.price}><p>Итого</p> <p>{formattedTotalPrice} ₽</p></div>
          {cart.map((item) => (
            <div key={item._id} className={classes.cartItem}>
              <img src={item.images[0]} alt={item.name} className={classes.cartItemImage} width={170} height={170} />
              <div className={classes.cartItemDetails}>
                <div className={classes.main}>
                  <h2>{item.name}</h2>
                  <p>{(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ₽</p>
                </div>
                <div className={classes.description}>{item.description}</div>
                <div className={classes.buttons}>
                  <div className={classes.quantityControl}>
                    <div onClick={() => updateQuantity(item._id, -1)}><Image src={plus} alt="минус" width={34} height={34} /></div>
                    <span>{item.quantity}</span>
                    <div onClick={() => updateQuantity(item._id, 1)}><Image src={plus} alt="плюс" width={34} height={34} /></div>
                  </div>
                  <div className={classes.delete} onClick={() => removeFromCart(item._id)}><Image src={cross} /></div>
                </div>
              </div>
            </div>
          ))}
          <div onClick={handleCheckout} className={classes.checkoutButton} alt='удалить'>
            Оформить заказ
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
