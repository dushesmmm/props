// pages/api/your-endpoint.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db('props');
  const collection = db.collection('clients');

  if (req.method === 'GET') {
    const subscribers = await collection.find().toArray();
    res.status(200).json(subscribers);
  } else if (req.method === 'POST') {
    const { email, date } = req.body;
    const result = await collection.insertOne({ email, date });
    res.status(201).json({ message: 'Subscriber added', id: result.insertedId });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }

  await client.close();
}
