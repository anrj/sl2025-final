import { Routes, Route, useParams } from "react-router-dom";
import ProductGrid from "./components/ProductGrid";
import Header from "./components/Header";

function CategoryPage() {
  const { category } = useParams();
  return <ProductGrid category={category} />;
}

function HomePage() {
  return <ProductGrid />;
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </>
  );
}
