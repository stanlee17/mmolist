import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Import bootstrap components
import { Card, Col, Row } from "react-bootstrap";

const StyledPopular = styled.div`
  margin-bottom: 5rem;

  .card {
    background-color: var(--dark-blue);
    display: flex;
  }

  .card-body {
    padding: 5rem 1rem;

    h1 {
      font-size: 1.8rem;
    }
  }

  .card-img {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
`;

const Popular = ({ title, description, image_url }) => {
  return (
    <StyledPopular>
      <Card>
        <Row className="no-gutters">
          <Col lg={5}>
            <Card.Img src={image_url} />
          </Col>
          <Col>
            <Card.Body>
              <h1>{title}</h1>
              <p>{description}</p>
              <Link to="">Read More</Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </StyledPopular>
  );
};

export default Popular;
