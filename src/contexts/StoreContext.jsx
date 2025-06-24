import { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext();

const PRODUCTS = [
  {
    id: 1,
    brand: "Comedy club",
    name: "Misha Andguladze",
    description: "lorem ipsum this is a descripton text.",
    priceInUsd: 50.0,
    images: ["/test.jpg", "/test.jpg"],
    availableSizes: ["S", "M", "L", "XL"],
    inStock: true,
    category: "women",
  },
  {
    id: 2,
    brand: "Comedy club",
    name: "Misha Andguladze",
    description: "lorem ipsum this is a descripton text.",
    priceInUsd: 20.0,
    images: ["/test.jpg", "/test.jpg"],
    availableSizes: ["S", "M", "L", "XL"],
    inStock: true,
    category: "men",
  },
  {
    id: 3,
    brand: "Comedy club",
    name: "Misha Andguladze",
    description: "lorem ipsum this is a descripton text.",
    priceInUsd: 46.95,
    images: ["/test.jpg", "/test.jpg"],
    availableSizes: ["S", "M", "L"],
    inStock: false,
    category: "kids",
  },
];

const CURRENCY_RATES = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.85 },
  JPY: { symbol: "¥", rate: 144 },
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("shopping-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  const [currency, setCurrency] = useState(() => {
    try {
      const savedCurrency = localStorage.getItem("selected-currency");
      return savedCurrency || "USD";
    } catch (error) {
      console.error("Error loading currency from localStorage:", error);
      return "USD";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("shopping-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("selected-currency", currency);
    } catch (error) {
      console.error("Error saving currency to localStorage:", error);
    }
  }, [currency]);

  const addToCart = (product, selectedSize = product.availableSizes[0]) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedSize === size)
      )
    );
  };

  const updateCartItemQuantity = (productId, quantity, selectedSize) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const updateCartItemSize = (productId, oldSize, newSize) => {
    if (oldSize === newSize) return;

    setCart((prev) => {
      const oldItem = prev.find(
        (item) => item.id === productId && item.selectedSize === oldSize
      );

      if (!oldItem) return prev;

      const newSizeItem = prev.find(
        (item) => item.id === productId && item.selectedSize === newSize
      );

      if (newSizeItem) {
        return prev
          .filter(
            (item) => !(item.id === productId && item.selectedSize === oldSize)
          )
          .map((item) =>
            item.id === productId && item.selectedSize === newSize
              ? { ...item, quantity: item.quantity + oldItem.quantity }
              : item
          );
      } else {
        return prev.map((item) =>
          item.id === productId && item.selectedSize === oldSize
            ? { ...item, selectedSize: newSize }
            : item
        );
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.priceInUsd * item.quantity,
    0
  );

  const formatPrice = (priceInUsd) => {
    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;
    return `${symbol}${(priceInUsd * rate).toFixed(2)}`;
  };

  const value = {
    products: PRODUCTS,

    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    updateCartItemSize,
    clearCart,
    cartItemCount,
    cartTotal,

    currency,
    setCurrency,
    formatPrice,
    currencyRates: CURRENCY_RATES,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

// eslint-disable-next-line
export function useStore() {
  return useContext(StoreContext);
}
