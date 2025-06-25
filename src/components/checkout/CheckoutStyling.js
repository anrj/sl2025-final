import styled from "styled-components";

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: Roboto;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  font-family: Roboto;
  color: #272727;
  line-height: 25.6px;
  letter-spacing: -0.9px;
  margin: 0 0 0 0;
`;

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const InputRowThree = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`;

export const InputRowFull = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

export const InfoDisplaySection = styled.div`
  font-family: Helvetica;
  font-size: 14px;
  font-weight: 400;
  line-height: 15.6px;
  letter-spacing: -0.6px;
  border: 1px solid #56b28033;
  border-radius: 7px;
  padding: 0 10px;
`;

export const InfoDisplay = styled.div`
  display: flex;
  padding: 18px 16px;
  border-bottom: 1px solid #56b28033;
  color: #272727;

  &:last-child {
    border-bottom: none;
  }

  span {
    color: #818181;
    min-width: 50px;
    margin-right: 4px;
  }
`;

export const ShippingOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid ${(props) => (props.$selected ? "#4caf50" : "#e5e5e5")};
  border-radius: 7px;
  margin-bottom: 12px;
  cursor: pointer;

  &:hover {
    border-color: #4caf50;
  }
`;

export const ShippingOptionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const RadioInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #1583d7;
`;

export const ShippingLabel = styled.div`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  color: #272727;
`;

export const ShippingPrice = styled.div`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  color: #272727;
`;

export const CreditCard = styled.div`
  font-family: Helvetica;
  font-size: 14px;
  font-weight: 400;
  line-height: 15.6px;
  letter-spacing: -0.6px;
  border: 1px solid #e5e5e5;
  border-radius: 7px;
  padding: 0px 16px 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CreditCardHeading = styled.div`
  background: linear-gradient(to right, #56b28033, #56b28066);
  display: flex;
  align-items: center;
  gap: 20px;
  color: #56b280;
  font-family: Roboto;
  font-weight: 700;
  padding: 12px 16px;
  margin: 0 -16px;
  border-radius: 6px 6px 0 0;
`;

export const CreditCardIcon = styled.img`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  width: 18px;
  height: 18px;
`;

export const PaymentConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  gap: 24px;
`;

export const CheckCircleIcon = styled.img`
  width: 100px;
  height: 100px;
`;

export const ConfirmationTitle = styled.h1`
  font-family: Roboto;
  font-size: 30px;
  font-weight: 500;
  color: #272727;
  margin: 0;
`;

export const OrderNumber = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 400;
  color: #56b280;
  margin: 8px 0;
`;

export const BackToShoppingButton = styled.button`
  background: #56b280;
  color: white;
  padding: 16px 32px;
  border: none;
  border-radius: 7px;
  font-size: 16px;
  font-weight: 500;
  font-family: Roboto;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 16px;

  &:hover {
    background: #4a9d73;
  }
`;
