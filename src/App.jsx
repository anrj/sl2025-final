import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductGrid from "./pages/ProductGrid";
import ProductPage from "./pages/ProductPage";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductGrid />} />
        <Route path="/category/:category" element={<ProductGrid />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
