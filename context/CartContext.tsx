import { createContext, ReactNode, useState } from "react";

type CartItem = {
  id: string;
  producto: "sope" | "quesadilla" | "taco" | "bebida";
  tipo?: 1 | 2;
  guisos: { id: number; name: string }[];
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  getTotal: () => number;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 💰 PRECIOS BASE
  const precios = {
    sope: 105,
    quesadilla: 100,
    taco: 22,
    bebida: 25,
  };

  // 💰 CALCULAR TOTAL
  const getTotal = () => {
    return cart.reduce((total, item) => {
      if (item.producto === "taco" || item.producto === "bebida") {
        return total + item.guisos.length * precios[item.producto];
      }

      // sope y quesadilla
      return total + precios[item.producto];
    }, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getTotal, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}