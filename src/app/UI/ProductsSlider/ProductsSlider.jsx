'use client';

import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import styles from './ProductsSlider.module.css';
import Image from 'next/image';
import al from '../../../../public/images/slider/arrow left.svg';
import ar from '../../../../public/images/slider/arrow right.svg';

export default function ProductSlider({ items }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    // Принудительно обновляем слайдер при изменении данных
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [items]);

  return (
    <div className={styles.navigationWrapper}>
      <div ref={sliderRef} className={`keen-slider ${styles.slider}`} key={items.length}>
        {items.map((item) => (
          <div key={item._id} className={`keen-slider__slide ${styles.slide}`}>
            <img src={item.imageUrl} alt={item.name} width={434} height={434} />
            <div className={styles.nameWrapper}>
              <h3>{item.name}</h3>
              <p>{item.price} ₽</p>
            </div>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
            disabled={currentSlide === 0}
          />
          <Arrow
            onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
            disabled={currentSlide === 0}
          />
        </>
      )}
    </div>
  );
}

function Arrow({ left, onClick, disabled }) {
  const arrowSrc = left ? al : ar;
  return (
    <Image
      src={arrowSrc}
      onClick={onClick}
      className={`${styles.arrow} ${left ? styles.left : styles.right} ${disabled ? styles.disabled : ''}`}
      alt={left ? 'стрелочка влево' : 'стрелочка вправо'}
    />
  );
}
