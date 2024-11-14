'use client'

import classes from './HeaderWhite.module.css'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../../public/images/header/logo.svg'
import cart from '../../../../public/images/header/cart.svg'
import { useState } from 'react'
import Cart from '../Cart/Cart'

const HeaderWhite = () => {

  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.nav}>
        <Link href='/menu'>меню</Link>
        <Link href='/accessories'>аксессуары</Link>
        <Link href=''>контакты</Link>
        <Link href="/about-us">о нас</Link>
      </div>
      <Link className={classes.logo} href='/'>
        <Image src={logo} alt='логотип'/>
      </Link>
      <Image src={cart} alt='корзина' className={classes.cart} onClick={toggleCartVisibility}/>
      {isCartVisible && (
        <div className={classes.cartContainer}>
          <Cart onClose={toggleCartVisibility} />
        </div>
      )}
    </div>
  )
}

export default HeaderWhite;
