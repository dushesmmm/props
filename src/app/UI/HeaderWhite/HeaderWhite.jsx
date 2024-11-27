"use client";

import classes from "./HeaderWhite.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/images/header/logo.svg";
import cartIcon from "../../../../public/images/header/cart.svg";
import { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import { useCart } from "@/pages/api/CartContext";

const HeaderWhite = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { cartQuantity } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      if (!prev && isCartVisible) setIsCartVisible(false);
      return !prev;
    });
  };

  const toggleCartVisibility = () => {
    setIsCartVisible((prev) => {
      if (!prev && menuOpen) setMenuOpen(false);
      return !prev;
    });
  };

  return (
    <div
      className={`${classes.wrapper} ${
        menuOpen ? classes.wrapperOpen : undefined
      }`}
    >
      <div
        className={`${classes.burger} ${menuOpen ? classes.open : undefined}`}
        onClick={toggleMenu}
      >
        <span></span>
      </div>
      <div className={`${classes.nav} ${menuOpen ? classes.active : ""}`}>
        <Link href='/menu'>меню</Link>
        <Link href='/accessories'>аксессуары</Link>
        <Link href='#footer'>контакты</Link>
        <Link href='/about-us'>о нас</Link>
      </div>

      <Link
        className={classes.logo}
        href='/'
        style={menuOpen ? { filter: "invert(0)" } : undefined}
      >
        <Image src={logo} alt='логотип' width={135} height={50} />
      </Link>

      <Image
        src={cartIcon}
        alt='корзина'
        className={classes.cart}
        onClick={toggleCartVisibility}
        style={menuOpen ? { filter: "invert(0)" } : undefined}
      />
      {cartQuantity > 0 && (
        <div className={classes.cartCount}>{cartQuantity}</div>
      )}
      {isCartVisible && (
        <div className={classes.cartContainer}>
          <Cart onClose={toggleCartVisibility} />
        </div>
      )}
    </div>
  );
};

export default HeaderWhite;
