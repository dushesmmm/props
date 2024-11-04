import clientPromise from '../../app/lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('props');
    const collection = db.collection('products');
    const data = await collection.find({}).toArray();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка подключения к базе данных' });
  }
};
