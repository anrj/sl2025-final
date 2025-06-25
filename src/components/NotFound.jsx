import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  font-size: 24px;
  color: #8d8f9a;
`;

export default function NotFound() {
  return <NotFoundContainer>Page not found</NotFoundContainer>;
}
