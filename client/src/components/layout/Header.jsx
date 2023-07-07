import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import styled from 'styled-components';
import { device } from '../../styles/BreakPoints';
import Logo from '../../images/logo.svg';
import useAuth from '../../hooks/useAuth';
import MLNavLink from '../common/MLNavLink';

const inlineStyle = {
  navbar: {
    padding: '1rem 0',
    backgroundColor: '#152232',
    transition: 'padding .7s ease, background-color .7s ease',
  },
};

const StyledNavbar = styled(Navbar)`
  padding: 2.5rem 0;
  position: fixed;
  width: 100%;
  z-index: 999;
  background-color: transparent;
  transition: 0.7s;

  .navbar-brand {
    font-weight: 600;
    color: var(--blue-text);
    display: flex;
    align-items: center;
  }

  .hamburger-react {
    display: none;
  }

  @media ${device.tablet} {
    .hamburger-react {
      display: block;
    }

    .navbar-nav {
      display: none;
    }
  }

  .navbar-nav {
    align-items: center;
    justify-content: center;
  }

  .navbar-nav a {
    color: var(--superlight-text);
  }

  .navbar-nav a:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

const StyledOffcanvas = styled(Offcanvas)`
  background-color: var(--dark-blue);

  .offcanvas-body {
    z-index: 9999;
    padding: 0;

    .nav-link {
      font-weight: 500;
      font-size: 1.4rem;
      padding: 1.2rem 2rem;
      transition: all 0.3s;
    }

    .nav-link:hover {
      background-color: var(--background-dark);
    }
  }
`;

const Header = () => {
  // State hooks
  const [bgColor, setBgColor] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Auth Hooks
  const { user, logout } = useAuth();

  const changeColor = () => {
    if (window.scrollY >= 100) {
      setBgColor(true);
    } else {
      setBgColor(false);
    }
  };

  window.addEventListener('scroll', changeColor);

  return (
    <StyledNavbar variant="dark" style={bgColor ? inlineStyle.navbar : {}}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="Logo" />
        </Navbar.Brand>
        <Hamburger size={25} toggle={handleShow} />
        <StyledOffcanvas show={show} onHide={handleClose} placement="end">
          <StyledOffcanvas.Header closeButton className="btn-close-white m-2">
            <StyledOffcanvas.Title></StyledOffcanvas.Title>
          </StyledOffcanvas.Header>
          <StyledOffcanvas.Body>
            <Nav.Link as={Link} to="/" onClick={handleClose}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/search" onClick={handleClose}>
              Search
            </Nav.Link>
            {!user && (
              <Nav.Link as={Link} to="/signup" onClick={handleClose}>
                Signup
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link as={Link} to="/login" onClick={handleClose}>
                Login
              </Nav.Link>
            )}
            {user && (
              <Nav.Link as={Link} to="/create-games" onClick={handleClose}>
                Add Games
              </Nav.Link>
            )}
            {user && (
              <Nav.Link as={Link} to="profile" onClick={handleClose}>
                Profile
              </Nav.Link>
            )}
            {user && (
              <Nav.Link
                as={Link}
                to="/login"
                onClick={() => {
                  logout();
                  handleClose();
                }}
              >
                Logout
              </Nav.Link>
            )}
          </StyledOffcanvas.Body>
        </StyledOffcanvas>
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
            <MLNavLink
              to="/login"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </MLNavLink>
          )}
        </Nav>
      </Container>
    </StyledNavbar>
  );
};

export default Header;
