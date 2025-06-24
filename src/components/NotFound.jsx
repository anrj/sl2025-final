import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  font-size: 24px;
  color: #1d1f22;
  font-weight: 500;
`;

export default function NotFound() {
  return (
    <NotFoundContainer>
      Page not found
    </NotFoundContainer>
  );
}