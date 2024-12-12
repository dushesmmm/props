import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clientPromise from "../../app/lib/mongodb";
import { ObjectId } from "mongodb";
import styles from "./EditItem.module.css";

const EditAccessory = ({ accessory }) => {
  const [formData, setFormData] = useState(
    accessory || {
      name: "",
      description: "",
      extendedDescription: "",
      price: "",
      images: [],
    }
  );

  const router = useRouter();
  const { id } = router.query;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleAddImage = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/save-accessory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/admin");
    } else {
      console.error("Ошибка сохранения аксессуара");
    }
  };

  const handleDelete = async () => {
    if (!formData._id) {
      console.error("ID аксессуара отсутствует");
      return;
    }

    const response = await fetch(`/api/delete-accessory`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: formData._id }),
    });

    if (response.ok) {
      router.push("/admin");
    } else {
      console.error("Ошибка удаления аксессуара");
    }
  };

  return (
    <div className={styles.container}>
      <h1>{id ? "Редактировать аксессуар" : "Добавить новый аксессуар"}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Название'
          required
          className={styles.input}
        />
        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Описание'
          required
          className={styles.textarea}
        ></textarea>
        <textarea
          name='extendedDescription'
          value={formData.extendedDescription}
          onChange={handleChange}
          placeholder='Расширенное описание'
          className={styles.textarea}
        ></textarea>
        <input
          type='number'
          name='price'
          value={formData.price}
          onChange={handleChange}
          placeholder='Цена'
          required
          className={styles.input}
        />
        <div className={styles.images}>
          {formData.images.map((image, index) => (
            <div key={index} className={styles.imageInput}>
              <p>{index + 1}</p>
              <input
                type='url'
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder='Ссылка на изображение'
                required
                className={styles.imagesInput}
              />
              <button
                type='button'
                className={styles.remove}
                onClick={() => handleRemoveImage(index)}
              >
                Удалить
              </button>
            </div>
          ))}
          <button
            type='button'
            className={styles.addImages}
            onClick={handleAddImage}
          >
            Добавить изображение
          </button>
        </div>
        {formData.images.length > 0 && (
          <div className={styles.previewContainer}>
            <h3>Предварительный просмотр:</h3>
            <div className={styles.preview}>
              {formData.images.map((image, index) => (
                <div key={index} className={styles.previewItem}>
                  <img
                    src={image}
                    alt={`Изображение ${index + 1}`}
                    className={styles.previewImage}
                  />
                  <p>{`Изображение ${index + 1}`}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={styles.buttons}>
          <button type='submit' className={styles.saveButton}>
            Сохранить
          </button>
          {id && (
            <button
              type='button'
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              Удалить
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditAccessory;

export async function getServerSideProps(context) {
  const { req, query } = context;
  const { id } = query;

  const authCookie = req.cookies.auth;
  const correctPassword = "123";

  if (!authCookie || authCookie !== correctPassword) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let accessory = null;

  if (id) {
    const client = await clientPromise;
    const db = client.db("props");
    const collection = db.collection("accessories");
    accessory = await collection.findOne({ _id: new ObjectId(id) });

    if (accessory) {
      accessory._id = accessory._id.toString();
    }
  }

  return {
    props: { accessory },
  };
}
