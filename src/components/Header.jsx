import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import LogoSvg from "../assets/logo.svg";
import CurrencyArrowSvg from "../assets/currency-arrow.svg";
import ShoppingCartSvg from "../assets/shopping-cart.svg";
import CartDropdown from "./CartDropdown.jsx";
import { useStore } from "../contexts/StoreContext.jsx";

const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(57, 55, 72, 0.22);
  z-index: 10;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  position: relative;
  z-index: 20;
`;

const LogoLink = styled(Link)`
  position: absolute;
  left: calc(50% - 20.5px);
`;

const Logo = styled.img`
  width: 41px;
  height: 41px;
`;

const CategoryNav = styled.nav`
  position: absolute;
  left: 100px;
  display: flex;
  align-items: center;
`;

const CategoryLink = styled(NavLink)`
  color: #1d1f22;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  padding: 26px 20px;

  &.active {
    color: #5ece7b;
    font-weight: 600;
    border-bottom: 2px solid #5ece7b;
  }

  &:focus,
  &:hover {
    color: #5ece7b;
    font-weight: 600;
    border-bottom: 2px solid #5ece7b;
  }
`;

const ActionsNav = styled.nav`
  position: absolute;
  right: 100px;
  display: flex;
  align-items: center;
`;

const CartButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const CartButton = styled.button`
  background: transparent;
  border: none;
  color: #43464e;
  font-size: 24px;
  cursor: pointer;

  img {
    width: 20px;
    height: 18px;
  }
`;

const CartItemCount = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #1d1f22;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  font-family: "Roboto", sans-serif;
  opacity: ${(props) => (props.$count > 0 ? 1 : 0)};
  visibility: ${(props) => (props.$count > 0 ? "visible" : "hidden")};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

const CurrencySelector = styled.div`
  position: relative;
  margin-right: 20px;
`;

const CurrencyButton = styled.button`
  background: transparent;
  border: none;
  color: #1d1f22;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CurrencyArrow = styled.img`
  width: 8px;
  height: 4px;
  margin-left: 4px;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const CurrencyDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  box-shadow: 0 4px 35px #a8acb019;
  min-width: 114px;
  z-index: 100;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transform: ${(props) =>
    props.$isOpen ? "translateY(0)" : "translateY(-10px)"};
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
`;

const CurrencyOption = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #1d1f22;
  gap: 8px;

  &:hover {
    background-color: #eeeeee;
  }
`;

const CartDropdownWrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 100px;
  z-index: 30;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transform: ${(props) =>
    props.$isOpen ? "translateY(0)" : "translateY(-10px)"};
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
`;

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const { cartItemCount, currency, setCurrency, currencyRates } = useStore();
  const currencyRef = useRef(null);

  const onCartToggle = () => {
    setIsCartOpen(!isCartOpen);
    setIsCurrencyOpen(false);
  };

  const onCurrencyToggle = () => {
    setIsCurrencyOpen(!isCurrencyOpen);
    setIsCartOpen(false);
  };

  const onCurrencySelect = (newCurrency) => {
    setCurrency(newCurrency);
    setIsCurrencyOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setIsCurrencyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <HeaderContainer>
        <CategoryNav>
          <CategoryLink to="/category/women">WOMEN</CategoryLink>
          <CategoryLink to="/category/men">MEN</CategoryLink>
          <CategoryLink to="/category/kids">KIDS</CategoryLink>
        </CategoryNav>
        <LogoLink to="/">
          <Logo src={LogoSvg} />
        </LogoLink>
        <ActionsNav>
          <CurrencySelector ref={currencyRef}>
            <CurrencyButton onClick={onCurrencyToggle}>
              {currencyRates[currency].symbol}
              <CurrencyArrow
                src={CurrencyArrowSvg}
                $isOpen={isCurrencyOpen}
                alt="Arrow"
              />
            </CurrencyButton>
            <CurrencyDropdown $isOpen={isCurrencyOpen}>
              {Object.keys(currencyRates).map((currencyCode) => (
                <CurrencyOption
                  key={currencyCode}
                  onClick={() => onCurrencySelect(currencyCode)}
                >
                  {currencyRates[currencyCode].symbol} {currencyCode}
                </CurrencyOption>
              ))}
            </CurrencyDropdown>
          </CurrencySelector>
          <CartButtonWrapper>
            <CartButton onClick={onCartToggle}>
              <img src={ShoppingCartSvg} alt="Shopping Cart" />
            </CartButton>
            <CartItemCount $count={cartItemCount}>
              {cartItemCount}
            </CartItemCount>
          </CartButtonWrapper>
        </ActionsNav>
      </HeaderContainer>

      <CartOverlay
        $isOpen={isCartOpen}
        onClick={() => {
          setIsCartOpen(false);
          setIsCurrencyOpen(false);
        }}
      />

      <CartDropdownWrapper $isOpen={isCartOpen}>
        <CartDropdown />
      </CartDropdownWrapper>
    </>
  );
}
