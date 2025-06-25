import styled from "styled-components";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";
import chevronSvg from "../assets/chevron.svg";
import DetailsStep from "../components/checkout/DetailsStep";
import ShippingStep from "../components/checkout/ShippingStep";
import PaymentStep from "../components/checkout/PaymentStep";
import Confirmation from "../components/checkout/Confirmation";

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
  max-height: 100vh;
  overflow-y: auto;
  padding-right: 8px;
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

export default function CheckoutPage() {
  const { cart, cartTotal, formatPrice, countriesProvinces, clearCart } =
    useStore();
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

  useEffect(() => {
    const savedData = localStorage.getItem("checkoutData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const {
        cardNumber: _cardNumber,
        holderName: _holderName,
        expiration: _expiration,
        cvv: _cvv,
        ...cleanData
      } = parsedData;
      setFormData((prev) => ({ ...prev, ...cleanData }));

      localStorage.setItem("checkoutData", JSON.stringify(cleanData));
    }
  }, []);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const availableCountries = Object.keys(countriesProvinces).sort();
  const availableProvinces = useMemo(
    () => (formData.country ? countriesProvinces[formData.country] || [] : []),
    [formData.country, countriesProvinces]
  );

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
      (field) => formData[field] && String(formData[field]).trim()
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
    if (!cart.length) {
      navigate("/");
    }
  }, [cart, navigate]);

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
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return `#${randomNum}`;
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
        if (formData.saveInfo) {
          const {
            cardNumber: _cardNumber,
            holderName: _holderName,
            expiration: _expiration,
            cvv: _cvv,
            ...safeData
          } = formData;
          localStorage.setItem("checkoutData", JSON.stringify(safeData));
        } else {
          localStorage.removeItem("checkoutData");
        }

        console.log("Processing payment...", formData);
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
      return <Confirmation orderNumber={orderNumber} clearCart={clearCart} />;
    }

    if (currentStep === "details") {
      return (
        <DetailsStep
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
          touched={touched}
          availableCountries={availableCountries}
          availableProvinces={availableProvinces}
        />
      );
    } else if (currentStep === "shipping") {
      return <ShippingStep formData={formData} setFormData={setFormData} />;
    } else if (currentStep === "payment") {
      return (
        <PaymentStep
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
          touched={touched}
        />
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
