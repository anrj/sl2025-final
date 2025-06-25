import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";
import Input from "../components/Input";
import Select from "../components/Select";
import Checkbox from "../components/Checkbox";
import chevronSvg from "../assets/chevron.svg";
import CreditCardCvv from "../assets/cvv.svg";
import CreditCardLock from "../assets/LockFill.svg";
import CreditCardSvg from "../assets/CreditCardFill.svg";
import CheckCircleSvg from "../assets/CheckCircle.svg";

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
  background-color: #f2f2f2;
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
  max-width: 476px;
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
  line-height: 25.6px;
  letter-spacing: -0.9px;
  margin: 0 0 0 0;
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

const BackLink = styled(Link)`
  color: #4caf50;
  font-size: 14px;
  font-family: Roboto;
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
  gap: 48px;
  padding: 16px;
  position: relative;
`;

const ProductImage = styled.img`
  width: 164px;
  height: 130px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 30px;
  font-weight: 400;
  line-height: 27px;
  margin: 0;
  color: #272727;
`;

const ProductPrice = styled.div`
  font-size: 21px;
  font-weight: 600;
  font-family: Poppins;
  color: #56b280;
  margin-top: 4px;
`;

const QuantityBadge = styled.div`
  position: absolute;
  top: 4px;
  left: 170px;
  background: #56b280;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  font-family: Roboto;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
  font-weight: 500;
  font-family: Roboto;
  color: #616161;

  &.total {
    font-weight: 500;
    font-size: 16px;
    border-top: 1px solid #56b28033;
    padding-top: 16px;
    margin-top: 16px;
  }
`;

const ShippingOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid ${(props) => (props.$selected ? "#4caf50" : "#E5E5E5")};
  border-radius: 7px;
  margin-bottom: 12px;
  cursor: pointer;

  &:hover {
    border-color: #4caf50;
  }
`;

const ShippingOptionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RadioInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #1583d7;
`;

const ShippingLabel = styled.div`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  color: #272727;
`;

const ShippingPrice = styled.div`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  color: #272727;
`;

const InfoDisplaySection = styled.div`
  font-family: Helvetica;
  font-size: 14px;
  font-weight: 400;
  line-height: 15.6px;
  letter-spacing: -0.6px;
  border: 1px solid #56b28033;
  border-radius: 7px;
  padding: 0 10px;
`;

const InfoDisplay = styled.div`
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

const CreditCard = styled.div`
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

const CreditCardHeading = styled.div`
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

const CreditCardIcon = styled.img`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  width: 18px;
  height: 18px;
`;

const PaymentConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  gap: 24px;
`;

const CheckCircleIcon = styled.img`
  width: 100px;
  height: 100px;
`;

const ConfirmationTitle = styled.h1`
  font-family: Roboto;
  font-size: 30px;
  font-weight: 500;
  color: #272727;
  margin: 0;
`;

const OrderNumber = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 400;
  color: #56b280;
  margin: 8px 0;
`;

const BackToShoppingButton = styled.button`
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

