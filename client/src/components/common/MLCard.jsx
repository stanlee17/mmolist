// Import react modules
import React from "react";

import ProfileImage from "../../images/blue-protocol-bg2.jpg";

//Import npm packages
import { Container } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(21, 34, 50, 0.8), rgba(21, 34, 50, 0.8)),
    url(${ProfileImage}) no-repeat center center;
  background-size: cover;
  min-height: 30vh;

  .container {
    min-height: 95vh;
    display: flex;
    flex-direction: column;
  }

  .lead-card {
    margin: auto;
    padding: 3.5rem;
    background-color: var(--dark-blue);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    min-width: ${(props) => (props.authform ? "30vw" : "70vw")};
  }

  .lead-card .card-title {
    padding-bottom: 1rem;
    font-size: 2em;
    font-weight: 600;
    color: var(--blue);
    text-align: center;
  }
`;

const MLCard = ({ title, authform, children }) => (
  <Styles authform={authform ? 1 : 0}>
    <Container>
      <div className="lead-card">
        <p className="card-title">{title}</p>
        <div>{children}</div>
      </div>
    </Container>
  </Styles>
);

export default MLCard;
