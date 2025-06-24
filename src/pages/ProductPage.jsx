import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useStore } from "../contexts/StoreContext";
import NotFound from "../components/NotFound";

const ProductPageContainer = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 80px 100px;
  max-width: 1280px;
  gap: 100px;
`;

const ProductImages = styled.div`
  display: flex;
  gap: 40px;
`;

const ThumbnailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ThumbnailImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.$isActive ? 1 : 0.6)};
`;

const MainImage = styled.img`
  width: 610px;
  height: 511px;
  object-fit: cover;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductBrand = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: #1d1f22;
  margin: 0;
`;

const ProductName = styled.h2`
  font-size: 30px;
  font-weight: 400;
  color: #1d1f22;
  margin: 0 0 24px 0;
`;

const SizeSection = styled.div`
  margin-bottom: 100px;
`;

const SizeLabel = styled.div`
  font-size: 18px;
  font-weight: 700;
  font-family: Roboto Condensed;
  color: #1d1f22;
  margin-bottom: 8px;
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 12px;
`;

const SizeButton = styled.button`
  width: 63px;
  height: 45px;
  border: 1px solid #1d1f22;
  background: ${(props) => (props.$isSelected ? "#1D1F22" : "transparent")};
  color: ${(props) => (props.$isSelected ? "#FFFFFF" : "#1D1F22")};
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #1d1f22;
    color: #ffffff;
  }
`;

const PriceSection = styled.div`
  margin-bottom: 20px;
`;

const PriceLabel = styled.div`
  font-size: 18px;
  line-height: 18px;
  font-weight: 700;
  font-family: Roboto Condensed;
  color: #1d1f22;
  margin-bottom: 8px;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1d1f22;
`;

const AddToCartButton = styled.button`
  width: 292px;
  height: 52px;
  background: #5ece7b;
  color: #ffffff;
  border: none;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  margin-bottom: 40px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #4caf69;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const ProductDescription = styled.div`
  font-size: 16px;
  font-family: Roboto;
  line-height: 1.6;
  color: #1d1f22;
`;

export default function ProductPage() {
  const { id } = useParams();
  const { products, addToCart, formatPrice } = useStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <NotFound />;
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
    }
  };

  return (
    <ProductPageContainer>
      <ProductImages>
        <ThumbnailList>
          {product.images.map((image, index) => (
            <ThumbnailImage
              key={index}
              src={image}
              alt={`${product.name} ${index + 1}`}
              $isActive={selectedImageIndex === index}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </ThumbnailList>
        <MainImage
          src={product.images[selectedImageIndex]}
          alt={product.name}
        />
      </ProductImages>

      <ProductDetails>
        <ProductBrand>{product.brand}</ProductBrand>
        <ProductName>{product.name}</ProductName>

        <SizeSection>
          <SizeLabel>SIZE:</SizeLabel>
          <SizeOptions>
            {product.availableSizes.map((size) => (
              <SizeButton
                key={size}
                $isSelected={selectedSize === size}
                onClick={() => setSelectedSize(size)}
                disabled={!product.inStock}
              >
                {size}
              </SizeButton>
            ))}
          </SizeOptions>
        </SizeSection>

        <PriceSection>
          <PriceLabel>PRICE:</PriceLabel>
          <Price>{formatPrice(product.priceInUsd)}</Price>
        </PriceSection>

        <AddToCartButton
          onClick={handleAddToCart}
          disabled={!product.inStock || !selectedSize}
        >
          {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
        </AddToCartButton>

        <ProductDescription>{product.description}</ProductDescription>
      </ProductDetails>
    </ProductPageContainer>
  );
}
