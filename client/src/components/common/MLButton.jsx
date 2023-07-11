import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  color: var(--background-dark) !important;
  border-radius: 2rem;
  min-width: ${(props) => (props.buttonform ? '100%' : '0%')};
  border: none;
  background-color: ${(props) =>
    props.color ? `${props.color} !important` : 'var(--blue) !important'};
  transition: all 0.3s;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.7rem 3.2rem;

  &:hover,
  &:active {
    transform: scale(1.02);
    box-shadow: none;
  }
`;

const MLButton = ({
  children,
  loadingState,
  className,
  onClick,
  buttonform,
  color,
}) => {
  return (
    <StyledButton
      buttonform={buttonform ? 1 : 0}
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      className={className}
      disabled={loadingState}
      color={color}
    >
      {children}
    </StyledButton>
  );
};

export default MLButton;
