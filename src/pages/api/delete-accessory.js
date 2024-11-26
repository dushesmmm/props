import clientPromise from '../../app/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  if (req.method === 'DELETE') {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ error: 'Не указан ID аксессуара для удаления' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('props');
      const collection = db.collection('accessories');

      const result = await collection.deleteOne({ _id: new ObjectId(_id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Аксессуар не найден' });
      }

      res.status(200).json({ message: 'Аксессуар удалён' });
    } catch (error) {
      console.error('Ошибка удаления аксессуара:', error);
      res.status(500).json({ error: 'Ошибка при удалении аксессуара' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Метод ${req.method} не разрешен`);
  }
};
