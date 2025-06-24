import styled, { css } from "styled-components";
import CheckboxCmarkImg from "../assets/checkbox-cmark.png";
import WrongInputImg from "../assets/wrong-input.png";

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
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

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  padding: 8px;
  border-radius: 3px;
  background-color: transparent;
  border: 1px solid #dad8d4;
  margin: 0;
  flex: 0 0 auto;

  &:checked {
    background-image: url(${CheckboxCmarkImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 12px;
  }

  &:hover {
    cursor: pointer;
    border: 1px solid ${(props) => (props.$hasError ? "#e8aea8" : "#bbbbbb")};
  }

  ${(props) =>
    props.$hasError &&
    css`
      border-color: #e8aea8;
      box-shadow: 0 0 0 2px #e8aaa46f;
    `}
`;

const CheckboxLabel = styled.label`
  font-weight: 400;
  font-family: Roboto;
  font-size: 14px;
  letter-spacing: 2%;
  user-select: none;
  margin-left: 0.5rem;
  color: #272727;
`;

export default function Checkbox({
  id,
  name,
  checked,
  onChange,
  hasError,
  errorMessage,
  children,
}) {
  return (
    <Flexcolumn>
      <CheckboxContainer>
        <StyledCheckbox
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          $hasError={hasError}
        />
        <CheckboxLabel htmlFor={id}>{children}</CheckboxLabel>
      </CheckboxContainer>
      {errorMessage && (
        <ErrorMessage>
          <ErrorIcon src={WrongInputImg} alt="Error" />
          {errorMessage}
        </ErrorMessage>
      )}
    </Flexcolumn>
  );
}
