'use client';

import { useEffect, useState } from 'react';
import classes from './menu.module.css';
import ProductSlider from '../UI/ProductsSlider/ProductsSlider';
import ProductCategoryBlock from '../UI/ProductCategoryBlock/ProductCategoryBlock';

export default function Menu() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentSubcategory, setCurrentSubcategory] = useState('бестселлер');
  const [currentType, setCurrentType] = useState('напитки');
  const typeDescriptions = {
    напитки: 'Здесь вы найдете наши лучшие напитки, которые согреют и подарят удовольствие в любой сезон.',
    выпечка: 'Откройте для себя нашу выпечку: свежие и ароматные изделия, которые подойдут для любого случая.',
  };

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const items = await response.json();

    const sortedItems = items.sort((a, b) => (a._id < b._id ? 1 : -1));

    setAllProducts(sortedItems);
    setFilteredProducts(sortedItems.filter(item => item.subcategory === currentSubcategory && item.type === currentType)); // Фильтруем по подкатегории и типу
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(allProducts.filter(item => item.subcategory === currentSubcategory && item.type === currentType)); // Фильтруем продукты для слайдера
  }, [currentSubcategory, currentType, allProducts]);

  const handleSubcategoryChange = (subcategory) => {
    setCurrentSubcategory(subcategory);
  };

  const handleTypeChange = (type) => {
    setCurrentType(type);
  };

  const groupedItems = allProducts.reduce((acc, item) => {
    const category = item.category || 'Без категории';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className={classes.wrapper}>
      <div className={classes.upperNav}>
        <p onClick={() => handleSubcategoryChange('бестселлер')}>бестселлеры</p>
        <p onClick={() => handleSubcategoryChange('сезонные новинки')}>сезонные новинки</p>
        <p onClick={() => handleSubcategoryChange('классика')}>классика</p>
      </div>
      <ProductSlider items={filteredProducts} type={currentType} />
      <div className={classes.categoryWrapper}>
        <div className={classes.category}>
          <div onClick={() => handleTypeChange('напитки')} className={currentType === 'напитки' ? classes.active : ''}>
            НАПИТКИ
          </div>
          <p> / </p>
          <div onClick={() => handleTypeChange('выпечка')} className={currentType === 'выпечка' ? classes.active : ''}>
            выпечка
          </div>
        </div>
        <div className={classes.description}>
          {typeDescriptions[currentType]}
        </div>
      </div>
      <div>
        {Object.keys(groupedItems).map((category, index) => {
          const filteredCategoryItems = groupedItems[category].filter(item => item.type === currentType);

          if (filteredCategoryItems.length === 0) return null;

          return (
            <ProductCategoryBlock 
              key={category} 
              title={category} 
              items={filteredCategoryItems} 
              type={currentType} 
              blockNumber={index + 1}
            />
          );
        })}
      </div>
    </div>
  );
}
