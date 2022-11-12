import React from "react";
import styled from "styled-components";
import MLButton from "./MLButton";

const Styles = styled.div`
  margin: auto;
  max-width: 80%;
  text-align: center;

  *:not(:last-child) {
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 3rem;
    color: var(--blue);
    font-weight: 600;
  }

  p {
    font-size: 1.2rem;
  }

  .hero-btn {
    display: inline-block;
    min-width: 15%;
  }
`;

const HeroBox = ({ title, content, button }) => {
  return (
    <Styles>
      <h1>{title}</h1>
      <p>{content}</p>
      {button && (
        <div className="hero-btn">
          <MLButton>{button}</MLButton>
        </div>
      )}
    </Styles>
  );
};

export default HeroBox;
