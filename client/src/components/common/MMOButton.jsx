import React from "react";

// Import npm packages
import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  color: var(--background-dark) !important;
  min-width: 100%;
  border-radius: 2rem;
  border: none;
  background-color: var(--blue) !important;
  transition: all 0.3s;
  font-weight: 600;
  padding: 0.7rem 2.5rem 0.7rem 2.5rem;

  &:hover,
  &:active,
  &:focus {
    transform: scale(1.02);
    box-shadow: none;
  }
`;

const MMOButton = ({ children, loadingState, onClick }) => {
  return (
    <StyledButton
      type={onClick ? "button" : "submit"}
      onClick={onClick}
      className={loadingState && "button-gradient-loading"}
      disabled={loadingState}
    >
      {children}
    </StyledButton>
  );
};

export default MMOButton;
