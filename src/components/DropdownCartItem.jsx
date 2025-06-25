import styled from "styled-components";
import { useState } from "react";
import { useStore } from "../contexts/StoreContext";
import ButtonLineSvg from "../assets/icons/button-line.svg";

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 162px;
  gap: 8px;
  margin-bottom: 16px;
`;

const CartItemButton = styled.button`
  background: transparent;
  border: 1px solid #1d1f22;
  color: #1d1f22;
  font-family: inherit;
  font-size: 14px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
  flex-shrink: 0;

  &:hover {
    color: #ffffff;
    background-color: #1d1f22;
  }

  &:hover img {
    filter: brightness(0) invert(1);
  }

  img {
    width: 8px;
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

  ${(props) =>
    props.$variant === "size" &&
    `
    &:focus {
      outline: none;
      color: #ffffff;
      background-color: #1d1f22;
    }
    
    &:active {
      color: #ffffff;
      background-color: #1d1f22;
    }
    
    &.selected {
      color: #ffffff;
      background-color: #1d1f22;
    }
  `}
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;

  .product-brand {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }

  .product-name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
    margin-bottom: 8px;
  }

  .product-price {
    font-weight: 500;
  }
`;

const CartItemSize = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;

  .size-buttons {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    overflow-x: auto;
    max-width: ${4 * 24 + 3 * 8}px;

    &::-webkit-scrollbar {
      height: 3px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #a1a1a1;
    }
  }
`;

const CartItemQuantity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24px;
  height: 100%;
  justify-content: space-between;
`;

const CartItemImage = styled.img`
  width: 121px;
  height: 162px;
  object-fit: cover;
`;

export default function DropdownCartItem({ product }) {
  const { formatPrice, updateCartItemQuantity, updateCartItemSize } =
    useStore();
  const [selectedSize, setSelectedSize] = useState(
    product.selectedSize || product.availableSizes[0]
  );

  const handleSizeChange = (newSize) => {
    const oldSize = selectedSize;
    setSelectedSize(newSize);
    updateCartItemSize(product.id, oldSize, newSize);
  };

  return (
    <CartItemContainer>
      <CartItemDetails>
        <span className="product-brand">{product.brand}</span>
        <span className="product-name">{product.name}</span>
        <span className="product-price">{formatPrice(product.priceInUsd)}</span>
        <CartItemSize>
          <span>Size:</span>
          <div className="size-buttons">
            {product.availableSizes.map((size) => (
              <CartItemButton
                key={size}
                $variant="size"
                className={selectedSize === size ? "selected" : ""}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </CartItemButton>
            ))}
          </div>
        </CartItemSize>
      </CartItemDetails>

      <CartItemQuantity>
        <CartItemButton
          className="plus"
          onClick={() =>
            updateCartItemQuantity(
              product.id,
              product.quantity + 1,
              selectedSize
            )
          }
        >
          <img src={ButtonLineSvg} alt="" />
          <img src={ButtonLineSvg} alt="" />
        </CartItemButton>
        <span>{product.quantity}</span>
        <CartItemButton
          onClick={() =>
            updateCartItemQuantity(
              product.id,
              product.quantity - 1,
              selectedSize
            )
          }
        >
          <img src={ButtonLineSvg} alt="" />
        </CartItemButton>
      </CartItemQuantity>

      <CartItemImage src={product.images[0]} alt={product.name} />
    </CartItemContainer>
  );
}
