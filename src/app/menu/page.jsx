'use client';

import { useEffect, useState } from 'react';
import classes from './menu.module.css';
import ProductSlider from '../UI/ProductsSlider/ProductsSlider';

export default function Menu() {
  const [bestsellerItems, setBestsellerItems] = useState([]);

  const fetchProducts = async (subcategory) => {
    const response = await fetch(`/api/products?subcategory=${subcategory}`);
    let items = await response.json();

    // Сортируем элементы по `_id` от новых к старым
    items = items.sort((a, b) => (a._id < b._id ? 1 : -1));

    setBestsellerItems(items);
  };

  useEffect(() => {
    fetchProducts('бестселлер'); // Загружаем бестселлеры по умолчанию
  }, []);

  const handleSubcategoryChange = (subcategory) => {
    fetchProducts(subcategory);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.upperNav}>
        <p onClick={() => handleSubcategoryChange('бестселлер')}>бестселлеры</p>
        <p onClick={() => handleSubcategoryChange('сезонные новинки')}>сезонные новинки</p>
        <p onClick={() => handleSubcategoryChange('классика')}>классика</p>
      </div>
      <ProductSlider items={bestsellerItems} />
    </div>
  );
}
