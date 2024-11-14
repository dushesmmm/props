import classes from './AboutUs.module.css'
import aboutUs from '../../../public/images/main page/about us.png';
import Image from 'next/image';
import first from '../../../public/images/about/first.jpg'
import second from '../../../public/images/about/second.jpg'
import third from '../../../public/images/about/third.jpg'

const AboutUs = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.background}>
        <div className={classes.slogan}>
          <p>PROPER RESPECT<br/>FOR <span>COFFEE</span></p>
          <h4>Wake up to the perfect cup of coffee every morning and never run out of your favourite coffee blends again. Choose any standard flavour from our selection, the number of capsules, and the frequency, and we'll take care of the rest. Our sustainably sourced and perfectly roasted coffee beans are packaged in biodegradable capsules to deliver the freshest and richest taste with every brew. Additionally, our coffee is organic and climate compensated, so you can feel good about every cup you enjoy.</h4>
        </div>
      </div>
      <div className={classes.coffee} id='more'>
        <Image src={aboutUs} alt='о нас' width={1024} height={872} />
          <div className={classes.coffee_text}>
            <h3>О НАС</h3>
            <p>Wake up to the perfect cup of coffee every morning and never run out of your favourite coffee blends again. Choose any standard flavour from our selection, the number of capsules, and the frequency, and we'll take care of the rest. Our sustainably sourced and perfectly roasted coffee beans are packaged in biodegradable capsules to deliver the freshest and richest taste with every brew. Additionally, our coffee is organic and climate compensated, so you can feel good about every cup you enjoy.</p>
          </div>
      </div>
      <div className={classes.gallery}>
        <Image alt='изображение 1' width={590} height={750} src={first}/>
        <Image alt='изображение 2' width={590} height={750} src={second}/>
        <Image alt='изображение 3' width={590} height={750} src={third}/>
      </div>
    </div>
  )
}

export default AboutUs
