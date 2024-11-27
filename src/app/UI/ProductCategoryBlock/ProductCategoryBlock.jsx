import classes from "./ProductCategoryBlock.module.css";

export default function ProductCategoryBlock({
  title,
  items,
  type,
  blockNumber,
}) {
  const getOrdinalNumber = (number) => {
    const suffixes = [
      "⁰¹",
      "⁰²",
      "⁰³",
      "⁰⁴",
      "⁰⁵",
      "⁰⁶",
      "⁰⁷",
      "⁰⁸",
      "⁰⁹",
      "¹⁰",
    ];
    return suffixes[number - 1] || `${number}`;
  };

  return (
    <div className={classes.categoryBlock}>
      <div className={classes.categoryTitle}>
        <h2>
          {type.toUpperCase()} <p>{getOrdinalNumber(blockNumber)}</p>
        </h2>
        <h2>{title}</h2>
      </div>
      <div className={classes.productList}>
        {items.map((item) => (
          <div key={item._id} className={classes.productCard}>
            <img
              src={item.imageUrl}
              alt={item.name}
              className={classes.productImage}
            />
            <div className={classes.price}>
              <h3>{item.name}</h3>
              <p>{item.price} ₽</p>
            </div>
            <p className={classes.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
