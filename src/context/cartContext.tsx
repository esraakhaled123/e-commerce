'use client'

import getUserCart from "@/cartactions/getUserCart";
import React, { createContext, useEffect, useState } from "react";

type CartContextType = {
  numberOfCarts: number;
  setNumberOfCarts: React.Dispatch<React.SetStateAction<number>>;
};


export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [numberOfCarts, setNumberOfCarts] = useState<number>(0);

  async function getCart() {
    try {
      const resp = await getUserCart();
      if (resp.status === "success") {
        let sum = 0;
        resp.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setNumberOfCarts(sum);
      }
    } catch (error) {
        console.log("login first");
      return error
    
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCarts, setNumberOfCarts }}>
      {children}
    </CartContext.Provider>
  );
}
