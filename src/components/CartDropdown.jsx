import styled from "styled-components";
import CartItem from "./CartItem.jsx";

const CartDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 325px;
  height: 625px;
  padding: 32px 16px;
  background-color: #ffffff;
  color: #1d1f22;
`;

const CartTitle = styled.h2`
  margin: 0 0 32px 0;
  font-size: 16px;
  font-weight: 700;
  color: #1d1f22;

  .bag-text {
    font-weight: 700;
  }

  .item-count {
    font-weight: 500;
  }
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 0;
  font-size: 16px;
  font-weight: 700;
  margin-top: auto;
`;

const CartButton = styled.button`
  font-family: inherit;
  font-weight: 700;
  background: transparent;
  border: 1px solid #1d1f22;
  padding: 16px 32px;
  color: #1d1f22;
  font-size: 14px;
  cursor: pointer;

  &.checkout-btn {
    background-color: #5ece7b;
    color: #ffffff;
    border: 1px solid #5ece7b;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const CartItemsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 16px;
`;

export default function CartDropdown({
  cartItems = [
    {
      id: 1,
      name: "Misha Andguladze",
      price: 50.0,
      image: "/test.jpg",
      availableSizes: ["S", "M", "L", "XL"],
      selectedSize: "M",
      quantity: 1,
    },
    {
      id: 2,
      name: "Misha Andguladze",
      price: 50.0,
      image: "/test.jpg",
      availableSizes: ["S", "M", "L", "XL"],
      selectedSize: "M",
      quantity: 1,
    },
    {
      id: 3,
      name: "Misha Andguladze",
      price: 50.0,
      image: "/test.jpg",
      availableSizes: ["S", "M", "L", "XL"],
      selectedSize: "M",
      quantity: 1,
    },
  ],
}) {
  //TODO: replace with actual cart data
  const sampleItems =
    cartItems.length > 0
      ? cartItems
      : [
          {
            id: 1,
            name: "Misha Andguladze",
            price: 50.0,
            image: "/test.jpg",
            availableSizes: ["S", "M", "L", "XL"],
            selectedSize: "M",
            quantity: 1,
          },
        ];
  const itemCount = sampleItems.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
  const totalPrice = sampleItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <CartDropdownContainer>
      <CartTitle>
        <span className="bag-text">My Bag</span>
        <span className="item-count">, {itemCount} items</span>
      </CartTitle>

      <CartItemsContainer>
        {sampleItems.map((item) => (
          <CartItem
            key={item.id}
            product={item}
            onSizeChange={() => {}}
            onQuantityChange={() => {}}
          />
        ))}
      </CartItemsContainer>

      <TotalAmount>
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </TotalAmount>
      <ButtonDiv>
        <CartButton>VIEW BAG</CartButton>
        <CartButton className="checkout-btn">CHECK OUT</CartButton>
      </ButtonDiv>
    </CartDropdownContainer>
  );
}
