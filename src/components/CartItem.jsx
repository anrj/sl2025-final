import styled from "styled-components";
import { useState } from "react";
import { useStore } from "../contexts/StoreContext";
import chevronSvg from "../assets/chevron.svg";
import ButtonLineSvg from "../assets/button-line.svg";

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  min-height: 288px;
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductBrand = styled.h3`
  font-size: 30px;
  font-weight: 600;
  color: #1d1f22;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
`;

const ProductName = styled.h4`
  font-size: 30px;
  font-weight: 400;
  color: #1d1f22;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1d1f22;
  margin-top: 8px;
`;

const SizeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SizeLabel = styled.div`
  font-size: 18px;
  font-weight: 700;
  font-family: "Roboto Condensed", sans-serif;
  color: #1d1f22;
  text-transform: uppercase;
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 12px;
`;

const SizeButton = styled.button`
  width: 63px;
  height: 45px;
  border: 1px solid #1d1f22;
  background: ${(props) => (props.$isSelected ? "#1d1f22" : "transparent")};
  color: ${(props) => (props.$isSelected ? "#ffffff" : "#1d1f22")};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;

  &:hover {
    background: #1d1f22;
    color: #ffffff;
  }
`;

const QuantitySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 288px;
  min-width: 45px;
`;

const QuantityButton = styled.button`
  width: 45px;
  height: 45px;
  border: 1px solid #1d1f22;
  background: transparent;
  color: #1d1f22;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: #1d1f22;
    color: #ffffff;
  }

  &:hover img {
    filter: brightness(0) invert(1);
  }

  img {
    width: 15px;
    height: 1px;
    transition: filter 0.2s ease;
  }

  &.plus img:first-child {
    transform: rotate(90deg);
    position: absolute;
  }

  &.plus img:last-child {
    position: absolute;
  }
`;

const QuantityDisplay = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #1d1f22;
  padding: 0 8px;
`;

const ImageSection = styled.div`
  position: relative;
  width: 200px;
  height: 288px;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  display: flex;
  width: ${(props) => props.$totalImages * 200}px;
  height: 100%;
  transform: translateX(${(props) => -props.$currentIndex * 200}px);
  transition: transform 0.3s ease-in-out;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 288px;
  object-fit: cover;
  flex-shrink: 0;
`;

const ImageNavigation = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const ImageNavButton = styled.button`
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.73);
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  &:disabled {
    background: rgba(0, 0, 0, 0.3);
  }

  img {
    width: 8px;
    height: 12px;
    filter: brightness(0) invert(1);
  }

  &.prev img {
    transform: rotate(180deg);
  }
`;

export default function CartItem({ product }) {
  const { formatPrice, updateCartItemQuantity, updateCartItemSize } =
    useStore();
  const [selectedSize, setSelectedSize] = useState(
    product.selectedSize || product.availableSizes[0]
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSizeChange = (newSize) => {
    const oldSize = selectedSize;
    setSelectedSize(newSize);
    updateCartItemSize(product.id, oldSize, newSize);
  };

  const handleQuantityChange = (newQuantity) => {
    updateCartItemQuantity(product.id, newQuantity, selectedSize);
  };

  const handleNextImage = () => {
    if (currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <CartItemContainer>
      <CartItemDetails>
        <ProductInfo>
          <ProductBrand>{product.brand}</ProductBrand>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{formatPrice(product.priceInUsd)}</ProductPrice>
        </ProductInfo>

        <SizeSection>
          <SizeLabel>Size:</SizeLabel>
          <SizeOptions>
            {product.availableSizes.map((size) => (
              <SizeButton
                key={size}
                $isSelected={selectedSize === size}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </SizeButton>
            ))}
          </SizeOptions>
        </SizeSection>
      </CartItemDetails>

      <QuantitySection>
        <QuantityButton
          className="plus"
          onClick={() => handleQuantityChange(product.quantity + 1)}
        >
          <img src={ButtonLineSvg} alt="" />
          <img src={ButtonLineSvg} alt="" />
        </QuantityButton>
        <QuantityDisplay>{product.quantity}</QuantityDisplay>
        <QuantityButton
          onClick={() => handleQuantityChange(product.quantity - 1)}
        >
          <img src={ButtonLineSvg} alt="" />
        </QuantityButton>
      </QuantitySection>

      <ImageSection>
        <ImageContainer
          $currentIndex={currentImageIndex}
          $totalImages={product.images.length}
        >
          {product.images.map((image, index) => (
            <ProductImage
              key={index}
              src={image}
              alt={`${product.name} ${index + 1}`}
            />
          ))}
        </ImageContainer>
        {product.images.length > 1 && (
          <ImageNavigation>
            <ImageNavButton
              className="prev"
              onClick={handlePrevImage}
              disabled={currentImageIndex === 0}
            >
              <img src={chevronSvg} alt="Previous" />
            </ImageNavButton>
            <ImageNavButton
              onClick={handleNextImage}
              disabled={currentImageIndex === product.images.length - 1}
            >
              <img src={chevronSvg} alt="Next" />
            </ImageNavButton>
          </ImageNavigation>
        )}
      </ImageSection>
    </CartItemContainer>
  );
}
