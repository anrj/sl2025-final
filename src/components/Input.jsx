import styled from "styled-components";
import WrongInputImg from "../assets/wrong-input.png";

const Flexcolumn = styled.div`
  display: flex;
  flex-direction: column;
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

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #fff;
  color: #1d1f22;
  caret-color: #1d1f22;
  box-sizing: border-box;

  &::placeholder {
    color: #616161;
    font-size: 14px;
    font-family: Helvetica;
  }

  &:focus {
    border-color: ${(props) => (props.$hasError ? "#e8aea8" : "#4caf50")};
  }

  &:hover:not(:focus) {
    border-color: ${(props) => (props.$hasError ? "#e8aea8" : "#9ca3af")};
  }

  ${(props) =>
    props.$hasError &&
    `
      border-color: #e8aea8;
    `}
`;

export default function Input({
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  hasError,
  errorMessage,
  ...props
}) {
  return (
    <Flexcolumn>
      <StyledInput
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        $hasError={hasError}
        {...props}
      />
      {errorMessage && (
        <ErrorMessage>
          <ErrorIcon src={WrongInputImg} alt="Error" />
          {errorMessage}
        </ErrorMessage>
      )}
    </Flexcolumn>
  );
}
