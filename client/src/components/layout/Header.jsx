import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Hamburger React
import Hamburger from 'hamburger-react';

// Import bootstrap components
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';

import Logo from '../../images/logo.svg';
import useAuth from '../../hooks/useAuth';
import MLButton from '../../components/common/MLButton';

const StyledNavbar = styled(Navbar)`
  padding: 1rem 0 1rem 0;
  background-color: var(--dark-blue);

  .navbar-brand {
    font-weight: 600;
    color: var(--blue-text);
    display: flex;
    align-items: center;
  }

  .hamburger-react {
    display: none;
  }

  @media only screen and (max-width: 800px) {
    .hamburger-react {
      display: block;
    }

    .navbar-nav {
      display: none;
    }
  }

  .navbar-nav a {
    color: var(--superlight-text);
  }

  .navbar-nav a:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Header = () => {
  const [show, setShow] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Auth Hooks
  const { user, logout } = useAuth();

  return (
    <StyledNavbar variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="Logo" />
        </Navbar.Brand>
        <Hamburger toggled={isOpen} toggle={setOpen} onClick={handleShow} />
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
