import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clientPromise from '../../app/lib/mongodb';
import { ObjectId } from 'mongodb';
import styles from './EditItem.module.css';

const EditItem = ({ item, categories }) => {
  const [formData, setFormData] = useState(item || { 
    name: '', 
    description: '', 
    imageUrl: '', 
    category: '', 
    price: '', 
    bestseller: false  // Добавляем поле для бестселлера
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log("formData при загрузке:", formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/save-item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push('/admin');
    }
  };

  const handleDelete = async () => {
    if (!formData._id) {
      console.error("ID продукта отсутствует");
      return;
    }

    const response = await fetch(`/api/delete-item`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: formData._id }),
    });

    if (response.ok) {
      router.push('/admin');
    } else {
      const errorData = await response.json();
      console.error("Ошибка при удалении продукта:", errorData.error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>{id ? 'Редактировать продукт' : 'Добавить новый продукт'}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Название продукта"
          required
          className={styles.input}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Описание продукта"
          required
          className={styles.textarea}
        ></textarea>
        
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Ссылка на изображение"
          className={styles.input}
        />
        
        <select name="category" value={formData.category} onChange={handleChange} required className={styles.select}>
          <option value="">Выберите категорию</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Цена продукта"
          required
          className={styles.input}
        />

        {/* Ползунок для параметра бестселлер */}
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="bestseller"
            checked={formData.bestseller}
            onChange={handleChange}
            className={styles.checkbox}
          />
          Бестселлер
        </label>

        <div className={styles.buttons}>
          <button type="submit" className={styles.saveButton}>Сохранить</button>
          {id && <button type="button" onClick={handleDelete} className={styles.deleteButton}>Удалить</button>}
        </div>
      </form>
    </div>
  );
};

export default EditItem;

export async function getServerSideProps(context) {
  const { req, query } = context;
  const { id } = query;

  let item = null;

  const authCookie = req.cookies.auth;
  const correctPassword = '52';

  if (!authCookie || authCookie !== correctPassword) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (id) {
    const client = await clientPromise;
    const db = client.db('props');
    const collection = db.collection('products');
    item = await collection.findOne({ _id: new ObjectId(id) });
  
    if (item) {
      item._id = item._id.toString();
      item.bestseller = !!item.bestseller; // Преобразуем значение бестселлера в булево
    }
  }

  const categories = ['Еда', 'Напитки', 'Десерты', 'Кофе', 'Чай'];
  return { props: { item, categories } };
}
