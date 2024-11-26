"use client";

import classes from "./Footer.module.css";
import Link from "next/link";
import { useState } from "react";
import cross from "../../../../public/images/footer/cross.svg";
import Image from "next/image";

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("Спасибо за подписку!");
        setEmail("");
      } else {
        setStatus("Не удалось подписаться. Пожалуйста, попробуйте снова.");
      }
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Всплывающее окно исчезает через 3 секунды
    } catch (error) {
      setStatus("Произошла ошибка. Попробуйте позже.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className={classes.wrapper} id='footer'>
      {showPopup && (
        <div className={classes.popup}>
          <p>{status}</p>
        </div>
      )}

      <div className={classes.slogan}>
        <p>
          PROPER RESPECT
          <br />
          FOR <span>COFFEE</span>
        </p>
      </div>
      <div className={classes.info}>
        <div className={classes.block} onClick={() => toggleSection("address")}>
          <p className={classes.title}>Адрес</p>
          <Image
            className={`${classes.cross} ${
              expandedSections.address ? classes.rotated : ""
            }`}
            src={cross}
            width={14}
            height={14}
            alt='крестик'
          />
          <div
            className={`${classes.description} ${
              expandedSections.address ? classes.show : ""
            }`}
          >
            <Link href='https://yandex.ru/maps/org/props_coffee/147908042400/?indoorLevel=1&ll=37.500778%2C55.741186&z=17.11'>
              ул. Барклая, 8, Москва
            </Link>
          </div>
        </div>

        <div
          className={classes.block}
          onClick={() => toggleSection("contacts")}
        >
          <p className={classes.title}>Контакты</p>
          <Image
            className={`${classes.cross} ${
              expandedSections.contacts ? classes.rotated : ""
            }`}
            src={cross}
            width={14}
            height={14}
            alt='крестик'
          />
          <div
            className={`${classes.description} ${
              expandedSections.contacts ? classes.show : ""
            }`}
          >
            <Link href='tel:+79295444447'>+7 (929) 544-44-47</Link>
          </div>
        </div>

        <div className={classes.block} onClick={() => toggleSection("hours")}>
          <p className={classes.title}>График работы</p>
          <Image
            className={`${classes.cross} ${
              expandedSections.hours ? classes.rotated : ""
            }`}
            src={cross}
            width={14}
            height={14}
            alt='крестик'
          />
          <div
            className={`${classes.description} ${
              expandedSections.hours ? classes.show : ""
            }`}
          >
            <p>Ежедневно:</p>
            <div className={classes.time}>
              <span>9:00</span>
              <span className={classes.separator}></span>
              <span>21:00</span>
            </div>
          </div>
        </div>

        <div className={classes.block} onClick={() => toggleSection("social")}>
          <p className={classes.title}>Мы в соц сетях</p>
          <Image
            className={`${classes.cross} ${
              expandedSections.social ? classes.rotated : ""
            }`}
            src={cross}
            width={14}
            height={14}
            alt='крестик'
          />
          <div
            className={`${classes.description} ${
              expandedSections.social ? classes.show : ""
            }`}
          >
            Instagram -{" "}
            <Link href='https://www.instagram.com/propscoffee/'>
              propscoffee
            </Link>
          </div>
        </div>
        <div className={classes.block}>
          <Link className={classes.bottomLinks} href='/'>
            ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
          </Link>
        </div>
        <div className={`${classes.block} ${classes.last}`}>
          <Link className={classes.bottomLinks} href='/'>
            ПУБЛИЧНАЯ ОФЕРТА
          </Link>
        </div>
        <div className={classes.subscription}>
          <p>Подпишитесь на наши обновления</p>
          <form onSubmit={handleSubscribe} className={classes.form}>
            <input
              type='email'
              placeholder='ваш e-mail'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={classes.input}
            />
            <button type='submit' className={classes.submitButton}>
              отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
