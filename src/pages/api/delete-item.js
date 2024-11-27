// pages/api/delete-item.js
import clientPromise from "../../app/lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  if (req.method === "DELETE") {
    const { _id } = req.body;

    if (!_id) {
      return res
        .status(400)
        .json({ error: "Не указан ID продукта для удаления" });
    }

    try {
      const client = await clientPromise;
      const db = client.db("props");
      const collection = db.collection("products");

      const result = await collection.deleteOne({ _id: new ObjectId(_id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Продукт не найден" });
      }

      res.status(200).json({ message: "Продукт удален" });
    } catch (error) {
      console.error("Ошибка удаления продукта:", error);
      res.status(500).json({ error: "Ошибка при удалении продукта" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Метод ${req.method} не разрешен`);
  }
};