export default function CheckoutPage() {
  const { cart, cartTotal, formatPrice, countriesProvinces } = useStore();
  const { step } = useParams();
  const navigate = useNavigate();

  const currentStep = step || "details";

  const [formData, setFormData] = useState({
    contact: "",
    firstName: "",
    lastName: "",
    address: "",
    shippingNote: "",
    city: "",
    postalCode: "",
    province: "",
    country: "",
    saveInfo: false,
    shippingMethod: "standard",
    cardNumber: "",
    holderName: "",
    expiration: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const availableCountries = Object.keys(countriesProvinces).sort();
  const availableProvinces = formData.country
    ? countriesProvinces[formData.country] || []
    : [];

  const isDetailsComplete = useCallback(() => {
    const requiredFields = [
      "contact",
      "firstName",
      "lastName",
      "address",
      "city",
      "postalCode",
      "province",
      "country",
    ];
    return requiredFields.every(
      (field) => formData[field] && formData[field].trim()
    );
  }, [formData]);

  const _isPaymentComplete = useCallback(() => {
    const requiredPaymentFields = [
      "cardNumber",
      "holderName",
      "expiration",
      "cvv",
    ];
    return requiredPaymentFields.every(
      (field) => formData[field] && formData[field].trim()
    );
  }, [formData]);

  const isShippingComplete = useCallback(() => {
    return isDetailsComplete() && formData.shippingMethod;
  }, [isDetailsComplete, formData.shippingMethod]);

  const validatePaymentForm = () => {
    const newErrors = {};
    const requiredPaymentFields = [
      "cardNumber",
      "holderName",
      "expiration",
      "cvv",
    ];

    requiredPaymentFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const shippingCost = formData.shippingMethod === "express" ? 4.99 : 0;
  const totalWithShipping = cartTotal + shippingCost;

  useEffect(() => {
    if (currentStep === "shipping" && !isDetailsComplete()) {
      navigate("/checkout/details", { replace: true });
    } else if (
      currentStep === "payment" &&
      (!isDetailsComplete() || !isShippingComplete())
    ) {
      navigate("/checkout/details", { replace: true });
    }
  }, [currentStep, navigate, isDetailsComplete, isShippingComplete]);

  const validateField = (name, value) => {
    switch (name) {
      case "contact": {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
          return "Contact information is required";
        }

        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}(\.[0-9]{1,3}){3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const phoneRegex = /^[+]?[1-9][\d]{0,15}$|^[+]?[(]?[\d\s\-.()]{10,20}$/;

        const isValidEmail = emailRegex.test(trimmedValue);
        const isValidPhone = phoneRegex.test(
          trimmedValue.replace(/[\s\-.()]/g, "")
        );

        if (!isValidEmail && !isValidPhone) {
          return "Please enter a valid email address or phone number";
        }

        return "";
      }
      case "firstName": {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
          return "First name is required";
        }

        const nameRegex = /^[a-zA-Z\s\-'.]+$/;
        if (!nameRegex.test(trimmedValue)) {
          return "Please enter a valid first name";
        }

        return "";
      }

      case "lastName": {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
          return "Last name is required";
        }

        const nameRegex = /^[a-zA-Z\s\-'.]+$/;
        if (!nameRegex.test(trimmedValue)) {
          return "Please enter a valid last name";
        }

        return "";
      }

      case "address":
        return !value.trim() ? "Address is required" : "";

      case "city": {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
          return "City is required";
        }

        const cityRegex = /^[a-zA-Z\s\-'.]+$/;
        if (!cityRegex.test(trimmedValue)) {
          return "Please enter a valid city name";
        }

        return "";
      }

      case "postalCode": {
        const postalRegex = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i;
        const trimmedValue = value.trim();

        if (!trimmedValue) {
          return "Please enter a postal code";
        }

        if (!postalRegex.test(trimmedValue)) {
          return "Please enter a valid postal code";
        }

        return "";
      }

      case "province":
        return !value ? "Please select a province" : "";

      case "country":
        return !value ? "Please select a country" : "";

      case "cardNumber": {
        const trimmedValue = value.trim();
        const cleanCard = trimmedValue.replace(/\s+/g, "");

        if (!trimmedValue) {
          return "Card number is required";
        }

        const cardRegex = /^\d{16}$/;
        if (!cardRegex.test(cleanCard)) {
          return "Please enter a valid card number";
        }

        return "";
      }

      case "holderName": {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
          return "Holder name is required";
        }

        const nameRegex = /^[a-zA-Z\s\-'.]+$/;
        if (!nameRegex.test(trimmedValue)) {
          return "Please enter a valid holder name";
        }

        return "";
      }

      case "expiration": {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
          return "Expiration date is required";
        }

        const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expirationRegex.test(trimmedValue)) {
          return "Please enter MM/YY format";
        }

        const [month, year] = trimmedValue.split("/");
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear() % 100;

        const expMonth = parseInt(month);
        const expYear = parseInt(year);

        if (expYear < currentYear) {
          return "Card has expired";
        }
        if (expYear === currentYear && expMonth < currentMonth) {
          return "Card has expired";
        }

        return "";
      }

      case "cvv": {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
          return "CVV is required";
        }

        const cvvRegex = /^\d{3,4}$/;
        if (!cvvRegex.test(trimmedValue)) {
          return "Please enter a valid CVV";
        }

        return "";
      }

      default:
        return "";
    }
  };

  const validateDetailsForm = () => {
    const newErrors = {};
    const requiredFields = [
      "contact",
      "firstName",
      "lastName",
      "address",
      "city",
      "postalCode",
      "province",
      "country",
    ];

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let fieldValue = type === "checkbox" ? checked : value;

    if (name === "country") {
      setFormData((prev) => ({
        ...prev,
        [name]: fieldValue,
        province: "",
      }));

      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue),
        province: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));

      if (name !== "shippingNote" && name !== "saveInfo") {
        const error = validateField(name, fieldValue);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    }

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `#${timestamp.slice(-6)}${randomNum}`;
  };

  const handleContinue = () => {
    if (currentStep === "details") {
      if (validateDetailsForm()) {
        navigate("/checkout/shipping");
      } else {
        const requiredFields = [
          "contact",
          "firstName",
          "lastName",
          "address",
          "city",
          "postalCode",
          "province",
          "country",
        ];
        const touchedFields = {};
        requiredFields.forEach((field) => {
          touchedFields[field] = true;
        });
        setTouched((prev) => ({ ...prev, ...touchedFields }));
      }
    } else if (currentStep === "shipping") {
      navigate("/checkout/payment");
    } else if (currentStep === "payment") {
      if (validatePaymentForm()) {
        console.log("Processing payment...", formData);
        // Simulate payment processing
        const newOrderNumber = generateOrderNumber();
        setOrderNumber(newOrderNumber);
        setIsPaymentConfirmed(true);
      } else {
        const paymentFields = ["cardNumber", "holderName", "expiration", "cvv"];
        const touchedFields = {};
        paymentFields.forEach((field) => {
          touchedFields[field] = true;
        });
        setTouched((prev) => ({ ...prev, ...touchedFields }));
      }
    }
  };

  const renderStepContent = () => {
    if (isPaymentConfirmed) {
      return (
        <PaymentConfirmationContainer>
          <CheckCircleIcon src={CheckCircleSvg} alt="Payment Confirmed" />
          <ConfirmationTitle>Payment Confirmed</ConfirmationTitle>
          <OrderNumber>ORDER {orderNumber}</OrderNumber>
          <BackToShoppingButton onClick={() => navigate("/")}>
            Back to shopping
          </BackToShoppingButton>
        </PaymentConfirmationContainer>
      );
    }

    if (currentStep === "details") {
      return (
        <>
          <FormSection>
            <SectionTitle>Contact</SectionTitle>
            <Input
              type="text"
              name="contact"
              placeholder="Email or mobile phone number"
              value={formData.contact}
              onChange={handleInputChange}
              hasError={touched.contact && !!errors.contact}
              errorMessage={touched.contact ? errors.contact : ""}
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
                hasError={touched.firstName && !!errors.firstName}
                errorMessage={touched.firstName ? errors.firstName : ""}
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Second Name"
                value={formData.lastName}
                onChange={handleInputChange}
                hasError={touched.lastName && !!errors.lastName}
                errorMessage={touched.lastName ? errors.lastName : ""}
              />
            </InputRow>

            <Input
              type="text"
              name="address"
              placeholder="Address and number"
              value={formData.address}
              onChange={handleInputChange}
              hasError={touched.address && !!errors.address}
              errorMessage={touched.address ? errors.address : ""}
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
                hasError={touched.city && !!errors.city}
                errorMessage={touched.city ? errors.city : ""}
              />
              <Input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleInputChange}
                hasError={touched.postalCode && !!errors.postalCode}
                errorMessage={touched.postalCode ? errors.postalCode : ""}
              />
              <Select
                label="Province"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                disabled={!formData.country}
                hasError={touched.province && !!errors.province}
                errorMessage={touched.province ? errors.province : ""}
              >
                <option value="">Province</option>
                {availableProvinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </Select>
            </InputRowThree>

            <InputRowFull>
              <Select
                label="Country/Region"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                hasError={touched.country && !!errors.country}
                errorMessage={touched.country ? errors.country : ""}
              >
                <option value="">Select a country</option>
                {availableCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
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
        </>
      );
    } else if (currentStep === "shipping") {
      return (
        <>
          <InfoDisplaySection>
            <InfoDisplay>
              <span>Contact</span>
              {formData.contact}
            </InfoDisplay>
            <InfoDisplay>
              <span>Ship to</span>
              {formData.address}, {formData.postalCode}, {formData.province},{" "}
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
    } else if (currentStep === "payment") {
      return (
        <>
          <InfoDisplaySection>
            <InfoDisplay>
              <span>Contact</span>
              {formData.contact}
            </InfoDisplay>
            <InfoDisplay>
              <span>Ship to</span>
              {formData.address}, {formData.postalCode}, {formData.province},{" "}
              {formData.country}
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
    }
  };

  const getBackLink = () => {
    if (currentStep === "shipping") return "/checkout/details";
    if (currentStep === "payment") return "/checkout/shipping";
    return "/cart";
  };

  const getContinueButtonText = () => {
    if (currentStep === "details") return "Go to shipping";
    if (currentStep === "shipping") return "Go to payment";
    if (currentStep === "payment") return "Pay now";
    return "Continue";
  };

  return (
    <Container>
      <LeftHalf>
        <LeftSection>
          <Steps>
            <span className="active">Cart</span>
            <img src={chevronSvg} alt="arrow" className="arrow" />
            <span className={currentStep === "details" ? "current" : "active"}>
              Details
            </span>
            <img src={chevronSvg} alt="arrow" className="arrow" />
            <span
              className={
                currentStep === "shipping"
                  ? "current"
                  : currentStep === "payment" || isPaymentConfirmed
                  ? "active"
                  : ""
              }
            >
              Shipping
            </span>
            <img src={chevronSvg} alt="arrow" className="arrow" />
            <span
              className={
                currentStep === "payment" || isPaymentConfirmed ? "current" : ""
              }
            >
              Payment
            </span>
          </Steps>

          {renderStepContent()}

          {!isPaymentConfirmed && (
            <ButtonRow>
              <BackLink to={getBackLink()}>
                {currentStep === "details"
                  ? "Back to cart"
                  : currentStep === "shipping"
                  ? "Back to details"
                  : "Back to shipping"}
              </BackLink>
              <ContinueButton onClick={handleContinue}>
                {getContinueButtonText()}
              </ContinueButton>
            </ButtonRow>
          )}
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
              <span style={{ color: "#272727" }}>{formatPrice(cartTotal)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Shipping</span>
              <span style={{ color: "#272727" }}>
                {currentStep === "details"
                  ? "Calculated at the next step"
                  : shippingCost === 0
                  ? "Free Shipping"
                  : formatPrice(shippingCost)}
              </span>
            </SummaryRow>
            <SummaryRow className="total">
              <span>{isPaymentConfirmed ? "Paid" : "Total"}</span>
              <span
                style={{ color: isPaymentConfirmed ? "#56b280" : "#272727" }}
              >
                {formatPrice(
                  currentStep === "details" ? cartTotal : totalWithShipping
                )}
              </span>
            </SummaryRow>
          </div>
        </RightSection>
      </RightHalf>
    </Container>
  );
}
