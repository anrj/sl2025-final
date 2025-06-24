import { Routes, Route } from "react-router-dom";
import ProductGrid from "./components/ProductGrid";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductGrid />} />
        <Route path="/category/:category" element={<ProductGrid />} />
      </Routes>
    </>
  );
}
