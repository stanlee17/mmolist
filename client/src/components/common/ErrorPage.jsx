import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import errorIcon from '../../assets/errorIcon.png';

const Image = styled.img`
  width: 400px;
  margin-top: 2rem;
`;

// ERROR: We still render a redirect page on error, but use react-toastify to show a dynamic error popup message (https://fkhadra.github.io/react-toastify/introduction)
const ErrorPage = () => {
  return (
    <Fragment>
      <Image src={errorIcon} alt="error" />
      <h2>
        Error Page: &nbsp;
        <Link to="/">Return to Home</Link>
      </h2>
    </Fragment>
  );
};

export default ErrorPage;
