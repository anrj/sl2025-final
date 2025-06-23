import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { PiShoppingCart } from "react-icons/pi";
import CartDropdown from "./CartDropdown.jsx";

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

const CurrencySelector = styled.select`
  color: #1d1f22;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
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

  // TODO: Replace with actual cart items from context/state management
  const [cartItems] = useState([
    { id: 1, name: "Product 1", quantity: 2 },
    { id: 2, name: "Product 2", quantity: 1 },
  ]);

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const onCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <HeaderContainer>
        <CategoryNav>
          <CategoryLink to="/category/women">WOMEN</CategoryLink>
          <CategoryLink to="/category/men">MEN</CategoryLink>
          <CategoryLink to="/category/kids">KIDS</CategoryLink>
        </CategoryNav>
        <LogoLink to="/">
          <Logo src="logo-svg.svg" />
        </LogoLink>
        <ActionsNav>
          {/*TODO: better currency styling*/}
          <CurrencySelector>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">¥ GBP</option>
          </CurrencySelector>
          <CartButtonWrapper>
            <CartButton onClick={onCartToggle}>
              <PiShoppingCart width={20} />
            </CartButton>
            <CartItemCount $count={totalCartItems}>
              {totalCartItems}
            </CartItemCount>
          </CartButtonWrapper>
        </ActionsNav>
      </HeaderContainer>

      <CartOverlay $isOpen={isCartOpen} onClick={onCartToggle} />

      <CartDropdownWrapper $isOpen={isCartOpen}>
        <CartDropdown />
      </CartDropdownWrapper>
    </>
  );
}
