import React from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import MLButton from './MLButton';

const Styles = styled.div`
  margin: auto;
  max-width: 80%;
  text-align: center;

  *:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 3rem;
    color: var(--blue);
    font-weight: 600;
  }

  p {
    font-size: 1.3rem;
  }

  @media only screen and (max-width: 1000px) {
    h1 {
      font-size: 2.3rem;
    }

    p {
      font-size: 1.2rem;
    }
  }
`;

const HeroBox = ({ title, content, button }) => {
  return (
    <Styles>
      <h1>{title}</h1>
      <p>{content}</p>
      {button && (
        <Link
          to="top-rated"
          spy={true}
          smooth={true}
          offset={-160}
          duration={0}
        >
          <MLButton>{button}</MLButton>
        </Link>
      )}
    </Styles>
  );
};

export default HeroBox;
