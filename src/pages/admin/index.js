'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import clientPromise from '../../app/lib/mongodb';
import { useRouter } from 'next/router';
import styles from './AdminPanel.module.css'; // Импортируем CSS-модуль

const AdminPanel = ({ items }) => {
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

  const handleExport = async () => {
    try {
      const response = await fetch('/api/google', { method: 'GET' });
      const data = await response.json();
      if (data.success) {
        alert('Данные успешно экспортированы!');
      } else {
        alert('Ошибка экспорта: ' + data.error);
      }
    } catch (error) {
      alert('Ошибка при вызове API: ' + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Админ панель</h1>
      <button onClick={handleExport} className={styles.exportButton}>Экспортировать в Google Таблицу</button>
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
      <button onClick={handleLogout} className={styles.exitButton}>Выйти</button>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db('props');
    const collection = db.collection('products');
    const items = await collection.find({}).toArray();

    return {
      props: {
        items: JSON.parse(JSON.stringify(items)),
      },
    };
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
    return { props: { items: [] } };
  }
}

export default AdminPanel;
