// pages/api/save-item.js
import clientPromise from '../../app/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { _id, name, description, imageUrl, category, price, bestseller } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('props');
      const collection = db.collection('products');

      if (_id) {
        await collection.updateOne(
          { _id: new ObjectId(_id) },
          { $set: { name, description, imageUrl, category, price, bestseller } }
        );
      } else {
        await collection.insertOne({ name, description, imageUrl, category, price, bestseller });
      }

      res.status(200).json({ message: 'Успешно сохранено' });
    } catch (error) {
      console.error('Ошибка сохранения продукта:', error);
      res.status(500).json({ error: 'Ошибка при сохранении продукта' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Метод ${req.method} не разрешен`);
  }
};
