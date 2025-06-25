import { useStore } from "../../contexts/StoreContext";
import {
  FormSection,
  SectionTitle,
  InfoDisplaySection,
  InfoDisplay,
  ShippingOption,
  ShippingOptionLeft,
  RadioInput,
  ShippingLabel,
  ShippingPrice,
} from "./CheckoutStyling";

const ShippingStep = ({ formData, setFormData }) => {
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
          {formData.address}, {formData.city} {formData.postalCode}, {formData.province},{" "}
          {formData.country}
        </InfoDisplay>
      </InfoDisplaySection>

      <FormSection>
        <SectionTitle>Shipping method</SectionTitle>

        <ShippingOption
          $selected={formData.shippingMethod === "standard"}
          onClick={() =>
            setFormData((prev) => ({ ...prev, shippingMethod: "standard" }))
          }
        >
          <ShippingOptionLeft>
            <RadioInput
              type="radio"
              name="shippingMethod"
              value="standard"
              checked={formData.shippingMethod === "standard"}
              onChange={() => {}}
            />
            <ShippingLabel>Standard Shipping</ShippingLabel>
          </ShippingOptionLeft>
          <ShippingPrice>Free</ShippingPrice>
        </ShippingOption>

        <ShippingOption
          $selected={formData.shippingMethod === "express"}
          onClick={() =>
            setFormData((prev) => ({ ...prev, shippingMethod: "express" }))
          }
        >
          <ShippingOptionLeft>
            <RadioInput
              type="radio"
              name="shippingMethod"
              value="express"
              checked={formData.shippingMethod === "express"}
              onChange={() => {}}
            />
            <ShippingLabel>Express Shipping</ShippingLabel>
          </ShippingOptionLeft>
          <ShippingPrice>{formatPrice(4.99)}</ShippingPrice>
        </ShippingOption>
      </FormSection>
    </>
  );
};

export default ShippingStep;
