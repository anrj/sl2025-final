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

const COUNTRIES_PROVINCES = {
  "United States": [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ],
  Canada: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
  ],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  Australia: [
    "Australian Capital Territory",
    "New South Wales",
    "Northern Territory",
    "Queensland",
    "South Australia",
    "Tasmania",
    "Victoria",
    "Western Australia",
  ],
  Germany: [
    "Baden-Württemberg",
    "Bavaria",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hesse",
    "Lower Saxony",
    "Mecklenburg-Vorpommern",
    "North Rhine-Westphalia",
    "Rhineland-Palatinate",
    "Saarland",
    "Saxony",
    "Saxony-Anhalt",
    "Schleswig-Holstein",
    "Thuringia",
  ],
  France: [
    "Auvergne-Rhône-Alpes",
    "Bourgogne-Franche-Comté",
    "Brittany",
    "Centre-Val de Loire",
    "Corsica",
    "Grand Est",
    "Hauts-de-France",
    "Île-de-France",
    "Normandy",
    "Nouvelle-Aquitaine",
    "Occitania",
    "Pays de la Loire",
    "Provence-Alpes-Côte d'Azur",
  ],
  Japan: [
    "Hokkaido",
    "Aomori",
    "Iwate",
    "Miyagi",
    "Akita",
    "Yamagata",
    "Fukushima",
    "Ibaraki",
    "Tochigi",
    "Gunma",
    "Saitama",
    "Chiba",
    "Tokyo",
    "Kanagawa",
    "Niigata",
    "Toyama",
    "Ishikawa",
    "Fukui",
    "Yamanashi",
    "Nagano",
    "Gifu",
    "Shizuoka",
    "Aichi",
    "Mie",
    "Shiga",
    "Kyoto",
    "Osaka",
    "Hyogo",
    "Nara",
    "Wakayama",
    "Tottori",
    "Shimane",
    "Okayama",
    "Hiroshima",
    "Yamaguchi",
    "Tokushima",
    "Kagawa",
    "Ehime",
    "Kochi",
    "Fukuoka",
    "Saga",
    "Nagasaki",
    "Kumamoto",
    "Oita",
    "Miyazaki",
    "Kagoshima",
    "Okinawa",
  ],
  Italy: [
    "Abruzzo",
    "Basilicata",
    "Calabria",
    "Campania",
    "Emilia-Romagna",
    "Friuli-Venezia Giulia",
    "Lazio",
    "Liguria",
    "Lombardy",
    "Marche",
    "Molise",
    "Piedmont",
    "Apulia",
    "Sardinia",
    "Sicily",
    "Tuscany",
    "Trentino-Alto Adige",
    "Umbria",
    "Aosta Valley",
    "Veneto",
  ],
  Spain: [
    "Andalusia",
    "Aragon",
    "Asturias",
    "Balearic Islands",
    "Basque Country",
    "Canary Islands",
    "Cantabria",
    "Castile and León",
    "Castile-La Mancha",
    "Catalonia",
    "Extremadura",
    "Galicia",
    "La Rioja",
    "Madrid",
    "Murcia",
    "Navarre",
    "Valencia",
  ],
  Brazil: [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ],
  Georgia: [
    "Adjara",
    "Guria",
    "Imereti",
    "Kakheti",
    "Kvemo Kartli",
    "Mtskheta-Mtianeti",
    "Racha-Lechkhumi",
    "Svaneti",
    "Samtskhe-Javakheti",
    "Samegrelo",
    "Shida Kartli",
    "Tbilisi",
  ],
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

    countriesProvinces: COUNTRIES_PROVINCES,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

// eslint-disable-next-line
export function useStore() {
  return useContext(StoreContext);
}
