"use client";

import { useEffect, useState } from "react";
import classes from "./ProductPage.module.css";
import { useParams } from "next/navigation";
import Image from "next/image";
import plus from "../../../../public/images/products/plus.svg";
import minus from "../../../../public/images/products/minus.svg";
import arrowLeft from "../../../../public/images/slider/arrow left.svg";
import arrowRight from "../../../../public/images/slider/arrow right.svg";
import { useCart } from "@/pages/api/CartContext";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [buttonState, setButtonState] = useState({
    text: "добавить в корзину",
    colorClass: "",
  });

  const params = useParams();
  const id = params.id;
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("/api/accessories");
      if (response.ok) {
        const data = await response.json();
        const foundProduct = data.find((item) => item._id === id);
        if (foundProduct) {
          setProduct(foundProduct);
          setMainImage(foundProduct.images[0]);
        }
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleNextImage = () => {
    if (!product) return;
    const currentIndex = product.images.indexOf(mainImage);
    const nextIndex = (currentIndex + 1) % product.images.length;
    setMainImage(product.images[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!product) return;
    const currentIndex = product.images.indexOf(mainImage);
    const prevIndex =
      (currentIndex - 1 + product.images.length) % product.images.length;
    setMainImage(product.images[prevIndex]);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(Math.max(1, quantity - 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setButtonState({
      text: "товар добавлен в корзину",
      colorClass: classes.addedToCart,
    });
    setTimeout(() => {
      setButtonState({
        text: "добавить в корзину",
        colorClass: "",
      });
    }, 2000);
  };

  if (!product) return null;

  return (
    <div className={classes.wrapper}>
      <div className={classes.images}>
        <div className={classes.image}>
          <Image
            className={`${classes.arrow} ${classes.left}`}
            src={arrowLeft}
            alt='стрелочка'
            onClick={handlePrevImage}
          />
          <img
            src={mainImage}
            className={classes.mainImage}
            alt={product.name}
          />
          <Image
            className={`${classes.arrow} ${classes.right}`}
            src={arrowRight}
            alt='стрелочка'
            onClick={handleNextImage}
          />
        </div>
        <div
          className={`${classes.smallImages} ${
            product.images.length === 2 ? classes.twoImages : ""
          }`}
        >
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={classes.smallImage}
              alt={`${product.name} ${index + 1}`}
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={classes.productDetails}>
        <div className={classes.names}>
          <h1>{product.name}</h1>
          <p>{product.price} ₽</p>
        </div>
        <div className={classes.description}>{product.extendedDescription}</div>
        <div className={classes.quantityControl}>
          <div onClick={decreaseQuantity}>
            <Image src={minus} alt='минус' width={22} height={22} />
          </div>
          <span>{quantity}</span>
          <div onClick={increaseQuantity}>
            <Image src={plus} alt='плюс' width={22} height={22} />
          </div>
        </div>
        <div
          className={`${classes.button} ${buttonState.colorClass}`}
          onClick={handleAddToCart}
        >
          {buttonState.text}
        </div>
        <div className={classes.button}>доставка и оплата</div>
      </div>
    </div>
  );
};

export default ProductPage;
