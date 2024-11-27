"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState(1); // Начальный идентификатор заказа

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const incrementOrderId = () => {
    setOrderId((prevOrderId) => prevOrderId + 1);
  };

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const updatedCart = (() => {
        const existingProduct = prevCart.find(
          (item) => item._id === product._id
        );
        if (existingProduct) {
          return prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity }];
        }
      })();

      // Сохранение обновленной корзины в localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantityChange) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + quantityChange) }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getCartQuantity = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orderId,
        incrementOrderId,
        cartQuantity: getCartQuantity(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
