import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext("");

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const existingCart = localStorage.getItem("cart");
    if (existingCart) setCart(JSON.parse(existingCart));
  }, []);

  return (
    <CartContext.Provider
      // @ts-ignore
      value={[cart, setCart]}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
