import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import FullLayout from "./layouts/FullLayout";
import ProductGrid from "./pages/ProductGrid";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import NotFound from "./components/NotFound";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ProductGrid />} />
        <Route path="category/:category" element={<ProductGrid />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/checkout" element={<FullLayout />}>
        <Route index element={<CheckoutPage />} />
        <Route path=":step" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}
