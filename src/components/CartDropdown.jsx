import styled from "styled-components";
import DropdownCartItem from "./DropdownCartItem.jsx";
import { useStore } from "../contexts/StoreContext.jsx";

const CartDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 325px;
  height: 625px;
  padding: 32px 16px;
  background-color: #ffffff;
  color: #1d1f22;
`;

const CartTitle = styled.h2`
  margin: 0 0 32px 0;
  font-size: 16px;
  font-weight: 700;
  color: #1d1f22;

  .bag-text {
    font-weight: 700;
  }

  .item-count {
    font-weight: 500;
  }
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 0;
  font-size: 16px;
  font-weight: 700;
  margin-top: auto;
`;

const CartButton = styled.button`
  font-family: inherit;
  font-weight: 700;
  background: transparent;
  border: 1px solid #1d1f22;
  padding: 16px 32px;
  color: #1d1f22;
  font-size: 14px;
  cursor: pointer;

  &.checkout-btn {
    background-color: #5ece7b;
    color: #ffffff;
    border: 1px solid #5ece7b;
    transition: background-color 0.2s ease;

    &:hover {
      background: #4caf69;
    }
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const CartItemsContainer = styled.div`
  flex: 1;
  overflow-y: ${(props) => (props.$productCount > 2 ? "auto" : "hidden")};
  overflow-x: hidden;
  margin-bottom: 16px;
  scrollbar-gutter: stable;
`;

export default function CartDropdown({ onNavigate }) {
  const { cart, cartItemCount, cartTotal, formatPrice } = useStore();

  const handleViewBag = () => {
    if (onNavigate) {
      onNavigate("/cart");
    }
  };

  const handleCheckout = () => {
    if (onNavigate) {
      onNavigate("/checkout");
    }
  };

  return (
    <CartDropdownContainer>
      <CartTitle>
        <span className="bag-text">My Bag</span>
        <span className="item-count">, {cartItemCount} items</span>
      </CartTitle>

      <CartItemsContainer $productCount={cart.length}>
        {cart.map((item) => (
          <DropdownCartItem
            key={`${item.id}-${item.selectedSize}`}
            product={item}
          />
        ))}
      </CartItemsContainer>

      <TotalAmount>
        <span>Total</span>
        <span>{formatPrice(cartTotal)}</span>
      </TotalAmount>
      <ButtonDiv>
        <CartButton onClick={handleViewBag}>VIEW BAG</CartButton>
        <CartButton className="checkout-btn" onClick={handleCheckout}>
          CHECK OUT
        </CartButton>
      </ButtonDiv>
    </CartDropdownContainer>
  );
}
