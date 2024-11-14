'use client';

import { useEffect, useState } from 'react';
import classes from './ProductPage.module.css';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import plus from '../../../../public/images/products/plus.svg';
import { useCart } from '@/pages/api/CartContext';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const id = params.id;
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch('/api/accessories');
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

  if (!product) return null;

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(Math.max(1, quantity - 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.images}>
        <div className={classes.image}>
          <img src={mainImage} className={classes.mainImage} alt={product.name} />
        </div>
        <div className={`${classes.smallImages} ${product.images.length === 2 ? classes.twoImages : ''}`}>
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
        <div className={classes.description}>
          {product.description}
        </div>
        <div className={classes.quantityControl}>
          <div onClick={decreaseQuantity}><Image src={plus} alt="плюс" width={34} height={34} /></div>
          <span>{quantity}</span>
          <div onClick={increaseQuantity}><Image src={plus} alt="плюс" width={34} height={34} /></div>
        </div>
        <div className={classes.button} onClick={handleAddToCart}>
          добавить в корзину
        </div>
        <div className={classes.button}>
          доставка и оплата
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
