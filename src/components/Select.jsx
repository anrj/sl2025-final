import styled from "styled-components";
import CurrencyArrowSvg from "../assets/currency-arrow.svg";
import WrongInputImg from "../assets/wrong-input.png";

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  font-size: 12px;
  font-weight: 300;
  color: #cc777b;
  margin-top: 4px;
`;

const ErrorIcon = styled.img`
  width: 12px;
  height: 12px;
`;

const Flexcolumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  position: absolute;
  font-family: Roboto;
  font-weight: 400;
  top: 4px;
  left: 13px;
  font-size: 10px;
  color: #616161;
  z-index: 1;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 20px 40px 8px 12px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  font-weight: 400;
  font-family: Roboto;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #fff;
  color: #272727;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;

  &:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
    border-color: #d1d5db;
  }

  &:focus {
    border-color: ${(props) => (props.$hasError ? "#e8aea8" : "#4caf50")};
  }

  &:hover:not(:focus):not(:disabled) {
    border-color: ${(props) => (props.$hasError ? "#e8aea8" : "#9ca3af")};
  }

  ${(props) =>
    props.$hasError &&
    `
      border-color: #e8aea8;
    `}
`;

const ArrowIcon = styled.img`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  pointer-events: none;
  width: 10px;
  height: 10px;
`;

const Divider = styled.div`
  position: absolute;
  right: 28px;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  pointer-events: none;
  border-radius: 4px;
  width: 28px;
  height: 1px;
  background-color: #89898980;
`;

export default function Select({
  label,
  name,
  value,
  onChange,
  hasError,
  errorMessage,
  children,
  ...props
}) {
  return (
    <Flexcolumn>
      <SelectContainer>
        {label && <Label htmlFor={name}>{label}</Label>}
        <StyledSelect
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          $hasError={hasError}
          {...props}
        >
          {children}
        </StyledSelect>
        <Divider />
        <ArrowIcon src={CurrencyArrowSvg} alt="Arrow" />
      </SelectContainer>
      {errorMessage && (
        <ErrorMessage>
          <ErrorIcon src={WrongInputImg} alt="Error" />
          {errorMessage}
        </ErrorMessage>
      )}
    </Flexcolumn>
  );
}
