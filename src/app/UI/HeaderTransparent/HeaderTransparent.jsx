import classes from './HeaderTransparent.module.css'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../../public/images/header/logo.svg'
import cart from '../../../../public/images/header/cart.svg'

const HeaderTransparent = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.nav}>
        <Link href='/menu'>меню</Link>
        <Link href=''>аксессуары</Link>
        <Link href=''>контакты</Link>
        <Link href=''>о нас</Link>
      </div>
      <Image src={logo} alt='логотип'/>
      <Image src={cart} alt='корзина'/>
    </div>
  )
}

export default HeaderTransparent;
