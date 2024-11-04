import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(422).json({ message: 'Неверный email' });
    }

    try {
      await client.connect();
      const db = client.db('props');
      const collection = db.collection('clients');

      await collection.insertOne({ email, date: new Date() });

      res.status(201).json({ message: 'Подписка успешна' });
    } catch (error) {
      res.status(500).json({ message: 'Не удалось сохранить email' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Метод не разрешен' });
  }
}
