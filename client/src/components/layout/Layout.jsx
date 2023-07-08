import React, { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Import npm packages
import styled from 'styled-components';

// Import components
import Header from './Header';
import Footer from './Footer';

const AppWrap = styled.div`
  flex: 1;
`;

const Layout = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [location.pathname]);

  return (
    <div className="App">
      <ToastContainer style={{ textAlign: 'center' }} position="top-center" />
      <Header />
      {/* Wrap all content in column-direction flexbox */}
      <AppWrap>
        <Outlet />
      </AppWrap>
      <Footer />
    </div>
  );
};

export default Layout;
