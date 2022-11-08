import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Import bootstrap components
import { Card, Col, Row } from "react-bootstrap";

const StyledCard = styled(Card)`
  background-color: transparent;
  border: none;

  .card-img {
    margin-bottom: 0.8rem;
  }

  a {
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s;
    color: var(--text-primary);
  }

  a:hover {
    color: var(--text-hover);
  }
`;

const NewReleased = () => {
  return (
    <div>
      <Row lg={5} md={3} xs={1} className="g-5">
        <Col>
          <StyledCard>
            <Link to="/">
              <Card.Img src="https://static-cdn.jtvnw.net/ttv-boxart/515605_IGDB-272x380.jpg" />
              Blue Protocol
            </Link>
          </StyledCard>
        </Col>
      </Row>
    </div>
  );
};

export default NewReleased;
