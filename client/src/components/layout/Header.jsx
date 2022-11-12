import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Import bootstrap components
import { Container, Nav, Navbar } from "react-bootstrap";

import Logo from "../../images/logo.svg";
import useAuth from "../../hooks/useAuth";
import MLButton from "../../components/common/MLButton";

const StyledNavbar = styled(Navbar)`
  padding: 1rem 0 1rem 0;
  background-color: var(--dark-blue);

  .navbar-brand {
    font-weight: 600;
    color: var(--blue-text);
    display: flex;
    align-items: center;
  }

  .navbar-nav a {
    color: var(--superlight-text);
  }

  .navbar-nav a:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <StyledNavbar variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="Logo" />
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/search">
            Search
          </Nav.Link>
          {!user && (
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
          )}
          {!user && (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
          {user && (
            <Nav.Link as={Link} to="/create-games">
              Add Games
            </Nav.Link>
          )}
          {user && (
            <Nav.Link as={Link} to="profile">
              Profile
            </Nav.Link>
          )}
          {user && (
            <MLButton
              onClick={() => {
                logout();
              }}
            >
              Logout
            </MLButton>
          )}
        </Nav>
      </Container>
    </StyledNavbar>
  );
};

export default Header;
