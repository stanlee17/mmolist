import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  border-radius: 3rem;
  border: 2px solid var(--blue);
  color: var(--blue) !important;
  padding: 0.6rem 1.8rem;
  text-decoration: none;
  margin: 0 0.4rem;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s;

  &:hover,
  &:active {
    color: var(--background-dark) !important;
    background-color: var(--blue);
    transform: scale(1.02);
    box-shadow: none;
  }
`;

const MLNavLink = ({ to, children, onClick }) => {
  return (
    <StyledLink to={to} onClick={onClick}>
      {children}
    </StyledLink>
  );
};

export default MLNavLink;
