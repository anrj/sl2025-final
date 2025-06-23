import styled from "styled-components";
import { useState } from "react";

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

export default function CartItem({
  product = {
    name: "Product Name",
    price: 50.0,
    image: "/test.jpg",
    availableSizes: ["S", "M", "L", "XL"],
    selectedSize: "M",
    quantity: 1,
  },
  onSizeChange,
  onQuantityChange,
}) {
  const [selectedSize, setSelectedSize] = useState(product.selectedSize);
  const [quantity, setQuantity] = useState(product.quantity);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    onSizeChange?.(size);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  return (
    <CartItemContainer>
      <CartItemDetails>
        <span>{product.name}</span>
        <span className="product-price">${product.price.toFixed(2)}</span>
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
        <CartItemButton onClick={() => handleQuantityChange(quantity + 1)}>
          +
        </CartItemButton>
        <span>{quantity}</span>
        <CartItemButton onClick={() => handleQuantityChange(quantity - 1)}>
          -
        </CartItemButton>
      </CartItemAmount>

      <CartItemImage src={product.image} alt={product.name} />
    </CartItemContainer>
  );
}
