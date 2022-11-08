import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Import bootstrap components
import { Container, Card, Col, Row } from "react-bootstrap";

import gamesService from "../../services/gamesService";

const StyledPopular = styled.div`
  margin-bottom: 10rem;

  .card {
    background-color: var(--dark-blue);
    margin: 3rem 0;
  }

  .card-body {
    position: absolute;
    top: 40%;
    transform: translate(0, -40%);
    margin: 1rem;

    h1 {
      font-size: 1.8rem;
    }
  }

  .card-img {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
`;

const Popular = () => {
  // HOOK: SETTING COMPONENT STATE (& init values)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  const effectRan = useRef(false);

  useEffect(() => {
    console.log("Effect ran");

    if (effectRan.current === false) {
      fetchGames();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        console.log("Unmounted");
        effectRan.current = true;
      };
    }
  }, []);

  // COMPONENT FUNCTIONS
  async function fetchGames() {
    try {
      const response = await gamesService.get();
      const data = await response.data;
      console.log(data);
      setData(data);
    } catch (err) {
      console.log(err?.response);
      setError(true);
    }
  }

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return <Container>Couldn't retrieve data at this time</Container>;
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <StyledPopular>
      {data.map((game) => (
        <Card>
          <Row className="no-gutters">
            <Col lg={5}>
              <Card.Img src={game.banner_image} />
            </Col>
            <Col>
              <Card.Body>
                <h1>{game.name}</h1>
                <p>{game.description}</p>
                <Link to="">Read More</Link>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </StyledPopular>
  );
};

export default Popular;
