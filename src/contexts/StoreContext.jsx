import { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext();

const PRODUCTS = [
  {
    id: 9,
    brand: "Flutter",
    name: "Women's Tee",
    description:
      "Bring a cool boost to your wardrobe with this cozy cotton tee, showcasing butterfly graphics for extra chill vibes. This tee's comfort fit makes it the perfect choice for a laid-back day.",
    priceInUsd: 12.99,
    images: [
      "/products/WFL-1.avif",
      "/products/WFL-2.avif",
      "/products/WFL-3.avif",
      "/products/WFL-4.avif",
      "/products/WFL-5.avif",
    ],
    availableSizes: ["XS", "S", "M", "XL"],
    inStock: true,
    category: "women",
  },
  {
    id: 4,
    brand: "Portugal '25 Home Replica",
    name: "Men's Soccer Jersey",
    description:
      "Tradition fuels ambition in the first-ever Portugal Home Kit by PUMA. With signature Portuguese colors and repeated graphics celebrating the nation's football legacy, this jersey embodies pride and performance.",
    priceInUsd: 95.0,
    images: [
      "/products/PR-1.avif",
      "/products/PR-2.avif",
      "/products/PR-3.avif",
      "/products/PR-4.avif",
      "/products/PR-5.avif",
      "/products/PR-6.avif",
    ],
    availableSizes: ["L", "XL", "3XL"],
    inStock: true,
    category: "men",
  },
  {
    id: 12,
    brand: "PUMA x HELLO KITTY® & FRIENDS",
    name: "Little Kids' Relaxed Graphic Tee",
    description:
      "Dive into playful vibes with this relaxed-fit tee featuring HELLO KITTY® & FRIENDS. The mix of rubber and puff prints, along with vibrant all-over patterns, brings a touch of LA's beachy sunsets to your wardrobe. Express yourself with PUMA.",
    priceInUsd: 19.99,
    images: [
      "/products/KHK-1.avif",
      "/products/KHK-2.avif",
      "/products/KHK-3.avif",
      "/products/KHK-4.avif",
      "/products/KHK-5.avif",
    ],
    availableSizes: ["4", "5", "6"],
    inStock: true,
    category: "kids",
  },
  {
    id: 7,
    brand: "Elevated Essentials",
    name: "Women's High-Waisted Straight Leg Ribbed Pants",
    description:
      "Step up your casual game with these high-waist rib pants. Featuring a straight leg design and elastic waistband, they offer effortless style and comfort. The embroidered PUMA Cat Logo adds a sporty touch to your PUMA everyday look.",
    priceInUsd: 21.99,
    images: [
      "/products/WEL-1.avif",
      "/products/WEL-2.avif",
      "/products/WEL-3.avif",
      "/products/WEL-4.avif",
      "/products/WEL-5.avif",
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    category: "women",
  },
  {
    id: 1,
    brand: "Essentials",
    name: "Men's Tee",
    description:
      "Round out your favorite outfit in everyday-ready style with this short sleeve tee. This tee is crafted from 100% cotton for a fit that's both comfortable and durable.",
    priceInUsd: 12.99,
    images: [
      "/products/ES-1.avif",
      "/products/ES-2.avif",
      "/products/ES-3.avif",
      "/products/ES-4.avif",
      "/products/ES-5.avif",
      "/products/ES-6.avif",
    ],
    availableSizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
    category: "men",
  },
  {
    id: 14,
    brand: "Core",
    name: "Little Kids' Fleece Zip-Up Hoodie",
    description:
      "Add a layer to your favorite fit with this cozy cotton fleece hoodie, featuring a full zip-up design. ",
    priceInUsd: 15.99,
    images: [
      "/products/KCR-1.avif",
      "/products/KCR-2.avif",
      "/products/KCR-3.avif",
      "/products/KCR-4.avif",
      "/products/KCR-5.avif",
    ],
    availableSizes: ["3T", "4T"],
    inStock: true,
    category: "kids",
  },
  {
    id: 10,
    brand: "T7 ALWAYS ON",
    name: "Women's Straight Track Pants",
    description:
      "Elevate your look with PUMA's straight track pants. With classic T7 panel inserts, pintuck detailing, and zip pockets, these pants are as function as they are stylish. The elasticated waistband and tonal drawcords ensure a perfect fit, while the iconic logo highlights our heritage.",
    priceInUsd: 65.0,
    images: [
      "/products/WT7-1.avif",
      "/products/WT7-2.avif",
      "/products/WT7-3.avif",
      "/products/WT7-4.avif",
      "/products/WT7-5.avif",
    ],
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    category: "women",
  },
  {
    id: 3,
    brand: "AC Milan 24/25 Away Replica",
    name: "Men's Soccer Jersey",
    description:
      "Details make all the difference in the 24/25 AC Milan Away Kit. The classic white away combined with a red-and-black polo collar delivers a timeless look that honors the club's rich history.",
    priceInUsd: 51.99,
    images: [
      "/products/ML-1.avif",
      "/products/ML-2.avif",
      "/products/ML-3.avif",
      "/products/ML-4.avif",
      "/products/ML-5.avif",
      "/products/ML-6.avif",
    ],
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    category: "men",
  },
  {
    id: 6,
    brand: "Elevated Essentials",
    name: "Men's 9\" Shorts",
    description:
      "Step into your day with these Essentials PUMA Shorts. Featuring an embroidered Cat logo badge and an elastic waistband with drawcord, these shorts are designed for comfort and style. The side pockets provide convenient storage for your essentials.",
    priceInUsd: 22.99,
    images: [
      "/products/EE-1.avif",
      "/products/EE-2.avif",
      "/products/EE-3.avif",
      "/products/EE-4.avif",
      "/products/EE-5.avif",
    ],
    availableSizes: ["S", "M", "L", "XL"],
    inStock: false,
    category: "men",
  },
  {
    id: 11,
    brand: "Wardrobe Essentials",
    name: "Women's Ribbed Flared Short Dress",
    description:
      "Step into effortless elegance with this ribbed flared dress. Featuring a fitted waist and centered logo embroidery, it's perfect for making a statement. Feel confident and chic in every moment with PUMA.",
    priceInUsd: 35.0,
    images: [
      "/products/WDS-1.avif",
      "/products/WDS-2.avif",
      "/products/WDS-3.avif",
      "/products/WDS-4.avif",
      "/products/WDS-5.avif",
    ],
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    category: "women",
  },
  {
    id: 2,
    brand: "Scuderia Ferrari Race MT7",
    name: "Men's Motorsport Polo Shirt",
    description:
      "This iconic MT7 collection brings your style to the next level. The Scuderia Ferrari T7 style silhouette combines design features with racing heritage for an authentic motorsport look.",
    priceInUsd: 43.99,
    images: [
      "/products/FR-1.avif",
      "/products/FR-2.avif",
      "/products/FR-3.avif",
      "/products/FR-4.avif",
      "/products/FR-5.avif",
      "/products/FR-6.avif",
    ],
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    category: "men",
  },
  {
    id: 13,
    brand: "PUMA x HOT WHEELS™",
    name: "Little Kids' Relaxed Graphic Hoodie",
    description:
      "Gear up for the fast lane with PUMA x HOT WHEELS™. This collab is made for a universe where speed isn't just a thrill, but a way of life. This kids collection celebrates classic Hot Wheels™ cars with bold graphics, playful designs, and tactile details. This hoodie features iconic car graphics, a kangaroo pocket with hook-and-loop closure, and a sleek hood design, it's perfect for those who love a casual fit with a twist.",
    priceInUsd: 31.99,
    images: [
      "/products/KHW-1.avif",
      "/products/KHW-2.avif",
      "/products/KHW-3.avif",
      "/products/KHW-4.avif",
      "/products/KHW-5.avif",
    ],
    availableSizes: ["3T", "4T"],
    inStock: false,
    category: "kids",
  },
  {
    id: 5,
    brand: "Tyrese Haliburton Overrate That",
    name: "Men's Tee",
    description:
      "Back Tyrese Haliburton and his on-court success in style in this short sleeve basketball tee. Show your support for one of the game's rising stars.",
    priceInUsd: 40.0,
    images: ["/products/TH-1.avif", "/products/TH-2.avif"],
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    inStock: true,
    category: "men",
  },
  {
    id: 8,
    brand: "Elevated Essentials",
    name: "Women's Comfort Crew Sweatshirt",
    description:
      "Wrap yourself in effortless style with this crewneck essential. Featuring an embroidered PUMA Cat Logo badge and ribbed cuffs and hem, it's perfect for those laid-back days. Soft, snug, and effortlessly cool—your new favorite piece for any casual outing.",
    priceInUsd: 22.99,
    images: [
      "/products/WCC-1.avif",
      "/products/WCC-2.avif",
      "/products/WCC-3.avif",
      "/products/WCC-4.avif",
      "/products/WCC-5.avif",
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    category: "women",
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
