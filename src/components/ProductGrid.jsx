import styled from "styled-components";
import ProductCard from "./ProductCard.jsx";

const ProductGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 60px;
  column-gap: 40px;
  padding: 40px 0;     
  margin: 0 auto;
  max-width: 1240px;
  width: 100%;          
`;

const CategoryTitle = styled.h1`
  font-size: 42px;
  font-weight: 400;
  color: #1d1f22;
  margin: 48px 0 64px 0;
  text-align: left;
  padding-left: 100px;
`;

export default function ProductGrid({
  categoryName = "All Products",
  category,
  products = [
    {
      id: 1,
      name: "Misha Andguladze",
      price: 50.0,
      image: "/test.jpg",
      inStock: true,
      category: "women",
    },
    {
      id: 2,
      name: "Misha Andguladze",
      price: 50.0,
      image: "/test.jpg",
      inStock: true,
      category: "men",
    },
    {
      id: 3,
      name: "Misha Andguladze",
      price: 50.0,
      image: "/test.jpg",
      inStock: false,
      category: "women",
    },
    {
      id: 4,
      name: "Misha Andguladze",
      price: 50.0,
      image: "/test.jpg",
      inStock: true,
      category: "kids",
    },
    {
      id: 5,
      name: "Misha Andguladze",
      price: 50.0,
      image: "/test.jpg",
      inStock: true,
      category: "men",
    },
    {
      id: 6,
      name: "Misha Andguladze",
      price: 50.0,
      image: "/test.jpg",
      inStock: true,
      category: "women",
    },
    {
      id: 7,
      name: "Misha Andguladze",
      price: 50.0,
      image: "/test.jpg",
      inStock: true,
      category: "kids",
    },
    {
      id: 8,
      name: "Misha Andguladze",
      price: 50.0,
      image: "/test.jpg",
      inStock: true,
      category: "men",
    },
    {
      id: 9,
      name: "Misha Andguladze",
      price: 50.0,
      image: "/test.jpg",
      inStock: true,
      category: "women",
    },
  ],
}) {
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;
  const displayTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : categoryName;

  return (
    <>
      <CategoryTitle>{displayTitle}</CategoryTitle>
      <ProductGridContainer>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGridContainer>
    </>
  );
}
