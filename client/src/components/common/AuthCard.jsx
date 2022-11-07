// Import react modules
import React from "react";

//Import npm packages
import { Container } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .container {
    min-height: 90vh;
    display: flex;
    flex-direction: column;
  }

  .lead-card {
    margin: auto;
    padding: 3.5rem;
    background-color: var(--dark-blue);
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    min-width: 550px;
  }

  .lead-card .card-title {
    padding-bottom: 1rem;
    font-size: 2em;
    font-weight: 600;
    color: var(--blue);
    text-align: center;
  }
`;

const AuthCard = (props) => (
  <Styles>
    <Container>
      <div className="lead-card">
        <p className="card-title">{props.title}</p>
        <div>{props.children}</div>
      </div>
    </Container>
  </Styles>
);

export default AuthCard;
