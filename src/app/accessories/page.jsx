"use client";

import { useEffect, useState } from "react";
import classes from "./accessories.module.css";
import { useRouter } from "next/router";

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch("/api/accessories");
        if (response.ok) {
          const data = await response.json();
          setAccessories(data);
        } else {
          console.error("Ошибка при загрузке аксессуаров");
        }
      } catch (error) {
        console.error("Ошибка при запросе:", error);
      }
    };

    fetchAccessories();
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.categoryWrapper}>
        <div className={classes.category}>
          <div>АКСЕССУАРЫ</div>
        </div>
        <div className={classes.description}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, dicta
          beatae illo velit rem
        </div>
      </div>

      <div className={classes.accessoriesList}>
        {accessories.map((accessory) => (
          <a
            href={`/accessories/${accessory._id}`}
            key={accessory._id}
            className={classes.accessoryItem}
          >
            <img
              src={accessory.images[0]}
              alt={accessory.name}
              className={classes.accessoryImage}
            />
            <div className={classes.accessoryDetails}>
              <h3>{accessory.name}</h3>
              <p>{accessory.price} ₽</p>
            </div>
            <p className={classes.accessoryDescription}>
              {accessory.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Accessories;
