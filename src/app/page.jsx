import classes from "./page.module.css";
import Image from "next/image";
import logo from "../../public/images/main page/logo white.png";
import aboutUs from "../../public/images/main page/about us.png";
import accessory from "../../public/images/main page/accessory.png";
import accessory1 from "../../public/images/main page/accessory 1.png";
import Link from "next/link";
import clientPromise from "./lib/mongodb";
import HeaderTransparent from "./UI/HeaderTransparent/HeaderTransparent";

export default async function Home() {
  let bestsellerItems = [];

  try {
    const client = await clientPromise;
    const db = client.db("props");
    const collection = db.collection("products");

    bestsellerItems = await collection
      .find({ subcategory: "бестселлер" })
      .sort({ _id: -1 })
      .limit(4)
      .toArray();

    bestsellerItems = bestsellerItems.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }

  return (
    <div>
      <HeaderTransparent />
      <div className={classes.wrapper}>
        <Image src={logo} alt='логотип' />
        <div className={classes.button}>
          <Link href='#more'>УЗНАТЬ БОЛЬШЕ</Link>
        </div>
      </div>
      <div className={classes.main}>
        <div className={classes.category}>
          <p>наши бестселлеры</p>
          <Link href='/menu'>перейти в меню</Link>
        </div>
        <div className={classes.productsWrapper}>
          {bestsellerItems.map((item) => (
            <div key={item._id} className={classes.product}>
              <img
                src={item.imageUrl}
                alt={item.name}
                width={434}
                height={434}
              />
              <div className={classes.nameWrapper}>
                <h3>{item.name}</h3>
                <p>{item.price} ₽</p>
              </div>
              <p className={classes.description}>{item.description}</p>
            </div>
          ))}
        </div>
        <div className={classes.aboutUs} id='more'>
          <Image src={aboutUs} alt='о нас' width={1024} height={872} />
          <div className={classes.aboutUs_text}>
            <h3>О НАС</h3>
            <p>
              Wake up to the perfect cup of coffee every morning and never run
              out of your favorite coffee blends again. Choose any standard
              flavour from our selection, the number of capsules, and the
              frequency, and we'll take care of the rest. Our sustainably
              sourced and perfectly roasted coffee beans are packaged in
              biodegradable capsules to deliver the freshest and richest taste
              with every brew. Additionally, our coffee is organic and climate
              compensated, so you can feel good about every cup you enjoy.
            </p>
            <Link href='/about-us'>УЗНАТЬ БОЛЬШЕ</Link>
          </div>
        </div>
        <div className={classes.category}>
          <p>аксессуары</p>
          <Link href='/accessories'>посмотреть все</Link>
        </div>
        <div className={classes.gallery}>
          <Image src={accessory} alt='аксессуары' width={885} height={885} />
          <Image src={accessory1} alt='аксессуары' width={885} height={885} />
        </div>
      </div>
    </div>
  );
}
