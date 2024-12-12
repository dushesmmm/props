import clientPromise from "../../app/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, description, extendedDescription, price, images } = req.body;

    if (!name || !description || !extendedDescription || !price || !images) {
      return res
        .status(400)
        .json({ error: "Все поля обязательны для заполнения" });
    }

    try {
      const client = await clientPromise;
      const db = client.db("props");
      const collection = db.collection("accessories");

      const newAccessory = {
        name,
        description,
        extendedDescription,
        price,
        images,
      };

      await collection.insertOne(newAccessory);

      return res.status(201).json({ message: "Аксессуар добавлен" });
    } catch (error) {
      console.error("Ошибка при добавлении аксессуара:", error);
      return res
        .status(500)
        .json({ error: "Ошибка при добавлении аксессуара" });
    }
  } else if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("props");
      const collection = db.collection("accessories");
      const accessories = await collection.find({}).toArray();

      return res.status(200).json(accessories);
    } catch (error) {
      console.error("Ошибка при получении аксессуаров:", error);
      return res
        .status(500)
        .json({ error: "Ошибка при получении аксессуаров" });
    }
  } else {
    res.status(405).json({ error: "Метод не разрешен" });
  }
}
