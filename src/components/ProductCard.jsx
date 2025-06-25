import styled from "styled-components";
import ShoppingCartSvg from "../assets/icons/shopping-cart.svg";
import { useStore } from "../contexts/StoreContext";
import { useNavigate } from "react-router-dom";

const CartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5ece7b;
  color: white;
  border: none;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  bottom: 0px;
  right: 16px;
  transform: translateY(50%);
  opacity: 0;
  visibility: hidden;
  transition: box-shadow 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;

  &:hover {
    box-shadow: 0 4px 11px #1d1f221a;
  }

  img {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1);
  }
`;

const OutOfStockOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8d8f9a;
  font-size: 24px;
`;

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 386px;
  min-height: 444px;
  padding: 16px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 35px #a8acb030;

    ${CartButton} {
      opacity: ${(props) => (props.$outOfStock ? 0 : 1)};
      visibility: ${(props) => (props.$outOfStock ? "hidden" : "visible")};
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  line-height: 0;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 354 / 330;
`;

const ProductTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: #1d1f22;
  margin: 0 0 8px 0;
  line-height: 1.4;
  max-height: 50px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #1d1f22;
  margin: 0;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 24px;

  ${ProductTitle} {
    color: ${(props) => (props.$outOfStock ? "#8D8F9A" : "#1D1F22")};
  }

  ${ProductPrice} {
    color: ${(props) => (props.$outOfStock ? "#8D8F9A" : "#1D1F22")};
  }
`;

export default function ProductCard({ product }) {
  const { formatPrice, addToCart } = useStore();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <CardDiv
      onClick={() => navigate(`/product/${product.id}`)}
      $outOfStock={!product.inStock}
    >
      <ImageContainer>
        <ProductImage src={product.images[0]} alt={product.name} />
        {!product.inStock && (
          <OutOfStockOverlay>OUT OF STOCK</OutOfStockOverlay>
        )}
        <CartButton onClick={handleAddToCart}>
          <img src={ShoppingCartSvg} alt="Add to Cart" />
        </CartButton>
      </ImageContainer>
      <ProductInfo $outOfStock={!product.inStock}>
        <ProductTitle>
          {product.brand} {product.name}
        </ProductTitle>
        <ProductPrice>{formatPrice(product.priceInUsd)}</ProductPrice>
      </ProductInfo>
    </CardDiv>
  );
}
