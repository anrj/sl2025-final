import Input from "../Input";
import {
  FormSection,
  SectionTitle,
  InfoDisplaySection,
  InfoDisplay,
  CreditCard,
  CreditCardHeading,
  InputRowFull,
  InputRow,
  CreditCardIcon,
} from "./CheckoutStyling";
import CreditCardSvg from "../../assets/icons/CreditCardFill.svg";
import CreditCardLock from "../../assets/icons/LockFill.svg";
import CreditCardCvv from "../../assets/icons/cvv.svg";
import { useStore } from "../../contexts/StoreContext";

const PaymentStep = ({ formData, handleInputChange, errors, touched }) => {
  const { formatPrice } = useStore();
  return (
    <>
      <InfoDisplaySection>
        <InfoDisplay>
          <span>Contact</span>
          {formData.contact}
        </InfoDisplay>
        <InfoDisplay>
          <span>Ship to</span>
          {formData.address}, {formData.city} {formData.postalCode},{" "}
          {formData.province}, {formData.country}
        </InfoDisplay>
        <InfoDisplay>
          <span>Method</span>
          {formData.shippingMethod === "standard"
            ? "Standard Shipping - FREE"
            : `Express Shipping - ${formatPrice(4.99)}`}
        </InfoDisplay>
      </InfoDisplaySection>
      <FormSection>
        <SectionTitle>Payment Method</SectionTitle>
        <CreditCard>
          <CreditCardHeading>
            <img src={CreditCardSvg}></img>
            Credit Card
          </CreditCardHeading>
          <InputRowFull>
            <div style={{ position: "relative" }}>
              <Input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber || ""}
                onChange={handleInputChange}
                hasError={touched.cardNumber && !!errors.cardNumber}
                errorMessage={touched.cardNumber ? errors.cardNumber : ""}
              />
              <CreditCardIcon src={CreditCardLock} alt="lock" />
            </div>
          </InputRowFull>
          <InputRowFull>
            <Input
              type="text"
              name="holderName"
              placeholder="Holder Name"
              value={formData.holderName || ""}
              onChange={handleInputChange}
              hasError={touched.holderName && !!errors.holderName}
              errorMessage={touched.holderName ? errors.holderName : ""}
            />
          </InputRowFull>
          <InputRow>
            <Input
              type="text"
              name="expiration"
              placeholder="Expiration (MM/YY)"
              value={formData.expiration || ""}
              onChange={handleInputChange}
              hasError={touched.expiration && !!errors.expiration}
              errorMessage={touched.expiration ? errors.expiration : ""}
            />
            <div style={{ position: "relative" }}>
              <Input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv || ""}
                onChange={handleInputChange}
                hasError={touched.cvv && !!errors.cvv}
                errorMessage={touched.cvv ? errors.cvv : ""}
              />
              <CreditCardIcon src={CreditCardCvv} alt="cvv" />
            </div>
          </InputRow>
        </CreditCard>
      </FormSection>
    </>
  );
};

export default PaymentStep;
