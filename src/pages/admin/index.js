'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import clientPromise from '../../app/lib/mongodb';
import { useRouter } from 'next/router';
import styles from './AdminPanel.module.css'; // Импортируем CSS-модуль

const AdminPanel = ({ items, accessories }) => {
  const router = useRouter();

  useEffect(() => {
    const auth = document.cookie.split('; ').find(row => row.startsWith('auth='));
    if (!auth) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <h1>Админ панель</h1>
      
      <Link href="/admin/edit" className={styles.addButton}>Добавить новый продукт</Link>
      <ul className={styles.itemList}>
        {items.map((item) => (
          <li key={item._id} className={styles.item}>
            <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
            <div className={styles.itemDetails}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className={styles.category}>Категория: {item.category}</p>
              <p className={styles.category}>Цена: {item.price} ₽</p>
              {item.bestseller && (
                <p className={styles.bestseller}>Бестселлер: Да</p>
              )}
              <Link href={`/admin/edit?id=${item._id}`} className={styles.editLink}>Редактировать</Link>
            </div>
          </li>
        ))}
      </ul>
      
      <Link href="/admin/addAccessory" className={styles.addButton}>Добавить новый аксессуар</Link>
      <div className={styles.accessorySection}>
        <h2>Аксессуары</h2>
          <ul className={styles.itemList}>
              {accessories.map((accessory) => (
              <li key={accessory._id} className={styles.item}>
                  <img src={accessory.images[0]} alt={accessory.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h3>{accessory.name}</h3>
                    <p>{accessory.description}</p>
                    <p className={styles.category}>Цена: {accessory.price} ₽</p>
                    <Link href={`/admin/editAccessory?id=${accessory._id}`} className={styles.editLink}>Редактировать</Link>
                  </div>
                </li>
              ))}
            </ul>
      </div>
      <button onClick={handleLogout} className={styles.exitButton}>Выйти</button>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db('props');
    
    // Получаем продукты
    const productsCollection = db.collection('products');
    const items = await productsCollection.find({}).toArray();

    // Получаем аксессуары
    const accessoriesCollection = db.collection('accessories');
    const accessories = await accessoriesCollection.find({}).toArray();

    return {
      props: {
        items: JSON.parse(JSON.stringify(items)),
        accessories: JSON.parse(JSON.stringify(accessories)),
      },
    };
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
    return { props: { items: [], accessories: [] } };
  }
}

export default AdminPanel;
