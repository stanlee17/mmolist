// Import React modules
import React from "react";
import styled from "styled-components";

const MainFooter = styled.div`
  text-align: center;
  background: var(--footer-dark);
`;

const Footer = () => {
  // Dynamic Date Function
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <MainFooter className="py-3">&copy; {getCurrentYear()} MMOList</MainFooter>
  );
};

export default Footer;
