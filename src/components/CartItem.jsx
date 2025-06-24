import styled from "styled-components";
import { useState } from "react";
import { useStore } from "../contexts/StoreContext";

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

  &:hover {
    color: #ffffff;
    background-color: #1d1f22;
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
  }
`;

const CartItemAmount = styled.div`
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

export default function CartItem({ product }) {
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

      <CartItemAmount>
        <CartItemButton
          onClick={() =>
            updateCartItemQuantity(
              product.id,
              product.quantity + 1,
              selectedSize
            )
          }
        >
          +
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
          -
        </CartItemButton>
      </CartItemAmount>

      <CartItemImage src={product.images[0]} alt={product.name} />
    </CartItemContainer>
  );
}
