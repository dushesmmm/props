import clientPromise from "../../app/lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  if (req.method === "POST") {
    const { _id, name, description, extendedDescription, price, images } =
      req.body;

    try {
      const client = await clientPromise;
      const db = client.db("props");
      const collection = db.collection("accessories");

      if (_id) {
        await collection.updateOne(
          { _id: new ObjectId(_id) },
          { $set: { name, description, extendedDescription, price, images } }
        );
      } else {
        await collection.insertOne({
          name,
          description,
          extendedDescription,
          price,
          images,
        });
      }

      res.status(200).json({ message: "Аксессуар успешно сохранен" });
    } catch (error) {
      console.error("Ошибка сохранения аксессуара:", error);
      res.status(500).json({ error: "Ошибка при сохранении аксессуара" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Метод ${req.method} не разрешен`);
  }
};
