'use client'

import classes from './Footer.module.css'
import Link from 'next/link'
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('Спасибо за подписку!');
        setEmail('');
      } else {
        setStatus('Не удалось подписаться. Пожалуйста, попробуйте снова.');
      }
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Всплывающее окно исчезает через 3 секунды
    } catch (error) {
      setStatus('Произошла ошибка. Попробуйте позже.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <div className={classes.wrapper}>
      {/* Всплывающее окно */}
      {showPopup && (
        <div className={classes.popup}>
          <p>{status}</p>
        </div>
      )}

      <div className={classes.slogan}>
        <p>PROPER RESPECT<br />FOR <span>COFFEE</span></p>
      </div>
      <div className={classes.info}>
         <div className={classes.block}>
            <p className={classes.title}>Адрес</p>
            <Link className={classes.description} href='https://yandex.ru/maps/org/props_coffee/147908042400/?indoorLevel=1&ll=37.500778%2C55.741186&z=17.11'>ул. Барклая, 8, Москва</Link>
         </div>
         <div className={classes.block}>
            <p className={classes.title}>контакты</p>
            <Link className={classes.description} href='tel:+7 (929) 544-44-47'>+7 (929) 544-44-47</Link>
         </div>
         <div className={classes.block}>
            <p className={classes.title}>график работы</p>
            <p className={classes.description}>Ежедневно : </p>
            <div className={classes.time}>
                <span>9:00</span>
                <span className={classes.separator}></span>
                <span>21:00</span>
            </div>
         </div>
         <div className={classes.block}>
            <p className={classes.title}>мы в соц сетях</p>
            <p className={classes.description}>Instagram - <Link className={classes.description} href='https://www.instagram.com/propscoffee/'>propscoffee</Link></p>
         </div>
         <div className={classes.block}>
            <Link className={classes.bottomLinks} href='/'>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</Link>
         </div>
         <div className={classes.block}>
            <Link className={classes.bottomLinks} href='/'>ПУБЛИЧНАЯ ОФЕРТА</Link>
         </div>
         <div className={classes.subscription}>
          <p>Подпишитесь на наши обновления</p>
          <form onSubmit={handleSubscribe} className={classes.form}>
            <input
              type="email"
              placeholder="ваш e-mail"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={classes.input}
            />
            <button type="submit" className={classes.submitButton}>отправить</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Footer;
