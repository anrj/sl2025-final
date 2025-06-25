import { useNavigate } from "react-router-dom";
import {
  PaymentConfirmationContainer,
  CheckCircleIcon,
  ConfirmationTitle,
  OrderNumber,
  BackToShoppingButton,
} from "./CheckoutStyling";
import CheckCircleSvg from "../../assets/icons/CheckCircle.svg";

const Confirmation = ({ orderNumber, clearCart }) => {
  const navigate = useNavigate();

  const handleBackToShopping = () => {
    if (clearCart) {
      clearCart();
    }
    navigate("/");
  };

  return (
    <PaymentConfirmationContainer>
      <CheckCircleIcon src={CheckCircleSvg} alt="Payment Confirmed" />
      <ConfirmationTitle>Payment Confirmed</ConfirmationTitle>
      <OrderNumber>ORDER {orderNumber}</OrderNumber>
      <BackToShoppingButton onClick={handleBackToShopping}>
        Back to shopping
      </BackToShoppingButton>
    </PaymentConfirmationContainer>
  );
};

export default Confirmation;
