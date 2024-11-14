import clientPromise from '../../app/lib/mongodb';

export default async (req, res) => {
  const { subcategory } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db('props');
    const collection = db.collection('products');

    const query = subcategory ? { subcategory: subcategory } : {};
    const data = await collection.find(query).toArray();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка подключения к базе данных' });
  }
};
