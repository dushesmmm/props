'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './EditItem.module.css';

const AddAccessory = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState([]); // Состояние для хранения списка ссылок на изображения

  // Функция для добавления URL изображения в список
  const handleAddImageUrl = () => {
    if (imageUrl && !imageUrls.includes(imageUrl)) {
      setImageUrls([...imageUrls, imageUrl]);
      setImageUrl(''); // Очистить поле после добавления
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newAccessory = {
      name,
      description,
      price: parseFloat(price),
      images: imageUrls,
    };

    try {
      const res = await fetch('/api/accessories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAccessory),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        console.error('Ошибка при добавлении аксессуара');
      }
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Добавить аксессуар</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
            placeholder="Название"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
             placeholder="Описание"
             className={styles.textarea}
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Цена продукта"
            className={styles.input}
          />
          <div className={styles.menu}>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Ссылка на изображение"
              className={styles.input}
            />
            <button type="button" onClick={handleAddImageUrl} className={styles.saveButton} style={{background: 'blue'}}>
              Добавить ссылку
            </button>
          </div>
        {imageUrls.length > 0 && (
          <div>
            <h3>Добавленные изображения:</h3>
            <ul style={{display: 'flex'}}>
              {imageUrls.map((url, index) => (
                <div key={index} className={styles.photos}>
                    <p>{index + 1}.</p>
                  <img src={url} alt={`Image ${index + 1}`} width={100} height={100} />
                </div>
              ))}
            </ul>
          </div>
        )}
        <button type="submit" className={styles.saveButton}>Добавить аксессуар</button>
      </form>
    </div>
  );
};

export default AddAccessory;
