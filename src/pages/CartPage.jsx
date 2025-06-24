import styled from "styled-components";
import { useStore } from "../contexts/StoreContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const CartPageContainer = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 80px 100px;
`;

const CartTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1d1f22;
  margin: 0 0 56px 0;
  text-transform: uppercase;
`;

const CartContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartSummary = styled.div`
  margin-top: 32px;
  padding-top: 24px;
`;

const SummaryRow = styled.div`
  display: flex;
  gap: 44px;
  align-items: center;
  margin-bottom: 8px;

  &:last-of-type {
    margin-bottom: 16px;
  }
`;

const SummaryLabel = styled.span`
  font-size: 24px;
  font-weight: ${(props) => (props.$isTotal ? "500" : "400")};
  color: #1d1f22;
`;

const SummaryValue = styled.span`
  font-size: 24px;
  font-weight: ${(props) => (props.$isTotal ? "700" : "500")};
  color: #1d1f22;
`;

const ContinueButton = styled.button`
  width: 279px;
  height: 43px;
  background: #5ece7b;
  color: #ffffff;
  border: none;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #4caf69;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const EmptyCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  font-size: 24px;
  color: #8d8f9a;
`;

export default function CartPage() {
  const { cart, formatPrice, cartItemCount, cartTotal } = useStore();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <CartPageContainer>
        <CartTitle>Cart</CartTitle>
        <EmptyCart>Your cart is empty</EmptyCart>
      </CartPageContainer>
    );
  }

  return (
    <CartPageContainer>
      <CartTitle>CART</CartTitle>

      <CartContent>
        {cart.map((item, index) => (
          <CartItem key={`${item.id}-${item.selectedSize}-${index}`} product={item} />
        ))}
      </CartContent>

      <CartSummary>
        <SummaryRow>
          <SummaryLabel>Quantity: <span style={{fontWeight: 700}}>{cartItemCount}</span></SummaryLabel>
        </SummaryRow>
        <SummaryRow>
          <SummaryLabel $isTotal>Total:</SummaryLabel>
          <SummaryValue $isTotal>{formatPrice(cartTotal)}</SummaryValue>
        </SummaryRow>
        <ContinueButton onClick={() => navigate("/checkout")}>CONTINUE</ContinueButton>
      </CartSummary>
    </CartPageContainer>
  );
}
