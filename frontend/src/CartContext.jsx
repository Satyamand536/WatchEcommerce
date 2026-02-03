import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  //to persist data to localstorage-to keep storage of data even after browser or window is closed.
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // to add item tot eh cart

  const addItem = (item) => {
    const rawId = item._id || item.id || item.sku || item.name;
    // Normalization: Ensure 'img' is always populated correctly from various possible sources
    const normalizedImg = item.img || (item.images && item.images[0]) || item.image;
    const normalizedPrice = parsePrice(item.price);
    const newItem = { 
      ...item, 
      id: String(rawId), 
      _id: String(rawId), 
      img: normalizedImg,
      price: normalizedPrice,
      selected: true 
    };
    setCart((prev) => {
      const existing = prev.find((p) => p.id === newItem.id);
      if (existing) {
        return prev.map((p) =>
          p.id === newItem.id ? { ...p, qty: p.qty + 1 } : p,
        );
      }
      return [...prev, { ...newItem, qty: 1 }];
    });
  };
  //to increase the value of item in cart

  const increment = (id) => {
    const sid = String(id);
    setCart((prev) =>
      prev.map((p) => (p.id === sid ? { ...p, qty: p.qty + 1 } : p)),
    );
  };

  //to decrease the value if 0 then remove from cart

  const decrement = (id) => {
    const sid = String(id);
    setCart(
      (prev) =>
        prev
          .map((p) => (p.id === sid ? { ...p, qty: p.qty - 1 } : p))
          .filter((p) => p.qty > 0), //remove the item  if qty =0
    );
  };

  //to toggle selection for purchase
  const toggleSelect = (id) => {
    const sid = String(id);
    setCart((prev) =>
      prev.map((p) => (p.id === sid ? { ...p, selected: !p.selected } : p))
    );
  };

  //to remove item immediately fro cart

  const removeItem = (id) => {
    const sid = String(id);
    setCart((prev) => prev.filter((p) => p.id !== sid));
  };

  //to clear cart
  const clearCart = () => setCart([]);

  // to clear only selected (purchased) items
  const clearSelectedItems = () => {
    setCart((prev) => prev.filter((item) => !item.selected));
  };

  const toggleWishlist = (item) => {
    const rawId = item._id || item.id || item.sku || item.name;
    const tid = String(rawId);
    // Normalize image source for wishlist consistency
    const normalizedImg = item.img || (item.images && item.images[0]) || item.image;
    
    setWishlist((prev) => {
      const exists = prev.find((w) => String(w._id || w.id || w.sku || w.name) === tid);
      if (exists) {
        return prev.filter((w) => String(w._id || w.id || w.sku || w.name) !== tid);
      }
      // Ensure the item stored has normalized 'img' and consistent IDs
      return [...prev, { ...item, id: tid, _id: tid, img: normalizedImg }];
    });
  };

  const isInWishlist = (id) => wishlist.some((w) => String(w._id || w.id || w.sku || w.name) === String(id));

  //helper function

  // helper: robust price parser
  const parsePrice = (price) => {
    if (typeof price === "number" && isFinite(price)) return price;
    if (!price) return 0;
    // convert to string and strip currency symbols, spaces, and letters,
    // keep digits, minus and dot. remove commas.
    let s = String(price).trim();
    // remove all characters except digits, dot, minus
    s = s.replace(/[^0-9.-]/g, "");
    // if multiple dots, keep first dot only
    const parts = s.split(".");
    if (parts.length > 2) {
      const first = parts.shift();
      s = first + "." + parts.join("");
    }
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };

  //total

  // Modified: totalItems now counts ALL items regardless of selection, as per user request
  const totalItems = cart.reduce((sum, p) => sum + (p.qty || 0), 0);
  const totalPrice = cart.reduce(
    (sum, p) => p.selected ? sum + (p.qty || 0) * parsePrice(p.price) : sum,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        totalItems,
        totalPrice,
        increment,
        decrement,
        toggleSelect,
        removeItem,
        clearCart,
        clearSelectedItems,
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
