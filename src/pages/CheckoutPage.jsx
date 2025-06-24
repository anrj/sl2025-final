import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";
import Input from "../components/Input";
import Select from "../components/Select";
import Checkbox from "../components/Checkbox";
import chevronSvg from "../assets/chevron.svg";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

const LeftHalf = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  padding: 32px;
`;

const RightHalf = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  padding: 32px;
`;

const LeftSection = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const RightSection = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Steps = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  color: #616161;

  span {
    &.active {
      color: #4caf50;
    }

    &.current {
      color: #272727;
      font-weight: 500;
    }
  }

  .arrow {
    width: 10px;
    height: 10px;
    filter: brightness(0);
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  font-family: Roboto;
  color: #272727;
  margin: 0 0 16px 0;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: Roboto;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const InputRowThree = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`;

const InputRowFull = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: #4caf50;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
`;

const ContinueButton = styled.button`
  background: #4caf50;
  color: white;
  padding: 12px 32px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #45a049;
  }
`;

const ProductSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  position: relative;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: #272727;
`;

const ProductPrice = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #4caf50;
  margin-top: 4px;
`;

const QuantityBadge = styled.div`
  position: absolute;
  top: -8px;
  left: 60px;
  background: #4caf50;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;

  &.total {
    font-weight: 500;
    font-size: 16px;
    border-top: 1px solid #eee;
    padding-top: 16px;
    margin-top: 16px;
  }
`;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, formatPrice } = useStore();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    shippingNote: "",
    city: "",
    postalCode: "",
    province: "",
    country: "Italy",
    saveInfo: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBack = () => {
    navigate("/cart");
  };

  const handleContinue = () => {
    console.log("Form submitted:", formData);
    alert("Proceeding to shipping...");
  };

  return (
    <Container>
      <LeftHalf>
        <LeftSection>
          <Steps>
            <span className="active">Cart</span>
            <img src={chevronSvg} alt="arrow" className="arrow" />
            <span className="current">Details</span>
            <img src={chevronSvg} alt="arrow" className="arrow" />
            <span>Shipping</span>
            <img src={chevronSvg} alt="arrow" className="arrow" />
            <span>Payment</span>
          </Steps>

          <FormSection>
            <SectionTitle>Contact</SectionTitle>
            <Input
              type="email"
              name="email"
              placeholder="Email or mobile phone number"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormSection>

          <FormSection>
            <SectionTitle>Shipping Address</SectionTitle>

            <InputRow>
              <Input
                type="text"
                name="firstName"
                placeholder="Name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Second Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </InputRow>

            <Input
              type="text"
              name="address"
              placeholder="Address and number"
              value={formData.address}
              onChange={handleInputChange}
            />

            <Input
              type="text"
              name="shippingNote"
              placeholder="Shipping note (optional)"
              value={formData.shippingNote}
              onChange={handleInputChange}
            />

            <InputRowThree>
              <Input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleInputChange}
              />
              <Select
                label="Province"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
              >
                <option value="">Province</option>
                <option value="milan">Milan</option>
                <option value="rome">Rome</option>
                <option value="turin">Turin</option>
              </Select>
            </InputRowThree>

            <InputRowFull>
              <Select
                label="Country/Region"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="Italy">Italy</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
              </Select>
            </InputRowFull>

            <Checkbox
              id="saveInfo"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleInputChange}
            >
              Save this information for a future fast checkout
            </Checkbox>
          </FormSection>

          <ButtonRow>
            <BackLink onClick={handleBack}>Back to cart</BackLink>
            <ContinueButton onClick={handleContinue}>
              Go to shipping
            </ContinueButton>
          </ButtonRow>
        </LeftSection>
      </LeftHalf>

      <RightHalf>
        <RightSection>
          {cart.map((item) => (
            <ProductSummary key={`${item.id}-${item.selectedSize}`}>
              <QuantityBadge>{item.quantity}</QuantityBadge>
              <ProductImage src={item.images[0]} alt={item.name} />
              <ProductInfo>
                <ProductName>{item.name}</ProductName>
                <ProductPrice>{formatPrice(item.priceInUsd)}</ProductPrice>
              </ProductInfo>
            </ProductSummary>
          ))}

          <div>
            <SummaryRow>
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Shipping</span>
              <span>Calculated at the next step</span>
            </SummaryRow>
            <SummaryRow className="total">
              <span>Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </SummaryRow>
          </div>
        </RightSection>
      </RightHalf>
    </Container>
  );
}
