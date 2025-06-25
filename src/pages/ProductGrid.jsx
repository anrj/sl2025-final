import { useParams } from "react-router-dom";
import { useStore } from "../contexts/StoreContext.jsx";
import styled from "styled-components";
import ProductCard from "../components/ProductCard.jsx";

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

export default function ProductGrid() {
  const { category } = useParams();
  const { products } = useStore();

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  const CategoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Products";

  return (
    <>
      <CategoryTitle>{CategoryName}</CategoryTitle>
      <ProductGridContainer>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGridContainer>
    </>
  );
}
