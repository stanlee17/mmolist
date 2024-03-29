import React from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import { device } from '../../styles/BreakPoints';
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
    font-size: 1.1rem;
  }

  @media ${device.laptop} {
    h1 {
      font-size: 2.3rem;
    }

    p {
      font-size: 1rem;
      font-weight: 400;
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
